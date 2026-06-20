const fs = require("fs");
const path = require("path");

const glbPath = path.join(__dirname, "character.glb");
const data = fs.readFileSync(glbPath);

// Parse header and JSON chunk
const chunkLength = data.readUInt32LE(12);
const jsonString = data.toString("utf8", 20, 20 + chunkLength);
const gltf = JSON.parse(jsonString);

console.log("Materials count before cleanup:", gltf.materials.length);

// Clean up: Reset meshes back to their original materials (indices 0 to 10)
// and truncate materials array back to original 11 materials.
gltf.nodes.forEach((node) => {
  if (node.mesh !== undefined) {
    const mesh = gltf.meshes[node.mesh];
    
    if (node.name === "BODY.SHIRT" || node.name === "Ear.001" || node.name === "Hand" || 
        node.name === "Neck" || node.name === "Pant" || node.name === "Plane.007" || 
        node.name === "Shoe" || node.name === "Sole" || node.name === "Plane.003") {
      mesh.primitives[0].material = 0; // Originally used Material 0 ("default")
    }
    else if (node.name === "hair" || node.name === "Eyebrow") {
      mesh.primitives[0].material = 1; // Originally used Material 1 ("Material.030" or "Material.014")
    }
    else if (node.name === "Keyboard") {
      mesh.primitives[0].material = 6; // Originally used Material 6 ("Material.024")
    }
    else {
      const keyMatch = node.name.match(/KEYS(?:\.(\d+))?/);
      if (keyMatch) {
        mesh.primitives[0].material = 5; // Originally used Material 5 ("Material.025")
      }
    }
  }
});

gltf.materials = gltf.materials.slice(0, 11);
console.log("Materials count after cleanup:", gltf.materials.length);

// 1. Define our new materials
const newMaterials = [
  {
    name: "SkinMaterial",
    pbrMetallicRoughness: {
      baseColorFactor: [0.784, 0.518, 0.290, 1.0], // Lighter warm-medium brown (#c8844a)
      metallicFactor: 0.0,
      roughnessFactor: 0.92
    }
  },
  {
    name: "ShirtMaterial",
    pbrMetallicRoughness: {
      baseColorFactor: [0.545, 0.247, 0.784, 1.0], // Bright purple matching photos (#8b3fc8)
      metallicFactor: 0.05,
      roughnessFactor: 0.7
    }
  },
  {
    name: "PantMaterial",
    pbrMetallicRoughness: {
      baseColorFactor: [0.20, 0.25, 0.33, 1.0], // Slate blue
      metallicFactor: 0.0,
      roughnessFactor: 0.8
    }
  },
  {
    name: "ShoeMaterial",
    pbrMetallicRoughness: {
      baseColorFactor: [0.95, 0.96, 0.98, 1.0], // White sneakers
      metallicFactor: 0.1,
      roughnessFactor: 0.5
    }
  },
  {
    name: "SoleMaterial",
    pbrMetallicRoughness: {
      baseColorFactor: [0.12, 0.16, 0.23, 1.0], // Dark grey sole
      metallicFactor: 0.0,
      roughnessFactor: 0.7
    }
  },
  {
    name: "HairMaterial",
    pbrMetallicRoughness: {
      baseColorFactor: [0.035, 0.035, 0.043, 1.0], // Charcoal black hair (#09090b)
      metallicFactor: 0.0,
      roughnessFactor: 0.8
    }
  },
  {
    name: "KeyboardBaseMaterial",
    pbrMetallicRoughness: {
      baseColorFactor: [0.06, 0.09, 0.16, 1.0], // Sleek slate-900 keyboard body
      metallicFactor: 0.6,
      roughnessFactor: 0.3
    }
  },
  {
    name: "KeyLightMaterial",
    pbrMetallicRoughness: {
      baseColorFactor: [0.88, 0.91, 0.94, 1.0], // Off-white keycaps
      metallicFactor: 0.1,
      roughnessFactor: 0.5
    }
  },
  {
    name: "KeyDarkMaterial",
    pbrMetallicRoughness: {
      baseColorFactor: [0.28, 0.33, 0.41, 1.0], // Dark slate keycaps
      metallicFactor: 0.1,
      roughnessFactor: 0.5
    }
  },
  {
    name: "KeyAccentMaterial",
    pbrMetallicRoughness: {
      baseColorFactor: [0.02, 0.71, 0.83, 1.0], // Glowing cyan accent keycaps
      metallicFactor: 0.1,
      roughnessFactor: 0.5
    }
  }
];

const startMatIdx = gltf.materials.length;
gltf.materials.push(...newMaterials);

