# About photography and video revision — 6 October 2026

## Scope

Replaced the single About image with five existing REI Key Client Gathering 2026 photos. Retained the About text, company figures, REI branding and header behavior. Added a separate Videos & Media section directly after the About/company figures and before Services. The About company-profile link now leads to this section. No catalog work, publishing or unrelated website edits.

## Photo behavior

Six-second autoplay with an 800ms opacity crossfade in a fixed-size image frame. Previous/next wrap through all five photos; dots choose a photo directly; left/right keyboard arrows are supported. The slideshow pauses on hover, focus, when outside the viewport, when the document becomes hidden, and with the manual pause control. Reduced-motion users get manual navigation without autoplay/fade. Only the active slide is exposed to assistive technology; automatic changes are not announced repeatedly. Server/client rendering is synchronized before showing the motion preference dependent playback control.

## Video sources

These three videos are linked/embedded in the original REI homepage, verified 6 October 2026:

- Company profile, REI Sistem Indonesia Group: https://www.youtube.com/watch?v=HwhACSDbpvI
- Key Client Gathering 2026 at ARTOTEL Living World, REI Sistem Indonesia Group: https://www.youtube.com/watch?v=7iT3CRuV8K4
- Food safety/environmental standards coverage, Metro TV: https://www.youtube.com/watch?v=nBUfF45AZRQ

Previews use YouTube's thumbnail images. No YouTube iframe is rendered before a video is selected. Clicking a preview opens one native dialog with the selected youtube-nocookie.com embed. Escape, close button and backdrop dismiss the dialog; the iframe is removed so playback stops, body scrolling is restored and focus returns to the preview. Watch on YouTube remains available. English captions and source attribution are supplied; the original video and thumbnail content remain unmodified.

## Verification

- Lint and production build pass.
- Fresh browser session has no warnings or errors; first-load hydration checked.
- All five local photos and three video previews load.
- Autoplay changes the active photo after restarting; computed fade duration is 0.8s.
- Next, previous, direct selection, keyboard arrows and first-to-last wrap checked.
- Widths 320, 390, 768, 1024 and 1440px have no horizontal overflow. Video previews stack on phones; gallery controls fit.
- All three YouTube embeds visibly enter playback after clicking. Mobile company-profile dialog fits the viewport.
- After closing: zero iframes, restored body overflow and focus on the original preview.
- Reduced-motion behavior is implemented in the hook/CSS; the user's OS preference was not changed.

Screenshots: about-gallery-desktop.jpg, about-gallery-mobile.jpg, videos-desktop.jpg, videos-mobile.jpg, video-player-mobile.jpg. Responsive evidence: about-video-checks.json. Earlier screenshots document preceding revisions.

## About polish and counting figures — 6 October 2026

Removed decorative eyebrow dashes across the homepage and the separating em dash in hero copy/metadata. Carousel indicators are now round dots throughout, including the active dot. Dates, telephone numbers and standard identifiers retain their meaningful punctuation.

About arrows are transparent in all states, 36px instead of 44px, with 18px chevrons and a subtle white outline. Removed the visible photo fraction and manual pause icon. A hidden descriptive slide status remains for assistive technology. Autoplay/fade, previous/next, direct selection, keyboard navigation and hover/focus/offscreen/visibility/reduced-motion pause remain.

Removed both the double-check graphic under the photo and the three About checklist icons. The value statement is now centered typography; the supporting points are plain text.

Company figures count upward together over 1.8 seconds with cubic easing when at least 35% of the statistic section is visible, once per page load. Targets remain 13 years, 500+ clients, 1,000+ certifications/services and 3 offices. Reserved number widths keep suffixes in place. Screen readers and server HTML retain the full published totals. Reduced-motion users receive static totals; animation frames and listeners are cleaned up.

Validation: lint and production build pass. Browser observation captured intermediate values 5, 229, 459, 1 and final values 13, 500, 1,000, 3. Widths 320, 390, 768 and 1440px show no overflow, and all statistic values fit their columns. Transparent background and 36px controls confirmed. No eyebrow dashes, About check icons, visible fraction or pause control; fresh browser has no warnings/errors.

Current evidence: about-refined-desktop.jpg, about-refined-mobile.jpg, stats-count-desktop.jpg, stats-count-mobile.jpg, about-refined-checks.json. Earlier screenshots are prior revisions.

## Autoplay, moving plus signs and glass controls — 6 October 2026

The current gallery advances every four seconds, retaining the 800ms crossfade and existing pause conditions. Previous/next remain 36px, now with a translucent dark tint and 8px backdrop blur. The standard backdrop-filter declaration follows the WebKit declaration so the CSS optimizer retains blur in Chromium.

The plus signs use 70% of the statistic number size (33.6px at desktop, 27.44px on phones). Client/certification counters now use their current text width; the plus sits directly after that width throughout counting. Word suffixes retain their reserved widths. Browser measurements captured 411 with an 80.64px number width and 1,000 with a 119.22px width; the plus moved 38.58px with zero extra gap in both states.

The About company-profile link now scrolls to Videos & Media and immediately opens the same video player used by the preview cards. A shared React provider owns the single dialog. The company profile autoplays after this click; no second click is needed. Closing returns focus to its preview in Videos & Media. Ordinary modified-link clicks retain the anchor behavior. Other preview cards use the shared player; dismissal still removes the iframe and restores scrolling.

Validation: lint and production build pass. Desktop and 390px browser checks both show YouTube's Pause video control and two seconds elapsed after clicking the About link. Close and Escape remove the player and restore focus/scrolling. Computed gallery blur is 8px. Previous/next wrap correctly. Widths 320, 390 and 1440px have no page overflow; enlarged plus signs fit the 320px statistic columns. Browser warnings/errors are empty.

Current evidence: about-glass-controls-desktop.jpg, about-glass-controls-mobile.jpg, stats-attached-plus-desktop.jpg, company-profile-from-about.jpg, company-profile-from-about-mobile.jpg, about-followup-checks.json. Earlier notes/screenshots describe preceding revisions.
