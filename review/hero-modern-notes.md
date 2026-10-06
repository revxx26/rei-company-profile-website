# Hero revision 2 — 5 October 2026

User feedback: remove slideshow navigation and replace the heavy corporate-banner appearance with a more contemporary layout.

The hero now uses an open white layout, large service typography, supporting copy alongside the title and bright panoramic REI photographs below. All previous/next, pause, counter and overlay elements were removed. The decorative photographs crossfade automatically every eight seconds. Other homepage sections remain for the next review.

Verification:
- Production build, TypeScript and ESLint passed.
- Checked 320, 390, 768, 1024 and 1440px: no horizontal page overflow or headline overflow.
- All three original photographs loaded; automatic progression from the group photograph to later photographs was observed.
- The only button in the hero is the consultation CTA. No slideshow controls remain.
- Consultation opens correctly; Escape closes it, restores scrolling and returns focus.
- Motion is suppressed by the existing reduced-motion preference, hover, keyboard focus, off-screen viewing and hidden-tab behavior.

Current review screenshots: hero-modern-desktop.jpg and hero-modern-mobile.jpg. Earlier hero-revision screenshots document the superseded layout.
