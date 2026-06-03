import { ReactNode, useState } from "react";
import { cn } from "@/app/components/ui/utils";
import {
  cblm,
  cblmBadge,
  cblmFieldRo,
  CBLM_SOURCE_VARIANTS,
} from "./cblmClasses";
import { useAiRegen } from "./cblmMockupHooks";

export function CblmBadge({
  children,
  variant = "b-pending",
  className,
}: {
  children: ReactNode;
  variant?: string;
  className?: string;
}) {
  return <span className={cblmBadge(variant, className)}>{children}</span>;
}

export function MetaStrip({
  items,
}: {
  items: { label: string; value: ReactNode }[];
}) {
  return (
    <div className={cblm.metaStrip}>
      {items.map((item) => (
        <div className={cblm.metaItem} key={item.label}>
          <div className={cblm.metaLbl}>{item.label}</div>
          <div className={cblm.metaVal}>{item.value}</div>
        </div>
      ))}
    </div>
  );
}

export function FieldReadOnly({
  label,
  value,
  sourceTag,
  sourceClass = "src-cs",
}: {
  label: string;
  value: string;
  sourceTag?: string;
  sourceClass?: string;
}) {
  return (
    <div className={cblm.fieldGroup}>
      <div className={cblm.fieldLabel}>
        <span className={cblm.fieldLabelText}>{label}</span>
        <span className={cblm.tagRo}>Read-only</span>
        {sourceTag && <span className={cblm.tagCs}>{sourceTag}</span>}
      </div>
      <div className={cblmFieldRo(sourceClass)}>{value}</div>
    </div>
  );
}

export function FieldEditable({
  label,
  value,
  onChange,
  rows = 4,
  aiBoxId,
  showToast,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  aiBoxId: string;
  showToast: (msg: string, color?: string) => void;
}) {
  const { openAi, generating, toggleAI, runRegen } = useAiRegen(showToast);
  const open = openAi[aiBoxId];
  const gen = generating[aiBoxId];

  return (
    <div className={cblm.fieldGroup}>
      <div className={cblm.fieldLabel}>
        <span className={cblm.fieldLabelText}>{label}</span>
        <span className={cblm.tagEdit}>Editable</span>
        <span className={cblm.tagAi}>AI-synthesized</span>
        <button type="button" className={cblm.aiBtn} onClick={() => toggleAI(aiBoxId)}>
          ✨ Regenerate
        </button>
      </div>
      <textarea
        className={cblm.fieldEdit}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className={cn(cblm.aiBox, open && cblm.aiBoxOpen)}>
        <div className={cblm.aiBh}>
          <span className={cblm.aiBl}>✨ Regenerate — {label}</span>
          <button type="button" className={cblm.aiBc} onClick={() => toggleAI(aiBoxId)}>
            ✕
          </button>
        </div>
        <div className={cblm.aiBb}>
          <textarea placeholder={`Optional prompt for ${label}…`} />
        </div>
        <div className={cblm.aiBf}>
          <span className={cblm.aiHint}>Phase 1 — CS, CBC, CLM inputs</span>
          <button
            type="button"
            className={cblm.aiSubmit}
            onClick={() => runRegen(aiBoxId, label)}
          >
            ✨ Regenerate
          </button>
        </div>
        <div className={cn(cblm.aiGen, gen && cblm.aiGenShow)}>
          <div className={cblm.spinner} />
          Regenerating {label}…
        </div>
      </div>
    </div>
  );
}

export function SectionDivider({ label }: { label: string }) {
  return (
    <div className={cblm.secDiv}>
      <div className={cblm.secLine} />
      <div className={cblm.secLbl}>{label}</div>
      <div className={cblm.secLine} />
    </div>
  );
}

export function LoAccordion({
  id,
  number,
  title,
  subtitle,
  progress,
  children,
  defaultOpen = false,
}: {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  progress: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={cblm.loCard}>
      <div
        className={cn(cblm.loHdr, open && cblm.loHdrOpen)}
        onClick={() => setOpen(!open)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen(!open)}
      >
        <div className={cblm.loNum}>{number}</div>
        <div className="flex-1">
          <div className="text-[13px] font-semibold">{title}</div>
          <div className="text-[11px] text-[#666]">{subtitle}</div>
        </div>
        <span className="text-[11px] text-[#666]">{progress}</span>
        <span className="text-[#999]">{open ? "▲" : "▼"}</span>
      </div>
      <div className={cn(cblm.loBody, open && cblm.loBodyOpen)} id={id}>
        {children}
      </div>
    </div>
  );
}

export function CblmModal({
  id,
  open,
  onClose,
  title,
  darkHeader,
  children,
  footer,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
  title: string;
  darkHeader?: boolean;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div
      className={cn(cblm.modalOverlay, open && cblm.modalOverlayOpen)}
      id={id}
    >
      <div className={cblm.modal}>
        <div className={cn(cblm.modalHdr, darkHeader && cblm.modalHdrDark)}>
          <span className={cblm.modalTitle}>{title}</span>
          <button
            type="button"
            className={cn(cblm.modalClose, darkHeader && cblm.modalCloseLight)}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className={cblm.modalBody}>{children}</div>
        {footer && <div className={cblm.modalFooter}>{footer}</div>}
      </div>
    </div>
  );
}

function DotsIcon() {
  return (
    <svg width={16} height={16} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <circle cx={12} cy={5} r={1.5} />
      <circle cx={12} cy={12} r={1.5} />
      <circle cx={12} cy={19} r={1.5} />
    </svg>
  );
}

export function CblmDotsMenu({
  menuId,
  header,
  open,
  onToggle,
  children,
}: {
  menuId: string;
  header?: string;
  open: boolean;
  onToggle: (e: React.MouseEvent) => void;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(cblm.ddWrap, open && cblm.ddWrapOpen)}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className={cn(cblm.btnDots, open && cblm.btnDotsActive)}
        onClick={onToggle}
        title="More actions"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
      >
        <DotsIcon />
      </button>
      <div
        id={menuId}
        role="menu"
        className={cn(cblm.ddMenu, open && cblm.ddMenuOpen)}
      >
        {header && <div className={cblm.ddHdr}>{header}</div>}
        {children}
      </div>
    </div>
  );
}

export { CBLM_SOURCE_VARIANTS };
