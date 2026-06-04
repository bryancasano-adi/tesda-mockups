import type { Status } from "../pages/competency-based-learning-materials/Dashboard";

export const CBLM_PROJECT_NAME = "BEV Servicing Level II";

export const ucMeta = {
  code: "UC-001",
  title: "Carry Out Inspection of Electric Vehicle for Fleet Operations",
  titleLower: "Carry out inspection of electric vehicle for fleet operations",
  project: CBLM_PROJECT_NAME,
  module: "Module 1",
  unitCode: "AUTBEV311201",
  sector: "Automotive",
  ncLevel: "Level II",
  qualificationName: "Battery Electric Vehicle (BEV) Servicing Level II",
  qualificationShort: "BEV Servicing LII",
  qualificationCode: "TRS322201",
  documentNo: "AUT-BEV-001",
  revision: "00",
};

export type SheetNavItem = {
  id: string;
  label: string;
  badge: string;
  badgeClass: string;
  dotColor: string;
  sub?: boolean;
  href?: string;
  section?: string;
};

export const moduleSheetNavItems: SheetNavItem[] = [
  { id: "lo1-h", label: "LO 1 — Prepare for inspection — None", badge: "--", badgeClass: "snb-pend", dotColor: "#BDBDBD" },
  { id: "is-1-1-1", label: "IS 1.1.1 — Safety Protocols for EV Inspection", badge: "✓ Finalized", badgeClass: "snb-done", dotColor: "#2E7D32", href: "/cblm/editor?page=information-sheet" },
  { id: "sc-1-1-1", label: "SC 1.1.1 — Self-Check — Safety", badge: "✓ Finalized", badgeClass: "snb-done", dotColor: "#2E7D32", sub: true },
  { id: "ak-1-1-1", label: "AK 1.1.1 — Answer Key — Safety", badge: "✓ Finalized", badgeClass: "snb-done", dotColor: "#2E7D32", sub: true },
  { id: "is-1-1-2", label: "IS 1.1.2 — PPE Requirements", badge: "✓ Finalized", badgeClass: "snb-done", dotColor: "#2E7D32" },
  { id: "is-1-1-3", label: "IS 1.1.3 — Inspection Tools", badge: "Draft", badgeClass: "snb-active", dotColor: "#1565C0", href: "/cblm/editor?page=information-sheet" },
  { id: "ts-1-1-1", label: "TS 1.1.1 — Prepare EV Safety Check", badge: "🔒 Locked", badgeClass: "snb-lock", dotColor: "#E0E0E0", href: "/cblm/editor?page=task-sheet" },
  { id: "lo2-h", label: "LO 2 — Visual inspection — None", badge: "--", badgeClass: "snb-pend", dotColor: "#BDBDBD" },
  { id: "lo3-h", label: "LO 3 — Documentation — None", badge: "--", badgeClass: "snb-pend", dotColor: "#BDBDBD" },
  { id: "js-1", label: "JS 1 — Job Sheet", badge: "🔒 Locked", badgeClass: "snb-lock", dotColor: "#E0E0E0", href: "/cblm/editor?page=job-sheet" },
  { id: "let-1", label: "LET — Learning Exp. Table", badge: "🔒 Locked", badgeClass: "snb-lock", dotColor: "#E0E0E0", href: "/cblm/editor?page=learning-experiences-table" },
];

export type FrontMatterKind =
  | "cover"
  | "rev-history"
  | "howto"
  | "list"
  | "module-content"
  | "prerequisites";

