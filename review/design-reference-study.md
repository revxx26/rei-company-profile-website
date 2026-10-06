# REI homepage: company website reference study

Researched 5–6 October 2026. Scope of implementation: hero and its immediate navigation strip. The service catalog and the rest of the homepage remain separate review stages.

## Companies reviewed

The official homepages were inspected for content and in a browser for visual composition. These organizations operate in standards, assurance, training, testing, inspection, certification or related fields; their exact business models differ from REI's.

| Reference | Observed approach | Decision for REI |
| --- | --- | --- |
| [BSI](https://www.bsigroup.com/en-GB/) | White editorial hero, sentence-based campaign headlines, moderate typography, a clear action and large supporting photography. Its hero heading uses Noto Serif at 36px/300 weight in the inspected desktop viewport. Expertise, industries and services are separate navigation concepts. | Use a readable sentence for the headline and keep the photo separate from the text. Retain REI's existing sans-serif typography and colors rather than reproducing BSI's font or brand. |
| [SGS](https://www.sgs.com/en) | Brand promise followed by a specific description of its testing, inspection and certification role. A prominent image/content feature and direct service categories establish context. | Use REI's actual brand tagline, add a concrete service description, and make the paths to services and training explicit. |
| [Intertek](https://www.intertek.com/) | Brand promise, an explanation of the customer benefit, industry-related moving imagery, an enquiry path and industry navigation. | Restore industry imagery from the original REI hero and preserve automatic transitions without navigation buttons. |
| [Bureau Veritas](https://group.bureauveritas.com/) | Image-led corporate news hero, investor information, and industry entries framed around business concerns. | Apply clear subject context to each image. The large news and investor presentation is less relevant to REI's service-first demo, so it is not carried into the hero. |

These are design observations and interpretation, not claims that the companies endorse this redesign. No competitor photographs, logos, source code or proprietary copy were reused.

## Changes applied

- Removed the three oversized standalone words from the heading.
- Restored REI's own tagline, with sentence capitalization: “Providing global recognition and improvement systems.”
- Added plain Indonesian copy explaining training, consultancy and audit.
- Used a light background, a balanced text/image layout, restrained heading weight and REI's blue/yellow color family.
- Used the original REI homepage's illustrative industry images instead of labelling gathering photographs as service imagery.
- Added links to the existing homepage's service, public training and company sections.
- Kept eight-second automatic photo transitions. No next/previous, pause or counter controls are present.

## REI image and content sources

These are illustrative industry visuals already used by [REI's original homepage](https://reisistem.id/), not documentary evidence of REI personnel, customers or completed projects.

| Local asset | Original REI asset | Source's industry/standard context |
| --- | --- | --- |
| industry-management.webp | [IMS-scaled.webp](https://reisistem.id/wp-content/uploads/2026/08/IMS-scaled.webp) | Management systems; ISO 9001, ISO 14001, ISO 45001 among other standards |
| industry-automotive.webp | [Automotive-scaled.webp](https://reisistem.id/wp-content/uploads/2026/08/Automotive-scaled.webp) | Automotive; IATF 16949 |
| industry-seafood.webp | [Seafood-scaled.webp](https://reisistem.id/wp-content/uploads/2026/08/Seafood-scaled.webp) | Aquaculture, seafood, marine and agriculture; BAP, MSC, ASC, BRCGS among other schemes |

Asset rights remain with their respective owners. The listed standards describe REI's published service context; they do not imply blanket accreditation or endorsement. The 500+ company figure is REI's published claim.

Reference screenshots are stored in `review/references/`: bsi.jpg, sgs.jpg, intertek.jpg and bureau-veritas.jpg. Earlier hero screenshots show superseded designs.

## Verification

Production build, TypeScript and ESLint passed. At 320, 390, 768, 1024 and 1440px the document has no horizontal overflow and the headline stays within its column. All three new images loaded; automatic progression to the automotive image was observed. Every quick navigation link resolves to an existing homepage section. The hero contains only the consultation button, with no slideshow controls.
