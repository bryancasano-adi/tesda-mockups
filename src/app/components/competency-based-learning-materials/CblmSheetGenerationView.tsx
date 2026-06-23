import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import {
  CBLMStatusBadge,
  cn,
} from "./CblmFrontendPrimitives";
import { cblmEditorPath } from "@/app/utils/cblmRoutes";
import type { MockLoGroup, MockSheetRow } from "@/app/data/cblmData";

const SHEET_TYPE_ABBR: Record<string, string> = {
  IS: "IS",
  SC: "SC",
  AK: "AK",
  TS: "TS",
  PCC: "PCC",
  OS: "OS",
};

function SheetRow({ sheet }: { sheet: MockSheetRow }) {
  if (sheet.locked) {
    return (
      <div className="flex items-center justify-between rounded border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-500">
        <span>{sheet.label}</span>
        <span>Locked</span>
      </div>
    );
  }

  return (
    <Link
      className="flex items-center justify-between gap-2 rounded border border-gray-200 px-3 py-2 text-xs hover:bg-gray-50 no-underline"
      to={cblmEditorPath(undefined, sheet.editorPage ?? "information-sheet")}
    >
      <span className="flex min-w-0 items-center gap-2">
        <span className="inline-flex shrink-0 rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-700">
          {SHEET_TYPE_ABBR[sheet.type] ?? sheet.type}
        </span>
        <span className="truncate font-medium text-gray-800">{sheet.label}</span>
      </span>
      <CBLMStatusBadge status={sheet.status} />
    </Link>
  );
}

function formatLoBadge(loNumber: string) {
  const trimmed = loNumber.trim();
  return trimmed.toUpperCase().startsWith("LO") ? trimmed : `LO ${trimmed}`;
}

function LOSection({
  lo,
  defaultOpen,
  children,
}: {
  lo: MockLoGroup;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  const headerExtra = (
    <>
      <span className="inline-flex shrink-0 rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[11px] font-medium text-gray-600">
        {lo.sheets.length} {lo.sheets.length === 1 ? "sheet" : "sheets"}
      </span>
      {lo.finalized ? (
        <span className="inline-flex shrink-0 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">
          ✓ Finalized
        </span>
      ) : lo.sheets.length > 0 ? (
        <span className="inline-flex shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
          In Progress
        </span>
      ) : null}
    </>
  );

  return (
    <div className="overflow-hidden rounded-md border border-gray-200 transition-colors">
      <button
        aria-expanded={open}
        className={`flex w-full cursor-pointer items-center justify-between gap-2 px-4 py-3 transition-colors ${
          open
            ? "border-b border-gray-100 bg-blue-50 hover:bg-blue-100/60"
            : "bg-blue-50 hover:bg-blue-100/60"
        }`}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="inline-flex shrink-0 items-center rounded-full bg-blue-700 px-2 py-0.5 text-xs font-bold text-white">
            {formatLoBadge(lo.loNumber)}
          </span>
          <span className="truncate text-left text-sm font-semibold text-gray-900">
            {lo.loTitle}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {headerExtra}
          <ChevronDownIcon
            className={cn(
              "h-4 w-4 shrink-0 text-gray-500 transition-transform",
              open && "rotate-180",
            )}
          />
        </div>
      </button>
      {open ? (
        <div className="space-y-2 bg-white px-4 py-4">{children}</div>
      ) : null}
    </div>
  );
}

export function CblmSheetGenerationView({ loGroups }: { loGroups: MockLoGroup[] }) {
  if (loGroups.length === 0) {
    return (
      <p className="text-sm italic text-gray-500">
        No learning outcomes available for sheet generation.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {loGroups.map((lo, idx) => (
        <LOSection key={lo.loNumber} defaultOpen={idx === 0} lo={lo}>
          {lo.sheets.length === 0 ? (
            <p className="text-xs italic text-gray-500">No sheets for this LO yet.</p>
          ) : (
            <div className="space-y-2">
              {lo.sheets.map((sheet) => (
                <SheetRow key={sheet.code} sheet={sheet} />
              ))}
            </div>
          )}
        </LOSection>
      ))}
    </div>
  );
}
