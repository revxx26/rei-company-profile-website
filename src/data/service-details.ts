type ServiceDetail = { overview: string; audience: string; focus: string[] };

// Plain-language summaries of REI's published service descriptions.
// Source snapshots are in review/service-detail-sources.json.
export const serviceDetails: Record<string, ServiceDetail> = {
  "fssc-22000-all-scope": {
    overview: "FSSC 22000 combines food safety management with sector prerequisite programs and scheme requirements. REI provides training and implementation support for organizations preparing or improving their food safety systems.",
    audience: "Food manufacturers, packaging producers and organizations operating across the food supply chain.",
    focus: ["Food safety management system requirements", "Sector prerequisite programs", "Implementation documents and audit preparation"],
  },
  "iso-22000-all-scope": {
    overview: "ISO 22000 provides a framework for managing food safety hazards throughout the food chain. REI supports teams with training and system implementation tailored to their operations.",
    audience: "Organizations involved in producing, processing, handling or supplying food.",
    focus: ["Food safety hazard identification and control", "Management system implementation", "Traceability and supporting documentation"],
  },
  "iso-9001-all-scope-iso-31000-internal-auditor-19011": {
    overview: "ISO 9001 helps organizations organize and improve their quality management processes. REI's published offering also includes risk management through ISO 31000 and internal auditing using ISO 19011 guidance.",
    audience: "Quality teams, managers and internal auditors in organizations of any size or sector.",
    focus: ["Customer focus and process management", "Risk management and continual improvement", "Internal audit principles and practices"],
  },
  "brc-food-packaging-retail-storage-distribution-consumer-products-agent-broker-ethical-trade-plant-base": {
    overview: "BRCGS standards address safety, quality and operational requirements across several supply chain sectors. REI provides training and system setup support for the standard relevant to your operation.",
    audience: "Food and packaging manufacturers, retailers, storage and distribution businesses, and other relevant suppliers.",
    focus: ["Selecting the relevant sector standard", "Safety, quality and operational controls", "System documentation and implementation"],
  },
  "haccp": {
    overview: "HACCP is a preventive approach to food safety that identifies hazards and establishes controls at critical points. REI offers training and implementation support, including advanced HACCP topics.",
    audience: "Food safety teams and businesses involved in food production, preparation, packaging or distribution.",
    focus: ["Hazard analysis and preventive measures", "Critical control points and monitoring", "Corrective actions, verification and records"],
  },
  "pcqi-fspca-harpc-fda-lac-fssc-to-netherlands": {
    overview: "REI offers FSPCA PCQI training focused on preventive controls for food safety. The program supports professionals responsible for understanding and applying preventive control systems.",
    audience: "Food safety professionals and teams working with preventive controls and food safety plans.",
    focus: ["Preventive controls concepts", "Food safety planning", "PCQI training and qualification pathways"],
  },
  "gmp-fsa-certification": {
    overview: "GMP+ Feed Safety Assurance addresses feed safety across the feed supply chain. REI's offering supports organizations developing their systems around the relevant feed safety requirements.",
    audience: "Feed manufacturers and businesses handling, trading or transporting feed materials.",
    focus: ["Feed safety management", "Controls throughout the feed chain", "System implementation and supporting records"],
  },
  "aquaculture-seafood-marine-agriculture-system": {
    overview: "REI supports systems for aquaculture, seafood, fisheries and agriculture. Its published service covers schemes including BAP, ASC, MSC and GLOBALG.A.P.",
    audience: "Aquaculture producers, fisheries, seafood businesses and agricultural operations.",
    focus: ["Responsible aquaculture and fisheries practices", "Farm assurance and agricultural systems", "Understanding the relevant certification scheme"],
  },
  "rspo-all-scope": {
    overview: "RSPO addresses sustainable palm oil production and supply chain traceability. REI offers training and system setup support for organizations working with the relevant RSPO requirements.",
    audience: "Palm oil growers, processors, manufacturers and businesses handling palm oil in the supply chain.",
    focus: ["Sustainable palm oil principles", "Supply chain traceability", "Implementation documents and system preparation"],
  },
  "ispo": {
    overview: "ISPO is Indonesia's sustainable palm oil framework. REI's offering supports organizations in understanding the framework and preparing the systems and records relevant to their operations.",
    audience: "Palm oil plantation businesses and teams responsible for sustainability management in Indonesia.",
    focus: ["Sustainable plantation management", "Understanding applicable ISPO requirements", "Operational documentation and system preparation"],
  },
  "iscc": {
    overview: "ISCC covers sustainability and certification systems for biomass and bioenergy supply chains. REI's published service introduces requirements related to land use, greenhouse gas emissions and social sustainability.",
    audience: "Producers, processors and supply chain businesses working with biomass or bioenergy.",
    focus: ["Sustainable land use and sourcing", "Greenhouse gas considerations", "Supply chain sustainability requirements"],
  },
  "ecovadis": {
    overview: "EcoVadis assesses how companies manage sustainability using documented evidence. REI's offering covers the assessment framework and the management practices behind a sustainability rating.",
    audience: "Companies responding to customer sustainability assessments and teams responsible for corporate sustainability.",
    focus: ["Environment, labor and human rights", "Ethics and sustainable procurement", "Evidence, scorecards and improvement priorities"],
  },
  "fsc-the-forest-stewardship-council": {
    overview: "FSC promotes responsible forest management and traceability of forest products. REI provides forestry systems training and consultancy for organizations working with these requirements.",
    audience: "Forestry operations and companies handling timber, paper or other forest products.",
    focus: ["Responsible forest management", "Chain of custody concepts", "Forestry system implementation"],
  },
  "iso-14001": {
    overview: "ISO 14001 provides a framework for an environmental management system. REI supports organizations in understanding the standard and developing environmental management practices for their activities.",
    audience: "Organizations seeking a structured approach to managing their environmental impacts.",
    focus: ["Environmental management system requirements", "Environmental aspects and operational controls", "Objectives, monitoring and improvement"],
  },
  "energy-management-iso-50001": {
    overview: "ISO 50001 helps organizations manage energy use through a structured management system. REI's offering supports the understanding and implementation of energy management practices.",
    audience: "Organizations and facility teams responsible for energy use and performance.",
    focus: ["Energy management policies and planning", "Energy data and performance monitoring", "Continual improvement of energy management"],
  },
  "proper": {
    overview: "PROPER is Indonesia's environmental performance rating program for companies. REI's service covers understanding the program and preparing environmental management practices and supporting information.",
    audience: "Companies and environmental management teams preparing for PROPER assessments.",
    focus: ["Understanding environmental performance criteria", "Environmental management practices", "Organizing assessment evidence"],
  },
  "ohms-iso-45001-ohsas-18001-safety-system": {
    overview: "ISO 45001 provides a management system framework for occupational health and safety. REI's offering supports teams developing a structured approach to workplace hazards and safer working conditions.",
    audience: "Safety teams, managers and organizations responsible for employee health and workplace safety.",
    focus: ["Occupational health and safety management", "Workplace hazard and risk identification", "Operational controls and ongoing improvement"],
  },
  "smk3": {
    overview: "SMK3 is an occupational health and safety management system used in Indonesia. REI's service supports organizations in understanding and organizing their workplace safety management practices.",
    audience: "Businesses and K3 teams responsible for workplace safety management in Indonesia.",
    focus: ["Safety management responsibilities", "Workplace risk prevention", "Safety procedures and supporting records"],
  },
  "iso-17025": {
    overview: "ISO/IEC 17025 addresses the competence of testing and calibration laboratories. REI offers training and system setup support for laboratories developing reliable technical and management practices.",
    audience: "Testing and calibration laboratories, laboratory managers and quality teams.",
    focus: ["Laboratory management requirements", "Technical competence and valid results", "Laboratory documentation and system implementation"],
  },
  "glp": {
    overview: "Good Laboratory Practice is a quality framework for managing nonclinical laboratory studies. It focuses on the consistency, reliability and integrity of study processes and results.",
    audience: "Laboratories and research organizations conducting nonclinical safety studies.",
    focus: ["Study organization and management controls", "Consistent laboratory procedures", "Data quality, records and integrity"],
  },
  "validation-verification-metode": {
    overview: "Method validation and verification help laboratories establish whether an analytical method is suitable for its intended use. REI provides training and setup support connected to laboratory testing and ISO/IEC 17025 implementation.",
    audience: "Laboratory analysts, technical managers and teams responsible for testing methods.",
    focus: ["Method suitability and performance", "Validation and verification practices", "Documenting method evidence"],
  },
  "calibration-kan-accredited": {
    overview: "REI's calibration offering includes instrument calibration, practical training and calibration equipment support. The appropriate calibration service depends on the instrument and scope required.",
    audience: "Laboratories, production teams and businesses using measuring instruments.",
    focus: ["Instrument calibration needs", "Practical calibration training and reports", "Calibration instruments and equipment"],
  },
  "pre-audit-pre-assessment-audit": {
    overview: "A pre assessment audit reviews a system before a formal certification assessment. REI offers audit support to help organizations understand their readiness and identify areas needing attention.",
    audience: "Organizations preparing for certification or a formal system assessment.",
    focus: ["Reviewing system readiness", "Identifying gaps before assessment", "Prioritizing preparation activities"],
  },
  "gap-analysis-audit": {
    overview: "Gap analysis compares your existing practices with the requirements of a selected system or standard. REI offers support to identify differences and guide the next steps in implementation.",
    audience: "Teams introducing a new management system or reviewing an existing one.",
    focus: ["Comparing current practices with requirements", "Identifying missing processes or evidence", "Planning implementation priorities"],
  },
  "maintainance-audit": {
    overview: "A maintenance audit reviews an established system as operations and requirements evolve. REI's audit support helps organizations examine how their systems are being maintained and where improvement is needed.",
    audience: "Organizations maintaining an implemented or certified management system.",
    focus: ["Reviewing ongoing system implementation", "Identifying maintenance and improvement needs", "Following up on audit findings"],
  },
  "supplier-audit": {
    overview: "A supplier audit assesses a supplier's practices against relevant requirements. REI provides supplier audit support to help organizations review their supply chain and identify improvement needs.",
    audience: "Procurement, quality and supplier management teams.",
    focus: ["Supplier assessment requirements", "Reviewing supplier practices and evidence", "Identifying improvement opportunities"],
  },
  "inspection-audit": {
    overview: "Inspection audits examine activities, processes or facilities against the agreed assessment requirements. REI provides inspection and audit support as part of its system improvement services.",
    audience: "Businesses requiring a review of operations, facilities or system implementation.",
    focus: ["Defining the inspection scope", "Reviewing operations and supporting evidence", "Identifying findings and improvement needs"],
  },
  "personnel-organization-certif": {
    overview: "REI supports registration and certification pathways for personnel, products and organizations. Its published offerings span auditor qualifications, professional training, organizational accreditation and product registration.",
    audience: "Professionals seeking qualifications and businesses preparing registration, certification or accreditation activities.",
    focus: ["Personnel qualifications and auditor training", "Organization certification and accreditation preparation", "Product and business registration pathways"],
  },
  "effective-supervisor-leadership": {
    overview: "REI offers supervisor and leadership training with practical workshops, case studies and group activities. The program develops the skills used to lead teams and improve everyday supervisory work.",
    audience: "Supervisors, team leaders and managers developing their leadership skills.",
    focus: ["Supervisory responsibilities and leadership", "Practical workshops and case studies", "Team development and workplace improvement"],
  },
  "5s": {
    overview: "5S is a method for organizing and maintaining an effective workplace: sort, set in order, shine, standardize and sustain. REI offers training and implementation support for putting these practices into everyday work.",
    audience: "Operational teams and organizations improving workplace organization.",
    focus: ["Organizing tools, materials and work areas", "Standardizing workplace practices", "Sustaining improvements over time"],
  },
  "total-productive-maintenance-six-sigma-balanced-score-card": {
    overview: "REI's performance improvement offering includes Total Productive Maintenance, Six Sigma and Balanced Scorecard. These approaches address equipment reliability, process improvement and performance management.",
    audience: "Operations, maintenance and improvement teams, as well as managers responsible for performance.",
    focus: ["Equipment reliability and productive maintenance", "Process variation and improvement", "Performance measurement and management"],
  },
  "iatf-16949": {
    overview: "IATF 16949 addresses quality management in the automotive industry and builds on ISO 9001. REI's service covers the additional automotive requirements and practices used in the supply chain.",
    audience: "Automotive manufacturers, suppliers and quality management teams.",
    focus: ["Automotive quality system requirements", "Defect prevention and product safety", "Supplier management and continual improvement"],
  },
  "isms-it-system-erp-mrp-hris-hrd-system": {
    overview: "REI supports information security, IT and business management systems. Its published offering includes ISO 27001, ERP/MRP, HR information systems and HR development processes.",
    audience: "IT, operations and HR teams implementing or improving business systems.",
    focus: ["Information security and IT systems", "ERP, MRP and business process support", "HR information and development systems"],
  },
  "factory-design-layout": {
    overview: "REI supports factory layout planning in relation to food safety standards. The service considers how a facility's design can support the system and operational requirements of food production.",
    audience: "Food manufacturers planning a new facility or reviewing an existing factory layout.",
    focus: ["Factory layout and operational flow", "Food safety requirements in facility planning", "Alignment with the relevant food safety standard"],
  },
  "medical-devices-packaging-for-medicinal-product-gsdp-system-for-pharma": {
    overview: "REI's published offering covers management systems for medical devices, medicinal packaging and pharmaceutical operations. It includes ISO 13485 requirements for medical device quality management.",
    audience: "Medical device businesses and teams working with pharmaceutical or medicinal packaging systems.",
    focus: ["Medical device quality management", "Medicinal packaging and pharmaceutical systems", "Documentation and relevant operational requirements"],
  },
};
