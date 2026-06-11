// ─── User Activity ────────────────────────────────────────────────────────────

export const loginsByDay = [
  { date: "05/04", logins: 1 },
  { date: "05/05", logins: 4 },
  { date: "05/06", logins: 2 },
  { date: "05/07", logins: 1 },
  { date: "05/08", logins: 1 },
  { date: "05/09", logins: 1 },
  { date: "05/11", logins: 7 },
  { date: "05/12", logins: 2 },
  { date: "05/13", logins: 1 },
  { date: "05/14", logins: 1 },
  { date: "05/15", logins: 1 },
];

export const loginsByUser = [
  { email: "jcfornoles@tesda.gov.ph", logins: 10 },
  { email: "pnmunoz@tesda.gov.ph", logins: 6 },
  { email: "acsabenal@tesda.gov.ph", logins: 3 },
  { email: "eppenita@tesda.gov.ph", logins: 3 },
  { email: "darwin.bulawan@abolitz.com", logins: 3 },
  { email: "lvbagustin@tesda.gov.ph", logins: 1 },
];

export const dailyActiveUsers = [
  { date: "05/04", users: 2 },
  { date: "05/05", users: 3 },
  { date: "05/06", users: 5 },
  { date: "05/07", users: 2 },
  { date: "05/08", users: 1 },
  { date: "05/09", users: 2 },
  { date: "05/11", users: 6 },
  { date: "05/12", users: 4 },
  { date: "05/13", users: 3 },
  { date: "05/14", users: 2 },
  { date: "05/15", users: 1 },
];

// ─── Upload & Export ──────────────────────────────────────────────────────────

export const docUploadsPerDay = [
  { date: "05/04", uploads: 25, breakdown: { CS: 10, TR: 8, FM: 5, EP: 2 } },
  { date: "05/05", uploads: 19, breakdown: { CS: 7, TR: 6, FM: 4, EP: 2 } },
  { date: "05/06", uploads: 41, breakdown: { CS: 15, TR: 14, FM: 8, EP: 4 } },
  { date: "05/07", uploads: 1, breakdown: { CS: 1 } },
  { date: "05/08", uploads: 1, breakdown: { TR: 1 } },
  { date: "05/09", uploads: 22, breakdown: { CS: 8, TR: 7, FM: 5, EP: 2 } },
  { date: "05/11", uploads: 23, breakdown: { CS: 9, TR: 8, FM: 4, EP: 2 } },
  { date: "05/12", uploads: 32, breakdown: { CS: 12, TR: 10, FM: 6, EP: 4 } },
  { date: "05/13", uploads: 9, breakdown: { CS: 3, TR: 4, FM: 2 } },
  { date: "05/14", uploads: 7, breakdown: { CS: 3, TR: 2, FM: 2 } },
  { date: "05/15", uploads: 1, breakdown: { CS: 1 } },
];

export const docxExportsPerDay = [
  { date: "05/04", exports: 5 },
  { date: "05/05", exports: 8 },
  { date: "05/06", exports: 12 },
  { date: "05/07", exports: 3 },
  { date: "05/09", exports: 19 },
  { date: "05/11", exports: 45 },
  { date: "05/12", exports: 7 },
  { date: "05/13", exports: 3 },
  { date: "05/14", exports: 2 },
];

// ─── Generation Pipeline ──────────────────────────────────────────────────────
// Status terms follow KGALING: Generated, Finalized, Failed

export const genPipelineData = [
  { date: "05/04", generated: 5, finalized: 4, failed: 0 },
  { date: "05/05", generated: 12, finalized: 10, failed: 1 },
  { date: "05/06", generated: 8, finalized: 7, failed: 0 },
  { date: "05/07", generated: 3, finalized: 2, failed: 1 },
  { date: "05/08", generated: 2, finalized: 2, failed: 0 },
  { date: "05/09", generated: 18, finalized: 16, failed: 0 },
  { date: "05/11", generated: 280, finalized: 270, failed: 3 },
  { date: "05/12", generated: 40, finalized: 38, failed: 1 },
  { date: "05/13", generated: 15, finalized: 12, failed: 0 },
  { date: "05/14", generated: 8, finalized: 7, failed: 0 },
];

