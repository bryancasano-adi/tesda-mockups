export const CBC_BASE = "/cbc";

/** True for /cbc and every nested CBC/CBLM path (e.g. /cbc/editor, /cbc/module). */
export function isCblmRoute(pathname: string): boolean {
  return pathname === CBC_BASE || pathname.startsWith(`${CBC_BASE}/`);
}
