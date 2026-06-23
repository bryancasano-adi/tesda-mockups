import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  CONSOLIDATION_NAV,
  consolidationPageLabel,
  nextConsolidationPage,
  type ConsolidationPageId,
} from "./consolidation-nav";
import { CBLMStatusBadge } from "./CblmFrontendPrimitives";
import { consolidationNavHref } from "@/app/utils/cblmRoutes";
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

function ConsolidationNavEntry({
  item,
  active,
  locked,
}: {
  item: (typeof CONSOLIDATION_NAV)[number];
  active: boolean;
  locked: boolean;
}) {
  if (locked) {
    return (
      <div
        className="px-3 py-2 text-[11px] text-gray-400"
        title={item.subtitle}
      >
        <div className="truncate">{item.label}</div>
        <div className="mt-0.5 truncate text-[10px] text-gray-400">
          {item.subtitle}
        </div>
        <span className="text-[10px]">🔒 Locked</span>
      </div>
    );
  }

  return (
    <Link
      className={`block px-3 py-2 text-[11px] leading-snug no-underline ${
        active
          ? "bg-blue-50 font-semibold text-blue-700"
          : "text-gray-600 hover:bg-gray-100"
      }`}
      title={item.subtitle}
      to={consolidationNavHref(item.id)}
    >
      <div className="truncate">{item.label}</div>
      <div
        className={`mt-0.5 truncate text-[10px] ${
          active ? "text-blue-600" : "text-gray-400"
        }`}
      >
        {item.subtitle}
      </div>
    </Link>
  );
}

export function ConsolidationShell({
  activePage,
  unlocked,
  pageStatus,
  notice,
  taskSheetCodes,
  children,
}: {
  activePage: ConsolidationPageId;
  unlocked: boolean;
  pageStatus?: "draft" | "finalized";
  notice: string;
  taskSheetCodes: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const activeLabel = consolidationPageLabel(activePage);
  const nextPage = nextConsolidationPage(activePage);
  const selectableNavItems = CONSOLIDATION_NAV.filter(
    (item) => unlocked || item.id === "export",
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#F5F5F5]">
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="hidden min-h-0 w-56 shrink-0 flex-col overflow-y-auto border-r border-gray-200 bg-[#FAFAFA] lg:flex">
          <div className="mt-2 shrink-0 border-b border-gray-200 px-3 py-3">
            <div className="text-[11px] font-bold uppercase tracking-wide text-blue-700">
              Consolidation
            </div>
            <div className="mt-0.5 truncate text-[10px] text-gray-500">
              {ucMeta.unitCode} — Module 1
            </div>
          </div>
          <nav className="min-h-0 flex-1 overflow-y-auto py-1">
            {CONSOLIDATION_NAV.map((item) => (
              <ConsolidationNavEntry
                key={item.id}
                active={activePage === item.id}
                item={item}
                locked={!unlocked && item.id !== "export"}
              />
            ))}
          </nav>
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <div className="mt-2 flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <div className="truncate text-sm font-semibold text-gray-800">
                  {activePage === "export"
                    ? `Export CBLM — ${ucMeta.unitCode}`
                    : `Consolidation · ${activeLabel}`}
                </div>
                {pageStatus ? <CBLMStatusBadge status={pageStatus} /> : null}
              </div>
              <div className="text-xs text-gray-500">
                {activePage === "export"
                  ? `${ucMeta.titleLower} · ${ucMeta.project} · Module 1 · Document No: ${ucMeta.documentNo} · Revision No: ${ucMeta.revision}`
                  : "Step 3 documents consolidate finalized Step 2 sheets across all learning outcomes."}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {activePage === "export" && (
                <button
                  className="rounded-md bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-800"
                  type="button"
                  onClick={() =>
                    document.getElementById("cblm-export-open")?.click()
                  }
                >
                  ↓ Export as .docx
                </button>
              )}
              {nextPage && unlocked && activePage !== "export" && (
                <Link
                  className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 no-underline"
                  to={consolidationNavHref(nextPage)}
                >
                  {consolidationPageLabel(nextPage)} →
                </Link>
              )}
            </div>
          </div>

          <div className="shrink-0 border-b border-gray-200 bg-[#FAFAFA] px-4 py-2 lg:hidden">
            <label className="sr-only" htmlFor="consolidation-nav-select">
              Jump to section
            </label>
            <select
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs text-gray-800"
              id="consolidation-nav-select"
              value={activePage}
              onChange={(event) => {
                navigate(
                  consolidationNavHref(
                    event.target.value as ConsolidationPageId,
                  ),
                );
              }}
            >
              {selectableNavItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.subtitle}
                </option>
              ))}
            </select>
          </div>

          <div className="shrink-0 border-b border-blue-100 bg-blue-50 px-4 py-2 text-xs text-blue-800 sm:px-5">
            {notice}
          </div>

          <div className="min-h-0 min-w-0 flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6">
            {children}
          </div>
        </div>

        {activePage !== "export" && (
          <aside className="mt-2 hidden min-h-0 w-64 shrink-0 flex-col overflow-y-auto border-l border-gray-200 bg-white 2xl:flex">
            <div className="shrink-0 border-b border-gray-200 px-3 py-3 text-xs font-semibold text-gray-800">
              Source Documents
            </div>
            <div className="space-y-3 p-3 text-[11px] text-gray-700">
              <div className="rounded border border-amber-200 bg-amber-50 px-3 py-2 text-amber-900">
                Phase 1 — LLM knowledge plus CS, CBC, and CLM only.
              </div>
              <ContextBlock
                label="Module"
                source="CBC"
                value={`${ucMeta.titleLower} (${ucMeta.unitCode})`}
              />
              <ContextBlock
                label="Qualification"
                source="CS/CBC"
                value={ucMeta.qualificationName}
              />
              <ContextBlock
                label="Task Sheets"
                source="CBLM"
                value={taskSheetCodes || "None generated yet"}
              />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
