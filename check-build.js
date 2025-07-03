#!/usr/bin/env node

import fs from "fs";
import path from "path";

console.log("🔍 Checking build for common deployment issues...\n");

// Check if dist folder exists
if (!fs.existsSync("dist")) {
  console.error('❌ dist folder not found. Run "pnpm run build" first.');
  process.exit(1);
}

// Check index.html
const indexPath = path.join("dist", "index.html");
if (!fs.existsSync(indexPath)) {
  console.error("❌ dist/index.html not found.");
  process.exit(1);
}

const indexContent = fs.readFileSync(indexPath, "utf8");
console.log("✅ index.html exists");

// Check for assets
const assetsDir = path.join("dist", "assets");
if (!fs.existsSync(assetsDir)) {
  console.error("❌ dist/assets folder not found.");
  process.exit(1);
}

const assets = fs.readdirSync(assetsDir);
const jsFiles = assets.filter((file) => file.endsWith(".js"));
const cssFiles = assets.filter((file) => file.endsWith(".css"));

console.log(
  `✅ Found ${jsFiles.length} JS files and ${cssFiles.length} CSS files in assets`
);

// Check _redirects file
const redirectsPath = path.join("dist", "_redirects");
if (!fs.existsSync(redirectsPath)) {
  console.warn("⚠️  _redirects file not found in dist folder");
} else {
  console.log("✅ _redirects file exists");
}

// Check netlify.toml
if (!fs.existsSync("netlify.toml")) {
  console.warn("⚠️  netlify.toml not found in root");
} else {
  console.log("✅ netlify.toml exists");
}

// Check for absolute paths in index.html
if (indexContent.includes('src="/src/')) {
  console.error(
    "❌ Found development paths in index.html. This suggests build didn't complete properly."
  );
  process.exit(1);
}

// Check for proper asset references
const assetRefs = indexContent.match(/\/assets\/[^"]+/g);
if (!assetRefs || assetRefs.length === 0) {
  console.error("❌ No asset references found in index.html");
  process.exit(1);
}

console.log(`✅ Found ${assetRefs.length} asset references in index.html`);

// Check if all referenced assets exist
let missingAssets = [];
assetRefs.forEach((ref) => {
  const assetPath = path.join("dist", ref);
  if (!fs.existsSync(assetPath)) {
    missingAssets.push(ref);
  }
});

if (missingAssets.length > 0) {
  console.error("❌ Missing assets:");
  missingAssets.forEach((asset) => console.error(`   ${asset}`));
  process.exit(1);
}

console.log("✅ All referenced assets exist");

console.log("\n🎉 Build looks good for deployment!");
console.log("\n📋 Deployment checklist:");
console.log('   1. Upload the entire "dist" folder to Netlify');
console.log("   2. Set build command to: pnpm run build");
console.log("   3. Set publish directory to: dist");
console.log("   4. Make sure Node.js version is 18 or higher");
console.log("\n🔗 If you still see a white screen:");
console.log("   1. Check browser console for JavaScript errors");
console.log("   2. Check Netlify function logs");
console.log("   3. Try accessing /debug.html to test static file serving");
