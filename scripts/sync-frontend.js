import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const backendPublicDir = path.resolve(rootDir, "backend", "public");
const outputPublicDir = path.resolve(rootDir, ".output", "public");
const outputServerDir = path.resolve(rootDir, ".output", "server");

async function syncFrontend() {
  console.log("🔄 Syncing built frontend assets to Laravel public directory...");

  // 1. Ensure backend/public directory exists
  if (!fs.existsSync(backendPublicDir)) {
    fs.mkdirSync(backendPublicDir, { recursive: true });
  }

  // 2. Sync /assets directory (clean old JS/CSS bundles and copy new ones)
  const sourceAssetsDir = path.join(outputPublicDir, "assets");
  const targetAssetsDir = path.join(backendPublicDir, "assets");

  if (fs.existsSync(sourceAssetsDir)) {
    if (fs.existsSync(targetAssetsDir)) {
      fs.rmSync(targetAssetsDir, { recursive: true, force: true });
    }
    fs.mkdirSync(targetAssetsDir, { recursive: true });
    fs.cpSync(sourceAssetsDir, targetAssetsDir, { recursive: true });
    console.log(`✅ Copied assets to ${targetAssetsDir}`);
  }

  // 3. Copy root public static files (favicon.ico, robots.txt, etc.) if they exist in source
  const staticFiles = ["favicon.ico", "robots.txt"];
  for (const file of staticFiles) {
    const srcFile = path.join(outputPublicDir, file);
    const destFile = path.join(backendPublicDir, file);
    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, destFile);
      console.log(`✅ Copied ${file} to backend/public/`);
    }
  }

  // 4. Generate production index.html by executing the built SSR renderer
  try {
    const serverEntryPath = path.join(outputServerDir, "index.mjs");
    if (fs.existsSync(serverEntryPath)) {
      const serverModule = await import(serverEntryPath);
      const handler = serverModule.default || serverModule;

      const mockEnv = { ASSETS: null };
      const mockCtx = {
        waitUntil: () => {},
        context: { waitUntil: () => {} },
      };

      const request = new Request("http://127.0.0.1:8000/");
      const response = await handler.fetch(request, mockEnv, mockCtx);
      let html = await response.text();

      // Ensure doctype is present
      if (!html.toLowerCase().startsWith("<!doctype html>")) {
        html = `<!DOCTYPE html>\n${html}`;
      }

      const targetIndexPath = path.join(backendPublicDir, "index.html");
      fs.writeFileSync(targetIndexPath, html, "utf-8");
      console.log(`✅ Generated production index.html at ${targetIndexPath} (${html.length} bytes)`);
    }
  } catch (err) {
    console.error("⚠️ Failed to generate index.html via SSR renderer:", err.message);
  }

  console.log("🎉 Frontend build and sync to Laravel backend completed successfully.");
}

syncFrontend().catch((err) => {
  console.error("❌ Sync failed:", err);
  process.exit(1);
});
