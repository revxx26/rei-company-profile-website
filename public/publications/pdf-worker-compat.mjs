import "./browser-polyfills.mjs";
const { WorkerMessageHandler } = await import("./pdf.worker.min.mjs");
export { WorkerMessageHandler };
