import { cblmEditorPath, MOCK_CBLM_ID } from "@/app/utils/cblmRoutes";

export type MockSheetType =
  | "lo-header"
  | "information-sheet"
  | "self-check"
  | "answer-key"
  | "task-sheet"
  | "performance-criterion";

export type SheetEditorPage =
  | "information-sheet"
  | "self-check"
  | "answer-key"
  | "task-sheet"
  | "performance-criterion";

export type MockSheetNavItem = {
  id: string;
  label: string;
  sheetType: MockSheetType;
  code?: string;
  locked?: boolean;
  editorPage?: SheetEditorPage;
  status?: "draft" | "finalized";
};

export const MOCK_SHEET_NAV: MockSheetNavItem[] = [
  {
    id: "lo1-h",
    label: "LO 1 — Prepare for inspection — None",
    sheetType: "lo-header",
  },
  {
    id: "is-1-1-1",
    label: "IS 1.1.1 — Safety Protocols for EV Inspection",
    sheetType: "information-sheet",
    code: "IS 1.1.1",
    editorPage: "information-sheet",
    status: "finalized",
  },
  {
    id: "sc-1-1-1",
    label: "SC 1.1.1 — Self-Check — Safety",
    sheetType: "self-check",
    code: "SC 1.1.1",
    editorPage: "self-check",
    status: "finalized",
  },
  {
    id: "ak-1-1-1",
    label: "AK 1.1.1 — Answer Key — Safety",
    sheetType: "answer-key",
    code: "AK 1.1.1",
    editorPage: "answer-key",
    status: "finalized",
  },
  {
    id: "is-1-1-2",
    label: "IS 1.1.2 — PPE Requirements",
    sheetType: "information-sheet",
    code: "IS 1.1.2",
    editorPage: "information-sheet",
    status: "finalized",
  },
  {
    id: "is-1-1-3",
    label: "IS 1.1.3 — Inspection Tools",
    sheetType: "information-sheet",
    code: "IS 1.1.3",
    editorPage: "information-sheet",
    status: "draft",
  },
  {
    id: "ts-1-1-1",
    label: "TS 1.1.1 — Prepare EV Safety Check",
    sheetType: "task-sheet",
    code: "TS 1.1.1",
    editorPage: "task-sheet",
    status: "draft",
  },
  {
    id: "pcc-1-1-1",
    label: "PCC 1.1.1 — EV Safety Preparation Criteria",
    sheetType: "performance-criterion",
    code: "PCC 1.1.1",
    editorPage: "performance-criterion",
    status: "draft",
  },
  {
    id: "lo2-h",
    label: "LO 2 — Visual inspection — None",
    sheetType: "lo-header",
  },
  {
    id: "lo3-h",
    label: "LO 3 — Documentation — None",
    sheetType: "lo-header",
  },
];

export const SHEET_PAGE_CONFIG: Record<
  SheetEditorPage,
  {
    sheetCode: string;
    sheetType: MockSheetType;
    sheetTypeLabel: string;
    status: "draft" | "finalized";
  }
> = {
  "information-sheet": {
    sheetCode: "IS 1.1.1",
    sheetType: "information-sheet",
    sheetTypeLabel: "Information Sheet",
    status: "finalized",
  },
  "self-check": {
    sheetCode: "SC 1.1.1",
    sheetType: "self-check",
    sheetTypeLabel: "Self-Check",
    status: "finalized",
  },
  "answer-key": {
    sheetCode: "AK 1.1.1",
    sheetType: "answer-key",
    sheetTypeLabel: "Answer Key",
    status: "finalized",
  },
  "task-sheet": {
    sheetCode: "TS 1.1.1",
    sheetType: "task-sheet",
    sheetTypeLabel: "Task Sheet",
    status: "draft",
  },
  "performance-criterion": {
    sheetCode: "PCC 1.1.1",
    sheetType: "performance-criterion",
    sheetTypeLabel: "Performance Criteria Checklist",
    status: "draft",
  },
};

export function sheetTypeLabel(type: MockSheetType): string {
  switch (type) {
    case "information-sheet":
      return "Information Sheet";
    case "self-check":
      return "Self-Check";
    case "answer-key":
      return "Answer Key";
    case "task-sheet":
      return "Task Sheet";
    case "performance-criterion":
      return "Performance Criteria Checklist";
    default:
      return "Sheet";
  }
}

export function formatSheetNavLabel(item: MockSheetNavItem) {
  const parts = item.label.split(" — ");
  return {
    primary: parts[0] ?? item.label,
    secondary: parts.slice(1).join(" — ") || undefined,
  };
}

export function sheetEditorNavHref(
  item: MockSheetNavItem,
  cblmId = MOCK_CBLM_ID,
) {
  if (!item.editorPage || item.locked) return undefined;
  return cblmEditorPath(cblmId, item.editorPage);
}

export function getSheetStatus(
  sheetCode: string,
  sheetType: MockSheetType,
): "draft" | "finalized" | undefined {
  const item = MOCK_SHEET_NAV.find(
    (entry) => entry.code === sheetCode && entry.sheetType === sheetType,
  );
  return item?.status;
}
