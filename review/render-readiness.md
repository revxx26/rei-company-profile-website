# Render pre-deploy verification · 6 October 2026

Prepared for manual deployment only. No push, commit, Render account action or publication was performed.

- Production build and TypeScript: passed, Next.js 16.3.8 on Node 24.15.0.
- ESLint: passed.
- Local asset/import checks: passed, 45 local references and exact-case source imports. Generated October/September agenda paths included.
- PDF worker postinstall synchronization: passed.
- package.json dependency/engine entries match package-lock.json.
- Production startup: `npm start`, PORT=3101, host 0.0.0.0, ready in 296 ms.
- HTTP checks: homepage, News article, 404, logo, worker, Next image optimizer passed; video/PDF range requests return 206. Details in render-production-http.json.
- Browser production QA: mobile widths 320/390, tablet 820, desktop 1440. No horizontal page overflow in checked mobile layouts. Dropdown stays inside 320 px viewport; mobile dialog width 282 px.
- Mobile menu opens/closes and restores scrolling. EN/ID switching works.
- Service category/detail, Copy link, month selection, carousel next, training detail, source-before-copy order, bold description, nested full-size image/zoom/close work.
- Publications show 2/4/6 cards by breakpoint. Mobile View more goes 2 to 4; View less returns to 2. Regulation image viewer opens/closes. Magazine PDF renders and changes from page 1 to page 2 of 56.
- News opens its article and returns to Insights.
- Contact required fields reject an empty submit, and Email/Email 2 selection works. No email or WhatsApp message was sent.
- Company-profile action opens the YouTube dialog with autoplay=1.
- Browser console: no captured errors in checked flows.
- Compiled production CSS contains :active feedback for publication cards, services, training cards, buttons, dropdowns and links. Desktop hover is preserved. CSS motion overrides remain in the reduced-motion media rules.

Limits: browser QA was responsive desktop-browser testing, not physical iOS/Android touchscreen testing. Physical tap/press behavior, Safari compatibility and the actual Render Linux clean install/HTTPS endpoint require a final check after manual deployment. No test can guarantee zero bugs.

Deployment instructions: ../DEPLOY-RENDER.md. Screenshot: render-mobile-final.png. The existing development server at port 3100 was left running.
