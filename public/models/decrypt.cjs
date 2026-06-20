const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const decryptFile = (inputFile, outputFile, password) => {
  const key = crypto.createHash("sha256").update(password).digest();
  
  const fileBuffer = fs.readFileSync(inputFile);
  const iv = fileBuffer.subarray(0, 16);
  const encryptedData = fileBuffer.subarray(16);

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

  fs.writeFileSync(outputFile, decrypted);
  console.log("Decrypted successfully!");
};

decryptFile(
  path.join(__dirname, "character.enc"),
  path.join(__dirname, "character.glb"),
  "Character3D#@"
);
