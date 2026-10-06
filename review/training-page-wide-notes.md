# Page-wide responsive carousel

All responsive rails now span the full page, retaining the desktop behavior of cards moving across the page edges. Card widths divide the available rail space into whole columns, rather than using a narrow centered rail. Phones below 600px show one card; widths 600–899px show two; 900–1279px show three; desktop at 1280px and above shows four. Rail gutters are 12px on phones and 18px on larger layouts. Existing centered controls remain unchanged.

At 390px the rail spans 375px and the card is 351px, with 375px steps. At 820px the rail spans 805px and two 372.5px cards fit, with approximately 397px steps. Initial, intermediate and final positions have no partial cards. At 1023px the final stop shows three whole cards. Thirteen tested viewport widths report no partial cards or page overflow; see training-page-wide-checks.json. Lint passes.

Evidence: training-page-wide-mobile.jpg and training-page-wide-tablet.jpg. This supersedes the centered rail design in training-whole-card-notes.md.
