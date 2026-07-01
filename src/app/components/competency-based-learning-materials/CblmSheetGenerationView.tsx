import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ChevronDownIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  CBLMStatusBadge,
  cn,
} from "./CblmFrontendPrimitives";
import {
  getMockSheetRowTitle,
  MOCK_SHEET_TYPE_ABBR,
  sheetTypeBadgeClasses,
} from "./content-utils";
import { cblmEditorPath } from "@/app/utils/cblmRoutes";
import type { MockLoGroup, MockSheetRow } from "@/app/data/cblmData";
import { formatSheetNumber } from "./sheet-code-utils";
import { sheetTypeLabel } from "./sheet-nav";

function sheetEditorHref(sheet: MockSheetRow, edit = false) {
  return cblmEditorPath(
    undefined,
    sheet.editorPage ?? "information-sheet",
    sheet.code,
    edit,
  );
}

function finalizeSheetInGroups(
  loGroups: MockLoGroup[],
  loNumber: string,
  sheet: MockSheetRow,
): MockLoGroup[] {
  return loGroups.map((lo) => {
    if (lo.loNumber !== loNumber) return lo;

    const sheets = lo.sheets.map((entry) =>
      entry.type === sheet.type && entry.code === sheet.code
        ? { ...entry, status: "finalized" as const }
        : entry,
    );
    const finalized =
      sheets.length > 0 &&
      sheets.every((entry) => entry.status === "finalized");

    return { ...lo, sheets, finalized };
  });
}

function SheetActionsDropdown({
  isSheetFinalized,
  readOnly,
  isFinalizing,
  onView,
  onEdit,
  onFinalize,
}: {
  isSheetFinalized: boolean;
  readOnly?: boolean;
  isFinalizing: boolean;
  onView: () => void;
  onEdit: () => void;
  onFinalize: () => void;
}) {
  const disabledClass = "opacity-50 cursor-not-allowed pointer-events-none";
  const actionsLocked = readOnly || isFinalizing;
  const editDisabled = isSheetFinalized || actionsLocked;
  const finalizeDisabled = isSheetFinalized || actionsLocked;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Sheet actions"
          className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          type="button"
          onClick={(event) => event.stopPropagation()}
        >
          <EllipsisHorizontalIcon className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-40 rounded-xl border border-gray-100 bg-white p-1 shadow-lg"
      >
        <DropdownMenuItem
          className="cursor-pointer rounded-md px-2 py-2 text-gray-800 hover:bg-blue-50"
          onClick={onView}
        >
          <EyeIcon className="h-5 w-5" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            "cursor-pointer rounded-md px-2 py-2 text-gray-800 hover:bg-blue-50",
            editDisabled && disabledClass,
          )}
          disabled={editDisabled}
          onClick={() => {
            if (editDisabled) return;
            onEdit();
          }}
        >
          <PencilSquareIcon className="h-5 w-5" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            "mt-1 cursor-pointer justify-center rounded-md border border-[#8a94d1]/60 px-2 py-2 text-[#8a94d1] hover:bg-blue-50",
            finalizeDisabled && disabledClass,
          )}
          disabled={finalizeDisabled}
          onClick={() => {
            if (finalizeDisabled) return;
            onFinalize();
          }}
        >
          <span className="w-full text-center text-sm font-semibold">
            {isFinalizing ? "Finalizing…" : "Finalize"}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SheetRow({
  sheet,
  loSheets,
  loNumber,
  readOnly,
  onFinalize,
}: {
  sheet: MockSheetRow;
  loSheets: MockSheetRow[];
  loNumber: string;
  readOnly?: boolean;
  onFinalize: (loNumber: string, sheet: MockSheetRow) => void;
}) {
  const navigate = useNavigate();
  const [isFinalizing, setIsFinalizing] = useState(false);

  if (sheet.locked) {
    return (
      <div className="flex items-center justify-between rounded border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-500">
        <span>{sheet.label}</span>
        <span>Locked</span>
      </div>
    );
  }

  const sheetType = MOCK_SHEET_TYPE_ABBR[sheet.type];
  const typeLabel = sheetType ? sheetTypeLabel(sheetType) : sheet.type;
  const badgeClasses = sheetType
    ? sheetTypeBadgeClasses(sheetType)
    : "bg-blue-50 border-blue-400 text-blue-700";
  const isSheetFinalized = sheet.status === "finalized";
  const sheetTitle = getMockSheetRowTitle(sheet, loSheets);

  const handleFinalize = () => {
    if (readOnly || isSheetFinalized || isFinalizing) return;

    setIsFinalizing(true);
    onFinalize(loNumber, sheet);
    setIsFinalizing(false);
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded border border-gray-200 px-3 py-3 text-xs hover:bg-gray-50">
      <button
        className="flex min-w-0 flex-1 items-center gap-2 text-left"
        type="button"
        onClick={() => navigate(sheetEditorHref(sheet))}
      >
        <span
          className={`inline-flex shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-semibold ${badgeClasses}`}
        >
          {typeLabel} {formatSheetNumber(sheet.code)}
        </span>
        <span className="truncate font-medium text-gray-800">{sheetTitle}</span>
      </button>
      <span className="flex shrink-0 items-center gap-2">
        <CBLMStatusBadge status={sheet.status} />
        <SheetActionsDropdown
          isFinalizing={isFinalizing}
          isSheetFinalized={isSheetFinalized}
          readOnly={readOnly}
          onEdit={() => navigate(sheetEditorHref(sheet, true))}
          onFinalize={handleFinalize}
          onView={() => navigate(sheetEditorHref(sheet))}
        />
      </span>
    </div>
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

export function CblmSheetGenerationView({
  loGroups,
  readOnly,
  onLoGroupsChange,
  onSheetFinalized,
}: {
  loGroups: MockLoGroup[];
  readOnly?: boolean;
  onLoGroupsChange?: (next: MockLoGroup[]) => void;
  onSheetFinalized?: () => void;
}) {
  const handleFinalize = (loNumber: string, sheet: MockSheetRow) => {
    const next = finalizeSheetInGroups(loGroups, loNumber, sheet);
    onLoGroupsChange?.(next);
    onSheetFinalized?.();
  };

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
                <SheetRow
                  key={`${sheet.type}-${sheet.code}`}
                  loNumber={lo.loNumber}
                  loSheets={lo.sheets}
                  readOnly={readOnly}
                  sheet={sheet}
                  onFinalize={handleFinalize}
                />
              ))}
            </div>
          )}
        </LOSection>
      ))}
    </div>
  );
}
