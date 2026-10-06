# Training glass revision, 6 October 2026

The subsequent training-edge-notes.md revision expands the rail to the viewport and moves arrow controls below the cards with centered indicators.

The visible horizontal scrollbar is removed. Month selection remains above the cards on the original light background. Only the card rail receives a full-width background in REI's original blue, #0d337d. Previous and next now sit at the left and right edges of this band, vertically centered, with round translucent glass surfaces, reflective borders and 22px backdrop blur. Cards use translucent glass, a fine reflective border and 20px backdrop blur. The original poster colors are preserved. No autoplay is added.

Side gutters reserve space for the arrows at desktop and phone widths. Keyboard, arrow buttons, touch and trackpad still support navigation despite the hidden scrollbar. Month switching and all existing local event dialogs remain available. Header text switches to white while the blue band passes behind it and returns to dark on light sections; its scrolled background remains transparent and blurred.

Browser verification confirms the month selector is outside the blue band, scrollbar-width is none, both glass blurs are active, navigation advances cards, the registration dialog opens, and there is no page overflow at 320, 390, 768 or 1440px. No console warnings/errors were recorded. Lint and production build pass. Evidence: training-glass-desktop.jpg, training-glass-mobile.jpg and training-glass-checks.json.
