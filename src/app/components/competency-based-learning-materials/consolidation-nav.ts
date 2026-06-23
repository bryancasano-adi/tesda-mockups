export type ConsolidationPageId =
  | "job-sheet"
  | "learning-experiences"
  | "references"
  | "export";

export type ConsolidationNavItem = {
  id: ConsolidationPageId;
  label: string;
  subtitle: string;
};

export const CONSOLIDATION_NAV: ConsolidationNavItem[] = [
  { id: "job-sheet", label: "JS", subtitle: "Job Sheet" },
  {
    id: "learning-experiences",
    label: "LET",
    subtitle: "Learning Experiences Table",
  },
  {
    id: "references",
    label: "References",
    subtitle: "Consolidated References",
  },
  { id: "export", label: "Export", subtitle: "Export Module" },
];

export function consolidationPageLabel(pageId: ConsolidationPageId) {
  return (
    CONSOLIDATION_NAV.find((item) => item.id === pageId)?.subtitle ??
    "Consolidation"
  );
}

export const CONSOLIDATION_PAGE_ORDER: ConsolidationPageId[] =
  CONSOLIDATION_NAV.map((item) => item.id);

export function nextConsolidationPage(
  current: ConsolidationPageId,
): ConsolidationPageId | undefined {
  const index = CONSOLIDATION_PAGE_ORDER.indexOf(current);
  if (index < 0 || index >= CONSOLIDATION_PAGE_ORDER.length - 1) {
    return undefined;
  }

  return CONSOLIDATION_PAGE_ORDER[index + 1];
}
