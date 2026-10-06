# News & Publications revision

Initial card limits: desktop at 1024px and above shows 6; tablet at 761–1023px shows 4; mobile at 760px and below shows 2. View more appends another batch of the same size, capped by the matching items. Changing categories restores the initial limit. There are eight real publications: one gathering item, three ISPO references and four magazine issues.

The cards use the earlier compact layout, with a 228px cover area on desktop/tablet and 220px on mobile, a translucent glass surface and a white section background. A faint, blurred copy of each cover sits behind the card content to make the frosted material visible on white; foreground images and text stay sharp. Filters retain a blue tint and a permanent rounded shape. View more opens additional rows with a 520ms height animation. View less folds them closed, keeps visible controls anchored throughout the animation and restores keyboard focus to View more. Reduced motion collapses immediately. Card hover uses a stronger blue tint, border and shadow; primary actions and navigation keep the REI blue. News opens `/news/client-gathering`; regulations open a local dialog with a nested image viewer; magazines open the original PDF directly in a local PDF.js reader. Original posters and PDF contents remain in their original language; interface labels are English. Links to the original REI website are removed from publication details, the News article and the homepage footer; official government regulation references remain available.

The HTML root declares `data-scroll-behavior="smooth"`, as required by the installed Next.js 16 guide, so route transitions temporarily disable smooth scrolling. News navigation opens instantly at the top; in-page anchor scrolling remains smooth.

## Original assets

- Downstream ISPO: https://reisistem.id/wp-content/uploads/2026/08/ISPO-3.jpeg (the original homepage image labels differ from the poster content; the image itself was visually verified)
- Plantation ISPO: https://reisistem.id/wp-content/uploads/2026/08/ISPO-2.jpeg
- Bioenergy ISPO: https://reisistem.id/wp-content/uploads/2026/08/ISPO-4.jpeg
- Volume 32: https://reisistem.id/wp-content/uploads/2026/10/System-Magazine-Vol.32.pdf (56 pages)
- Volume 31: https://reisistem.id/wp-content/uploads/2026/10/System-Magazine-vol-31.pdf (51 pages)
- Volume 30: https://reisistem.id/wp-content/uploads/2026/08/System-Magazine-Vol.30.pdf (40 pages)
- Volume 29: https://reisistem.id/wp-content/uploads/2026/07/REI-Vol-29.pdf (56 pages)

Issue dates are the original REI listing dates. Regulation dates identify promulgation, with the date context explained in the detail dialog. Gathering year is shown as an event year; no publication day, attendee counts or speaker quotations have been invented. The news article is a short English adaptation based on the event photographs published by REI.

PDF files were inspected with Poppler; the first page of each was rendered into a card cover. The original documents are retained under `public/publications` and loaded only after a reader is opened. PDF.js is imported on demand and its worker/license is synchronized by the postinstall script. Image expansion and PDF reading keep the current route. Links labelled as sources may open the original references.

## Validation

- Production build and lint passed. The vendor worker is excluded from application linting.
- At 1280 / 820 / 390 / 320px, initial card counts were 6 / 4 / 2 / 2, with no horizontal document overflow.
- View more displayed 8 total items on desktop, 8 after the tablet batch, and 4 after the first mobile batch. Filtering reset the initial limit.
- All four original PDFs loaded with their expected page counts. Volume 32 next-page, last-page selection and zoom were checked; PDF rendering also worked at 320px.
- Regulation poster expansion, zoom, Escape, focus restoration and parent body scroll lock were checked. Closing the child viewer kept the parent detail open.
- The News card navigated to its local article, with readable mobile layout and working return link. Header home/navigation URLs point to the homepage on article routes.
- Browser error logs were empty. Screenshots: publications-glass-desktop.png, publications-pdf-desktop.png, publications-pdf-mobile.png, news-article-desktop.png.


Latest interaction review: opening and folding verified at 1280, 820 and 390px. During desktop and mobile closing, the controls remained within 0.5px of their starting viewport position. Keyboard focus returned to View more on mobile and tablet. Production build and lint passed; browser error logs empty.
