/**
 * CBLM sheet numbering: {CC}.{LO}-{sequence}[variant]
 *
 * Information Sheet examples: 1.1-1, 1.1-2, 1.1-3
 * Activity sheets follow the supporting IS base code; multiples use A, B, C…
 */

export type SheetCodeFormat = "standard" | "legacy";

export interface ParsedSheetCode {
  format: SheetCodeFormat;
  prefix?: string;
  cc: string;
  lo: string;
  sequence: string;
  variant?: string;
  raw: string;
}

const LEGACY_PREFIX_PATTERN =
  /^(IS|SC|AK|TS|PCC|OS|JS)\s+(\d+)\.(\d+)\.(\d+)([A-Z])?$/;

const LEGACY_MODULE_JOB_PATTERN = /^JS\s+(\d+)$/;

const STANDARD_PATTERN = /^(\d+)\.(\d+)-(\d+)([A-Z])?$/;

export function parseSheetCode(code: string): ParsedSheetCode | null {
  const trimmed = code.trim();

  const standard = trimmed.match(STANDARD_PATTERN);

  if (standard) {
    return {
      format: "standard",
      cc: standard[1],
      lo: standard[2],
      sequence: standard[3],
      variant: standard[4],
      raw: trimmed,
    };
  }

  const legacy = trimmed.match(LEGACY_PREFIX_PATTERN);

  if (legacy) {
    return {
      format: "legacy",
      prefix: legacy[1],
      cc: legacy[2],
      lo: legacy[3],
      sequence: legacy[4],
      variant: legacy[5],
      raw: trimmed,
    };
  }

  const legacyJs = trimmed.match(LEGACY_MODULE_JOB_PATTERN);

  if (legacyJs) {
    return {
      format: "legacy",
      prefix: "JS",
      cc: legacyJs[1],
      lo: "0",
      sequence: "0",
      raw: trimmed,
    };
  }

  return null;
}

export function sheetBaseKey(code: string): string {
  const parsed = parseSheetCode(code);

  if (!parsed) return code.trim();

  return `${parsed.cc}.${parsed.lo}-${parsed.sequence}`;
}

export function formatSheetNumber(code: string): string {
  const parsed = parseSheetCode(code);

  if (!parsed) return code.trim();

  const base = `${parsed.cc}.${parsed.lo}-${parsed.sequence}`;

  return parsed.variant ? `${base}${parsed.variant}` : base;
}

export function loNumberFromSheetCode(code: string): string | null {
  const parsed = parseSheetCode(code);

  if (!parsed || parsed.lo === "0") return null;

  return parsed.lo;
}

export function sheetBelongsToLo(code: string, loNumber: string): boolean {
  return loNumberFromSheetCode(code) === loNumber;
}

export function formatSheetDisplayLabel(sheetType: string, code: string): string {
  return `${sheetType} ${formatSheetNumber(code)}`;
}

/** Step 2 list rows — number only; sheet type is shown separately via badge. */
export function formatSheetListLabel(code: string, title?: string): string {
  const number = formatSheetNumber(code);
  const trimmedTitle = title?.trim();

  return trimmedTitle ? `${number} — ${trimmedTitle}` : number;
}

export function compareSheetCodes(a: string, b: string): number {
  const pa = parseSheetCode(a);
  const pb = parseSheetCode(b);

  if (!pa && !pb) return a.localeCompare(b);
  if (!pa) return 1;
  if (!pb) return -1;

  const ccDiff = Number(pa.cc) - Number(pb.cc);

  if (ccDiff !== 0) return ccDiff;

  const loDiff = Number(pa.lo) - Number(pb.lo);

  if (loDiff !== 0) return loDiff;

  const seqDiff = Number(pa.sequence) - Number(pb.sequence);

  if (seqDiff !== 0) return seqDiff;

  const va = pa.variant ?? "";
  const vb = pb.variant ?? "";

  return va.localeCompare(vb);
}

export function buildInformationSheetCode(
  ccNumber: number | string,
  loNumber: number | string,
  contentSequence: number,
): string {
  return `${ccNumber}.${loNumber}-${contentSequence}`;
}

export function buildActivitySheetCode(
  isBaseCode: string,
  variant?: string,
): string {
  const base = sheetBaseKey(isBaseCode);

  return variant ? `${base}${variant.toUpperCase()}` : base;
}
