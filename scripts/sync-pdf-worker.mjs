import { copyFile, mkdir } from "node:fs/promises";

// Keep the browser worker and its license matched to the installed PDF.js version.
const target = new URL("../public/publications/", import.meta.url);
await mkdir(target, { recursive: true });
await copyFile(new URL("../node_modules/pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url), new URL("pdf.worker.min.mjs", target));
await copyFile(new URL("../node_modules/pdfjs-dist/LICENSE", import.meta.url), new URL("pdfjs-LICENSE.txt", target));
