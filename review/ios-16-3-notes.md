# iOS 16.3 adjustments and mobile navigation

- Build target includes Safari/iOS Safari 16.3. No dependency versions changed.
- Dropdowns use native dialogs instead of Popover API, including nested selectors in modal content. Popover shipped in Safari 17; source: https://webkit.org/blog/14445/webkit-features-in-safari-17-0/ .
- Removed unused Tailwind 4 theme/utilities from output; retained Preflight and existing plain CSS. Production CSS has no registered @property or utility layers. Prefixed backdrop blur is retained. Tailwind's baseline is Safari 16.4: https://tailwindcss.com/docs/compatibility .
- PDF.js uses the legacy bundle and matching worker. Shared polyfills fill Promise.withResolvers and AbortSignal.any only when missing, both before app interaction and inside the PDF worker. OffscreenCanvas/ImageDecoder paths disabled in PDF rendering.
- Compatibility test removed Promise.withResolvers, Promise.try and AbortSignal.any in an isolated Node process. With app polyfills plus legacy PDF.js, loaded the actual magazine (56 pages) and extracted 226 text items from page 2. This checks missing API handling, not actual Safari rendering.
- No regex lookbehind was found in the built client chunks or legacy PDF library/worker.
- Mobile language control moved inside a glass navigation panel. Desktop language remains in the header. Removed menu numbers, added REI logo and internal navigation arrows, comfortable touch areas, and nested-close event guards.
- Mobile text fields use 16px fonts to prevent Safari focus zoom; touch targets retain pressed feedback.
- Production UI QA: menu/both languages; nested dropdown selection and Escape keep parent open/body scroll locked; month selector; training attendance; PDF rendering and page selection including page 56; 320x568 menu width 296px with no page overflow; desktop header language visible.
- Latest production worker wrapper validated in browser with magazine page 2 rendering. No captured browser errors. Build, TypeScript, ESLint and 47 local asset/import checks passed.

Limits: actual Safari/iOS 16.3 device rendering has not been tested. Next.js default support starts at Safari 16.4 (https://nextjs.org/docs/architecture/supported-browsers), and PDF.js lists newer Safari in its support matrix (https://github.com/mozilla/pdf.js/wiki/Frequently-Asked-Questions). These changes target the older version but cannot certify every browser-engine behavior without native device QA. Existing fallback PDF download remains available on load failure.

Deploy settings stay the same. Commit/upload the new src/lib, src/instrumentation-client.ts, public/publications/pdf-worker-compat.mjs, scripts and rebuilt code alongside all existing assets. Postinstall generates browser-polyfills.mjs and the legacy worker automatically.
