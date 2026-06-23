import { useState } from "react";

import {
  FieldEditable,
  FieldEditableInput,
  fieldHintClass,
  fieldInputClass,
  fieldInputReadOnlyClass,
  fieldLabelClass,
  fieldLabelRowClass,
  fieldValueViewClass,
  SectionDivider,
} from "./CblmFieldPrimitives";
import { cn } from "./CblmFrontendPrimitives";
import { ucMeta } from "@/app/data/cblmData";

const CBLM_DOCUMENT_TITLE = "Competency-Based Learning Material (CBLM)";

function formatPreviewDate(isoDate: string) {
  if (!isoDate) return "—";
  const d = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function CoverFieldReadOnly({
  label,
  value,
  hint,
  mono,
}: {
  label: string;
  value: string;
  hint?: string;
  mono?: boolean;
}) {
  return (
    <div className="mb-4">
      <div className={fieldLabelRowClass}>
        <span className={fieldLabelClass}>{label}</span>
        <span className="rounded border border-gray-200 bg-gray-50 px-1.5 py-px text-[9px] font-bold text-gray-400">
          Read-only
        </span>
      </div>
      <div className={cn(fieldValueViewClass, mono && "font-mono")}>
        {value || "—"}
      </div>
      {hint && <p className={fieldHintClass}>{hint}</p>}
    </div>
  );
}

function CoverFieldDateEditable({
  label,
  value,
  onChange,
  editing,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  editing: boolean;
}) {
  const displayValue = formatPreviewDate(value);
  const dateFieldClass = cn(fieldInputClass, "absolute inset-0 h-full w-full");

  return (
    <div className="mb-4">
      <div className={fieldLabelRowClass}>
        <span className={fieldLabelClass}>{label}</span>
      </div>
      <div className="relative h-[38px] w-full max-w-[180px]">
        {editing ? (
          <input
            className={dateFieldClass}
            type="date"
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
        ) : (
          <input
            className={cn(dateFieldClass, fieldInputReadOnlyClass)}
            placeholder={displayValue === "—" ? "—" : undefined}
            readOnly
            tabIndex={-1}
            type="text"
            value={displayValue === "—" ? "" : displayValue}
          />
        )}
      </div>
    </div>
  );
}

function CoverFieldLine({ label, value }: { label: string; value: string }) {
  const displayValue = value.trim() ? value.toUpperCase() : "—";

  return (
    <p className="mb-2.5 text-left font-serif text-[13px] font-bold leading-snug text-black">
      {label} : {displayValue}
    </p>
  );
}

function CoverPicturePlaceholder() {
  return (
    <div className="relative mb-5 aspect-[4/3] border border-black bg-white">
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full text-black"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line stroke="currentColor" strokeWidth="0.75" x1="0" x2="100" y1="0" y2="100" />
        <line stroke="currentColor" strokeWidth="0.75" x1="100" x2="0" y1="0" y2="100" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-serif text-sm font-bold text-black">Picture</span>
      </div>
    </div>
  );
}

function CoverPreview({
  sector,
  qualificationTitle,
  unitOfCompetencyTitle,
  moduleTitle,
}: {
  sector: string;
  qualificationTitle: string;
  unitOfCompetencyTitle: string;
  moduleTitle: string;
}) {
  return (
    <div className="mx-auto mb-6 max-w-[480px] bg-white">
      <h2 className="mb-3 text-center font-sans text-[15px] font-bold uppercase tracking-wide text-[#1565C0]">
        Competency Based Learning Material
      </h2>

      <div className="border border-black px-6 py-5">
        <CoverPicturePlaceholder />

        <CoverFieldLine label="Sector" value={sector} />
        <CoverFieldLine label="Qualification Title" value={qualificationTitle} />
        <CoverFieldLine
          label="Unit of Competency"
          value={unitOfCompetencyTitle}
        />
        <CoverFieldLine label="Module Title" value={moduleTitle} />

        <div className="mt-5 flex border border-black">
          <div className="flex w-[88px] shrink-0 items-center justify-center border-r border-black p-3">
            <img
              alt="TESDA Logo"
              className="h-12 w-12 object-contain"
              draggable={false}
              src="/tesda-cropped-logo.png"
            />
          </div>
          <div className="flex flex-col justify-center gap-1 px-4 py-3 text-left font-serif text-[11px] font-bold leading-snug text-black">
            <p>Technical Education and Skill Development Authority</p>
            <p>Name of School / Institution</p>
            <p>Address of School / Institution</p>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-[10px] text-gray-300">
        Live preview — updates as you edit fields below
      </p>
    </div>
  );
}

export function FrontCoverSection({ isEditing = true }: { isEditing?: boolean }) {
  const [moduleNumber, setModuleNumber] = useState(ucMeta.module);
  const [moduleTitle, setModuleTitle] = useState(ucMeta.title);
  const [developedBy, setDevelopedBy] = useState("TESDA");
  const [dateDeveloped, setDateDeveloped] = useState("2026-05-01");
  const [dateRevised, setDateRevised] = useState("");
  const [coverImageDescription, setCoverImageDescription] = useState(
    "A technician in PPE inspecting a battery electric vehicle in a fleet maintenance bay, with diagnostic equipment visible.",
  );

  return (
    <>
      <CoverPreview
        moduleTitle={moduleTitle}
        qualificationTitle={ucMeta.qualificationName}
        sector={ucMeta.sector}
        unitOfCompetencyTitle={ucMeta.title}
      />

      <SectionDivider label="Cover Page Fields" />

      <div className="grid grid-cols-1 items-start gap-x-4 md:grid-cols-2">
        <CoverFieldReadOnly
          label="Qualification Title"
          value={CBLM_DOCUMENT_TITLE}
        />
        <CoverFieldReadOnly
          label="Qualification Name"
          value={ucMeta.qualificationName}
        />
        <CoverFieldReadOnly label="Unit Code" mono value={ucMeta.unitCode} />
        <CoverFieldReadOnly label="NC Level" value={ucMeta.ncLevel} />
        <FieldEditableInput
          editing={isEditing}
          label="Module Number"
          value={moduleNumber}
          onChange={setModuleNumber}
        />
        <FieldEditableInput
          editing={isEditing}
          label="Module Title"
          value={moduleTitle}
          onChange={setModuleTitle}
        />
        <CoverFieldReadOnly
          label="Document No."
          mono
          value={ucMeta.documentNo}
        />
        <CoverFieldReadOnly
          hint="From audit log — auto-incremented on each re-export"
          label="Revision No."
          mono
          value={ucMeta.revision}
        />
        <CoverFieldReadOnly label="Issued By" value="TESDA" />
        <FieldEditableInput
          editing={isEditing}
          label="Developed By"
          value={developedBy}
          onChange={setDevelopedBy}
        />
        <CoverFieldDateEditable
          editing={isEditing}
          label="Date Developed"
          value={dateDeveloped}
          onChange={setDateDeveloped}
        />
        <CoverFieldDateEditable
          editing={isEditing}
          label="Date Revised"
          value={dateRevised}
          onChange={setDateRevised}
        />
      </div>

      <SectionDivider label="Cover Image" />
      <p className="mb-4 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-900">
        K-Galing generates the image description prompt. The trainer sources the
        cover image externally using this prompt. K-Galing does not generate
        images.
      </p>
      <FieldEditable
        editing={isEditing}
        label="Cover Image Description"
        rows={4}
        value={coverImageDescription}
        onChange={setCoverImageDescription}
      />
    </>
  );
}
