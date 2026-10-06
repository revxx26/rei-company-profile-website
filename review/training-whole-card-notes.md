# Whole cards across responsive layouts

Tablet rails now show two complete 300px cards in a centered 624px viewport. Phone rails show one complete card in a centered viewport capped at 280px. Removing padding from these rail viewports prevents neighboring cards from peeking through the side margins. The blue section still spans the page. Desktop whole-column layouts remain unchanged.

Whole visible columns restore consistent one-card steps through the final stop: phones move 304px with offsets 0, 304 and 1520 checked; tablets move 324px with offsets 0, 324 and 1296 checked. Initial, intermediate and final states have no partially visible cards.

Responsive checks at 320, 760, 768, 1023, 1024, 1280 and 1440px report zero partial cards and no page overflow. Evidence: training-whole-responsive-checks.json, training-whole-mobile.jpg and training-whole-tablet.jpg. This supersedes the rail widths and end alignment in the earlier responsive review notes.
