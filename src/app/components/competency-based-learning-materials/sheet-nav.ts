import { cblmEditorPath, MOCK_CBLM_ID } from "@/app/utils/cblmRoutes";

import { formatSheetDisplayLabel } from "./sheet-code-utils";

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
  sub?: boolean;
};

export const MOCK_SHEET_NAV: MockSheetNavItem[] = [
  {
    id: "lo1-h",
    label: "LO 1 — Prepare for inspection — None",
    sheetType: "lo-header",
  },
  {
    id: "is-1-1-1",
    label: "1.1-1 — Safety Protocols for EV Inspection",
    sheetType: "information-sheet",
    code: "1.1-1",
    editorPage: "information-sheet",
    status: "finalized",
  },
  {
    id: "sc-1-1-1",
    label: "1.1-1",
    sheetType: "self-check",
    code: "1.1-1",
    editorPage: "self-check",
    status: "finalized",
    sub: true,
  },
  {
    id: "ak-1-1-1",
    label: "1.1-1",
    sheetType: "answer-key",
    code: "1.1-1",
    editorPage: "answer-key",
    status: "finalized",
    sub: true,
  },
  {
    id: "is-1-1-2",
    label: "1.1-2 — PPE Requirements",
    sheetType: "information-sheet",
    code: "1.1-2",
    editorPage: "information-sheet",
    status: "finalized",
  },
  {
    id: "is-1-1-3",
    label: "1.1-3 — Inspection Tools",
    sheetType: "information-sheet",
    code: "1.1-3",
    editorPage: "information-sheet",
    status: "draft",
  },
  {
    id: "ts-1-1-3",
    label: "1.1-3 — Prepare EV Safety Check",
    sheetType: "task-sheet",
    code: "1.1-3",
    editorPage: "task-sheet",
    status: "draft",
  },
  {
    id: "pcc-1-1-3",
    label: "1.1-3",
    sheetType: "performance-criterion",
    code: "1.1-3",
    editorPage: "performance-criterion",
    status: "draft",
    sub: true,
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
    sheetCode: "1.1-1",
    sheetType: "information-sheet",
    sheetTypeLabel: "Information Sheet",
    status: "finalized",
  },
  "self-check": {
    sheetCode: "1.1-1",
    sheetType: "self-check",
    sheetTypeLabel: "Self-Check",
    status: "finalized",
  },
  "answer-key": {
    sheetCode: "1.1-1",
    sheetType: "answer-key",
    sheetTypeLabel: "Answer Key",
    status: "finalized",
  },
  "task-sheet": {
    sheetCode: "1.1-3",
    sheetType: "task-sheet",
    sheetTypeLabel: "Task Sheet",
    status: "draft",
  },
  "performance-criterion": {
    sheetCode: "1.1-3",
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

function sheetNavCodeLabel(item: MockSheetNavItem): string {
  if (!item.code || item.sheetType === "lo-header") {
    return item.label;
  }

  return formatSheetDisplayLabel(
    sheetTypeLabel(item.sheetType),
    item.code,
  );
}

export function formatSheetNavLabel(item: MockSheetNavItem) {
  if (item.sheetType === "lo-header") {
    const parts = item.label.split(" — ");

    return {
      primary: parts[0] ?? item.label,
      secondary: parts.slice(1).join(" — ") || undefined,
    };
  }

  const codeLabel = sheetNavCodeLabel(item);

  if (item.sub) {
    return { primary: codeLabel };
  }

  const dashIdx = item.label.indexOf(" — ");

  if (dashIdx > 0) {
    return {
      primary: codeLabel,
      secondary: item.label.slice(dashIdx + 3),
    };
  }

  return { primary: codeLabel };
}

export function sheetEditorNavHref(
  item: MockSheetNavItem,
  cblmId = MOCK_CBLM_ID,
) {
  if (!item.editorPage || item.locked) return undefined;
  return cblmEditorPath(cblmId, item.editorPage, item.code);
}

export function resolveEditorNavItem(
  page: SheetEditorPage,
  sheetParam: string | null,
): MockSheetNavItem | undefined {
  const candidates = MOCK_SHEET_NAV.filter(
    (item) =>
      item.editorPage === page && !item.locked && item.code && item.sheetType,
  );

  if (sheetParam) {
    const matched = candidates.find((item) => item.code === sheetParam);
    if (matched) return matched;
  }

  const defaultCode = SHEET_PAGE_CONFIG[page]?.sheetCode;
  return (
    candidates.find((item) => item.code === defaultCode) ?? candidates[0]
  );
}

export function isSheetNavItemActive(
  item: MockSheetNavItem,
  activeSheetCode: string,
  activeSheetType: MockSheetType,
): boolean {
  return (
    item.code === activeSheetCode && item.sheetType === activeSheetType
  );
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
