import type { VideoScriptRow } from "@/app/data/cblmData";
import { ucMeta } from "@/app/data/cblmData";
import { cblmVideoScriptEditorPath } from "@/app/utils/cblmRoutes";
import { formatSheetNumber } from "./sheet-code-utils";

export type VideoScriptGenerationMode = "selected" | "all_eligible";

export type VideoScriptLineKind = "obb" | "generated" | "cbb";

export type VideoScriptLine = {
  id: string;
  kind: VideoScriptLineKind;
  audio: string;
  video: string;
};

export type VideoScriptDocument = {
  scriptCode: string;
  sourceSheetCode: string;
  sourcePccCode: string | null;
  qualificationTitle: string;
  moduleTitle: string;
  videoTitle: string;
  scriptStatus: VideoScriptRow["scriptStatus"];
  cblmStatus: VideoScriptRow["cblmStatus"];
  lines: VideoScriptLine[];
  pccCriteria: string[];
  minDuration: number;
  maxDuration: number;
};

export function toVideoScriptCode(
  sheetCode: string,
  sheetType: VideoScriptRow["sheetType"],
): string {
  const suffix = formatSheetNumber(sheetCode);

  return sheetType === "task-sheet" ? `VS-TS ${suffix}` : `VS-JS ${suffix}`;
}

export function videoScriptEditorHref(sheetCode: string, cblmId?: string) {
  return cblmVideoScriptEditorPath(sheetCode, cblmId);
}

export function buildGateRuleMessage(rows: VideoScriptRow[]): string {
  const eligible = rows.filter((row) => row.eligible);
  const locked = rows.filter((row) => !row.eligible);

  const eligibleText =
    eligible.length > 0
      ? `${eligible.map((row) => row.code).join(", ")} are eligible.`
      : "No sheets are eligible yet.";

  const lockedText =
    locked.length > 0
      ? locked
          .map((row) => `${row.code} is locked (${row.lockReason ?? "locked"})`)
          .join(". ") + "."
      : "";

  return `Gate rule: Video Scripts require a Finalized CBLM. ${eligibleText} ${lockedText}`.trim();
}

export function videoScriptSummary(rows: VideoScriptRow[]) {
  const eligible = rows.filter((row) => row.eligible).length;
  const draftCount = rows.filter((row) => row.scriptStatus === "draft").length;

  return {
    eligible,
    total: rows.length,
    draftCount,
    label: `${eligible} of ${rows.length} sheets eligible · ${draftCount} script${draftCount === 1 ? "" : "s"} in draft`,
  };
}

export function resolveActiveVideoScriptRow(
  rows: VideoScriptRow[],
  sheetParam: string | null,
): VideoScriptRow | null {
  if (!sheetParam) {
    return (
      rows.find((row) => row.scriptStatus === "draft") ??
      rows.find((row) => row.eligible) ??
      null
    );
  }

  return rows.find((row) => row.code === sheetParam) ?? null;
}

function buildOpeningBillboard(sheetTitle: string): Pick<VideoScriptLine, "audio" | "video"> {
  return {
    audio: `Welcome. In this module you will learn how to ${sheetTitle.toLowerCase()}. This video is part of the ${ucMeta.qualificationName} qualification — ${ucMeta.title}.`,
    video: `Open on wide shot of training facility. Fade to title card: "${sheetTitle}".`,
  };
}

function buildClosingBillboard(sheetTitle: string): Pick<VideoScriptLine, "audio" | "video"> {
  return {
    audio: `You have completed the ${sheetTitle.toLowerCase()} procedure. Review the Performance Criteria Checklist before attempting the task sheet assessment.`,
    video: "Return to wide shot. Fade to module title card and TESDA logo.",
  };
}

function buildGeneratedLines(
  sheetTitle: string,
  steps: Array<{ audio: string; video: string }>,
): VideoScriptLine[] {
  const obb = buildOpeningBillboard(sheetTitle);
  const cbb = buildClosingBillboard(sheetTitle);

  return [
    { id: "obb", kind: "obb", ...obb },
    ...steps.map((step, index) => ({
      id: `generated-${index}`,
      kind: "generated" as const,
      audio: step.audio,
      video: step.video,
    })),
    { id: "cbb", kind: "cbb", ...cbb },
  ];
}

const TS_111_STEPS = [
  {
    audio:
      "Welcome. Today we prepare a BEV for safe inspection using mandatory LOTO.",
    video: "Wide shot: fleet yard, technician approaches BEV with PPE kit.",
  },
  {
    audio: "First, post warning signs and confirm the vehicle is stationary.",
    video: "Close-up: parking brake, wheel chocks, warning sign placement.",
  },
  {
    audio: "Don Class 0 gloves and verify no damage before HV approach.",
    video: "Macro: glove inspection, tester checks voltage meter calibration.",
  },
  {
    audio:
      "Execute ignition-off sequence and wait five minutes for capacitor discharge.",
    video: "Interior: power-down, timer overlay, MSD location callout.",
  },
  {
    audio:
      "Apply lockout tag and record zero-voltage verification on AUT-F-001.",
    video: "LOTO padlock, meter reading, form entry.",
  },
];

const TS_111_PCC = [
  "Execute LOTO procedure correctly before any HV inspection work",
  "Don PPE correctly and maintain throughout the session",
  "Verify zero voltage before approaching HV components",
  "Complete safety preparation checklist without trainer intervention",
];

export function buildMockVideoScriptDocument(
  row: VideoScriptRow,
): VideoScriptDocument | null {
  if (row.scriptStatus !== "draft" && row.scriptStatus !== "finalized") {
    return null;
  }

  const scriptCode = toVideoScriptCode(row.code, row.sheetType);
  const sourcePccCode = row.sheetType === "task-sheet" ? "1.1-3" : null;

  return {
    scriptCode,
    sourceSheetCode: sourcePccCode ? `${row.code} + ${sourcePccCode}` : row.code,
    sourcePccCode,
    qualificationTitle: ucMeta.qualificationName,
    moduleTitle: ucMeta.title,
    videoTitle: row.title,
    scriptStatus: row.scriptStatus,
    cblmStatus: row.cblmStatus,
    lines: buildGeneratedLines(row.title, TS_111_STEPS),
    pccCriteria: row.sheetType === "task-sheet" ? TS_111_PCC : [],
    minDuration: 3,
    maxDuration: 5,
  };
}

export function estimateScriptDurationMinutes(lines: VideoScriptLine[]): string {
  const generatedCount = lines.filter((line) => line.kind === "generated").length;
  const totalSeconds = generatedCount * 25;
  const minutes = (totalSeconds / 60).toFixed(1);

  return `${generatedCount} generated rows · ~25 sec/row = ~${minutes} min`;
}