export const frontMatterNavItems: SheetNavItem[] = [
  { id: "cover", label: "Cover", badge: "Front Cover", badgeClass: "snb-active", dotColor: "#1565C0", href: "/cblm/front-matter?page=cover" },
  { id: "rev-history", label: "Rev History", badge: "Revision History", badgeClass: "snb-pend", dotColor: "#BDBDBD", href: "/cblm/front-matter?page=rev-history" },
  { id: "howto", label: "How to Use", badge: "How to Use Module", badgeClass: "snb-pend", dotColor: "#BDBDBD", href: "/cblm/front-matter?page=howto" },
  { id: "list", label: "List of Comp.", badge: "List of Competencies", badgeClass: "snb-pend", dotColor: "#BDBDBD", href: "/cblm/front-matter?page=list" },
  { id: "module-content", label: "Module Content", badge: "Module Content Summary", badgeClass: "snb-pend", dotColor: "#BDBDBD", href: "/cblm/front-matter?page=module-content" },
  { id: "prerequisites", label: "Prerequisites", badge: "Prerequisites", badgeClass: "snb-pend", dotColor: "#BDBDBD", href: "/cblm/front-matter?page=prerequisites" },
  { id: "goto-sheets", label: "Go to Sheet Editors", badge: "LO 1 →", badgeClass: "snb-active", dotColor: "#1565C0", href: "/cblm/editor?page=information-sheet" },
];

export const frontMatterMeta: Record<
  FrontMatterKind,
  { label: string; title: string }
> = {
  cover: { label: "Front Cover", title: "Front Cover" },
  "rev-history": { label: "Revision History", title: "Revision History" },
  howto: { label: "How to Use Module", title: "How to Use This Module" },
  list: { label: "List of Competencies", title: "List of Competencies" },
  "module-content": { label: "Module Content", title: "Module Content Summary" },
  prerequisites: { label: "Prerequisites", title: "Prerequisites" },
};

export type ModuleSheetRow = {
  type: string;
  typeColor: string;
  typeBg: string;
  code: string;
  title: string;
  status: string;
  badgeClass: string;
  locked?: boolean;
  editorHref?: string;
};

export type ModuleLo = {
  no: number;
  title: string;
  badge: string;
  badgeClass: string;
  defaultOpen?: boolean;
  sheets: ModuleSheetRow[];
};

export const moduleLearningOutcomes: ModuleLo[] = [
  {
    no: 1,
    title: "Prepare for EV inspection — Safety, PPE, Tools",
    badge: "Partially Finalized",
    badgeClass: "b-draft",
    defaultOpen: true,
    sheets: [
      { type: "IS", typeColor: "#1565C0", typeBg: "#1565C022", code: "IS 1.1.1", title: "Safety Protocols for EV Inspection", status: "Finalized", badgeClass: "snb-done", editorHref: "/cblm/editor?page=information-sheet" },
      { type: "SC", typeColor: "#7C3AED", typeBg: "#7C3AED22", code: "SC 1.1.1", title: "Self-Check — Safety Protocols", status: "Finalized", badgeClass: "snb-done" },
      { type: "AK", typeColor: "#2E7D32", typeBg: "#2E7D3222", code: "AK 1.1.1", title: "Answer Key — Safety Protocols", status: "Finalized", badgeClass: "snb-done" },
      { type: "IS", typeColor: "#1565C0", typeBg: "#1565C022", code: "IS 1.1.2", title: "PPE Requirements for HV Work", status: "Finalized", badgeClass: "snb-done" },
      { type: "IS", typeColor: "#1565C0", typeBg: "#1565C022", code: "IS 1.1.3", title: "Inspection Tools and Equipment", status: "Draft", badgeClass: "b-draft", editorHref: "/cblm/editor?page=information-sheet" },
      { type: "TS", typeColor: "#F57C00", typeBg: "#F57C0022", code: "TS 1.1.1", title: "Perform Pre-Inspection EV Safety Preparation", status: "Locked", badgeClass: "b-locked", locked: true, editorHref: "/cblm/editor?page=task-sheet" },
    ],
  },
  {
    no: 2,
    title: "Conduct visual inspection of EV exterior and systems",
    badge: "Not Started",
    badgeClass: "b-pending",
    sheets: [
      { type: "IS", typeColor: "#1565C0", typeBg: "#1565C022", code: "IS 1.2.1", title: "Exterior Inspection Procedures", status: "Not Started", badgeClass: "b-pending" },
    ],
  },
  {
    no: 3,
    title: "Document inspection findings and report standards",
    badge: "Not Started",
    badgeClass: "b-pending",
    sheets: [
      { type: "IS", typeColor: "#1565C0", typeBg: "#1565C022", code: "IS 1.3.1", title: "Report Standards and Documentation", status: "Not Started", badgeClass: "b-pending" },
    ],
  },
];

