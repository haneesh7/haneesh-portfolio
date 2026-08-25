import { useEffect, useState, useRef } from 'react';

interface BinaryParticle {
  id: number;
  x: number;
  y: number;
  char: string;
  opacity: number;
  size: number;
}

interface FlowerDiffusionParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  color: string;
  opacity: number;
  size: number;
  rotation: number;
}

export function AIAssistantCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [binaryTrail, setBinaryTrail] = useState<BinaryParticle[]>([]);
  const [flowerDiffusions, setFlowerDiffusions] = useState<FlowerDiffusionParticle[]>([]);

  const particleIdRef = useRef(0);
  const flowerIdRef = useRef(0);
  const lastPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const binaryChars = ['1', '1', '0', '0', '1', '0', '1', '0', '1', '0'];
    const flowerSymbols = ['🌸', '✨', '❇️', '✦', '❀', '🌺', '⚡'];
    const rainbowColors = [
      '#ff2a85', // Neon Pink
      '#00f0ff', // Cyber Cyan
      '#ffd700', // Gold
      '#00ff66', // Matrix Emerald
      '#b829ea', // Electric Violet
      '#ff5e00', // Amber Orange
    ];

    // Function to spawn rainbow flower particle explosion
    const spawnFlowerExplosion = (x: number, y: number, count = 10) => {
      const newFlowers: FlowerDiffusionParticle[] = [];
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
        const speed = Math.random() * 4 + 2;
        newFlowers.push({
          id: flowerIdRef.current++,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          char: flowerSymbols[Math.floor(Math.random() * flowerSymbols.length)],
          color: rainbowColors[Math.floor(Math.random() * rainbowColors.length)],
          opacity: 1,
          size: Math.random() * 8 + 14,
          rotation: Math.random() * 360,
        });
      }
      setFlowerDiffusions((prev) => [...prev.slice(-30), ...newFlowers]);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Distance check to spawn trailing binary digits (11001010)
      const dx = currentX - lastPosRef.current.x;
      const dy = currentY - lastPosRef.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 8) {
        lastPosRef.current = { x: currentX, y: currentY };
        const newParticle: BinaryParticle = {
          id: particleIdRef.current++,
          x: currentX + (Math.random() * 8 - 4),
          y: currentY + (Math.random() * 8 - 4),
          char: binaryChars[Math.floor(Math.random() * binaryChars.length)],
          opacity: 0.95,
          size: Math.random() * 4 + 12,
        };

        setBinaryTrail((prev) => [...prev.slice(-18), newParticle]);
      }

      // Check if hovering over glossy cards, buttons, or interactive boxes to diffuse flower rainbow particles
      const target = e.target as HTMLElement | null;
      if (target) {
        const isBoxHover = target.closest('button, a, input, [role="button"], .glossy-card, .glossy-card-hover');
        if (isBoxHover && Math.random() < 0.25) {
          spawnFlowerExplosion(currentX, currentY, 2);
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      spawnFlowerExplosion(e.clientX, e.clientY, 12);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    // Particle update interval (binary trail fade + flower particle diffusion animation)
    const interval = setInterval(() => {
      // Update binary trail
      setBinaryTrail((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.1, y: p.y + 1.2 }))
          .filter((p) => p.opacity > 0)
      );

      // Update flower rainbow diffusion particles
      setFlowerDiffusions((prev) =>
        prev
          .map((f) => ({
            ...f,
            x: f.x + f.vx,
            y: f.y + f.vy,
            vx: f.vx * 0.95,
            vy: f.vy * 0.95 + 0.3, // Subtle gravity
            opacity: f.opacity - 0.04,
            rotation: f.rotation + 4,
          }))
          .filter((f) => f.opacity > 0)
      );
    }, 35);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(interval);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* 1. Trailing Matrix Binary Code Stream (11001010) */}
      {binaryTrail.map((p) => (
        <span
          key={p.id}
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            opacity: p.opacity,
            fontSize: `${p.size}px`,
          }}
          className="absolute font-mono font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.95)] -translate-x-1/2 -translate-y-1/2 select-none"
        >
          {p.char}
        </span>
      ))}

      {/* 2. Glowing Rainbow Flower Particles Diffusion on Click & Box Hover */}
      {flowerDiffusions.map((f) => (
        <span
          key={f.id}
          style={{
            left: `${f.x}px`,
            top: `${f.y}px`,
            opacity: f.opacity,
            fontSize: `${f.size}px`,
            color: f.color,
            transform: `translate(-50%, -50%) rotate(${f.rotation}deg)`,
            filter: `drop-shadow(0 0 12px ${f.color}) drop-shadow(0 0 20px ${f.color})`,
          }}
          className="absolute font-mono select-none"
        >
          {f.char}
        </span>
      ))}
    </div>
  );
}
