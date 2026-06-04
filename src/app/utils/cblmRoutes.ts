/** True for /cblm and every nested CBLM path (e.g. /cblm/editor, /cblm/front-matter). */
export function isCblmRoute(pathname: string): boolean {
  return pathname === "/cblm" || pathname.startsWith("/cblm/");
}
