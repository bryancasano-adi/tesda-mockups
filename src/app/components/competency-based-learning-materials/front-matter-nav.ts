import { cblmFrontMatterPath, MOCK_CBLM_ID } from "@/app/utils/cblmRoutes";

export type FrontMatterPageId =
  | "cover"
  | "howto"
  | "list"
  | "module-content"
  | "prerequisites"
  | "lo-summary"
  | "rev-history";

export type FrontMatterNavItem = {
  id: FrontMatterPageId;
  label: string;
  subtitle: string;
};

export const FRONT_MATTER_NAV: FrontMatterNavItem[] = [
  { id: "cover", label: "Cover", subtitle: "Front Cover" },
  { id: "howto", label: "How to Use", subtitle: "How to Use Module" },
  { id: "list", label: "List of Comp.", subtitle: "List of Competencies" },
  {
    id: "module-content",
    label: "Module Content",
    subtitle: "Module Content Summary",
  },
  { id: "prerequisites", label: "Prerequisites", subtitle: "Prerequisites" },
  { id: "lo-summary", label: "LO Summary", subtitle: "LO Summary Table" },
];

export const FRONT_MATTER_REV_HISTORY_NAV: FrontMatterNavItem = {
  id: "rev-history",
  label: "Rev History",
  subtitle: "Revision History",
};

export const FRONT_MATTER_ALL_NAV: FrontMatterNavItem[] = [
  ...FRONT_MATTER_NAV,
  FRONT_MATTER_REV_HISTORY_NAV,
];

export function frontMatterNavHref(
  pageId: FrontMatterPageId,
  cblmId = MOCK_CBLM_ID,
) {
  return cblmFrontMatterPath(cblmId, pageId);
}

export function frontMatterPageLabel(pageId: FrontMatterPageId) {
  return (
    FRONT_MATTER_ALL_NAV.find((item) => item.id === pageId)?.subtitle ??
    "Front Matter"
  );
}

export const FRONT_MATTER_PAGE_ORDER: FrontMatterPageId[] =
  FRONT_MATTER_ALL_NAV.map((item) => item.id);

export function nextFrontMatterPage(
  current: FrontMatterPageId,
): FrontMatterPageId | undefined {
  const index = FRONT_MATTER_PAGE_ORDER.indexOf(current);
  if (index < 0 || index >= FRONT_MATTER_PAGE_ORDER.length - 1) {
    return undefined;
  }

  return FRONT_MATTER_PAGE_ORDER[index + 1];
}

export function sectionNotice(
  section: FrontMatterPageId,
  isEditing: boolean,
) {
  if (section === "cover") {
    return isEditing
      ? "Editing cover overrides. Save when finished — system-generated fields remain read-only."
      : "Step 1 — Front Matter. System-generated fields are read-only; cover overrides update the live preview below.";
  }

  if (section === "rev-history") {
    return "Revision history appears on page 2 of the exported document. Revision No. is system-generated; other fields are editable.";
  }

  return "Step 1 sections are auto-populated from the finalized CLM, CS, and CBC. No AI generation.";
}
