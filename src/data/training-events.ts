export type TrainingEvent = {
  id: string; month: string; title: string; subtitle: string; date: string; format: string;
  description: string; focus: string[]; images: string[]; programs?: string; archived?: boolean;
};

export const trainingMonths = [
  { value: "2026-10", label: "October 2026" },
  { value: "2026-09", label: "September 2026" },
];

// Complete agenda publications, not a selection of individual courses.
// Checked against REI's homepage on 6 October 2026. Photos of one event share a card.
// Broken September source images 21/22 and the identical photo 16 are excluded.
const octoberAgenda = [
  { title: "Food safety & laboratory", programs: "1–23", focus: ["Laboratory management and calibration", "FSSC 22000 and preventive controls", "GMP, HACCP and food safety"] },
  { title: "Food industry standards", programs: "24–43", focus: ["BRCGS and GMP+", "Food processing and product safety", "Internal audits and food defense"] },
  { title: "Sustainability & management systems", programs: "44–70", focus: ["ISCC, RSPO and sustainability", "Quality, information security and energy systems", "Food and aquaculture standards"] },
  { title: "Operations & audit training", programs: "71–96", focus: ["Leadership and internal audit", "Environmental and social performance", "Management systems lead auditor training"] },
  { title: "Auditors & business improvement", programs: "97–120", focus: ["Lead auditor programs", "Lean Six Sigma and process improvement", "Supply chain and operational systems"] },
  { title: "Environment & food safety systems", programs: "121–139", focus: ["Environmental reporting and validation", "Laboratory and food safety prerequisite programs", "Specialized industry requirements"] },
];

const septemberEvents = [
  { number: 1, photos: [1, 2], title: "FSSC 22000 & internal audit", host: "PT Aloe Vera Indonesia", date: "21–22 September 2026", format: "In-house training", description: "An in-house FSSC 22000 and internal audit session at PT Aloe Vera Indonesia.", focus: ["Food safety management", "Internal audit"] },
  { number: 3, photos: [3], title: "FSSC 22000 & internal audit", host: "PT Medan Sugar Industry", date: "24–25 September 2026", format: "In-house training", description: "FSSC 22000 and internal audit training delivered for the team at PT Medan Sugar Industry.", focus: ["Food safety management", "Internal audit"] },
  { number: 4, photos: [4], title: "HACCP audit support", host: "PT Greenpoh Cipta Rasa", date: "22 September 2026", format: "Audit support", description: "REI's published activity highlights HACCP audit support at PT Greenpoh Cipta Rasa.", focus: ["HACCP", "Audit preparation"] },
  { number: 5, photos: [5], title: "CPPOB BPOM consultation", host: "PT House Foods Indonesia", date: "28 September 2026", format: "Consultation", description: "Consultation support on CPPOB BPOM requirements for PT House Foods Indonesia.", focus: ["Good manufacturing practices", "CPPOB BPOM requirements"] },
  { number: 6, photos: [6, 10], title: "FSSC 22000 & internal audit", host: "PT Indolakto · Jakarta", date: "10–11 September 2026", format: "In-house training", description: "An in-house FSSC 22000 and internal audit session for PT Indolakto in Jakarta.", focus: ["Food safety management", "Internal audit"] },
  { number: 7, photos: [7, 8, 9], title: "FSSC 22000 & internal audit", host: "PT Indolakto", date: "15–16 September 2026", format: "In-house training", description: "An FSSC 22000 and internal audit training activity documented by REI for PT Indolakto.", focus: ["Food safety management", "Internal audit"] },
  { number: 11, photos: [11, 12, 13], title: "HACCP for cosmetics", host: "PT Paragon Technology and Innovation", date: "30 September–1 October 2026", format: "In-house training", description: "HACCP training for cosmetics, including TACCP and VACCP, delivered for PT Paragon Technology and Innovation.", focus: ["HACCP for cosmetics", "TACCP and VACCP"] },
  { number: 14, photos: [14, 15], title: "HACCP & internal audit", host: "PT Brilliant Agro Indonesia", date: "23 September 2026", format: "In-house training", description: "An in-house HACCP and internal audit training activity for PT Brilliant Agro Indonesia.", focus: ["HACCP", "Internal audit"] },
  { number: 17, photos: [17], title: "FSSC 22000 lead auditor course", host: "REI Sistem Indonesia Group", date: "21–25 September 2026", format: "Virtual training", description: "REI's virtual lead auditor course on FSSC 22000, documented in the September activity archive.", focus: ["Food safety management", "Lead auditor training"] },
  { number: 18, photos: [18], title: "Calibration & practice", host: "REI Sistem Indonesia Group", date: "15–18 September 2026", format: "Virtual training", description: "Virtual calibration training and practice covering mass, temperature, pressure, volume and dimensional measurements.", focus: ["Measurement and calibration", "Practical calibration"] },
  { number: 19, photos: [19, 20], title: "FSSC 22000 & internal audit", host: "PT Veolia Services Indonesia", date: "10–11 September 2026", format: "Virtual training", description: "A virtual FSSC 22000 and internal audit training session for PT Veolia Services Indonesia.", focus: ["Food safety management", "Internal audit"] },
  { number: 23, photos: [23], title: "FSSC 22000 & internal audit", host: "PT Artho Bogo Utama", date: "2–3 September 2026", format: "In-house training", description: "An in-house FSSC 22000 and internal audit training activity for PT Artho Bogo Utama.", focus: ["Food safety management", "Internal audit"] },
  { number: 24, photos: [24], title: "ISO 22000 & internal audit", host: "PT Dewa Kopi Indonesia", date: "4–5 September 2026", format: "In-house training", description: "An in-house ISO 22000 and internal audit session at PT Dewa Kopi Indonesia.", focus: ["ISO 22000", "Internal audit"] },
  { number: 25, photos: [25], title: "FSSC 22000 & internal audit", host: "PT Permata Hijau Palm Oleo", date: "3–4 September 2026", format: "In-house training", description: "FSSC 22000 training and internal audit based on ISO 19011, delivered for PT Permata Hijau Palm Oleo.", focus: ["Food safety management", "Internal audit principles"] },
];

export const trainingEvents: TrainingEvent[] = [
  ...octoberAgenda.map((item, index) => ({
    ...item, id: `october-agenda-${index + 1}`, month: "2026-10", subtitle: `Programs ${item.programs}`,
    date: "October 2026", format: "Classroom & online",
    description: `REI's October public training agenda covering ${item.title.toLowerCase()}. The complete published poster includes program names, durations and individual dates.`,
    images: [index === 0 ? "/images/training-october.jpeg" : `/images/training-october-${index + 1}.jpeg`],
  })),
  ...septemberEvents.map((item) => ({
    id: `september-event-${item.number}`, month: "2026-09", title: item.title, subtitle: item.host,
    date: item.date, format: item.format, description: item.description, focus: item.focus, archived: true,
    images: item.photos.map((number) => `/images/Training-September-${number}.${number >= 23 ? "jpeg" : "jpg"}`),
  })),
];