export const moduleReferences = [
  { name: "AUTBEV-CS-2025-v2.pdf", type: "CS", usedIn: "IS 1.1.1, IS 1.1.2, TS 1.1.1", flagged: false },
  { name: "AUTBEV-CBC-2025-v1.pdf", type: "CBC", usedIn: "IS 1.1.1, LO 1.1", flagged: false },
  { name: "CLM-UC001-2025.pdf", type: "CLM", usedIn: "IS 1.1.1", flagged: true },
];

export type VideoScriptRow = {
  id: string;
  type: "TS" | "JS";
  code: string;
  title: string;
  cblmStatus: string;
  cblmBadge: string;
  scriptStatus: string;
  scriptBadge: string;
  duration: string;
  eligible: boolean;
  checked?: boolean;
};

export const videoScriptRows: VideoScriptRow[] = [
  { id: "ts-1-1-1", type: "TS", code: "TS 1.1.1", title: "Perform Pre-Inspection EV Safety Preparation", cblmStatus: "Finalized", cblmBadge: "b-finalized", scriptStatus: "Draft", scriptBadge: "b-draft", duration: "45 min", eligible: true, checked: true },
  { id: "ts-1-2-1", type: "TS", code: "TS 1.2.1", title: "Conduct Exterior Visual Inspection", cblmStatus: "Finalized", cblmBadge: "b-finalized", scriptStatus: "Not Generated", scriptBadge: "b-pending", duration: "—", eligible: true },
  { id: "ts-1-2-2", type: "TS", code: "TS 1.2.2", title: "Inspect HV System Warning Indicators", cblmStatus: "Finalized", cblmBadge: "b-finalized", scriptStatus: "Not Generated", scriptBadge: "b-pending", duration: "—", eligible: true },
  { id: "js-1", type: "JS", code: "JS 1", title: "Integrated EV Fleet Inspection Job Sheet", cblmStatus: "Draft", cblmBadge: "b-draft", scriptStatus: "Locked", scriptBadge: "b-locked", duration: "—", eligible: false },
];

/** Dashboard module list — keep structure for /cblm */
export const modules = [
  {
    group: "Core Competencies",
    color: "bg-green-700",
    items: [
      {
        no: "Mod 1",
        title: "Carry out inspection of electric vehicle for fleet operations",
        code: "AUTBEV311201",
        duration: "24 hrs",
        status: "review" as Status,
        los: "3 LOs · 21 sheets",
        current: true,
      },
    ],
  },
];

export const learningOutcomes = moduleLearningOutcomes.map((lo) => ({
  no: lo.no,
  title: lo.title,
  meta: `${lo.sheets.length} sheets`,
  status: (lo.badgeClass === "b-draft" ? "review" : lo.badgeClass === "b-pending" ? "not-started" : "finalized") as Status,
  sheets: lo.sheets.map((s) => [
    s.type.toLowerCase() === "is" ? "information-sheet" : s.type.toLowerCase() === "ts" ? "task-sheet" : "information-sheet",
    s.code,
    s.title,
    s.badgeClass === "b-validated" ? "finalized" : s.locked ? "locked" : "generated",
  ] as [string, string, string, string]),
}));

export const loData = [
  {
    num: 1,
    title: "Prepare for EV inspection — Safety, PPE, Tools",
    activities: [
      "● Read Information Sheet 1.1.1 on Safety Protocols",
      "● Answer Self-Check 1.1.1 and compare with Answer Key 1.1.1",
      "● Read IS 1.1.2 on PPE Requirements",
      "● Perform Task Sheet 1.1.1 when unlocked",
    ],
    instructions:
      "Complete all safety protocols before any hands-on inspection. HV certification is mandatory for TS 1.1.1.",
  },
];
