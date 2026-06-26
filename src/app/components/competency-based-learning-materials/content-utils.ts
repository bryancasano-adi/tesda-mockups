import type { MockSheetRow } from "@/app/data/cblmData";

import type { MockSheetType } from "./sheet-nav";

/** Maps Step 2 list abbreviations to editor sheet types. */
export const MOCK_SHEET_TYPE_ABBR: Record<string, MockSheetType> = {
  IS: "information-sheet",
  SC: "self-check",
  AK: "answer-key",
  TS: "task-sheet",
  PCC: "performance-criterion",
  OS: "operation-sheet",
};

/** Badge colors grouped by CBLM sheet family (content vs. activity). */
export const SHEET_TYPE_BADGE_CLASSES: Record<MockSheetType, string> = {
  "lo-header": "bg-gray-100 border-gray-300 text-gray-700",
  "information-sheet": "bg-blue-50 border-blue-400 text-blue-700",
  "self-check": "bg-violet-50 border-violet-400 text-violet-700",
  "answer-key": "bg-slate-100 border-slate-400 text-slate-700",
  "task-sheet": "bg-amber-50 border-amber-400 text-amber-800",
  "performance-criterion":
    "bg-rose-50 border-rose-400 text-rose-700",
  "operation-sheet": "bg-teal-50 border-teal-400 text-teal-700",
};

const SHEET_EDITABLE_FIELD_LABELS: Partial<
  Record<MockSheetType, string[]>
> = {
  "information-sheet": [
    "Learning Objective",
    "Body Content",
    "Recommended Image Description",
  ],
  "self-check": ["Questions", "Answer choices"],
  "answer-key": ["Correct answers"],
  "task-sheet": [
    "Performance Objective",
    "Supplies/Materials",
    "Tools and Equipment",
    "Steps/Procedure",
  ],
  "performance-criterion": ["Checklist items"],
  "operation-sheet": ["Steps/Procedure"],
};

export function sheetTypeBadgeClasses(type: MockSheetType): string {
  return SHEET_TYPE_BADGE_CLASSES[type];
}

export function sheetEditableFieldLabels(type: MockSheetType): string[] {
  return SHEET_EDITABLE_FIELD_LABELS[type] ?? [];
}

function titleFromMockSheetLabel(label: string): string {
  const dashIdx = label.indexOf(" — ");

  return dashIdx > 0 ? label.slice(dashIdx + 3) : "";
}

export function getMockSheetRowTitle(
  sheet: MockSheetRow,
  loSheets: MockSheetRow[],
): string {
  switch (sheet.type) {
    case "IS":
      return titleFromMockSheetLabel(sheet.label);
    case "SC":
    case "AK": {
      const is = loSheets.find(
        (entry) => entry.type === "IS" && entry.code === sheet.code,
      );
      const title = is ? titleFromMockSheetLabel(is.label) : "";

      return title ? `for ${title}` : "";
    }
    case "PCC": {
      const ts = loSheets.find(
        (entry) => entry.type === "TS" && entry.code === sheet.code,
      );
      const title = ts ? titleFromMockSheetLabel(ts.label) : "";

      return title ? `for ${title}` : "";
    }
    case "TS":
    case "OS":
      return titleFromMockSheetLabel(sheet.label);
    default:
      return titleFromMockSheetLabel(sheet.label);
  }
}
