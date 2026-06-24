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

export const REPORT_RECORDS: ReportRecord[] = Array.from({ length: 42 }).flatMap((_, dayIndex) => {
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
