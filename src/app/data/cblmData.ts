import type { Status } from "../pages/competency-based-learning-materials/Dashboard";
import type { ConsolidationPageId } from "@/app/components/competency-based-learning-materials/consolidation-nav";
import {
  MOCK_CBLM_ID,
  cblmEditorPath,
} from "@/app/utils/cblmRoutes";

export const CBLM_PROJECT_NAME = "BEV Servicing Level II";

export type CblmDashboardModule = {
  unitTitle: string;
  unitCode: string;
  competencyType: "basic" | "common" | "core";
  status: "not_started" | "draft" | "finalized";
  cblmId?: string;
  moiReady?: boolean;
};

export const cblmDashboardModules: CblmDashboardModule[] = [
  {
    unitTitle: "Receive and store kitchen supplies",
    unitCode: "AUTBEV311101",
    competencyType: "basic",
    status: "not_started",
  },
  {
    unitTitle: "Work in a team environment",
    unitCode: "AUTBEV311102",
    competencyType: "common",
    status: "not_started",
    moiReady: true,
  },
  {
    unitTitle: "Carry out inspection of electric vehicle for fleet operations",
    unitCode: "AUTBEV311201",
    competencyType: "core",
    status: "draft",
    cblmId: MOCK_CBLM_ID,
    moiReady: true,
  },
];

export type MockSheetRow = {
  code: string;
  label: string;
  type: string;
  status: "draft" | "finalized" | "not_started";
  locked?: boolean;
  editorPage?: string;
};

export type MockLoGroup = {
  loNumber: string;
  loTitle: string;
  sheets: MockSheetRow[];
  finalized?: boolean;
};

export const mockLoGroups: MockLoGroup[] = [
  {
    loNumber: "1",
    loTitle: "Prepare for EV inspection — Safety, PPE, Tools",
    finalized: false,
    sheets: [
      {
        code: "IS 1.1.1",
        label: "IS 1.1.1 — Safety Protocols for EV Inspection",
        type: "IS",
        status: "finalized",
        editorPage: "information-sheet",
      },
      {
        code: "SC 1.1.1",
        label: "SC 1.1.1 — Self-Check — Safety Protocols",
        type: "SC",
        status: "finalized",
        editorPage: "self-check",
      },
      {
        code: "AK 1.1.1",
        label: "AK 1.1.1 — Answer Key — Safety Protocols",
        type: "AK",
        status: "finalized",
        editorPage: "answer-key",
      },
      {
        code: "IS 1.1.2",
        label: "IS 1.1.2 — PPE Requirements for HV Work",
        type: "IS",
        status: "finalized",
      },
      {
        code: "IS 1.1.3",
        label: "IS 1.1.3 — Inspection Tools and Equipment",
        type: "IS",
        status: "draft",
        editorPage: "information-sheet",
      },
      {
        code: "TS 1.1.1",
        label: "TS 1.1.1 — Perform Pre-Inspection EV Safety Preparation",
        type: "TS",
        status: "draft",
        editorPage: "task-sheet",
      },
      {
        code: "PCC 1.1.1",
        label: "PCC 1.1.1 — EV Safety Preparation Criteria",
        type: "PCC",
        status: "draft",
        editorPage: "performance-criterion",
      },
    ],
  },
  {
    loNumber: "2",
    loTitle: "Conduct visual inspection of EV exterior and systems",
    sheets: [
      {
        code: "IS 1.2.1",
        label: "IS 1.2.1 — Exterior Inspection Procedures",
        type: "IS",
        status: "not_started",
      },
    ],
  },
  {
    loNumber: "3",
    loTitle: "Document inspection findings and report standards",
    sheets: [
      {
        code: "IS 1.3.1",
        label: "IS 1.3.1 — Report Standards and Documentation",
        type: "IS",
        status: "not_started",
      },
    ],
  },
];

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
  { id: "is-1-1-1", label: "IS 1.1.1 — Safety Protocols for EV Inspection", badge: "✓ Finalized", badgeClass: "snb-done", dotColor: "#2E7D32", href: cblmEditorPath(MOCK_CBLM_ID, "information-sheet") },
  { id: "sc-1-1-1", label: "SC 1.1.1 — Self-Check — Safety", badge: "✓ Finalized", badgeClass: "snb-done", dotColor: "#2E7D32", sub: true },
  { id: "ak-1-1-1", label: "AK 1.1.1 — Answer Key — Safety", badge: "✓ Finalized", badgeClass: "snb-done", dotColor: "#2E7D32", sub: true },
  { id: "is-1-1-2", label: "IS 1.1.2 — PPE Requirements", badge: "✓ Finalized", badgeClass: "snb-done", dotColor: "#2E7D32" },
  { id: "is-1-1-3", label: "IS 1.1.3 — Inspection Tools", badge: "Draft", badgeClass: "b-draft", dotColor: "#1565C0", href: cblmEditorPath(MOCK_CBLM_ID, "information-sheet") },
  { id: "ts-1-1-1", label: "TS 1.1.1 — Prepare EV Safety Check", badge: "Draft", badgeClass: "b-draft", dotColor: "#F57C00", href: cblmEditorPath(MOCK_CBLM_ID, "task-sheet") },
  { id: "pcc-1-1-1", label: "PCC 1.1.1 — EV Safety Preparation Criteria", badge: "Draft", badgeClass: "b-draft", dotColor: "#C62828", href: cblmEditorPath(MOCK_CBLM_ID, "performance-criterion") },
  { id: "lo2-h", label: "LO 2 — Visual inspection — None", badge: "--", badgeClass: "snb-pend", dotColor: "#BDBDBD" },
  { id: "lo3-h", label: "LO 3 — Documentation — None", badge: "--", badgeClass: "snb-pend", dotColor: "#BDBDBD" },
];

