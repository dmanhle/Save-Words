// Simple Node.js script to generate placeholder icons
// Requires: npm install canvas (or use the HTML tool instead)

const fs = require('fs');
const path = require('path');

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir);
}

// Try to use canvas if available, otherwise provide instructions
try {
  const { createCanvas } = require('canvas');
  
  const sizes = [16, 32, 48, 128];
  
  sizes.forEach(size => {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Draw green background
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(0, 0, size, size);
    
    // Draw white "S" text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${Math.floor(size * 0.6)}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('S', size / 2, size / 2);
    
    // Save as PNG
    const buffer = canvas.toBuffer('image/png');
    const filePath = path.join(iconsDir, `icon${size}.png`);
    fs.writeFileSync(filePath, buffer);
    console.log(`Generated: ${filePath}`);
  });
  
  console.log('\nAll icons generated successfully!');
} catch (error) {
  console.log('Canvas library not found.');
  console.log('Please either:');
  console.log('1. Run: npm install canvas');
  console.log('2. Or use generate-icons.html in your browser');
  console.log('\nError:', error.message);
}