export const genStatusTotals = [
  { name: "Generated", value: 441, color: "#4caf50", pct: "50%" },
  { name: "Finalized", value: 434, color: "#2196f3", pct: "49%" },
  { name: "Failed", value: 5, color: "#f44336", pct: "1%" },
];

export const genBySector = [
  { sector: "ICT & Animation", generated: 180, finalized: 160, failed: 2 },
  { sector: "Construction", generated: 95, finalized: 88, failed: 1 },
  { sector: "Tourism", generated: 75, finalized: 68, failed: 0 },
  { sector: "Agriculture", generated: 60, finalized: 55, failed: 1 },
  { sector: "Welding", generated: 45, finalized: 40, failed: 1 },
  { sector: "Health Care", generated: 30, finalized: 28, failed: 0 },
];

// ─── Token Usage ──────────────────────────────────────────────────────────────

export const tokenUsageData = [
  { doc: "Evidence Plan", tokens: 4820, cost: "$0.15" },
  { doc: "Outline", tokens: 1230, cost: "$0.04" },
  { doc: "Demonstration Test A", tokens: 6450, cost: "$0.20" },
  { doc: "Demonstration Test B", tokens: 6210, cost: "$0.19" },
  { doc: "Questioning Tool", tokens: 3890, cost: "$0.12" },
  { doc: "Written Test (MCQ)", tokens: 5670, cost: "$0.17" },
  { doc: "Assessor's Guide A", tokens: 7120, cost: "$0.22" },
  { doc: "Assessor's Guide B", tokens: 6980, cost: "$0.21" },
];

export const tokenTrendData = [
  { date: "05/04", tokens: 4200 },
  { date: "05/05", tokens: 8900 },
  { date: "05/06", tokens: 22000 },
  { date: "05/07", tokens: 3100 },
  { date: "05/09", tokens: 15600 },
  { date: "05/11", tokens: 98000 },
  { date: "05/12", tokens: 31000 },
  { date: "05/13", tokens: 12400 },
  { date: "05/14", tokens: 6800 },
];

export const tokenBySector = [
  { sector: "ICT & Animation", tokens: 18400, cost: "$0.57" },
  { sector: "Construction", tokens: 9200, cost: "$0.29" },
  { sector: "Tourism", tokens: 7100, cost: "$0.22" },
  { sector: "Agriculture", tokens: 5600, cost: "$0.17" },
  { sector: "Welding", tokens: 4300, cost: "$0.13" },
  { sector: "Health Care", tokens: 3200, cost: "$0.10" },
];

// ─── Sector Analytics ─────────────────────────────────────────────────────────

export const sectorData = [
  {
    sector: "ICT & Animation",
    tbs: 48,
    cs: 14,
    inDev: 12,
    forReview: 8,
    approved: 28,
    finalized: 22,
    activity: "High",
    breakdown: { TR: 20, CS: 14, FM: 8, EP: 6 },
  },
  {
    sector: "Automotive",
    tbs: 22,
    cs: 6,
    inDev: 5,
    forReview: 4,
    approved: 13,
    finalized: 11,
    activity: "High",
    breakdown: { TR: 12, CS: 6, FM: 3, EP: 1 },
  },
  {
    sector: "Construction",
    tbs: 31,
    cs: 9,
    inDev: 7,
    forReview: 11,
    approved: 13,
    finalized: 13,
    activity: "Medium",
    breakdown: { TR: 18, CS: 9, FM: 4 },
  },
  {
    sector: "Agriculture",
    tbs: 19,
    cs: 4,
    inDev: 3,
    forReview: 5,
    approved: 11,
    finalized: 9,
    activity: "Medium",
    breakdown: { TR: 12, CS: 4, FM: 3 },
  },
  {
    sector: "Tourism",
    tbs: 28,
    cs: 8,
    inDev: 6,
    forReview: 6,
    approved: 16,
    finalized: 14,
    activity: "High",
    breakdown: { TR: 16, CS: 8, FM: 4 },
  },
  {
    sector: "Electronics",
    tbs: 14,
    cs: 3,
    inDev: 2,
    forReview: 3,
    approved: 9,
    finalized: 7,
    activity: "Low",
    breakdown: { TR: 8, CS: 3, FM: 2, EP: 1 },
  },
  {
    sector: "Welding",
    tbs: 24,
    cs: 7,
    inDev: 4,
    forReview: 9,
    approved: 11,
    finalized: 9,
    activity: "Medium",
    breakdown: { TR: 14, CS: 7, FM: 3 },
  },
  {
    sector: "Health Care",
    tbs: 16,
    cs: 5,
    inDev: 3,
    forReview: 4,
    approved: 9,
    finalized: 7,
    activity: "Medium",
    breakdown: { TR: 9, CS: 5, FM: 2 },
  },
];

