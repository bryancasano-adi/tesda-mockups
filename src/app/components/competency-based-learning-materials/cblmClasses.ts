import { cn } from "@/app/components/ui/utils";

/** Shared Tailwind classes for CBLM mockup UI (replaces cblm-mockup.css). */

export const cblm = {
  pageRoot: "text-sm text-[#333]",
  pageShell: "-m-6 min-h-[calc(100vh-2.5rem)] bg-[#F5F5F5]",
  pageContent: "px-7 py-6",
  editorRoot: "w-full max-w-none text-sm text-[#333] pt-3",
  editorShell: "flex flex-1 overflow-hidden",
  editorCenter: "flex min-w-0 flex-1 flex-col overflow-hidden",
  editorScroll: "flex-1 overflow-y-auto px-6 py-5",

  breadcrumb: "mb-4 text-[13px] text-[#666] [&_a]:text-[#1565C0]",
  rbadge:
    "shrink-0 rounded-[3px] bg-[#FDE68A] px-[7px] py-px text-[10px] font-bold text-[#78350F]",

  card: "mb-4 overflow-hidden rounded border border-[#E0E0E0] bg-white",
  cardHdr:
    "flex items-center justify-between border-b border-[#E0E0E0] px-5 py-3.5",
  cardTitle: "text-[15px] font-semibold text-[#333]",
  cardBody: "p-5",

  tbl: "w-full border-collapse",
  tblTh:
    "border-b border-[#E0E0E0] bg-[#FAFAFA] px-4 py-2.5 text-left text-xs font-semibold text-[#666]",
  tblTd:
    "border-b border-[#F0F0F0] px-4 py-[13px] align-middle text-[13px] text-[#333]",
  tblRow: "cursor-default last:[&>td]:border-b-0 hover:[&>td]:bg-[#FAFAFA]",
  tblRowClickable: "cursor-pointer last:[&>td]:border-b-0 hover:[&>td]:bg-[#FAFAFA]",
  tblCode: "font-medium text-[#1565C0]",

  btn: "inline-flex cursor-pointer items-center justify-center rounded border-0 px-3 py-1.5 text-[13px] font-medium no-underline transition-colors",
  btnPrimary: "bg-[#1565C0] text-white hover:bg-[#1251A3]",
  btnSecondary: "border border-[#E0E0E0] bg-white text-[#555] hover:bg-[#F5F5F5]",
  btnSuccess: "bg-[#2E7D32] text-white hover:bg-[#256427]",
  btnIcon: "cursor-pointer border-0 bg-transparent p-1 text-lg text-[#666] hover:text-[#333]",
  btnLock:
    "cursor-not-allowed border border-[#E0E0E0] bg-[#F5F5F5] text-[#BDBDBD]",

  badge: "inline-block rounded-[3px] px-1.5 py-px text-[10px] font-bold",

  progBar: "h-2 overflow-hidden rounded bg-[#F0F0F0]",
  progFill: "h-full rounded-[3px]",
  progText: "mt-0.5 text-[11px] text-[#666]",

  sheetNav:
    "flex w-[204px] shrink-0 flex-col overflow-hidden border-r border-[#E8E8E8] bg-[#FAFAFA]",
  snavHdr: "border-b border-[#E8E8E8] px-3 py-2.5",
  snavTitle:
    "text-[11px] font-bold uppercase tracking-[0.06em] text-[#1565C0]",
  snavSub: "mt-0.5 text-[10px] text-[#999]",
  snavBody: "flex-1 overflow-y-auto py-1",
  snavSection:
    "px-3 pb-0.5 pt-2 text-[10px] font-bold uppercase tracking-[0.06em] text-[#999]",
  snavItem:
    "flex cursor-pointer items-start gap-2 px-3 py-1.5 transition-colors hover:bg-[#F0F0F0]",
  snavItemActive: "bg-[#E3F2FD]",
  snavItemSub: "pl-[22px]",
  sniDot: "mt-1 h-1.5 w-1.5 shrink-0 rounded-full",
  sniLabel: "text-[11px] leading-snug text-[#555]",
  sniLabelActive: "font-semibold text-[#1565C0]",
  sniBadge: "mt-0.5 inline-block rounded-[3px] px-[5px] py-px text-[9px] font-semibold",

  editorBar:
    "flex shrink-0 items-center gap-2 border-b border-[#E0E0E0] bg-white px-5 py-2.5",
  noticeBar:
    "shrink-0 border-b border-[#E0E0E0] bg-[#E3F2FD] px-5 py-2 text-xs text-[#1565C0]",

  srcPanel:
    "w-56 shrink-0 overflow-y-auto border-l border-[#E8E8E8] bg-[#FAFAFA]",
  spHdr:
    "flex items-center gap-1.5 border-b border-[#E8E8E8] px-3.5 py-2.5 text-xs",
  spTitle:
    "text-[11px] font-bold uppercase tracking-wide text-[#555]",
  spBody: "px-3.5 py-3",
  spBlock:
    "mb-2 overflow-hidden rounded border border-[#E0E0E0] bg-white",
  spBh:
    "flex items-center justify-between border-b border-[#E0E0E0] bg-[#FAFAFA] px-2.5 py-1.5",
  spBl: "text-[11px] font-semibold text-[#555]",
  spBt: "rounded-[3px] px-1.5 py-px text-[9px] font-bold",
  spBb: "px-2.5 py-2 text-[11px] leading-normal text-[#666]",

  fieldGroup: "mb-4",
  fieldLabel: "mb-1.5 flex flex-wrap items-center gap-2",
  fieldLabelText: "text-xs font-semibold text-[#555]",
  fieldRo:
    "rounded border border-[#E0E0E0] bg-[#FAFAFA] px-3 py-2 text-[13px] leading-relaxed text-[#555]",
  fieldEdit:
    "w-full bg-white resize-y rounded border border-[#E0E0E0] px-3 py-2 font-sans text-[13px] text-[#333] focus:border-[#1565C0] focus:outline-none",
  fieldInput:
    "w-full rounded border border-[#E0E0E0] px-3 py-2 font-sans text-[13px] focus:border-[#1565C0] focus:outline-none",

  tagRo:
    "rounded-[3px] border border-[#E0E0E0] bg-[#FAFAFA] px-1.5 py-px text-[9px] font-bold text-[#999]",
  tagEdit:
    "rounded-[3px] bg-[#E3F2FD] px-1.5 py-px text-[9px] font-bold text-[#1565C0]",
  tagAi:
    "rounded-[3px] bg-[#F3E8FF] px-1.5 py-px text-[9px] font-bold text-[#7C3AED]",
  tagCs:
    "rounded-[3px] bg-[#E3F2FD] px-1.5 py-px text-[9px] font-bold text-[#1565C0]",

  aiBtn:
    "cursor-pointer rounded border-0 bg-transparent px-1.5 py-0.5 text-[11px] text-[#7C3AED] hover:bg-[#F3E8FF]",
  aiBox: "mt-1.5 hidden overflow-hidden rounded border border-[#DDD6FE] bg-[#FAFAFE]",
  aiBoxOpen: "block",
  aiBh:
    "flex items-center justify-between bg-[#EDE9FE] px-3 py-1.5",
  aiBl: "text-xs font-semibold text-[#5B21B6]",
  aiBc:
    "cursor-pointer border-0 bg-transparent text-sm text-[#7C3AED]",
  aiBb: "px-3 py-2 [&_textarea]:min-h-[52px] [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded [&_textarea]:border [&_textarea]:border-[#DDD6FE] [&_textarea]:px-2.5 [&_textarea]:py-1.5 [&_textarea]:font-sans [&_textarea]:text-xs",
  aiBf:
    "flex items-center justify-between border-t border-[#EDE9FE] px-3 py-1.5",
  aiHint: "text-[11px] text-[#7C3AED]",
  aiSubmit:
    "cursor-pointer rounded border-0 bg-[#7C3AED] px-3.5 py-1 text-xs text-white",
  aiGen: "hidden items-center gap-2 px-3 py-2 text-xs text-[#7C3AED]",
  aiGenShow: "flex",
  spinner:
    "h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-[#EDE9FE] border-t-[#7C3AED]",

  dynList: "mb-1.5 flex flex-col gap-1",
  dynRow: "flex items-center gap-1.5",
  dynInput:
    "flex-1 rounded border border-[#E0E0E0] px-2.5 py-1.5 font-sans text-xs focus:border-[#1565C0] focus:outline-none",
  dynRm:
    "cursor-pointer border-0 bg-transparent px-1 text-sm text-[#BDBDBD] hover:text-[#E53935]",
  dynAdd:
    "w-full cursor-pointer rounded border border-dashed border-[#BDBDBD] bg-transparent px-3 py-1 text-[11px] text-[#999] hover:border-[#1565C0] hover:text-[#1565C0]",

  stepCard: "mb-1.5 overflow-hidden rounded border border-[#E0E0E0] bg-white",
  stepHdr:
    "flex items-center gap-2.5 border-b border-[#E0E0E0] bg-[#FAFAFA] px-3 py-2",
  stepNum:
    "flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#1565C0] text-[11px] font-bold text-white",
  stepBody:
    "px-3 py-2 [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded [&_textarea]:border [&_textarea]:border-[#E0E0E0] [&_textarea]:px-2.5 [&_textarea]:py-1.5 [&_textarea]:font-sans [&_textarea]:text-xs",

  metaStrip:
    "mb-4 flex flex-wrap gap-6 border-b border-[#F0F0F0] py-2.5",
  metaItem: "flex flex-col gap-0.5",
  metaLbl: "text-[10px] font-semibold uppercase text-[#999]",
  metaVal: "text-[13px] font-medium text-[#333]",

  secDiv: "my-5 mb-3.5 flex items-center gap-2.5",
  secLine: "h-px flex-1 bg-[#E0E0E0]",
  secLbl: "whitespace-nowrap text-[11px] font-semibold uppercase text-[#999]",

  letTbl: "w-full border-collapse",
  letTh:
    "bg-[#1565C0] px-3.5 py-2 text-left text-xs font-semibold text-white",
  letTd:
    "border border-[#E0E0E0] px-3.5 py-1.5 align-top text-xs",

  vsTbl: "w-full border-collapse",
  vsTh:
    "bg-[#1B3A5C] px-3.5 py-2 text-xs font-semibold text-white",
  vsTd:
    "border border-[#E0E0E0] px-3.5 py-1.5 align-top text-xs",
  vsTmplRow: "bg-[#FAFAFA] italic text-[#999] [&>td]:bg-[#FAFAFA] [&>td]:text-[#999]",

  loCard: "mb-2.5 overflow-hidden rounded border border-[#E0E0E0] bg-white",
  loHdr:
    "flex cursor-pointer items-center gap-3 px-4 py-2.5 transition-colors hover:bg-[#FAFAFA]",
  loHdrOpen: "border-b border-[#E0E0E0]",
  loNum:
    "flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#1565C0] text-xs font-bold text-white",
  loBody: "hidden bg-[#FAFAFA] p-4",
  loBodyOpen: "block",

  readyBar: "my-2 h-2 w-full overflow-hidden rounded bg-[#F0F0F0]",
  readyFill: "h-full rounded",

  toggleRow:
    "flex items-center gap-2.5 border-b border-[#F0F0F0] px-5 py-2.5 last:border-b-0",

  modalOverlay:
    "fixed inset-0 z-[100] hidden items-center justify-center bg-black/40 p-4",
  modalOverlayOpen: "flex",
  modal:
    "w-[90%] max-w-[520px] overflow-hidden rounded-lg bg-white shadow-[0_8px_40px_rgba(0,0,0,0.2)]",
  modalHdr:
    "flex items-center justify-between border-b border-[#E0E0E0] px-5 py-4",
  modalHdrDark: "border-b-0 bg-[#1a3a6b] text-white",
  modalTitle: "text-sm font-bold",
  modalClose: "cursor-pointer border-0 bg-transparent text-lg text-[#666]",
  modalCloseLight: "text-white",
  modalBody: "p-5",
  modalFooter:
    "flex justify-end gap-2 border-t border-[#E0E0E0] px-5 py-3.5",

  toastWrap:
    "fixed bottom-6 left-1/2 z-[200] -translate-x-1/2 rounded-md px-5 py-2.5 text-xs font-medium text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)]",
} as const;

