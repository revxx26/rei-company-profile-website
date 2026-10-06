# Intertek-inspired homepage revision — 6 October 2026

## Result

- Full-width hero at 75svh, minimum 520px desktop / 560px mobile to keep all copy and the CTA readable on short viewports.
- REI's exact original headline and English supporting caption, centered. One yellow service CTA. No next/previous slide controls.
- Fixed translucent blurred header. Light navigation over the hero; dark navigation over lower content. Mobile dialog behavior preserved.
- Original Supported and Certified by heading and thirty original logo assets. Two slow, seamless rails, moving in opposite directions with faded edges. Copies are hidden from assistive technology. Hover, focus and manual pause; reduced motion wraps the original logos into a static layout.
- Why Us/about section before services, followed by public training, news/publications and contacts. Service, training and about headings simplified; no new catalog routes or filters.

## Video provenance

Official REI company-profile video: https://www.youtube.com/watch?v=HwhACSDbpvI . Reviewed in the browser. It contains prominent animated text, logos and graphic overlays, which compete with hero copy.

Selected illustrative footage: https://mixkit.co/free-stock-video/scientist-mixing-liquids-in-a-laboratory-4719/ . This specific item explicitly permits commercial or personal use under the Mixkit Stock Video Free License. License: https://mixkit.co/license/ . This is footage of a lab process, not a claim about REI's own facilities.

Observed source media URL: https://assets.mixkit.co/videos/4719/4719-720.mp4 . Locally served as public/videos/laboratory.mp4, 4,371,488 bytes. Official preview poster: https://assets.mixkit.co/videos/4719/4719-thumb-720-0.jpg . No Intertek footage copied and no YouTube video downloaded.

Logos were extracted from the original supported/certified section at https://reisistem.id/ . Exact names and source URLs are saved in standards-source.json. Intrinsic image dimensions are preserved in src/data/standards.json.

## Verification

- npm run lint and npm run build pass.
- Clean browser session: no console errors or warnings, including hydration.
- 320, 390, 768, 1024 and 1440px widths: no horizontal overflow, centered hero text, fixed header and computed blur(18px), all 60 logo images loaded (30 originals + 30 hidden duplicates).
- Hero height measured 633px at an 844px viewport, exactly 75%; default desktop 663px at 884px viewport.
- Video autoplay confirmed: muted, looping, readyState 4 and changing currentTime. Pauses when hero leaves the viewport.
- Mobile menu opens, hands off to consultation, and Escape closes the dialog, restores scroll and returns focus to the menu button.
- Service CTA reaches its section; scrolled header stays at top: 0 with readable dark navigation.
- Logo rails animate in opposite directions; manual pause sets both animation states to paused. Reduced-motion CSS and conditional video loading are implemented; the OS preference was not changed during this review.
- Screenshots: hero-intertek-desktop.jpg and hero-intertek-mobile.jpg. Responsive measurements: hero-intertek-checks.json.

## Header/color follow-up — 6 October 2026

- At scrollY 0: transparent background, backdrop-filter none, transparent border.
- At scrollY > 0 over the hero: translucent dark background with blur(18px). After leaving the hero: translucent light background and dark navigation. Returning to the top removes blur again.
- REI logo asset is unchanged and has no CSS filter. The hero, header, lower primary CTA and floating contact buttons now use #0d337d, sampled from the blue in the original logo, instead of the Intertek-inspired yellow CTA.
- Header consultation button retained; on narrow phones, the menu consultation and floating contact remain available.
- Lint and production build pass. Clean browser has no warnings/errors. Top, scroll-over-hero, past-hero and return-to-top states verified; header remains at top: 0. Consultation dialog opens and closes with Escape. At 390px no horizontal overflow.
- Current screenshots: header-transparent-top.jpg, header-blur-scrolled.jpg, header-transparent-mobile.jpg. Measurements: header-behavior-checks.json. Earlier hero screenshots document the preceding version.

## Transparent header over white sections — 6 October 2026

Removed the white tint and border from the scrolled header over lower content. Its background is now rgba(0, 0, 0, 0), with blur(18px), dark navigation and the original logo/blue consultation CTA. Verified in a clean browser at the about-section anchor: header fixed at top: 0, no console errors or warnings. Screenshot: header-white-transparent.jpg; measured styles: header-white-transparent-check.json. This supersedes the earlier light-tinted scrolled state.

## Rounded header trial — 6 October 2026

Added 18px corners on desktop and 14px on phones. Header floats 12px below the top on desktop and 8px on phones, with small side insets. Padding preserves space for the original logo, navigation and consultation action. Top transparency, scroll blur, transparent background over white sections and REI colors are preserved.

Verified at 320, 390, 768, 1024 and 1440px: no page or header overflow, all visible header controls inside its bounds. Mobile menu opens and Escape closes it; clean browser has no warnings/errors. Current screenshots: header-rounded-hero.jpg, header-rounded-desktop.jpg (over white content), header-rounded-mobile.jpg. Measurements: header-rounded-checks.json. Previous top: 0 checks apply to the preceding flush header version.

## Flat header and English content — 6 October 2026

This supersedes the rounded-header trial. The fixed header is flush at top: 0 with border-radius: 0. At the top it remains fully transparent without blur; after scrolling it uses blur(18px), retains the subtle dark tint over the hero and stays fully transparent with dark navigation over white content. REI logo and blue CTA colors are unchanged.

Removed the manual pause control from Supported and Certified by. Both logo rails continue moving; hover/focus pause and reduced-motion styles remain.

Translated all website text to English: headings, descriptions, dates, labels, menu, footer, accessibility text, metadata and prepared WhatsApp/email messages. Kept official names and postal addresses intact. Replaced the Indonesian regulation thumbnail with a labeled English publication overview. The schedule dialog now presents English program groups and opens the original Indonesian REI poster through a source link, preserving published course details without embedding Indonesian document copy in the English page.

Dark mode and a language switch are deferred until design/content approval. No new catalog or detail routes were added.

Verification: lint and production build pass. Browser has no warnings/errors. Widths 320, 390, 400, 414, 768, 1024 and 1440px have no horizontal overflow; header controls fit. Mobile navigation opens and hands off to consultation, Escape closes the dialog. Consultation topic selection updates the English WhatsApp message. Schedule group 6 links to training-october-6.jpeg. Both logo animations run and no pause button is present. Header over white content has a transparent background and blur(18px).

Evidence: homepage-english-desktop.jpg, homepage-english-mobile.jpg, header-english-white.jpg, consultation-english.jpg, schedule-english.jpg, homepage-english-full.jpg, homepage-english-checks.json. Earlier screenshots represent superseded revisions.