export const statusOfDocsData = [
  { name: "Online", value: 310, color: "#1976d2" },
  { name: "For Review", value: 85, color: "#f57c00" },
  { name: "TA: Active", value: 48, color: "#2e7d32" },
  { name: "TN (SD)", value: 15, color: "#9e9e9e" },
];

export const regionalData = [
  { region: "NCR", level: "High", tbs: 42 },
  { region: "Region III", level: "High", tbs: 28 },
  { region: "Region IV-A", level: "High", tbs: 35 },
  { region: "Region VI", level: "Medium", tbs: 19 },
  { region: "Region VII", level: "Medium", tbs: 22 },
  { region: "Region XI", level: "Medium", tbs: 18 },
  { region: "Region I", level: "Low", tbs: 11 },
  { region: "CAR", level: "Low", tbs: 9 },
  { region: "ARMM", level: "Low", tbs: 8 },
];

// ─── Search & Filter ──────────────────────────────────────────────────────────

export type SearchResult = {
  title: string;
  nc: string;
  sector: string;
  subsector: string;
  docType: string;
  status: string;
  match: number;
  keyword: string[];
};

export const ALL_RESULTS: SearchResult[] = [
  {
    title: "Green Building Maintenance Level III",
    nc: "NC III",
    sector: "Construction",
    subsector: "Building Maintenance",
    docType: "TR",
    status: "Online",
    match: 92,
    keyword: ["greening", "green", "environment", "sustainable", "eco"],
  },
  {
    title: "Energy Efficiency and Conservation Level III",
    nc: "NC III",
    sector: "Energy",
    subsector: "Energy Management",
    docType: "CS",
    status: "For Review",
    match: 85,
    keyword: ["greening", "energy", "conservation", "eco", "environment"],
  },
  {
    title: "Solar PV Installation NC II",
    nc: "NC II",
    sector: "Energy",
    subsector: "Renewable Energy",
    docType: "TR",
    status: "Online",
    match: 78,
    keyword: ["greening", "solar", "renewable", "energy", "eco"],
  },
  {
    title: "Sustainable Agricultural Practices CS",
    nc: "CS",
    sector: "Agriculture",
    subsector: "Crop Production",
    docType: "CS",
    status: "Online",
    match: 75,
    keyword: ["greening", "sustainable", "agriculture", "eco"],
  },
  {
    title: "Electric Vehicle Servicing NC II",
    nc: "NC II",
    sector: "Automotive",
    subsector: "EV Technology",
    docType: "TR",
    status: "Draft",
    match: 68,
    keyword: ["electric", "vehicle", "eco"],
  },
  {
    title: "Green Infrastructure Management",
    nc: "NC III",
    sector: "Construction",
    subsector: "Infrastructure",
    docType: "TR",
    status: "Online",
    match: 65,
    keyword: ["greening", "green", "infrastructure"],
  },
  {
    title: "Waste Management and Recycling NC II",
    nc: "NC II",
    sector: "Agriculture",
    subsector: "Waste Management",
    docType: "CS",
    status: "Online",
    match: 60,
    keyword: ["waste", "recycling", "environment"],
  },
  {
    title: "Organic Farming NC II",
    nc: "NC II",
    sector: "Agriculture",
    subsector: "Crop Production",
    docType: "TR",
    status: "For Review",
    match: 58,
    keyword: ["greening", "organic", "farming", "sustainable"],
  },
  {
    title: "Shielded Metal Arc Welding NC II",
    nc: "NC II",
    sector: "Welding",
    subsector: "Arc Welding",
    docType: "TR",
    status: "Online",
    match: 10,
    keyword: ["renewable energy", "welding", "metal", "arc"],
  },
  {
    title: "Automotive Servicing NC I",
    nc: "NC I",
    sector: "Automotive",
    subsector: "Vehicle Service",
    docType: "TR",
    status: "Online",
    match: 10,
    keyword: ["automotive", "servicing", "vehicle"],
  },
  {
    title: "Bread and Pastry Production NC II",
    nc: "NC II",
    sector: "Tourism",
    subsector: "Food & Beverage",
    docType: "TR",
    status: "Online",
    match: 10,
    keyword: ["bread", "pastry", "food", "tourism"],
  },
  {
    title: "Computer Systems Servicing NC II",
    nc: "NC II",
    sector: "ICT & Animation",
    subsector: "Computer Hardware",
    docType: "TR",
    status: "Online",
    match: 10,
    keyword: ["computer", "ict", "systems", "servicing"],
  },
  {
    title: "Web Development NC IV",
    nc: "NC IV",
    sector: "ICT & Animation",
    subsector: "Software Dev",
    docType: "CS",
    status: "Online",
    match: 10,
    keyword: ["web", "development", "ict", "software"],
  },
  {
    title: "Hilot (Wellness Massage) NC II",
    nc: "NC II",
    sector: "Health Care",
    subsector: "Wellness",
    docType: "TR",
    status: "Online",
    match: 10,
    keyword: ["hilot", "massage", "wellness", "health"],
  },
  {
    title: "Caregiving NC II",
    nc: "NC II",
    sector: "Health Care",
    subsector: "Caregiving",
    docType: "TR",
    status: "Online",
    match: 10,
    keyword: ["caregiving", "health", "care"],
  },
  {
    title: "Electronics Products Assembly NC II",
    nc: "NC II",
    sector: "Electronics",
    subsector: "Assembly",
    docType: "TR",
    status: "For Review",
    match: 10,
    keyword: ["electronics", "assembly", "products"],
  },
  {
    title: "HVAC/R Servicing NC III",
    nc: "NC III",
    sector: "Electronics",
    subsector: "Refrigeration",
    docType: "TR",
    status: "Online",
    match: 10,
    keyword: ["hvac", "refrigeration", "servicing"],
  },
  {
    title: "Cookery NC II",
    nc: "NC II",
    sector: "Tourism",
    subsector: "Food & Beverage",
    docType: "TR",
    status: "Online",
    match: 10,
    keyword: ["cookery", "food", "tourism"],
  },
];

