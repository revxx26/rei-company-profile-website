# Proportional cards and consistent navigation, 6 October 2026

The first card now aligns with the Previous button: both start 18px from the desktop edge and 12px on phones. Cards divide the available rail width into whole visible columns: four on desktop, three on smaller desktop widths, two on tablets and one on phones. At a 1440px viewport the card width decreases from 360px to 329.25px, approximately 9%. Four cards fit fully rather than showing a cropped trailing card.

Whole-column sizing removes the shortened final navigation step. Each arrow advances or reverses one card plus its 24px gap, including at the end. Positions use measured card geometry; the final offset may round by a device pixel. A requested-slide reference tracks rapid clicks during the scroll animation so two Next clicks advance two cards. Direct wheel or pointer input clears that request. Month changes and resizing rebuild measured positions and maintain active indicators. The existing glass styling, lower edge controls, blue band and separate month selection are retained.

Desktop browser measurements show scroll offsets 0, 353, 707 and 353 after Next, Next, Previous, corresponding to one-card steps of 353–354px with pixel rounding. Two rapid Next clicks reach indicator three and the end. September resets to indicator one. Responsive checks at 320, 390, 768, 1280 and 1440px show matching first-card/button alignment, whole column layouts and no page overflow. Existing local card details still open. Lint and production build pass.

Evidence: training-proportional-desktop.jpg and training-proportional-checks.json. This supersedes the partial-card sizing described in training-edge-notes.md.
