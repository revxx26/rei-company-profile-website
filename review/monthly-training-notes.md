# Monthly Hot Trainings & Events, 6 October 2026

This revision replaces the selected 13-course list, topic filters and separate View published schedule action. A single month selector and horizontal card rail now lead to local detail dialogs. Each October card represents one complete original agenda poster, with its full program range; no individual courses are selected or duplicated elsewhere. All six posters cover programs 1–139. Group headings and English summaries describe the contents of each publication.

The source homepage currently publishes October agendas plus September activity posters. The month selector therefore contains October 2026 and September 2026 only. September cards represent fourteen distinct past events. Multiple posters from one activity are grouped into one card, with previous/next photos in the detail dialog. The identical September image 16 is omitted; published links 21/22 return 404 and are excluded. Original Indonesian publications remain unchanged.

Cards scroll horizontally using touch/trackpad, arrow controls and arrow keys when the rail has focus. The visible scrollbar is removed in the subsequent glass revision. There is no autoplay. Scroll snapping reveals the next card at the right edge. Month changes reset the rail to the beginning. Arrow states allow the 3px focus-padding offset so Previous correctly stays disabled at the beginning. Reduced-motion users receive immediate arrow scrolling. See training-glass-notes.md for the blue band, glass card styling and edge-positioned navigation.

Desktop detail dialogs have a complete poster alongside a summary, period or event date, format and relevant subjects. October details include an optional program name/number and attendance preference. Enquire about registration carries that information and the chosen agenda into the existing consultation dialog. September is visibly marked Past event, with Ask about similar training preparing a future-session enquiry. No message or registration is submitted. Phones show readable details and enquiry first, followed by the complete poster. The close control stays visible while scrolling. Full-size publications open from local assets.

## Sources

- https://reisistem.id/ (checked 6 October 2026), Hot Trainings & Events and September activity carousel.
- October source posters: https://reisistem.id/wp-content/uploads/2026/10/Oktober_1.jpeg through Oktober_6.jpeg. Six existing local images are reused.
- September source links are preserved in september-source-urls.json. Downloaded images were inspected in september-poster-contact-sheet.jpg; October poster contents were inspected in october-poster-contact-sheet.jpg. The upload directory is October but the event dates on the September publications establish their archive month. No additional months or future dates are fabricated.

## Verification

Browser review opened all twenty cards. October details show all six correct program ranges and local posters. Month selection changes to fourteen September events and resets scrolling. Past-event photo navigation and the future-session enquiry work. An October enquiry includes the optional program and Classroom preference; Escape restores the document's original overflow and closes the single active dialog. Next scrolls the phone rail from the beginning to its next card. Close stays visible while mobile dialogs scroll.

Responsive checks cover 320, 390, 768 and 1440px. A 320px toolbar overflow was fixed by making the month selector responsive; the final check confirms no page overflow. Lint and production build pass. Screenshot and browser evidence: monthly-training-desktop.jpg, monthly-training-mobile.jpg, monthly-training-detail.jpg and monthly-training-checks.json.
