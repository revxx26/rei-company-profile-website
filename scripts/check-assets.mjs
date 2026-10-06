import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
async function files(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await files(full));
    else result.push(full);
  }
  return result;
}
// Compare actual casing: Render runs Linux, whereas Windows accepts mismatches.
const available = new Set((await files(path.join(root, "public"))).map((file) => "/" + path.relative(path.join(root, "public"), file).split(path.sep).join("/")));
const required = new Set(["/publications/pdf.worker.min.mjs", "/publications/pdf-worker-compat.mjs", "/publications/browser-polyfills.mjs", "/publications/pdfjs-LICENSE.txt"]);
const sourceFiles = await files(path.join(root, "src"));
const sourcePaths = new Set(sourceFiles.map((file) => path.relative(path.join(root, "src"), file).split(path.sep).join("/")));
const invalidImports = [];
for (const file of sourceFiles) {
  if (!/\.(tsx?|js|json|css)$/.test(file)) continue;
  const text = await readFile(file, "utf8");
  for (const match of text.matchAll(/["'`](\/(?:images|videos|publications)\/[^"'`\s]+)["'`]/g)) {
    if (!match[1].includes("${")) required.add(match[1]);
  }
  for (const match of text.matchAll(/(?:from\s*|import\s*\()["']@\/([^"']+)["']/g)) {
    const target = match[1];
    if (![target, ...[".ts", ".tsx", ".js", ".json", ".css", "/index.ts", "/index.tsx"].map((extension) => target + extension)].some((candidate) => sourcePaths.has(candidate))) {
      invalidImports.push(`${path.relative(root, file)}: @/${target}`);
    }
  }
}
// Generated paths in the monthly agenda also need exact-case validation.
for (let i = 2; i <= 6; i++) required.add(`/images/training-october-${i}.jpeg`);
for (const i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 23, 24, 25]) {
  required.add(`/images/Training-September-${i}.${i >= 23 ? "jpeg" : "jpg"}`);
}
const missing = [...required].filter((asset) => !available.has(asset));
if (missing.length || invalidImports.length) {
  console.error("Missing files or filename-case mismatch:\n" + [...missing, ...invalidImports].join("\n"));
  process.exitCode = 1;
} else console.log(`Asset/import checks passed: ${required.size} local references, including agenda posters and the PDF worker; source imports match exact filename casing.`);
