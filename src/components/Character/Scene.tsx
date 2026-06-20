import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";
const createMustacheTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, 512, 256);

    // Soft edge: draw shadow/spread first for realistic depth
    const gradient = ctx.createRadialGradient(256, 148, 10, 256, 148, 120);
    gradient.addColorStop(0, "rgba(10,8,8,0.95)");
    gradient.addColorStop(0.6, "rgba(10,8,8,0.7)");
    gradient.addColorStop(1, "rgba(10,8,8,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    // Wide trapezoid base for the mustache body
    ctx.moveTo(70, 170);  // bottom-left
    ctx.lineTo(442, 170); // bottom-right
    ctx.lineTo(400, 80);  // top-right inner
    ctx.lineTo(112, 80);  // top-left inner
    ctx.closePath();
    ctx.fill();

    // Core mustache — solid deep black
    ctx.fillStyle = "#0a0808";
    ctx.beginPath();
    // Start from top center dip
    ctx.moveTo(256, 92);
    // Left side arc — goes wide and low
    ctx.bezierCurveTo(200, 85, 130, 82, 80, 115);
    ctx.bezierCurveTo(45, 138, 55, 168, 90, 168);
    ctx.bezierCurveTo(130, 168, 175, 145, 220, 130);
    ctx.bezierCurveTo(238, 125, 250, 122, 256, 118);
    // Right side arc mirror
    ctx.bezierCurveTo(262, 122, 274, 125, 292, 130);
    ctx.bezierCurveTo(337, 145, 382, 168, 422, 168);
    ctx.bezierCurveTo(457, 168, 467, 138, 432, 115);
    ctx.bezierCurveTo(382, 82, 312, 85, 256, 92);
    ctx.closePath();
    ctx.fill();

    // Highlight streak — simulates hair sheen
    ctx.fillStyle = "rgba(80,60,50,0.25)";
    ctx.beginPath();
    ctx.moveTo(256, 98);
    ctx.bezierCurveTo(210, 94, 155, 92, 110, 115);
    ctx.bezierCurveTo(145, 108, 205, 105, 256, 108);
    ctx.bezierCurveTo(307, 105, 367, 108, 402, 115);
    ctx.bezierCurveTo(357, 92, 302, 94, 256, 98);
    ctx.closePath();
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  const [character, setChar] = useState<THREE.Object3D | null>(null);

  // Character Customizer States
  const [panelOpen, setPanelOpen] = useState(false);
  const [colors, setColors] = useState({
    skin: "#c8844a",     // Warm light-medium brown
    shirt: "#8b3fc8",   // Bright purple matching photos
    pant: "#334155",
    hair: "#0d0d0d",    // Dense black hair
    eyes: "#ffffff",    // White = no tint, let natural eye texture show
    keyboardBase: "#0f172a",
    keyAccent: "#06b6d4",
  });
  const [expression, setExpression] = useState("normal");
  const [mustacheSettings, setMustacheSettings] = useState({
    visible: true,
    x: 0.0,
    y: -0.08,
    z: 0.12,
    scale: 1.0,
  });

  useEffect(() => {
    if (canvasDiv.current) {
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.devicePixelRatio < 2, // skip antialias on high-DPI to save GPU
        powerPreference: "high-performance",
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // cap at 1.5x
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      let progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter().then((gltf) => {
        if (gltf) {
          const animations = setAnimations(gltf);
          hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
          mixer = animations.mixer;
          let character = gltf.scene;
          setChar(character);
          scene.add(character);
          headBone = character.getObjectByName("spine006") || null;
          screenLight = character.getObjectByName("screenlight") || null;
          progress.loaded().then(() => {
            setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 500); // reduced from 2500ms
          });
          window.addEventListener("resize", () =>
            handleResize(renderer, camera, canvasDiv, character)
          );
        }
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", (event) => {
        onMouseMove(event);
      });
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      const animate = () => {
        requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        clearTimeout(debounce);
        scene.clear();
        renderer.dispose();
        window.removeEventListener("resize", () =>
          handleResize(renderer, camera, canvasDiv, character!)
        );
        if (canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        if (landingDiv) {
          document.removeEventListener("mousemove", onMouseMove);
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, []);

  // Apply customizations to the 3D model whenever state changes
  useEffect(() => {
    if (!character) return;

    character.traverse((child: any) => {
      // Hide ears
      if (child.name === "Ear.001") {
        child.visible = false;
        return;
      }
      if (child.isMesh && child.material) {
        const matName: string = (child.material.name || "");

        // Match by material name — guaranteed reliable, independent of node name
        const isSkin     = matName === "SkinMaterial";
        const isShirt    = matName === "ShirtMaterial";
        const isPant     = matName === "PantMaterial";
        const isHair     = matName === "HairMaterial";
        const isEyes     = matName === "EyesMaterial.001";
        const isKeyboard = matName === "KeyboardBaseMaterial";
        const isKeys     = matName === "KeyLightMaterial" || matName === "KeyDarkMaterial" || matName === "KeyAccentMaterial";

        const isCustomizable = isSkin || isShirt || isPant || isHair || isEyes || isKeyboard || isKeys;

        if (isCustomizable) {
          // Clone material to ensure unique instance per mesh
          if (!child.material.__isCloned) {
            child.material = child.material.clone();
            child.material.__isCloned = true;
          }

          if (isSkin) {
            child.material.color.set(colors.skin);
            if ("roughness" in child.material) child.material.roughness = 0.92;
            if ("metalness" in child.material) child.material.metalness = 0.0;
          } else if (isShirt) {
            child.material.color.set(colors.shirt);
          } else if (isPant) {
            child.material.color.set(colors.pant);
          } else if (isHair) {
            child.material.color.set(colors.hair);
          } else if (isEyes) {
            child.material.color.set(colors.eyes);
          } else if (isKeyboard) {
            child.material.color.set(colors.keyboardBase);
          } else if (isKeys) {
            // Accent specific key materials
            if (matName === "KeyAccentMaterial") {
              child.material.color.set(colors.keyAccent);
            }
          }
        }
      }
    });

    // Apply morph target weights for expression
    const head = character.getObjectByName("Plane.007") as THREE.Mesh;
    if (head && head.morphTargetInfluences) {
      if (expression === "normal") {
        head.morphTargetInfluences[0] = 0.0;
        head.morphTargetInfluences[1] = 0.0;
        head.morphTargetInfluences[2] = 0.0;
      } else if (expression === "blink") {
        head.morphTargetInfluences[0] = 1.0;
        head.morphTargetInfluences[1] = 0.0;
        head.morphTargetInfluences[2] = 0.0;
      } else if (expression === "wink") {
        head.morphTargetInfluences[0] = 0.0;
        head.morphTargetInfluences[1] = 0.0;
        head.morphTargetInfluences[2] = 1.0;
      }
    }

    // Attach and update the mustache mesh — attach to Plane007 head mesh for correct local-space following
    const headMesh = character.getObjectByName("Plane.007") as THREE.Mesh;
    const headBone = character.getObjectByName("spine006");
    const mustacheParent = headMesh || headBone;
    if (mustacheParent) {
      let mustache = mustacheParent.getObjectByName("mustache") as THREE.Mesh;
      if (mustacheSettings.visible) {
        if (!mustache) {
          const geom = new THREE.PlaneGeometry(0.22, 0.08);
          const mat = new THREE.MeshBasicMaterial({
            map: createMustacheTexture(),
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            depthTest: true,
          });
          mustache = new THREE.Mesh(geom, mat);
          mustache.name = "mustache";
          mustacheParent.add(mustache);
        }

        if (mustache.material instanceof THREE.MeshBasicMaterial) {
          mustache.material.color.set(colors.hair);
        }

        // Apply position and scale offsets (local space of head mesh)
        mustache.position.set(mustacheSettings.x, mustacheSettings.y, mustacheSettings.z);
        mustache.rotation.set(-0.1, 0, 0);
        mustache.scale.setScalar(mustacheSettings.scale);
      } else {
        if (mustache) {
          mustacheParent.remove(mustache);
          (mustache.geometry as THREE.BufferGeometry).dispose();
          if (Array.isArray(mustache.material)) {
            mustache.material.forEach((m) => m.dispose());
          } else {
            mustache.material.dispose();
          }
        }
      }
    }
  }, [character, colors, expression, mustacheSettings]);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>

        {/* Customizer Overlay Panel */}
        <button 
          className={`customize-toggle-btn ${panelOpen ? "active" : ""}`}
          onClick={() => setPanelOpen(!panelOpen)}
          title="Customize Character"
        >
          {panelOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          )}
        </button>

        <div className={`customize-panel ${panelOpen ? "open" : ""}`}>
          <div className="panel-header">
            <h3>Customize Character</h3>
          </div>
          
          <div className="customize-section">
            <span className="section-title">Face Expression</span>
            <div className="expression-options">
              <button 
                className={`expression-btn ${expression === "normal" ? "active" : ""}`}
                onClick={() => setExpression("normal")}
              >
                😐 Normal
              </button>
              <button 
                className={`expression-btn ${expression === "blink" ? "active" : ""}`}
                onClick={() => setExpression("blink")}
              >
                😑 Blinking
              </button>
              <button 
                className={`expression-btn ${expression === "wink" ? "active" : ""}`}
                onClick={() => setExpression("wink")}
              >
                😉 Winking
              </button>
            </div>
          </div>

          <div className="customize-section">
            <span className="section-title">Skin Tone</span>
            <div className="color-swatches">
              {[
                { name: "South Asian", value: "#d29c78" },
                { name: "Peach", value: "#fcd4bc" },
                { name: "Warm Beige", value: "#e0ac69" },
                { name: "Honey", value: "#c68642" },
                { name: "Bronze", value: "#8d5524" },
                { name: "Slate", value: "#cbd5e1" }
              ].map((swatch) => (
                <button
                  key={swatch.value}
                  className={`color-swatch ${colors.skin === swatch.value ? "active" : ""}`}
                  style={{ backgroundColor: swatch.value }}
                  onClick={() => setColors({ ...colors, skin: swatch.value })}
                  title={swatch.name}
                />
              ))}
            </div>
          </div>

          <div className="customize-section">
            <span className="section-title">T-Shirt Color</span>
            <div className="color-swatches">
              {[
                { name: "Deep Violet", value: "#7c3aed" },
                { name: "Classic Purple", value: "#5b21b6" },
                { name: "Teal", value: "#0d9488" },
                { name: "Crimson", value: "#be123c" },
                { name: "Amber", value: "#d97706" },
                { name: "Sleek Gray", value: "#334155" },
                { name: "Off-white", value: "#f1f5f9" }
              ].map((swatch) => (
                <button
                  key={swatch.value}
                  className={`color-swatch ${colors.shirt === swatch.value ? "active" : ""}`}
                  style={{ backgroundColor: swatch.value }}
                  onClick={() => setColors({ ...colors, shirt: swatch.value })}
                  title={swatch.name}
                />
              ))}
            </div>
          </div>

          <div className="customize-section">
            <span className="section-title">Pants Color</span>
            <div className="color-swatches">
              {[
                { name: "Dark Slate", value: "#1e293b" },
                { name: "Sand", value: "#d97706" },
                { name: "Classic Blue", value: "#1d4ed8" },
                { name: "Charcoal", value: "#475569" }
              ].map((swatch) => (
                <button
                  key={swatch.value}
                  className={`color-swatch ${colors.pant === swatch.value ? "active" : ""}`}
                  style={{ backgroundColor: swatch.value }}
                  onClick={() => setColors({ ...colors, pant: swatch.value })}
                  title={swatch.name}
                />
              ))}
            </div>
          </div>

          <div className="customize-section">
            <span className="section-title">Hair & Eyebrow Color</span>
            <div className="color-swatches">
              {[
                { name: "Charcoal Black", value: "#09090b" },
                { name: "Brown", value: "#2d1b10" },
                { name: "Silver", value: "#cbd5e1" },
                { name: "Neon Orange", value: "#ea580c" }
              ].map((swatch) => (
                <button
                  key={swatch.value}
                  className={`color-swatch ${colors.hair === swatch.value ? "active" : ""}`}
                  style={{ backgroundColor: swatch.value }}
                  onClick={() => setColors({ ...colors, hair: swatch.value })}
                  title={swatch.name}
                />
              ))}
            </div>
          </div>

          <div className="customize-section">
            <span className="section-title">Eye Color</span>
            <div className="color-swatches">
              {[
                { name: "Dark Brown", value: "#3d2314" },
                { name: "Light Brown", value: "#5c3a21" },
                { name: "Steel Gray", value: "#475569" },
                { name: "Ocean Blue", value: "#1e3a8a" },
                { name: "Emerald Green", value: "#065f46" }
              ].map((swatch) => (
                <button
                  key={swatch.value}
                  className={`color-swatch ${colors.eyes === swatch.value ? "active" : ""}`}
                  style={{ backgroundColor: swatch.value }}
                  onClick={() => setColors({ ...colors, eyes: swatch.value })}
                  title={swatch.name}
                />
              ))}
            </div>
          </div>

          <div className="customize-section">
            <span className="section-title">Keyboard Accent Keycaps</span>
            <div className="color-swatches">
              {[
                { name: "Cyan Glow", value: "#06b6d4" },
                { name: "Pink Glow", value: "#ec4899" },
                { name: "Orange Glow", value: "#f97316" },
                { name: "Purple Glow", value: "#a855f7" }
              ].map((swatch) => (
                <button
                  key={swatch.value}
                  className={`color-swatch ${colors.keyAccent === swatch.value ? "active" : ""}`}
                  style={{ backgroundColor: swatch.value }}
                  onClick={() => setColors({ ...colors, keyAccent: swatch.value })}
                  title={swatch.name}
                />
              ))}
            </div>
          </div>

          <div className="customize-section">
            <span className="section-title">Mustache Style</span>
            <div className="toggle-option" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", color: "#cbd5e1" }}>Show Mustache</span>
              <button
                className={`expression-btn ${mustacheSettings.visible ? "active" : ""}`}
                onClick={() => setMustacheSettings({ ...mustacheSettings, visible: !mustacheSettings.visible })}
                style={{ margin: 0, padding: "6px 16px", display: "inline-block" }}
              >
                {mustacheSettings.visible ? "On" : "Off"}
              </button>
            </div>
            {mustacheSettings.visible && (
              <div className="slider-controls" style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                <div className="slider-control">
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#94a3b8" }}>
                    <span>Position X (Left/Right)</span>
                    <span>{mustacheSettings.x.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="-2.00"
                    max="2.00"
                    step="0.01"
                    value={mustacheSettings.x}
                    onChange={(e) => setMustacheSettings({ ...mustacheSettings, x: parseFloat(e.target.value) })}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="slider-control">
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#94a3b8" }}>
                    <span>Position Y (Height)</span>
                    <span>{mustacheSettings.y.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="-2.00"
                    max="2.00"
                    step="0.01"
                    value={mustacheSettings.y}
                    onChange={(e) => setMustacheSettings({ ...mustacheSettings, y: parseFloat(e.target.value) })}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="slider-control">
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#94a3b8" }}>
                    <span>Position Z (Depth)</span>
                    <span>{mustacheSettings.z.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="-2.00"
                    max="2.00"
                    step="0.01"
                    value={mustacheSettings.z}
                    onChange={(e) => setMustacheSettings({ ...mustacheSettings, z: parseFloat(e.target.value) })}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="slider-control">
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#94a3b8" }}>
                    <span>Scale</span>
                    <span>{mustacheSettings.scale.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.05"
                    value={mustacheSettings.scale}
                    onChange={(e) => setMustacheSettings({ ...mustacheSettings, scale: parseFloat(e.target.value) })}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Scene;
