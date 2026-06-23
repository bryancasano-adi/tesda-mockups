import type { MockLoGroup } from "@/app/data/cblmData";
import { ucMeta } from "@/app/data/cblmData";

export type ExportReadinessRow = {
  id: string;
  section: string;
  dotColor: string;
  validated: number;
  total: number;
};

const FRONT_MATTER_SHEET_COUNT = 6;

export function buildMockExportReadiness(
  loGroups: MockLoGroup[],
): ExportReadinessRow[] {
  const rows: ExportReadinessRow[] = [
    {
      id: "front-matter",
      section: "Front Matter",
      dotColor: "#1B3A5C",
      validated: FRONT_MATTER_SHEET_COUNT,
      total: FRONT_MATTER_SHEET_COUNT,
    },
  ];

  for (const lo of loGroups) {
    const total = lo.sheets.length;
    const validated = lo.sheets.filter((s) => s.status === "finalized").length;
    const shortTitle = lo.loTitle.split("—")[0]?.trim() ?? lo.loTitle;

    rows.push({
      id: `lo-${lo.loNumber}`,
      section: `LO ${lo.loNumber} — ${shortTitle}`,
      dotColor: "#1565C0",
      validated,
      total,
    });
  }

  rows.push({
    id: "consolidation",
    section: "Step 3 — Consolidation",
    dotColor: "#2E7D32",
    validated: 0,
    total: 3,
  });

  return rows;
}

export function exportReadinessSummary(loGroups: MockLoGroup[]) {
  const rows = buildMockExportReadiness(loGroups);
  const validated = rows.reduce((sum, row) => sum + row.validated, 0);
  const total = rows.reduce((sum, row) => sum + row.total, 0);

  return { rows, validated, total, unvalidated: total - validated };
}

export function buildDefaultExportFileName() {
  const docNo = ucMeta.documentNo.replace(/\s+/g, "-");
  const rev = ucMeta.revision.padStart(2, "0");

  return `CBLM_${docNo}_Module1_v${rev}.docx`;
}

export function exportStatusLabel(validated: number, total: number) {
  if (total === 0) {
    return { text: "No sheets", color: "text-gray-400" };
  }
  if (validated === 0) {
    return { text: "No validated sheets", color: "text-gray-400" };
  }
  if (validated === total) {
    return { text: "✓ Included", color: "text-green-700" };
  }

  return { text: "✓ Included", color: "text-green-700" };
}
