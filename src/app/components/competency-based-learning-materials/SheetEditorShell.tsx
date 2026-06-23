import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CBLMStatusBadge } from "./CblmFrontendPrimitives";
import {
  formatSheetNavLabel,
  MOCK_SHEET_NAV,
  sheetEditorNavHref,
  sheetTypeLabel,
  type MockSheetNavItem,
  type MockSheetType,
} from "./sheet-nav";
import { MOCK_CBLM_ID } from "@/app/utils/cblmRoutes";
import { ucMeta } from "@/app/data/cblmData";

function ContextBlock({
  label,
  source,
  value,
}: {
  label: string;
  source: string;
  value: string;
}) {
  return (
    <div className="overflow-hidden rounded border border-gray-200">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-2.5 py-1.5">
        <span className="font-semibold">{label}</span>
        <span className="rounded bg-blue-50 px-1.5 py-px text-[9px] font-bold text-blue-700">
          {source}
        </span>
      </div>
      <div className="px-2.5 py-2 leading-5 wrap-break-word">{value}</div>
    </div>
  );
}

function SheetNavEntry({
  item,
  activeSheetCode,
  cblmId,
}: {
  item: MockSheetNavItem;
  activeSheetCode: string;
  cblmId: string;
}) {
  const { primary, secondary } = formatSheetNavLabel(item);
  const indentClass = "pl-6 pr-3";

  if (item.sheetType === "lo-header") {
    return (
      <div
        className="border-t border-gray-200 bg-gray-100 px-3 py-2 first:border-t-0"
        title={item.label}
      >
        <div className="truncate text-[11px] font-bold text-gray-800">
          {primary}
        </div>
        {secondary && (
          <div className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-gray-500">
            {secondary}
          </div>
        )}
      </div>
    );
  }

  const href = sheetEditorNavHref(item, cblmId);
  const active = item.code === activeSheetCode;

  if (item.locked || !href) {
    return (
      <div
        className={`py-2 text-[11px] text-gray-400 ${indentClass}`}
        title={item.label}
      >
        <div className="truncate">{primary}</div>
        {secondary && (
          <div className="mt-0.5 truncate text-[10px] text-gray-400">
            {secondary}
          </div>
        )}
        {item.locked && <span className="text-[10px]">🔒 Locked</span>}
      </div>
    );
  }

  return (
    <Link
      className={`block py-2 text-[11px] leading-snug no-underline ${indentClass} ${
        active
          ? "bg-blue-50 font-semibold text-blue-700"
          : "text-gray-600 hover:bg-gray-100"
      }`}
      title={item.label}
      to={href}
    >
      <div className="truncate">{primary}</div>
      {secondary && (
        <div
          className={`mt-0.5 truncate text-[10px] ${
            active ? "text-blue-600" : "text-gray-400"
          }`}
        >
          {secondary}
        </div>
      )}
    </Link>
  );
}

export function SheetEditorShell({
  activeSheetCode,
  activeSheetType,
  sheetStatus,
  cblmId = MOCK_CBLM_ID,
  children,
}: {
  activeSheetCode: string;
  activeSheetType: MockSheetType;
  sheetStatus?: "draft" | "finalized";
  cblmId?: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const selectableNavItems = MOCK_SHEET_NAV.filter(
    (item) => item.sheetType !== "lo-header" && !item.locked && item.editorPage,
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#F5F5F5]">
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="hidden min-h-0 w-56 shrink-0 flex-col overflow-y-auto border-r border-gray-200 bg-[#FAFAFA] lg:flex">
          <div className="mt-2 shrink-0 border-b border-gray-200 px-3 py-3">
            <div className="truncate text-[11px] font-bold uppercase tracking-wide text-blue-700">
              {ucMeta.unitCode}
            </div>
          </div>
          <nav className="min-h-0 flex-1 overflow-y-auto py-1">
            {MOCK_SHEET_NAV.map((item) => (
              <SheetNavEntry
                key={item.id}
                activeSheetCode={activeSheetCode}
                cblmId={cblmId}
                item={item}
              />
            ))}
          </nav>
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <div className="mt-2 flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <div className="truncate text-sm font-semibold text-gray-800">
                  {sheetTypeLabel(activeSheetType)} · {activeSheetCode}
                </div>
                {sheetStatus ? <CBLMStatusBadge status={sheetStatus} /> : null}
              </div>
              <div className="text-xs text-gray-500">
                {sheetStatus === "finalized"
                  ? "This sheet is finalized and can no longer be edited."
                  : "Copied upstream content is read-only. Use Edit in the header to change AI-synthesized fields."}
              </div>
            </div>
          </div>

          <div className="shrink-0 border-b border-gray-200 bg-[#FAFAFA] px-4 py-2 lg:hidden">
            <label className="sr-only" htmlFor="sheet-nav-select">
              Jump to sheet
            </label>
            <select
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs text-gray-800"
              id="sheet-nav-select"
              value={activeSheetCode}
              onChange={(event) => {
                const item = selectableNavItems.find(
                  (entry) => entry.code === event.target.value,
                );
                const href = item ? sheetEditorNavHref(item, cblmId) : undefined;
                if (href) navigate(href);
              }}
            >
              {selectableNavItems.map((item) => (
                <option key={item.id} value={item.code}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="shrink-0 border-b border-blue-100 bg-blue-50 px-4 py-2 text-xs text-blue-800 sm:px-5">
            Phase 1 active — Information Sheet body content uses LLM knowledge
            plus CS, CBC, and CLM only.
          </div>

          <div className="min-h-0 min-w-0 flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6">
            {children}
          </div>
        </div>

        <aside className="mt-2 hidden min-h-0 w-64 shrink-0 flex-col overflow-y-auto border-l border-gray-200 bg-white 2xl:flex">
          <div className="shrink-0 border-b border-gray-200 px-3 py-3 text-xs font-semibold text-gray-800">
            Generation Context
          </div>
          <div className="space-y-3 p-3 text-[11px] text-gray-700">
            <div className="rounded border border-amber-200 bg-amber-50 px-3 py-2 text-amber-900">
              Phase 1 — no web URLs or e-library. Sources: LLM + CS / CBC / CLM.
            </div>
            <ContextBlock
              label="Module"
              source="CBC"
              value={`${ucMeta.title} (${ucMeta.unitCode})`}
            />
            <ContextBlock
              label="Qualification"
              source="CS/CBC"
              value={ucMeta.qualificationName}
            />
            <ContextBlock
              label="Current sheet"
              source="CBLM"
              value={activeSheetCode}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
