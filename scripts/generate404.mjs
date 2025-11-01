import fs from "fs";
import path from "path";

const src = path.resolve("./dist/index.html");
const dest = path.resolve("./dist/404.html");

try {
    if (!fs.existsSync(src)) {
        console.error("[copy-404] ❌ dist/index.html not found, please run `pnpm build` first.");
        process.exit(1);
    }

    fs.copyFileSync(src, dest);
    console.log("[copy-404] ✅ dist/index.html copied to dist/404.html");
} catch (err) {
    console.error("[copy-404] ❌ Failed:", err);
    process.exit(1);
}
