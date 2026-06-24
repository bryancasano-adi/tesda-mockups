export type DashboardRole =
  | "Super Admin"
  | "Admin"
  | "Manager"
  | "TR Packager"
  | "CS Developer"
  | "LAM Developer"
  | "CATs Developer"
  | "CBC Developer"
  | "CBLM Developer"
  | "Micro-Credentials Developer"
  | "Video Script Developer";

export type ReportRecord = {
  id: string;
  date: string;
  displayDate: string;
  person: string;
  email: string;
  sector: string;
  subSector: string;
  region: string;
  province: string;
  documentType: string;
  documentTitle: string;
  status: "Finalized" | "Failed" | "In Progress" | "Draft";
  uploads: number;
  exports: number;
  kbUploads: number;
  kbExports: number;
  generated: number;
  finalized: number;
  failed: number;
  tokens: number;
  cost: number;
  model: string;
  errorMessage?: string;
  useCase: "FA" | "SS" | "TRA" | "CBC";
};

export type ReportFilters = {
  dateFrom: string;
  dateTo: string;
  sector: string;
  subSectors: string[];
  documentType: string;
};

export const ROLE_OPTIONS: DashboardRole[] = [
  "Super Admin",
  "Admin",
  "Manager",
  "TR Packager",
  "CS Developer",
  "LAM Developer",
  "CATs Developer",
  "CBC Developer",
  "CBLM Developer",
  "Micro-Credentials Developer",
  "Video Script Developer",
];

export const DOCUMENT_TYPES = [
  "FM",
  "JAT",
  "QLS",
  "CS",
  "TR",
  "LAM",
  "CATS",
  "CBC",
  "CBLM",
  "Micro-Credential",
  "Video Script",
  "Evidence Plan",
  "Assessor's Guide",
  "Demonstration",
  "Oral Exam",
  "Written Exam",
  "SIC",
  "SAG",
  "CARS",
];

export const SECTOR_LOOKUP: Record<string, string[]> = {
  "All Sectors": [],
  ICT: ["Software Development", "Hardware Servicing", "Animation"],
  Automotive: ["Automotive Servicing NC II", "Automotive Servicing NC III"],
  Electronics: ["Electronic Products Assembly", "Consumer Electronics Servicing"],
  Construction: ["Green Building Maintenance", "Masonry", "Carpentry"],
  "Tourism/HRI": ["Cookery", "Bread and Pastry", "Housekeeping"],
  "Agri-Fishery": ["Crop Production", "Aquaculture", "Organic Agriculture"],
  "Health & Social": ["Caregiving", "Health Care Services", "Wellness Massage"],
  Garments: ["Dressmaking", "Tailoring", "Fashion Design"],
  Maritime: ["Deck Watchkeeping", "Marine Engineering"],
};

const PEOPLE = [
  ["Ana Reyes", "ana.reyes@tesda.gov.ph"],
  ["Miguel Santos", "miguel.santos@tesda.gov.ph"],
  ["Jessa Lim", "jessa.lim@tesda.gov.ph"],
  ["Paolo Garcia", "paolo.garcia@tesda.gov.ph"],
  ["Rina Bautista", "rina.bautista@tesda.gov.ph"],
  ["Noel Cruz", "noel.cruz@tesda.gov.ph"],
  ["Grace Navarro", "grace.navarro@tesda.gov.ph"],
  ["Mark Villanueva", "mark.villanueva@tesda.gov.ph"],
  ["Leah Mendoza", "leah.mendoza@tesda.gov.ph"],
  ["Jun Mercado", "jun.mercado@tesda.gov.ph"],
];

