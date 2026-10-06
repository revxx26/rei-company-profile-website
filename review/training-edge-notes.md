# Full-width carousel and lower navigation, 6 October 2026

The subsequent training-proportional-notes.md revision aligns the first card with the lower button, reduces desktop cards and makes every arrow step one full card.

The carousel rail now spans the full viewport rather than clipping at a centered container. Its first card aligns with the heading's content gutter. Subsequent cards continue through the right screen edge; after moving forward, preceding cards continue through the left edge. The blue band, glass materials, unchanged original posters and separate month selection remain.

Previous and next sit below the cards at the bottom left and right of the blue band. Centered clickable carousel indicators show the actual scroll positions. A ResizeObserver recalculates reachable positions from card offsets and the rail's maximum scroll when the viewport or month changes. The final indicator maps to the true end, without duplicate unreachable slides. Touch, trackpad, keyboard arrows and button navigation keep the active indicator synchronized. Large indicator groups scroll horizontally within their reserved center area, keeping the active dot visible without scrolling the page. Mobile arrow buttons are 44px. Scrollbars remain hidden; there is no autoplay.

Browser checks confirm a viewport-wide rail, lower controls and centered indicators. Moving forward gives the first desktop card a negative left position and activates indicator two. Selecting the last desktop indicator reaches the maximum scroll and disables Next. Switching to September resets to indicator one and fourteen archived cards. The last September indicator works on mobile, remains visible and disables Next. Resizing October produces six indicators at 320px, five at 768px and four at 1440px. No page overflow occurs. Card detail/registration dialogs still open, and no console warnings/errors were recorded. Lint and production build pass.

Evidence: training-edge-desktop.jpg, training-edge-scrolled.jpg, training-edge-mobile.jpg and training-edge-checks.json. This supersedes the middle-height side-arrow positioning documented in training-glass-notes.md.