/** Step 3 unlock state — mirrors frontend when Step 2 is not fully finalized. */
export const consolidationUnlocked = false;

export const consolidationPageStatuses: Partial<
  Record<ConsolidationPageId, "draft" | "finalized">
> = {
  "job-sheet": "draft",
  "learning-experiences": "draft",
  references: "draft",
};

export type FrontMatterKind =
  | "cover"
  | "rev-history"
  | "howto"
  | "list"
  | "module-content"
  | "prerequisites"
  | "lo-summary";

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
      { type: "IS", typeColor: "#1565C0", typeBg: "#1565C022", code: "IS 1.1.1", title: "Safety Protocols for EV Inspection", status: "Finalized", badgeClass: "snb-done", editorHref: cblmEditorPath(MOCK_CBLM_ID, "information-sheet") },
      { type: "SC", typeColor: "#7C3AED", typeBg: "#7C3AED22", code: "SC 1.1.1", title: "Self-Check — Safety Protocols", status: "Finalized", badgeClass: "snb-done", editorHref: cblmEditorPath(MOCK_CBLM_ID, "self-check") },
      { type: "AK", typeColor: "#2E7D32", typeBg: "#2E7D3222", code: "AK 1.1.1", title: "Answer Key — Safety Protocols", status: "Finalized", badgeClass: "snb-done", editorHref: cblmEditorPath(MOCK_CBLM_ID, "answer-key") },
      { type: "IS", typeColor: "#1565C0", typeBg: "#1565C022", code: "IS 1.1.2", title: "PPE Requirements for HV Work", status: "Finalized", badgeClass: "snb-done" },
      { type: "IS", typeColor: "#1565C0", typeBg: "#1565C022", code: "IS 1.1.3", title: "Inspection Tools and Equipment", status: "Draft", badgeClass: "b-draft", editorHref: cblmEditorPath(MOCK_CBLM_ID, "information-sheet") },
      { type: "TS", typeColor: "#F57C00", typeBg: "#F57C0022", code: "TS 1.1.1", title: "Perform Pre-Inspection EV Safety Preparation", status: "Draft", badgeClass: "b-draft", editorHref: cblmEditorPath(MOCK_CBLM_ID, "task-sheet") },
      { type: "PCC", typeColor: "#C62828", typeBg: "#C6282822", code: "PCC 1.1.1", title: "EV Safety Preparation Criteria", status: "Draft", badgeClass: "b-draft", editorHref: cblmEditorPath(MOCK_CBLM_ID, "performance-criterion") },
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

export type VideoScriptSheetType = "task-sheet" | "job-sheet";

export type VideoScriptStatus =
  | "not_started"
  | "draft"
  | "finalized"
  | "locked";

export type VideoScriptRow = {
  id: string;
  sheetType: VideoScriptSheetType;
  code: string;
  title: string;
  cblmStatus: "draft" | "finalized";
  scriptStatus: VideoScriptStatus;
  durationMinutes: number | null;
  eligible: boolean;
  lockReason?: string;
};

export const videoScriptRows: VideoScriptRow[] = [
  {
    id: "ts-1-1-1",
    sheetType: "task-sheet",
    code: "TS 1.1.1",
    title: "Perform Pre-Inspection EV Safety Preparation",
    cblmStatus: "finalized",
    scriptStatus: "draft",
    durationMinutes: 45,
    eligible: true,
  },
  {
    id: "ts-1-2-1",
    sheetType: "task-sheet",
    code: "TS 1.2.1",
    title: "Conduct Exterior Visual Inspection",
    cblmStatus: "finalized",
    scriptStatus: "not_started",
    durationMinutes: 45,
    eligible: true,
  },
  {
    id: "ts-1-2-2",
    sheetType: "task-sheet",
    code: "TS 1.2.2",
    title: "Inspect HV System Warning Indicators",
    cblmStatus: "finalized",
    scriptStatus: "not_started",
    durationMinutes: 45,
    eligible: true,
  },
  {
    id: "js-1",
    sheetType: "job-sheet",
    code: "JS 1",
    title: "Integrated EV Fleet Inspection Job Sheet",
    cblmStatus: "draft",
    scriptStatus: "locked",
    durationMinutes: null,
    eligible: false,
    lockReason: "CBLM still in Draft",
  },
];

/** Dashboard module list — legacy F&B dashboard structure */
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
