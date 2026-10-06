// Shared by the application and PDF worker; only fill missing browser APIs.
if (typeof Promise.withResolvers !== "function") {
  Object.defineProperty(Promise, "withResolvers", {
    configurable: true,
    writable: true,
    value: function () {
      let resolve, reject;
      const promise = new this((onResolve, onReject) => { resolve = onResolve; reject = onReject; });
      return { promise, resolve, reject };
    },
  });
}

if (typeof AbortSignal.any !== "function") {
  Object.defineProperty(AbortSignal, "any", {
    configurable: true,
    writable: true,
    value: function (signals) {
      const inputs = Array.from(signals);
      if (inputs.some((signal) => !(signal instanceof AbortSignal))) throw new TypeError("Expected AbortSignal inputs");
      const controller = new AbortController();
      const listeners = new Map();
      const abort = (signal) => {
        controller.abort(signal.reason);
        for (const [input, listener] of listeners) input.removeEventListener("abort", listener);
        listeners.clear();
      };
      const alreadyAborted = inputs.find((signal) => signal.aborted);
      if (alreadyAborted) abort(alreadyAborted);
      else for (const signal of new Set(inputs)) {
        const listener = () => abort(signal);
        listeners.set(signal, listener);
        signal.addEventListener("abort", listener, { once: true });
      }
      return controller.signal;
    },
  });
}