const skinMatIdx = startMatIdx + 0;
const shirtMatIdx = startMatIdx + 1;
const pantMatIdx = startMatIdx + 2;
const shoeMatIdx = startMatIdx + 3;
const soleMatIdx = startMatIdx + 4;
const hairMatIdx = startMatIdx + 5;
const keyboardBaseMatIdx = startMatIdx + 6;
const keyLightMatIdx = startMatIdx + 7;
const keyDarkMatIdx = startMatIdx + 8;
const keyAccentMatIdx = startMatIdx + 9;

// 2. Map nodes & meshes to our new materials
gltf.nodes.forEach((node) => {
  if (node.mesh !== undefined) {
    const mesh = gltf.meshes[node.mesh];
    
    // Shirt
    if (node.name === "BODY.SHIRT") {
      mesh.primitives[0].material = shirtMatIdx;
    }
    // Ears
    else if (node.name === "Ear.001") {
      mesh.primitives[0].material = skinMatIdx;
    }
    // Hand
    else if (node.name === "Hand") {
      mesh.primitives[0].material = skinMatIdx;
    }
    // Neck
    else if (node.name === "Neck") {
      mesh.primitives[0].material = skinMatIdx;
    }
    // Pant
    else if (node.name === "Pant") {
      mesh.primitives[0].material = pantMatIdx;
    }
    // Head (Plane.007)
    else if (node.name === "Plane.007") {
      mesh.primitives[0].material = skinMatIdx;
    }
    // Shoe
    else if (node.name === "Shoe") {
      mesh.primitives[0].material = shoeMatIdx;
    }
    // Sole
    else if (node.name === "Sole") {
      mesh.primitives[0].material = soleMatIdx;
    }
    // Hair
    else if (node.name === "hair") {
      mesh.primitives[0].material = hairMatIdx;
    }
    // Eyebrows
    else if (node.name === "Eyebrow") {
      mesh.primitives[0].material = hairMatIdx;
    }
    // Keyboard Base
    else if (node.name === "Keyboard") {
      mesh.primitives[0].material = keyboardBaseMatIdx;
    }
    // Keyboard Keys
    else {
      const keyMatch = node.name.match(/KEYS(?:\.(\d+))?/);
      if (keyMatch) {
        const keyNum = keyMatch[1] ? parseInt(keyMatch[1]) : 0;
        // Mechanical keyboard coloring scheme
        if (keyNum === 0 || keyNum === 14 || keyNum === 31 || keyNum === 39) {
          mesh.primitives[0].material = keyAccentMatIdx;
        } else if (keyNum % 2 === 0) {
          mesh.primitives[0].material = keyLightMatIdx;
        } else {
          mesh.primitives[0].material = keyDarkMatIdx;
        }
      }
    }
  }
});

// 3. Set the default morph target weight for the face (Key 2 = Smile)
const headMeshIdx = 8;
const headMesh = gltf.meshes[headMeshIdx];
if (headMesh && headMesh.name === "Plane.007") {
  headMesh.weights = [0.0, 0.0, 0.0];
  console.log("Updated head mesh morph weights to default open-eyes pose.");
}

// 4. Save back the GLB file correctly
const binHeaderOffset = 20 + chunkLength;
const binChunkLength = data.readUInt32LE(binHeaderOffset);
const binBuffer = data.subarray(binHeaderOffset + 8, binHeaderOffset + 8 + binChunkLength);

// Serialize JSON
let jsonBuf = Buffer.from(JSON.stringify(gltf), "utf8");
while (jsonBuf.length % 4 !== 0) {
  jsonBuf = Buffer.concat([jsonBuf, Buffer.from(" ")]);
}

let binBuf = binBuffer;
while (binBuf.length % 4 !== 0) {
  binBuf = Buffer.concat([binBuf, Buffer.from([0])]);
}

const totalLength = 12 + 8 + jsonBuf.length + 8 + binBuf.length;

const header = Buffer.alloc(12);
header.write("glTF", 0, 4, "ascii");
header.writeUInt32LE(2, 4);
header.writeUInt32LE(totalLength, 8);

const jsonHeader = Buffer.alloc(8);
jsonHeader.writeUInt32LE(jsonBuf.length, 0);
jsonHeader.writeUInt32LE(0x4E4F534A, 4); // "JSON" chunk type

const binHeader = Buffer.alloc(8);
binHeader.writeUInt32LE(binBuf.length, 0);
binHeader.writeUInt32LE(0x004E4942, 4); // "BIN\0" chunk type (0x004E4942) per GLTF specification

const outputData = Buffer.concat([
  header,
  jsonHeader,
  jsonBuf,
  binHeader,
  binBuf
]);

fs.writeFileSync(glbPath, outputData);
console.log("Successfully wrote modified character.glb!");
