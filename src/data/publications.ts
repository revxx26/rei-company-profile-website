export const publicationCategories = ["All", "News", "Regulatory Updates", "Magazine"] as const;
export type PublicationCategory = (typeof publicationCategories)[number];

export type Publication = {
  id: string;
  category: Exclude<PublicationCategory, "All">;
  title: string;
  summary: string;
  topic: string;
  date: string;
  dateLabel: string;
  dateContext: string;
  image: string;
  pdf?: string;
  article?: { heading?: string; text: string }[];
  volume?: string;
  reference?: string;
  sections: { title: string; text: string }[];
  sources: { label: string; href: string }[];
};

// Dates identify the original publication or regulation, not a new REI article.
// Sources checked on 6 October 2026; magazine contents are not reproduced.
export const publications: Publication[] = [
  {
    id: "ispo-bioenergy", category: "Regulatory Updates",
    title: "ISPO for palm oil bioenergy", topic: "Bioenergy",
    summary: "The ISPO certification regulation for businesses in the palm oil bioenergy sector.",
    date: "2026-01-21", dateLabel: "21 January 2026", dateContext: "Regulation promulgated",
    reference: "Permen ESDM 3/2026", image: "/publications/ispo-bioenergy.jpeg",
    sections: [
      { title: "Overview", text: "Minister of Energy and Mineral Resources Regulation No. 3 of 2026 addresses Indonesian Sustainable Palm Oil certification for palm oil bioenergy businesses." },
      { title: "Industry relevance", text: "This is the bioenergy reference in REI’s ISPO materials. Businesses working with palm oil bioenergy can use the official regulation to review the certification provisions for their sector." },
    ],
    sources: [{ label: "Official regulation · Ministry of Energy and Mineral Resources", href: "https://jdih.esdm.go.id/dokumen/view?id=2664" }, { label: "REI’s ISPO publications", href: "https://reisistem.id/" }],
  },
  {
    id: "magazine-32", category: "Magazine", title: "REI Sistem Magazine Vol. 32", topic: "System Magazine",
    summary: "The latest System Magazine edition listed by REI Sistem Indonesia.",
    date: "2026-10-05", dateLabel: "5 October 2026", dateContext: "Published by REI", volume: "32",
    image: "/publications/system-magazine-32.png", pdf: "/publications/system-magazine-32.pdf",
    sections: [{ title: "About this edition", text: "Volume 32 is listed in REI’s news archive with a publication date of 5 October 2026. Open the original issue below to read the magazine in full." }],
    sources: [{ label: "Read the original issue", href: "https://reisistem.id/rei-sistem-magazine-vol-32/" }, { label: "REI publication archive", href: "https://reisistem.id/news/" }],
  },
  {
    id: "client-gathering", category: "News", title: "REI Key Client Gathering 2026", topic: "Company events",
    summary: "A look at REI’s gathering with its client network, through photographs from the event.",
    date: "2026", dateLabel: "2026", dateContext: "Event year",
    image: "/images/gathering-1.jpg",
    article: [
      { text: "REI Sistem Indonesia Group’s 2026 Key Client Gathering brought its client community together. Photographs shared on the company website show award presentations, panel discussions and moments with participants." },
      { heading: "A gathering of the REI client community", text: "The event photographs offer a look at the people behind REI’s work across training, consultancy, audit and certification support. The gathering is also featured in REI’s video highlights." },
      { heading: "From the event gallery", text: "The gallery below brings together a selection of the photographs published by REI. Award presentations and panel discussions form part of the visual record of the 2026 gathering." },
    ],
    sections: [{ title: "From the event", text: "REI shares photographs from its 2026 Key Client Gathering on the company website. The event is also featured in the activity gallery in our About section." }],
    sources: [{ label: "REI activity gallery", href: "https://reisistem.id/gallery/" }, { label: "REI event highlights", href: "https://reisistem.id/" }],
  },
  {
    id: "ispo-plantations", category: "Regulatory Updates", title: "ISPO for palm oil plantations", topic: "Plantations",
    summary: "Certification procedures and requirements for Indonesia’s palm oil plantation sector.",
    date: "2025-11-26", dateLabel: "26 November 2025", dateContext: "Regulation promulgated", reference: "Permentan 33/2025", image: "/publications/ispo-plantations.jpeg",
    sections: [
      { title: "Overview", text: "Minister of Agriculture Regulation No. 33 of 2025 addresses Indonesian Sustainable Palm Oil certification for palm oil plantation businesses. Its scope includes certification criteria, procedures, supervision and administrative sanctions." },
      { title: "Industry relevance", text: "For plantation businesses, this regulation provides a reference for reviewing ISPO certification procedures and the evidence required by the scheme. It also includes provisions relating to smallholder financing and incentives." },
    ],
    sources: [{ label: "Official regulation · Ministry of Agriculture", href: "https://jdih.pertanian.go.id/peraturan/permentan-33-2025" }, { label: "REI’s ISPO publications", href: "https://reisistem.id/" }],
  },
  {
    id: "ispo-downstream", category: "Regulatory Updates", title: "ISPO for downstream palm oil industries", topic: "Downstream industries",
    summary: "The ISPO certification framework for downstream palm oil industries.",
    date: "2025-11-03", dateLabel: "3 November 2025", dateContext: "Regulation promulgated", reference: "Permenperin 38/2025", image: "/publications/ispo-downstream-industry.jpeg",
    sections: [
      { title: "Overview", text: "Minister of Industry Regulation No. 38 of 2025 addresses Indonesian Sustainable Palm Oil certification for downstream palm oil industries. It covers certification, supervision, administrative sanctions and transitional provisions." },
      { title: "Industry relevance", text: "Downstream businesses can refer to this regulation when reviewing the ISPO framework for their operations. The official record lists 3 May 2026 as its effective date." },
    ],
    sources: [{ label: "Official regulation record · JDIH BPK", href: "https://peraturan.bpk.go.id/Details/343105/permenperin-no-38-tahun-2025" }, { label: "REI’s ISPO publications", href: "https://reisistem.id/" }],
  },
  {
    id: "magazine-31", category: "Magazine", title: "REI Magazine Vol. 31", topic: "System Magazine",
    summary: "An earlier System Magazine edition from the REI publication archive.",
    date: "2026-10-05", dateLabel: "5 October 2026", dateContext: "Published by REI", volume: "31",
    image: "/publications/system-magazine-31.png", pdf: "/publications/system-magazine-31.pdf",
    sections: [{ title: "About this edition", text: "Volume 31 is listed in REI’s news archive with a publication date of 5 October 2026. The original issue is available through the link below." }],
    sources: [{ label: "Read the original issue", href: "https://reisistem.id/rei-magazine-vol-31/" }, { label: "REI publication archive", href: "https://reisistem.id/news/" }],
  },
  ...([
    { volume: "30", date: "2026-08-21", dateLabel: "21 August 2026" },
    { volume: "29", date: "2026-07-12", dateLabel: "12 July 2026" },
  ].map((issue): Publication => ({
    id: `magazine-${issue.volume}`, category: "Magazine", title: `REI Sistem Magazine Vol. ${issue.volume}`,
    topic: "System Magazine", summary: "Explore an earlier edition from REI’s System Magazine archive.",
    ...issue, dateContext: "Published by REI",
    image: `/publications/system-magazine-${issue.volume}.png`, pdf: `/publications/system-magazine-${issue.volume}.pdf`,
    sections: [], sources: [{ label: "Original REI issue", href: `https://reisistem.id/rei-sistem-magazine-vol-${issue.volume}/` }],
  }))),
];
