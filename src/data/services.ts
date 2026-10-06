// Selected offerings from https://reisistem.id/services/; source slugs are stable IDs.
// This homepage overview is not the full REI service catalog.
export const serviceAreas = [
  {
    id: "food", title: "Quality & food safety",
    description: "Training and consultancy for the standards used throughout the food supply chain.",
    services: [
      { title: "FSSC 22000", scope: "Food safety systems", path: "fssc-22000-all-scope", keywords: "food manufacturing packaging catering feed" },
      { title: "ISO 22000", scope: "Food safety management", path: "iso-22000-all-scope", keywords: "food manufacturing" },
      { title: "ISO 9001", scope: "Quality management", path: "iso-9001-all-scope-iso-31000-internal-auditor-19011", keywords: "iso 31000 internal auditor 19011 manufacturing" },
      { title: "BRCGS", scope: "Food, packaging and distribution", path: "brc-food-packaging-retail-storage-distribution-consumer-products-agent-broker-ethical-trade-plant-base", keywords: "brc retail storage" },
      { title: "HACCP", scope: "Food safety and hazard control", path: "haccp", keywords: "advanced usfda" },
      { title: "FSPCA PCQI", scope: "Preventive controls for food safety", path: "pcqi-fspca-harpc-fda-lac-fssc-to-netherlands", keywords: "fsma harpc fda personnel certification" },
      { title: "GMP+", scope: "Feed safety", path: "gmp-fsa-certification", keywords: "feed animal agriculture" },
      { title: "Aquaculture & agriculture", scope: "Seafood, marine and agricultural systems", path: "aquaculture-seafood-marine-agriculture-system", keywords: "seafood aquaculture marine agriculture" },
    ],
  },
  {
    id: "sustainability", title: "Sustainability",
    description: "Support for sustainability standards, responsible sourcing and supply chain requirements.",
    services: [
      { title: "RSPO", scope: "Sustainable palm oil", path: "rspo-all-scope", keywords: "plantation palm oil supply chain" },
      { title: "ISPO", scope: "Indonesian sustainable palm oil", path: "ispo", keywords: "plantation palm oil" },
      { title: "ISCC", scope: "Sustainability certification", path: "iscc", keywords: "carbon sustainability" },
      { title: "EcoVadis", scope: "Corporate sustainability", path: "ecovadis", keywords: "social responsibility esg" },
      { title: "FSC", scope: "Forest stewardship", path: "fsc-the-forest-stewardship-council", keywords: "forest forestry timber" },
    ],
  },
  {
    id: "environment", title: "Environment & energy",
    description: "Management systems and programs for environmental performance and energy use.",
    services: [
      { title: "ISO 14001", scope: "Environmental management", path: "iso-14001", keywords: "environment manufacturing" },
      { title: "ISO 50001", scope: "Energy management", path: "energy-management-iso-50001", keywords: "energy manufacturing" },
      { title: "PROPER", scope: "Environmental performance", path: "proper", keywords: "environment indonesia" },
    ],
  },
  {
    id: "safety", title: "Health & safety",
    description: "Training and system support for occupational health and workplace safety.",
    services: [
      { title: "ISO 45001", scope: "Occupational health and safety", path: "ohms-iso-45001-ohsas-18001-safety-system", keywords: "ohs ohsms workplace" },
      { title: "SMK3", scope: "Workplace safety management", path: "smk3", keywords: "occupational health indonesia workplace" },
    ],
  },
  {
    id: "laboratory", title: "Laboratory & calibration",
    description: "Support for laboratory management, testing methods and calibration needs.",
    services: [
      { title: "ISO/IEC 17025", scope: "Testing and calibration laboratories", path: "iso-17025", keywords: "iso 17025 laboratory testing calibration" },
      { title: "GLP", scope: "Good laboratory practice", path: "glp", keywords: "laboratory qc" },
      { title: "Method validation", scope: "Validation and verification", path: "validation-verification-metode", keywords: "testing laboratory verification" },
      { title: "Calibration", scope: "Calibration services", path: "calibration-kan-accredited", keywords: "laboratory instruments kan" },
    ],
  },
  {
    id: "audit", title: "Audit & inspection",
    description: "Assess your systems, identify gaps and prepare for the next stage of certification.",
    services: [
      { title: "Pre assessment audit", scope: "Certification preparation", path: "pre-audit-pre-assessment-audit", keywords: "pre audit assessment inspection certification" },
      { title: "Gap analysis", scope: "System readiness", path: "gap-analysis-audit", keywords: "gap audit inspection" },
      { title: "Maintenance audit", scope: "Ongoing system review", path: "maintainance-audit", keywords: "audit inspection" },
      { title: "Supplier audit", scope: "Supplier assessment", path: "supplier-audit", keywords: "audit inspection supply chain" },
      { title: "Inspection audit", scope: "Inspection services", path: "inspection-audit", keywords: "audit inspection" },
    ],
  },
  {
    id: "people", title: "People & performance",
    description: "Develop professional qualifications, supervisory skills and improvement practices.",
    services: [
      { title: "Personnel & organization certification", scope: "Registration and certification support", path: "personnel-organization-certif", keywords: "registration professional personnel organization" },
      { title: "Supervisor & leadership", scope: "Team development", path: "effective-supervisor-leadership", keywords: "effective supervisor leadership training" },
      { title: "5S", scope: "Workplace improvement", path: "5s", keywords: "quality improvement manufacturing" },
      { title: "TPM & Six Sigma", scope: "Performance improvement", path: "total-productive-maintenance-six-sigma-balanced-score-card", keywords: "total productive maintenance balanced scorecard six sigma manufacturing" },
    ],
  },
  {
    id: "industry", title: "Industry systems",
    description: "Specialist systems and operational support for the requirements in your industry.",
    services: [
      { title: "IATF 16949", scope: "Automotive quality systems", path: "iatf-16949", keywords: "automotive manufacturing" },
      { title: "ISMS & business systems", scope: "IT, ERP, MRP and HR systems", path: "isms-it-system-erp-mrp-hris-hrd-system", keywords: "information security it erp mrp hris hrd" },
      { title: "Factory design & layout", scope: "Factory services", path: "factory-design-layout", keywords: "manufacturing factory" },
      { title: "Medical devices & pharma", scope: "Medical and pharmaceutical systems", path: "medical-devices-packaging-for-medicinal-product-gsdp-system-for-pharma", keywords: "medical pharmaceutical packaging medicinal gsdp" },
    ],
  },
];