export const CBLM_BADGE_VARIANTS: Record<string, string> = {
  "b-done": "bg-[#E8F5E9] text-[#2E7D32]",
  "b-finalized": "bg-[#E8F5E9] text-[#2E7D32]",
  "b-draft": "bg-[#FFF3E0] text-[#F57C00]",
  "b-pending": "bg-[#F5F5F5] text-[#666]",
  "b-validated": "bg-[#E3F2FD] text-[#1976D2]",
  "b-locked": "border border-[#E0E0E0] bg-[#FAFAFA] text-[#BDBDBD]",
  "b-progress": "bg-[#FFF8E1] text-[#F9A825]",
  "b-blocked": "bg-[#FFEBEE] text-[#C62828]",
  "b-new": "bg-[#E8F5E9] text-[#2E7D32]",
  "snb-done": "bg-[#E8F5E9] text-[#2E7D32]",
  "snb-active": "bg-[#E3F2FD] text-[#1976D2]",
  "snb-pend": "bg-[#F5F5F5] text-[#9E9E9E]",
  "snb-lock": "bg-[#F5F5F5] text-[#BDBDBD]",
  "snb-val": "bg-[#E3F2FD] text-[#1976D2]",
};

export const CBLM_SOURCE_VARIANTS: Record<string, string> = {
  "src-cs": "border-l-[3px] border-l-[#1565C0] bg-[#F0F7FF]",
  "src-cbc": "border-l-[3px] border-l-[#2E7D32] bg-[#F1F8F4]",
  "src-clm": "border-l-[3px] border-l-[#F57C00] bg-[#FFF8F0]",
  "src-tmpl": "border-l-[3px] border-l-[#546E7A] bg-[#FAFAFA]",
};