const SECTOR_NAMES = Object.keys(SECTOR_LOOKUP).filter((sector) => sector !== "All Sectors");
const REGIONS = ["NCR", "Region III", "Region IV-A", "Region VII", "Region XI"];
const PROVINCES = ["Cavite", "Laguna", "Bulacan", "Cebu", "Davao del Sur"];
const MODELS = ["gpt-4.1", "claude-sonnet-4-6", "gemini-2.5-pro"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function isoDate(base: Date, offset: number) {
  const d = new Date(base);
  d.setDate(base.getDate() + offset);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function displayDate(value: string) {
  const [, month, day] = value.split("-");
  return `${month}/${day}`;
}

export const ROLE_ACCESS: Record<
  DashboardRole,
  {
    tier: "National" | "ABDD/Regional" | "Provincial/District";
    modules: string[];
    dataScope: string;
    notes: string;
    allowedTabs: string[];
    allowedDocumentTypes: string[] | "all";
    allowedSectors?: string[];
    allowedRegions?: string[];
    allowedProvinces?: string[];
  }
> = {
  "Super Admin": {
    tier: "National",
    modules: ["All dashboard reports", "All sectors", "Deleted-doc token records"],
    dataScope: "National + ABDD + provincial data",
    notes: "Full system reporting access per RBAC National.",
    allowedTabs: ["user-activity", "upload-export", "gen-pipeline", "token-usage", "sector-analytics", "regional", "provincial"],
    allowedDocumentTypes: "all",
  },
  Admin: {
    tier: "National",
    modules: ["All dashboard reports", "All sectors", "Regional/Provincial rollups"],
    dataScope: "National + ABDD + provincial data",
    notes: "Admin reporting access; Control Dashboard remains usage/reporting only.",
    allowedTabs: ["user-activity", "upload-export", "gen-pipeline", "token-usage", "sector-analytics", "regional", "provincial"],
    allowedDocumentTypes: "all",
  },
  Manager: {
    tier: "ABDD/Regional",
    modules: ["Approvals/reports", "Assigned sectors", "Regional activity"],
    dataScope: "ABDD data and assigned regional/provincial scope",
    notes: "Managers see reporting for assigned ABDD scope, not user/role management reports.",
    allowedTabs: ["upload-export", "gen-pipeline", "token-usage", "sector-analytics", "regional"],
    allowedDocumentTypes: "all",
    allowedSectors: ["ICT", "Automotive", "Electronics", "Construction"],
    allowedRegions: ["Region IV-A", "Region III"],
  },
  "TR Packager": {
    tier: "Provincial/District",
    modules: ["TR", "FM", "QLS", "JAT"],
    dataScope: "Assigned sector or province/district",
    notes: "Packaging reports only; excludes LAM/CATs/CBC/CBLM authoring reports.",
    allowedTabs: ["upload-export", "gen-pipeline", "token-usage", "sector-analytics", "provincial"],
    allowedDocumentTypes: ["TR", "FM", "QLS", "JAT"],
    allowedSectors: ["Automotive"],
    allowedProvinces: ["Cavite", "Laguna"],
  },
  "CS Developer": {
    tier: "Provincial/District",
    modules: ["CS", "FM", "QLS", "JAT"],
    dataScope: "Assigned CS sector or province/district",
    notes: "CS reports only; cannot view most LAM, CATs, CBC, CBLM reports.",
    allowedTabs: ["upload-export", "gen-pipeline", "token-usage", "sector-analytics", "provincial"],
    allowedDocumentTypes: ["CS", "FM", "QLS", "JAT"],
    allowedSectors: ["ICT", "Electronics"],
    allowedProvinces: ["Bulacan", "Cavite"],
  },
  "LAM Developer": {
    tier: "Provincial/District",
    modules: ["LAM"],
    dataScope: "Assigned LAM sector or province/district",
    notes: "LAM reports only.",
    allowedTabs: ["upload-export", "gen-pipeline", "token-usage", "sector-analytics", "provincial"],
    allowedDocumentTypes: ["LAM"],
    allowedSectors: ["ICT"],
    allowedProvinces: ["Cavite"],
  },
  "CATs Developer": {
    tier: "Provincial/District",
    modules: ["CATs", "Evidence Plan", "Assessor's Guide", "Demonstration", "Oral/Written Exam", "SIC/SAG/CARS"],
    dataScope: "Assigned CATs sector or province/district",
    notes: "CATs reports only.",
    allowedTabs: ["upload-export", "gen-pipeline", "token-usage", "sector-analytics", "provincial"],
    allowedDocumentTypes: ["CATS", "Evidence Plan", "Assessor's Guide", "Demonstration", "Oral Exam", "Written Exam", "SIC", "SAG", "CARS"],
    allowedSectors: ["Construction", "Tourism/HRI"],
    allowedProvinces: ["Cebu"],
  },
  "CBC Developer": {
    tier: "Provincial/District",
    modules: ["CBC"],
    dataScope: "Assigned CBC sector or province/district",
    notes: "CBC reports only.",
    allowedTabs: ["upload-export", "gen-pipeline", "token-usage", "sector-analytics", "provincial"],
    allowedDocumentTypes: ["CBC"],
    allowedSectors: ["Agri-Fishery"],
    allowedProvinces: ["Davao del Sur"],
  },
  "CBLM Developer": {
    tier: "Provincial/District",
    modules: ["CBLM"],
    dataScope: "Assigned CBLM sector or province/district",
    notes: "CBLM reports only; video script rows are view/export only in production.",
    allowedTabs: ["upload-export", "gen-pipeline", "token-usage", "sector-analytics", "provincial"],
    allowedDocumentTypes: ["CBLM"],
    allowedSectors: ["Tourism/HRI"],
    allowedProvinces: ["Cebu"],
  },
  "Micro-Credentials Developer": {
    tier: "Provincial/District",
    modules: ["Micro-Credential"],
    dataScope: "Assigned micro-credential sector or province/district",
    notes: "Micro-credential reports only.",
    allowedTabs: ["upload-export", "gen-pipeline", "token-usage", "sector-analytics", "provincial"],
    allowedDocumentTypes: ["Micro-Credential"],
    allowedSectors: ["Health & Social"],
    allowedProvinces: ["Laguna"],
  },
  "Video Script Developer": {
    tier: "Provincial/District",
    modules: ["Video Script"],
    dataScope: "Assigned video-script sector or province/district",
    notes: "Video Script reports only; CBLM rows are view/export only in production.",
    allowedTabs: ["upload-export", "gen-pipeline", "token-usage", "sector-analytics", "provincial"],
    allowedDocumentTypes: ["Video Script"],
    allowedSectors: ["ICT", "Tourism/HRI"],
    allowedProvinces: ["Cavite", "Cebu"],
  },
};

const base = new Date("2025-05-01T00:00:00");

type MockRecordSeed = {
  id: string;
  date: string;
  personIndex: number;
  sector: string;
  subSectorIndex?: number;
  region: string;
  province: string;
  documentType: string;
  status?: ReportRecord["status"];
  uploads?: number;
  exports?: number;
  kbUploads?: number;
  kbExports?: number;
  generated?: number;
  finalized?: number;
  failed?: number;
  tokenBase?: number;
  modelIndex?: number;
  useCase?: ReportRecord["useCase"];
  errorMessage?: string;
};

function makeReportRecord(seed: MockRecordSeed): ReportRecord {
  const [person, email] = PEOPLE[seed.personIndex % PEOPLE.length];
  const subSectors = SECTOR_LOOKUP[seed.sector];
  const subSector = subSectors[seed.subSectorIndex ?? 0] ?? "General";
  const status = seed.status ?? "Finalized";
  const generated = seed.generated ?? 4;
  const failed = seed.failed ?? (status === "Failed" ? 1 : 0);
  const finalized =
    seed.finalized ??
    Math.max(0, generated - failed - (status === "In Progress" ? 1 : 0));
  const tokens =
    seed.tokenBase ??
    2200 +
      generated * 420 +
      DOCUMENT_TYPES.indexOf(seed.documentType) * 90 +
      seed.personIndex * 35;

  return {
    id: seed.id,
    date: seed.date,
    displayDate: displayDate(seed.date),
    person,
    email,
    sector: seed.sector,
    subSector,
    region: seed.region,
    province: seed.province,
    documentType: seed.documentType,
    documentTitle: `${seed.sector} ${subSector} ${seed.documentType}`,
    status,
    uploads: seed.uploads ?? 1,
    exports: seed.exports ?? 1,
    kbUploads: seed.kbUploads ?? 0,
    kbExports: seed.kbExports ?? 0,
    generated,
    finalized,
    failed,
    tokens,
    cost: (tokens / 1000) * 0.003,
    model: MODELS[(seed.modelIndex ?? seed.personIndex) % MODELS.length],
    errorMessage:
      seed.errorMessage ??
      (failed ? "Validation failed: missing performance criteria coverage" : undefined),
    useCase: seed.useCase ?? "TRA",
  };
}

const GENERATED_REPORT_RECORDS: ReportRecord[] = Array.from({ length: 42 }).flatMap((_, dayIndex) => {
  const date = isoDate(base, dayIndex);
  const weekend = [0, 6].includes(new Date(`${date}T00:00:00`).getDay());
  return SECTOR_NAMES.flatMap((sector, sectorIndex) => {
    const volume = weekend ? 1 : sectorIndex < 3 ? 4 : 2;
    return Array.from({ length: volume }).map((_, itemIndex) => {
      const docType = DOCUMENT_TYPES[(dayIndex + sectorIndex + itemIndex) % DOCUMENT_TYPES.length];
      const [person, email] = PEOPLE[(dayIndex + sectorIndex + itemIndex) % PEOPLE.length];
      const statusSeed = dayIndex + sectorIndex * 3 + itemIndex;
      const status = statusSeed % 17 === 0 ? "Failed" : statusSeed % 11 === 0 ? "In Progress" : statusSeed % 13 === 0 ? "Draft" : "Finalized";
      const generated = docType === "JAT" ? 2 + (statusSeed % 4) : 1 + (statusSeed % 3);
      const failed = status === "Failed" ? 1 : 0;
      const finalized = Math.max(0, generated - failed - (status === "In Progress" ? 1 : 0));
      const tokens = 900 + (statusSeed % 9) * 380 + (["FM", "QLS", "CS", "TR", "JAT", "LAM", "CBC", "CBLM"].includes(docType) ? 1100 : 450);
      const subSectors = SECTOR_LOOKUP[sector];
      return {
        id: `${date}-${sectorIndex}-${itemIndex}`,
        date,
        displayDate: displayDate(date),
        person,
        email,
        sector,
        subSector: subSectors[(dayIndex + itemIndex) % subSectors.length],
        region: REGIONS[(sectorIndex + dayIndex) % REGIONS.length],
        province: PROVINCES[(sectorIndex + dayIndex + itemIndex) % PROVINCES.length],
        documentType: docType,
        documentTitle: `${sector} ${subSectors[itemIndex % subSectors.length]} ${docType}`,
        status,
        uploads: statusSeed % 4 === 0 ? 1 : 0,
        exports: statusSeed % 5 === 0 ? 1 : 0,
        kbUploads: statusSeed % 19 === 0 ? 1 : 0,
        kbExports: statusSeed % 23 === 0 ? 1 : 0,
        generated,
        finalized,
        failed,
        tokens,
        cost: (tokens / 1000) * 0.003,
        model: MODELS[statusSeed % MODELS.length],
        errorMessage: failed ? "Validation failed: missing performance criteria coverage" : undefined,
        useCase: (["FA", "SS", "TRA", "CBC"] as const)[statusSeed % 4],
      };
    });
  });
});

const ROLE_COVERAGE_RECORDS: ReportRecord[] = [
  makeReportRecord({
    id: "manager-ict-cs-0505",
    date: "2025-05-05",
    personIndex: 0,
    sector: "ICT",
    subSectorIndex: 0,
    region: "Region III",
    province: "Bulacan",
    documentType: "CS",
    generated: 7,
    finalized: 6,
    uploads: 2,
    exports: 3,
    useCase: "TRA",
  }),
  makeReportRecord({
    id: "manager-automotive-tr-0506",
    date: "2025-05-06",
    personIndex: 1,
    sector: "Automotive",
    subSectorIndex: 0,
    region: "Region IV-A",
    province: "Cavite",
    documentType: "TR",
    generated: 6,
    finalized: 5,
    uploads: 2,
    exports: 2,
    useCase: "TRA",
  }),
  makeReportRecord({
    id: "manager-electronics-fm-0507",
    date: "2025-05-07",
    personIndex: 2,
    sector: "Electronics",
    subSectorIndex: 1,
    region: "Region III",
    province: "Bulacan",
    documentType: "FM",
    generated: 5,
    finalized: 5,
    uploads: 1,
    exports: 2,
    useCase: "FA",
  }),
  makeReportRecord({
    id: "manager-construction-cats-0508",
    date: "2025-05-08",
    personIndex: 3,
    sector: "Construction",
    subSectorIndex: 0,
    region: "Region IV-A",
    province: "Laguna",
    documentType: "CATS",
    status: "Draft",
    generated: 4,
    finalized: 2,
    uploads: 1,
    exports: 1,
    useCase: "SS",
  }),
  makeReportRecord({
    id: "tr-packager-tr-0505",
    date: "2025-05-05",
    personIndex: 4,
    sector: "Automotive",
    subSectorIndex: 0,
    region: "Region IV-A",
    province: "Cavite",
    documentType: "TR",
    generated: 5,
    finalized: 4,
    uploads: 2,
    exports: 2,
  }),
  makeReportRecord({
    id: "tr-packager-jat-0509",
    date: "2025-05-09",
    personIndex: 5,
    sector: "Automotive",
    subSectorIndex: 1,
    region: "Region IV-A",
    province: "Laguna",
    documentType: "JAT",
    status: "In Progress",
    generated: 6,
    finalized: 4,
    uploads: 1,
    exports: 1,
  }),
  makeReportRecord({
    id: "tr-packager-qls-0512",
    date: "2025-05-12",
    personIndex: 6,
    sector: "Automotive",
    subSectorIndex: 0,
    region: "Region IV-A",
    province: "Cavite",
    documentType: "QLS",
    generated: 4,
    finalized: 4,
    kbUploads: 1,
  }),
  makeReportRecord({
    id: "cs-dev-cs-0506",
    date: "2025-05-06",
    personIndex: 7,
    sector: "ICT",
    subSectorIndex: 0,
    region: "NCR",
    province: "Cavite",
    documentType: "CS",
    generated: 6,
    finalized: 5,
    uploads: 2,
    exports: 2,
  }),
  makeReportRecord({
    id: "cs-dev-fm-0510",
    date: "2025-05-10",
    personIndex: 8,
    sector: "Electronics",
    subSectorIndex: 0,
    region: "Region III",
    province: "Bulacan",
    documentType: "FM",
    generated: 4,
    finalized: 4,
    uploads: 1,
    kbExports: 1,
    useCase: "FA",
  }),
  makeReportRecord({
    id: "cs-dev-jat-0514",
    date: "2025-05-14",
    personIndex: 9,
    sector: "ICT",
    subSectorIndex: 2,
    region: "Region IV-A",
    province: "Cavite",
    documentType: "JAT",
    status: "Failed",
    generated: 5,
    finalized: 3,
    failed: 1,
    uploads: 1,
    exports: 0,
    errorMessage: "Generation failed: source FM competency mapping incomplete",
  }),
  makeReportRecord({
    id: "lam-dev-lam-0505",
    date: "2025-05-05",
    personIndex: 0,
    sector: "ICT",
    subSectorIndex: 0,
    region: "NCR",
    province: "Cavite",
    documentType: "LAM",
    generated: 6,
    finalized: 5,
    uploads: 2,
    exports: 2,
    useCase: "TRA",
  }),
  makeReportRecord({
    id: "lam-dev-lam-0511",
    date: "2025-05-11",
    personIndex: 1,
    sector: "ICT",
    subSectorIndex: 1,
    region: "Region IV-A",
    province: "Cavite",
    documentType: "LAM",
    status: "Draft",
    generated: 4,
    finalized: 2,
    uploads: 1,
    exports: 1,
  }),
  makeReportRecord({
    id: "cats-dev-cats-0506",
    date: "2025-05-06",
    personIndex: 2,
    sector: "Construction",
    subSectorIndex: 0,
    region: "Region VII",
    province: "Cebu",
    documentType: "CATS",
    generated: 5,
    finalized: 4,
    uploads: 2,
    exports: 1,
    useCase: "SS",
  }),
  makeReportRecord({
    id: "cats-dev-evidence-plan-0508",
    date: "2025-05-08",
    personIndex: 3,
    sector: "Construction",
    subSectorIndex: 1,
    region: "Region VII",
    province: "Cebu",
    documentType: "Evidence Plan",
    generated: 4,
    finalized: 4,
    kbUploads: 1,
    useCase: "SS",
  }),
  makeReportRecord({
    id: "cats-dev-assessor-guide-0512",
    date: "2025-05-12",
    personIndex: 4,
    sector: "Tourism/HRI",
    subSectorIndex: 0,
    region: "Region VII",
    province: "Cebu",
    documentType: "Assessor's Guide",
    status: "In Progress",
    generated: 4,
    finalized: 3,
    uploads: 1,
    exports: 1,
    useCase: "SS",
  }),
  makeReportRecord({
    id: "cbc-dev-cbc-0507",
    date: "2025-05-07",
    personIndex: 5,
    sector: "Agri-Fishery",
    subSectorIndex: 0,
    region: "Region XI",
    province: "Davao del Sur",
    documentType: "CBC",
    generated: 5,
    finalized: 4,
    uploads: 2,
    exports: 2,
    useCase: "CBC",
  }),
  makeReportRecord({
    id: "cbc-dev-cbc-0513",
    date: "2025-05-13",
    personIndex: 6,
    sector: "Agri-Fishery",
    subSectorIndex: 1,
    region: "Region XI",
    province: "Davao del Sur",
    documentType: "CBC",
    status: "Failed",
    generated: 4,
    finalized: 2,
    failed: 1,
    exports: 0,
    errorMessage: "Generation failed: missing CBC performance objective source",
    useCase: "CBC",
  }),
  makeReportRecord({
    id: "cblm-dev-cblm-0508",
    date: "2025-05-08",
    personIndex: 7,
    sector: "Tourism/HRI",
    subSectorIndex: 0,
    region: "Region VII",
    province: "Cebu",
    documentType: "CBLM",
    generated: 6,
    finalized: 5,
    uploads: 2,
    exports: 2,
    useCase: "CBC",
  }),
  makeReportRecord({
    id: "cblm-dev-cblm-0514",
    date: "2025-05-14",
    personIndex: 8,
    sector: "Tourism/HRI",
    subSectorIndex: 2,
    region: "Region VII",
    province: "Cebu",
    documentType: "CBLM",
    status: "Draft",
    generated: 4,
    finalized: 3,
    uploads: 1,
    kbExports: 1,
    useCase: "CBC",
  }),
  makeReportRecord({
    id: "micro-dev-mc-0509",
    date: "2025-05-09",
    personIndex: 9,
    sector: "Health & Social",
    subSectorIndex: 0,
    region: "Region IV-A",
    province: "Laguna",
    documentType: "Micro-Credential",
    generated: 5,
    finalized: 4,
    uploads: 2,
    exports: 2,
    useCase: "TRA",
  }),
  makeReportRecord({
    id: "micro-dev-mc-0515",
    date: "2025-05-15",
    personIndex: 0,
    sector: "Health & Social",
    subSectorIndex: 2,
    region: "Region IV-A",
    province: "Laguna",
    documentType: "Micro-Credential",
    status: "In Progress",
    generated: 3,
    finalized: 2,
    uploads: 1,
    exports: 1,
  }),
  makeReportRecord({
    id: "video-dev-script-0507",
    date: "2025-05-07",
    personIndex: 1,
    sector: "ICT",
    subSectorIndex: 2,
    region: "NCR",
    province: "Cavite",
    documentType: "Video Script",
    generated: 5,
    finalized: 5,
    uploads: 1,
    exports: 3,
    useCase: "CBC",
  }),
  makeReportRecord({
    id: "video-dev-script-0512",
    date: "2025-05-12",
    personIndex: 2,
    sector: "Tourism/HRI",
    subSectorIndex: 1,
    region: "Region VII",
    province: "Cebu",
    documentType: "Video Script",
    status: "Draft",
    generated: 4,
    finalized: 3,
    uploads: 1,
    exports: 1,
    kbUploads: 1,
    useCase: "CBC",
  }),
];

export const REPORT_RECORDS: ReportRecord[] = [
  ...GENERATED_REPORT_RECORDS,
  ...ROLE_COVERAGE_RECORDS,
];

export function getRoleRecords(role: DashboardRole) {
  const access = ROLE_ACCESS[role];
  return REPORT_RECORDS.filter((record) => {
    if (access.allowedDocumentTypes !== "all" && !access.allowedDocumentTypes.includes(record.documentType)) return false;
    if (access.allowedSectors?.length && !access.allowedSectors.includes(record.sector)) return false;
    if (access.allowedRegions?.length && !access.allowedRegions.includes(record.region)) return false;
    if (access.allowedProvinces?.length && !access.allowedProvinces.includes(record.province)) return false;
    return true;
  });
}

export function applyReportFilters(records: ReportRecord[], filters: ReportFilters) {
  return records.filter((record) => {
    if (record.date < filters.dateFrom || record.date > filters.dateTo) return false;
    if (filters.sector !== "All Sectors" && record.sector !== filters.sector) return false;
    if (filters.subSectors.length > 0 && !filters.subSectors.includes(record.subSector)) return false;
    if (filters.documentType !== "All Document Types" && record.documentType !== filters.documentType) return false;
    return true;
  });
}
