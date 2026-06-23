import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

import { cn } from "./CblmFrontendPrimitives";
import {
  toVideoScriptCode,
  videoScriptEditorHref,
} from "./mock-video-scripts-utils";
import { ucMeta, type VideoScriptRow } from "@/app/data/cblmData";
import { cblmVideoScriptsPath } from "@/app/utils/cblmRoutes";

function ScriptNavEntry({
  row,
  active,
}: {
  row: VideoScriptRow;
  active: boolean;
}) {
  const scriptCode = toVideoScriptCode(row.code, row.sheetType);
  const isLocked = !row.eligible || row.scriptStatus === "locked";

  if (isLocked) {
    return (
      <div className="px-3 py-2 text-[11px] text-gray-400" title={row.title}>
        <div className="truncate font-medium">{scriptCode}</div>
        <div className="mt-1 flex flex-wrap gap-1">
          <span className="rounded bg-gray-100 px-1.5 py-px text-[9px] font-semibold text-gray-500">
            Locked
          </span>
          <span className="rounded bg-gray-100 px-1.5 py-px text-[9px] text-gray-500">
            CBLM Draft
          </span>
        </div>
      </div>
    );
  }

  const inProgress = row.scriptStatus === "draft";

  return (
    <Link
      className={cn(
        "block px-3 py-2 text-[11px] leading-snug no-underline",
        active
          ? "bg-blue-50 font-semibold text-blue-700"
          : "text-gray-600 hover:bg-gray-100",
      )}
      title={row.title}
      to={videoScriptEditorHref(row.code)}
    >
      <div className="flex items-center gap-1.5 truncate">
        {inProgress && active && (
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
        )}
        <span className="truncate">{scriptCode}</span>
      </div>
      <div className="mt-1 flex flex-wrap gap-1">
        <span
          className={cn(
            "rounded px-1.5 py-px text-[9px] font-semibold",
            inProgress
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-600",
          )}
        >
          {inProgress ? "In Progress" : "Not Started"}
        </span>
        <span className="rounded bg-green-50 px-1.5 py-px text-[9px] font-semibold text-green-700">
          CBLM Finalized
        </span>
      </div>
    </Link>
  );
}

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

export function VideoScriptEditorShell({
  rows,
  activeSheetCode,
  scriptCode,
  durationEstimate,
  sourceSheetCode,
  sourcePccCode,
  children,
}: {
  rows: VideoScriptRow[];
  activeSheetCode: string;
  scriptCode: string;
  durationEstimate: string;
  sourceSheetCode: string;
  sourcePccCode: string | null;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const taskRows = rows.filter((row) => row.sheetType === "task-sheet");
  const jobRows = rows.filter((row) => row.sheetType === "job-sheet");
  const selectableRows = rows.filter((row) => row.eligible);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#F5F5F5]">
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="hidden min-h-0 w-56 shrink-0 flex-col overflow-y-auto border-r border-gray-200 bg-[#FAFAFA] lg:flex">
          <div className="mt-2 shrink-0 border-b border-gray-200 px-3 py-3">
            <div className="text-[11px] font-bold uppercase tracking-wide text-blue-700">
              Video Scripts
            </div>
            <div className="mt-0.5 truncate text-[10px] text-gray-500">
              {ucMeta.unitCode} — Module 1
            </div>
          </div>
          <nav className="min-h-0 flex-1 overflow-y-auto py-1">
            <Link
              className="block border-b border-gray-200 px-3 py-2 text-[11px] font-semibold text-blue-700 no-underline hover:bg-gray-100"
              to={cblmVideoScriptsPath()}
            >
              ← All Scripts
            </Link>
            <div className="border-t border-gray-200 bg-gray-100 px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-gray-600 first:border-t-0">
              Task Sheet Scripts
            </div>
            {taskRows.map((row) => (
              <ScriptNavEntry
                key={row.id}
                active={row.code === activeSheetCode}
                row={row}
              />
            ))}
            {jobRows.length > 0 && (
              <>
                <div className="border-t border-gray-200 bg-gray-100 px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-gray-600">
                  Job Sheet Script
                </div>
                {jobRows.map((row) => (
                  <ScriptNavEntry
                    key={row.id}
                    active={row.code === activeSheetCode}
                    row={row}
                  />
                ))}
              </>
            )}
          </nav>
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <div className="mt-2 flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-gray-800">
                {scriptCode}
              </div>
            </div>
          </div>

          <div className="shrink-0 border-b border-gray-200 bg-[#FAFAFA] px-4 py-2 lg:hidden">
            <label className="sr-only" htmlFor="video-script-nav-select">
              Jump to script
            </label>
            <select
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs text-gray-800"
              id="video-script-nav-select"
              value={activeSheetCode}
              onChange={(event) => {
                navigate(videoScriptEditorHref(event.target.value));
              }}
            >
              {selectableRows.map((row) => (
                <option key={row.id} value={row.code}>
                  {toVideoScriptCode(row.code, row.sheetType)}
                </option>
              ))}
            </select>
          </div>

          <div className="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
            {children}
          </div>
        </div>

        <aside className="mt-2 hidden min-h-0 w-64 shrink-0 flex-col overflow-y-auto border-l border-gray-200 bg-white 2xl:flex">
          <div className="shrink-0 border-b border-gray-200 px-3 py-3 text-xs font-semibold text-gray-800">
            Script Sources
          </div>
          <div className="space-y-3 p-3 text-[11px] text-gray-700">
            <ContextBlock
              label={sourceSheetCode.split(" + ")[0]}
              source="Task Sheet"
              value="Procedure steps from the finalized task sheet are used as the script row basis."
            />
            {sourcePccCode && (
              <ContextBlock
                label={sourcePccCode}
                source="Quality Ref"
                value="Performance criteria are integrated into generated script rows via AI prompts."
              />
            )}
            <div className="rounded border border-blue-200 bg-blue-50 px-3 py-2 text-blue-900">
              <div className="font-semibold">Duration Estimate</div>
              <div className="mt-1 leading-5">{durationEstimate}</div>
              <div className="mt-1 text-[10px]">Within 3–5 min target.</div>
            </div>
            <p className="text-[10px] leading-relaxed text-gray-500">
              Export as .docx for production use. Trainer uses this script to
              direct video recording.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
