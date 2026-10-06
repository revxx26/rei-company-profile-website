# Our Services revision — 6 October 2026

## Scope and design

Updated the homepage Services section only. An expertise index replaces the three icon cards and four secondary links. Eight selectable areas present 35 selected offerings in compact lists: quality/food safety, sustainability, environment/energy, health/safety, laboratory/calibration, audit/inspection, people/performance, and industry systems.

The design uses the existing Manrope typography, white space, subtle dividing rules and original REI blue #0d337d. Desktop has a left category index and a two-column service list. Phones have a horizontally scrollable category index and one-column results. No decorative dash, numbered tile, stock photo, gradient or additional animated content is added. Header, hero, About, statistics and video behavior are retained.

## Interaction

Search matches selected service names, scopes, category names and relevant keywords across all eight areas. Normalization supports ISO17025, ISO 17025 and FSSC22000. While searching, no category is marked selected; clicking a category clears the query and shows that area. Results announce their count. Empty results offer a clear-search action. Native buttons, links and the search input retain keyboard navigation and visible focus styles.

Consultation carries the active area or search query into the existing contact dialog and prepared WhatsApp/email message. No message is sent. Service links explicitly open the corresponding original REI detail pages; Full service list opens the source catalog. A separate local catalog route and redesigned detail pages remain future work.

## Content

Source: https://reisistem.id/services/ (checked 6 October 2026). All 35 destination URLs were matched against links actually published in that page. Titles are shortened English labels, with short scope explanations and no invented prices, availability, certifications or promises. BRC is labeled with its current BRCGS name. The overview is selected content rather than the complete REI catalog.

Additional checked source pages: https://reisistem.id/fssc-22000-all-scope/, https://reisistem.id/iso-17025/, https://reisistem.id/rspo-all-scope/, https://reisistem.id/pre-audit-pre-assessment-audit/.

## Validation

Lint and production build pass. All eight category counts match the rendered lists (8, 5, 3, 2, 4, 5, 4, 4). Search for iso 22000 yields ISO 22000; ISO17025 yields ISO/IEC 17025; FSSC22000 from the Laboratory area yields FSSC 22000 globally. No-match and clear-search behavior checked. Consultation preserves Sustainability and Service enquiry: FSSC22000 in the topic and encoded contact URL. No messages were sent.

Widths 320, 390, 768 and 1440px have no horizontal page overflow. Mobile category selection works, lists stack on phones, and the consultation button uses rgb(13, 51, 125). Browser console checked for warnings/errors. Screenshots: services-desktop.jpg, services-mobile.jpg. Structured evidence: services-checks.json.

## Rounded selection and local service details

The current revision rounds the active category to 12px and replaces the search fill with 12% translucent white, a subtle border and 14px backdrop blur. Removed all small heading labels from the homepage, including the hero company label, and from the contact/schedule dialogs. Section headings remain. Meaningful dates and other content metadata remain.

All 35 service buttons now open a native local detail dialog instead of navigating to the original website. Each has a specific English overview, intended audience and three topics. Source descriptions were read from all 35 original REI service pages; an excerpt snapshot is retained in service-detail-sources.json. These are plain-language summaries, not copied descriptions or guaranteed delivery scopes. Historical standard versions, promotional outcome promises and unverified accreditation claims are omitted.

The popup has a sticky close control, a blurred backdrop, native keyboard focus containment and Escape/backdrop dismissal. Body scroll locking uses an effect and restores the prior overflow on close or unmount. Closing returns focus to the selected service. Removed Full service list, the source-link footer and the additional Discuss your needs button. Not sure where to start is centered; the existing site Consultation controls remain.

Validation: all 35 dialogs open with a nonempty overview, intended audience and three topics, then close with scrolling restored. Search for ISO17025 opens the corresponding detail without navigation, and Escape restores focus. Computed checks confirm zero heading labels, zero links in Services, zero extra service consultation buttons, 12px selected radius, 14px search blur and centered assistance text. The longest service title fits phone dialogs at 390 and 320px; the 320px dialog stays within 740px height and its close control is visible. Browser warnings/errors are empty. Lint and production build pass.

Latest evidence: services-popup-desktop.jpg, services-popup-mobile.jpg, service-detail-desktop.jpg, service-detail-mobile.jpg, services-popup-checks.json. Earlier sections and screenshots describe previous revisions.

## Category transition fix

Moved the 12px radius from the selected-state rule into the base category button rule. Previously, deselection removed the radius instantly while the blue background continued its 180ms fade, briefly exposing a square blue shape. Active, inactive and hover states now share the same radius, while color transitions remain. Six desktop category changes and three mobile changes retained 12px on every button. Browser warnings/errors are empty; production build passes. Screenshot: services-rounded-transition-fixed.jpg.