export const SECTORS = [
  "All Sectors",
  "ICT & Animation",
  "Automotive",
  "Construction",
  "Agriculture",
  "Tourism",
  "Electronics",
  "Welding",
  "Health Care",
  "Energy",
];
export const SUBSECTORS = [
  "All Sub-Sectors",
  "Software Dev",
  "Computer Hardware",
  "Arc Welding",
  "Vehicle Service",
  "Building Maintenance",
  "Infrastructure",
  "Crop Production",
  "Waste Management",
  "Renewable Energy",
  "Energy Management",
  "Food & Beverage",
  "Wellness",
  "Caregiving",
  "Assembly",
  "Refrigeration",
  "EV Technology",
];
export const DOC_TYPES = ["All Types", "TR", "CS"];
export const STATUSES = [
  "All Status",
  "Online",
  "For Review",
  "Draft",
  "Deprecated",
];
export const QUAL_LEVELS = [
  "All Levels",
  "NC I",
  "NC II",
  "NC III",
  "NC IV",
  "COC",
  "CS",
];

export const STATUS_CHIP: Record<string, string> = {
  Online: "bg-[#e8f5e9] text-[#2e7d32]",
  "For Review": "bg-[#fff3e0] text-[#f57c00]",
  Draft: "bg-[#f3e5f5] text-[#7b1fa2]",
  Deprecated: "bg-[#fce4ec] text-[#c62828]",
};

export const ACTIVITY_LEVELS: Record<string, string> = {
  High: "bg-[#e8f5e9] text-[#2e7d32]",
  Medium: "bg-[#fff3e0] text-[#f57c00]",
  Low: "bg-[#fce4ec] text-[#c62828]",
};

export const REGIONAL_LEVEL_COLOR: Record<
  string,
  { dot: string; badge: string; text: string }
> = {
  High: { dot: "#1976d2", badge: "bg-[#e3f2fd]", text: "text-[#1976d2]" },
  Medium: { dot: "#f57c00", badge: "bg-[#fff3e0]", text: "text-[#f57c00]" },
  Low: { dot: "#9e9e9e", badge: "bg-[#f5f5f5]", text: "text-[#9e9e9e]" },
};
