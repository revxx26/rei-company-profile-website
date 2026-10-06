# REI Sistem redesign

Next.js 16, React 19, TypeScript and Tailwind CSS. Company profile concept with local service and training detail dialogs, News articles, regulatory publications, a PDF magazine reader and contact drafts.

## Development

Node 24.15.0 is pinned in `.node-version` and `package.json`.

```sh
npm ci --include=dev
npm run dev -- --hostname 127.0.0.1 --port 3100
```

## Production checks

```sh
npm run check:assets
npm run lint
npm run build
npm start
```

The start command binds to `0.0.0.0` and uses the `PORT` environment variable (3000 by default). `postinstall` copies the matching PDF.js worker and license into public assets. Local asset checks validate filename casing for Linux and generated training poster paths.

## Manual Render deployment

Follow [DEPLOY-RENDER.md](./DEPLOY-RENDER.md). An optional `render.yaml` Blueprint is included. Deploy as a Node Web Service, with auto deploy off. No production account changes, deployment or publishing have been performed.

## Current behavior

- English and Indonesian interface; no dark mode.
- Transparent fixed header with blur after scrolling. Language selector in the header; consultation is available via the floating button and Contact.
- Muted looping consultancy meeting video in the hero, with still-image fallback and reduced-motion support.
- Supported/certified logo rails, an autoplay About photo gallery with manual arrows, and company statistics counting once.
- Eight service categories, search across areas, local detail dialogs and share links.
- Monthly training cards: six October 2026 agendas, fourteen archived September events. Detail dialogs have poster, source note, Copy link and registration enquiry.
- News articles, regulation dialogs with full-size images, and local magazine PDF preview. Responsive publication limits of six/four/two, with View more/View less.
- Contact form prepares a WhatsApp or email draft with entered data; it does not send messages through a backend or store leads.
- Subtle scroll reveal once per content group, respecting reduced motion. Buttons and cards have pressed feedback in addition to desktop hover.

## Content and limitations

This is a redesign concept with `noindex` and a concept footer. REI-published claims, photographs, logos, contacts and publications were sourced from [REI Sistem](https://reisistem.id/), [Services](https://reisistem.id/services/) and [Contact](https://reisistem.id/contact-us/). Rights remain with their owners. Training content is a snapshot, not a live availability feed; no CMS or database is connected.

The hero uses illustrative stock footage from [Mixkit: Presentation in a business meeting room](https://mixkit.co/free-stock-video/presentation-in-a-business-meeting-room-42643/) under the [Mixkit Free License](https://mixkit.co/license/). It is not a recording of REI staff. Provenance and previous review evidence are in `review/`.
