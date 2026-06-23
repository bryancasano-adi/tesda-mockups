import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FRONT_MATTER_ALL_NAV,
  FRONT_MATTER_NAV,
  FRONT_MATTER_REV_HISTORY_NAV,
  frontMatterNavHref,
  frontMatterPageLabel,
  nextFrontMatterPage,
  type FrontMatterNavItem,
  type FrontMatterPageId,
} from "./front-matter-nav";
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

function FrontMatterNavEntry({
  item,
  active,
  cblmId,
}: {
  item: FrontMatterNavItem;
  active: boolean;
  cblmId: string;
}) {
  return (
    <Link
      className={`block px-3 py-2 text-[11px] leading-snug no-underline ${
        active
          ? "bg-blue-50 font-semibold text-blue-700"
          : "text-gray-600 hover:bg-gray-100"
      }`}
      title={item.subtitle}
      to={frontMatterNavHref(item.id, cblmId)}
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

export function FrontMatterShell({
  activePage,
  cblmId = MOCK_CBLM_ID,
  notice,
  children,
}: {
  activePage: FrontMatterPageId;
  cblmId?: string;
  notice: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const activeLabel = frontMatterPageLabel(activePage);
  const nextPage = nextFrontMatterPage(activePage);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#F5F5F5]">
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="hidden min-h-0 w-56 shrink-0 flex-col overflow-y-auto border-r border-gray-200 bg-[#FAFAFA] lg:flex">
          <div className="mt-2 shrink-0 border-b border-gray-200 px-3 py-3">
            <div className="text-[11px] font-bold uppercase tracking-wide text-blue-700">
              Front Matter
            </div>
            <div className="mt-0.5 truncate text-[10px] text-gray-500">
              {ucMeta.unitCode} — Module 1
            </div>
          </div>
          <nav className="min-h-0 flex-1 overflow-y-auto py-1">
            {FRONT_MATTER_NAV.map((item) => (
              <FrontMatterNavEntry
                key={item.id}
                active={activePage === item.id}
                cblmId={cblmId}
                item={item}
              />
            ))}
            <div className="my-1 border-t border-gray-200" />
            <FrontMatterNavEntry
              active={activePage === FRONT_MATTER_REV_HISTORY_NAV.id}
              cblmId={cblmId}
              item={FRONT_MATTER_REV_HISTORY_NAV}
            />
          </nav>
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <div className="mt-2 flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-gray-800">
                Front Matter · {activeLabel}
              </div>
              {activePage !== "rev-history" && (
                <div className="text-xs text-gray-500">
                  Auto-initialized from qualification metadata. Read-only fields
                  are system-generated or pulled from CS/CBC.
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {nextPage && (
                <Link
                  className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 no-underline hover:bg-gray-50"
                  to={frontMatterNavHref(nextPage, cblmId)}
                >
                  {frontMatterPageLabel(nextPage)} →
                </Link>
              )}
            </div>
          </div>

          <div className="shrink-0 border-b border-gray-200 bg-[#FAFAFA] px-4 py-2 lg:hidden">
            <label className="sr-only" htmlFor="front-matter-nav-select">
              Jump to section
            </label>
            <select
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs text-gray-800"
              id="front-matter-nav-select"
              value={activePage}
              onChange={(event) => {
                navigate(
                  frontMatterNavHref(
                    event.target.value as FrontMatterPageId,
                    cblmId,
                  ),
                );
              }}
            >
              {FRONT_MATTER_ALL_NAV.map((item) => (
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

        <aside className="mt-2 hidden min-h-0 w-64 shrink-0 flex-col overflow-y-auto border-l border-gray-200 bg-white 2xl:flex">
          <div className="shrink-0 border-b border-gray-200 px-3 py-3 text-xs font-semibold text-gray-800">
            Metadata Source
          </div>
          <div className="space-y-3 p-3 text-[11px] text-gray-700">
            <ContextBlock
              label="Qualification"
              source="CS / CBC"
              value={ucMeta.qualificationName}
            />
            <ContextBlock
              label="Module Source"
              source="CS"
              value={`Module 1: ${ucMeta.unitCode}`}
            />
            <div className="rounded border border-gray-200 bg-gray-50 px-3 py-2 text-[10px] leading-relaxed text-gray-600">
              No AI generation on front matter. All fields are metadata or
              template text.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
