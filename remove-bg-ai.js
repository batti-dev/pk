import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';
import path from 'path';

async function processImage(imagePath) {
  console.log(`Processing ${imagePath} with AI background removal...`);
  
  try {
    const blob = await removeBackground(imagePath);
    const buffer = Buffer.from(await blob.arrayBuffer());
    // Backup original
    const ext = path.extname(imagePath);
    const backupPath = imagePath.replace(ext, `-original${ext}`);
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(imagePath, backupPath);
      console.log(`Backup created at ${backupPath}`);
    }
    
    fs.writeFileSync(imagePath, buffer);
    console.log(`Successfully processed ${imagePath}`);
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error);
  }
}

// Process the specific image
processImage('./assets/OnlinePharmacyPK.png');
