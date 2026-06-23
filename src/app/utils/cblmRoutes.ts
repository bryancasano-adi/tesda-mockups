import type { ConsolidationPageId } from "@/app/components/competency-based-learning-materials/consolidation-nav";

export const CBLM_BASE = "/cblm";
export const MOCK_CBLM_ID = "demo";

/** True for /cblm and every nested CBLM path. */
export function isCblmRoute(pathname: string): boolean {
  return pathname === CBLM_BASE || pathname.startsWith(`${CBLM_BASE}/`);
}

export function cblmDashboardPath() {
  return CBLM_BASE;
}

export function cblmModulePath(cblmId = MOCK_CBLM_ID) {
  return `${CBLM_BASE}/${cblmId}`;
}

export function cblmFrontMatterPath(
  cblmId = MOCK_CBLM_ID,
  section = "cover",
) {
  return `${CBLM_BASE}/${cblmId}/front-matter?page=${section}`;
}

export function cblmEditorPath(
  cblmId = MOCK_CBLM_ID,
  page = "information-sheet",
) {
  return `${CBLM_BASE}/${cblmId}/editor?page=${page}`;
}

export function consolidationNavHref(
  pageId: ConsolidationPageId,
  cblmId = MOCK_CBLM_ID,
) {
  return `${CBLM_BASE}/${cblmId}/consolidation?page=${pageId}`;
}

export function cblmVideoScriptsPath(cblmId = MOCK_CBLM_ID) {
  return `${CBLM_BASE}/${cblmId}/video-scripts`;
}

export function cblmVideoScriptEditorPath(
  sheetCode: string,
  cblmId = MOCK_CBLM_ID,
) {
  return `${CBLM_BASE}/${cblmId}/video-scripts/edit?sheet=${encodeURIComponent(sheetCode)}`;
}

/** Editor / consolidation / front-matter shells are full-bleed. */
export function isCblmFullBleedRoute(pathname: string): boolean {
  return (
    pathname.includes("/editor") ||
    pathname.includes("/consolidation") ||
    pathname.includes("/front-matter") ||
    pathname.includes("/video-scripts/edit")
  );
}