export const CBLM_SOURCE_TAG_VARIANTS: Record<string, string> = {
  "sbt-cs": "bg-[#E3F2FD] text-[#1565C0]",
  "sbt-cbc": "bg-[#E8F5E9] text-[#2E7D32]",
  "sbt-clm": "bg-[#FFF3E0] text-[#F57C00]",
  "sbt-tmpl": "bg-[#ECEFF1] text-[#546E7A]",
};

export type CblmBtnVariant = "primary" | "secondary" | "success" | "lock" | "icon";

const btnVariants: Record<CblmBtnVariant, string> = {
  primary: cblm.btnPrimary,
  secondary: cblm.btnSecondary,
  success: cblm.btnSuccess,
  lock: cblm.btnLock,
  icon: cblm.btnIcon,
};

export function cblmBtn(variant: CblmBtnVariant, className?: string) {
  return cn(cblm.btn, btnVariants[variant], className);
}

export function cblmBadge(variant: string, className?: string) {
  return cn(cblm.badge, CBLM_BADGE_VARIANTS[variant], className);
}

export function cblmFieldRo(sourceClass?: string, className?: string) {
  return cn(cblm.fieldRo, sourceClass && CBLM_SOURCE_VARIANTS[sourceClass], className);
}

export function cblmSourceTag(tagClass: string, className?: string) {
  return cn(cblm.spBt, CBLM_SOURCE_TAG_VARIANTS[tagClass], className);
}
