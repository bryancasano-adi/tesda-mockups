import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CblmEditorLayout } from "@/app/components/competency-based-learning-materials/CblmEditorLayout";
import { SheetNavigation } from "@/app/components/competency-based-learning-materials/SheetNavigation";
import { EditorToolbar } from "@/app/components/competency-based-learning-materials/EditorToolbar";
import { NoticeBar } from "@/app/components/competency-based-learning-materials/NoticeBar";
import { CblmSourcePanel } from "@/app/components/competency-based-learning-materials/CblmSourcePanel";
import { SectionDivider } from "@/app/components/competency-based-learning-materials/CblmPrimitives";
import {
  CblmToast,
  useCblmToast,
  useSaveValidate,
} from "@/app/components/competency-based-learning-materials/cblmMockupHooks";
import {
  frontMatterMeta,
  frontMatterNavItems,
  type FrontMatterKind,
  ucMeta,
} from "@/app/data/cblmData";
import { cblm, cblmFieldRo } from "@/app/components/competency-based-learning-materials/cblmClasses";
import { cn } from "@/app/components/ui/utils";

type RevRow = {
  revNo: string;
  placeholder?: boolean;
  dateRevised: string;
  description: string;
  revisedBy: string;
};

function formatPreviewDate(isoDate: string) {
  if (!isoDate) return "—";
  const d = new Date(isoDate + "T12:00:00");
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function FieldLegend() {
  return (
    <div className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold text-[#666]">
      <span className={cblm.tagRo}>Read-only</span>
      System-generated or derived from qualification
      <span className={cn(cblm.tagEdit, "ml-2")}>Editable</span>
      Override allowed
    </div>
  );
}

function CoverPreview({
  moduleTitle,
  moduleNumber,
  dateDeveloped,
  developedBy,
  revision,
  dateRevised
}: {
  moduleTitle: string;
  moduleNumber: string;
  dateDeveloped: string;
  developedBy: string;
  revision: string;
  dateRevised: string;
}) {
  return (
    <div className="mx-auto mb-5 max-w-[440px] rounded border border-[#E0E0E0] bg-white px-8 py-9 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded bg-[#E0E0E0] text-[11px] text-[#999]">
        <img
          src="/tesda-cropped-logo.png"
          alt="TESDA Logo"
          className="h-10 w-10 object-contain opacity-80"
          draggable={false}
        />
  
      </div>
      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#666]">
        Competency-Based Learning Material
      </div>
      <div className="mb-1 text-[17px] font-bold text-[#1a3a6b]">{moduleTitle}</div>
      <div className="mb-5 text-[13px] text-[#666]">
        {moduleNumber} · {ucMeta.project}
      </div>
      <div className="grid grid-cols-2 gap-1.5 border-t-2 border-[#1565C0] pt-3.5 text-left text-[11px] text-[#555]">
        <div>
          <strong>Unit Code:</strong> {ucMeta.unitCode}
        </div>
        <div>
          <strong>NC Level:</strong> {ucMeta.ncLevel}
        </div>
        <div>
          <strong>Sector:</strong> {ucMeta.sector}
        </div>
        <div>
          <strong>Qualification:</strong> {ucMeta.qualificationShort}
        </div>
        <div>
          <strong>Date Developed:</strong> {formatPreviewDate(dateDeveloped)}
        </div>
        <div>
          <strong>Developed by:</strong> {developedBy || "TESDA"}
        </div>
        <div>
          <strong>Document No.:</strong> {ucMeta.documentNo}
        </div>
        <div>
          <strong>Revision No.:</strong> {revision}
        </div>
        <div>
          <strong>Issued by:</strong> TESDA
        </div>
        <div>
          <strong>Date Revised:</strong> {formatPreviewDate(dateRevised)}
        </div>
      </div>
      <div className="mt-3.5 border-t border-[#E0E0E0] pt-2 text-[10px] text-[#BDBDBD]">
        Live preview — updates as you edit fields below
      </div>
    </div>
  );
}

function CoverContent({ showToast }: { showToast: (msg: string, color?: string) => void }) {
  const [moduleNumber, setModuleNumber] = useState(ucMeta.module);
  const [moduleTitle, setModuleTitle] = useState(ucMeta.title);
  const [developedBy, setDevelopedBy] = useState("TESDA");
  const [dateDeveloped, setDateDeveloped] = useState("2026-05-01");
  const [dateRevised, setDateRevised] = useState("");
  const [revRows, setRevRows] = useState<RevRow[]>([
    {
      revNo: "00",
      dateRevised: "2026-05-01",
      description: "Initial version",
      revisedBy: "TESDA CTAD",
    },
    {
      revNo: "01",
      placeholder: true,
      dateRevised: "",
      description: "",
      revisedBy: "",
    },
  ]);

  const updateRevRow = (index: number, patch: Partial<RevRow>) => {
    setRevRows((rows) => rows.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  };

  const addRevRow = () => {
    const next = String(revRows.length).padStart(2, "0");
    setRevRows((rows) => [
      ...rows,
      {
        revNo: next,
        placeholder: true,
        dateRevised: "",
        description: "",
        revisedBy: "",
      },
    ]);
    showToast("Revision row added");
  };

  return (
    <>
      <FieldLegend />
      <CoverPreview
        moduleTitle={moduleTitle}
        moduleNumber={moduleNumber}
        dateDeveloped={dateDeveloped}
        developedBy={developedBy}
        revision={ucMeta.revision}
        dateRevised={dateRevised}
      />

      <SectionDivider label="Cover Page Fields" />

      <div className="grid grid-cols-2 gap-3.5">
        <div className={cblm.fieldGroup}>
          <div className={cblm.fieldLabel}>
            <span className={cblm.fieldLabelText}>Qualification Title</span>
            <span className={cblm.tagRo}>Read-only</span>
          </div>
          <div className={cblmFieldRo("src-cs")}>Competency-Based Learning Material (CBLM)</div>
        </div>
        <div className={cblm.fieldGroup}>
          <div className={cblm.fieldLabel}>
            <span className={cblm.fieldLabelText}>Qualification Name</span>
            <span className={cblm.tagRo}>Read-only</span>
          </div>
          <div className={cblmFieldRo("src-cs")}>{ucMeta.qualificationName}</div>
        </div>
        <div className={cblm.fieldGroup}>
          <div className={cblm.fieldLabel}>
            <span className={cblm.fieldLabelText}>Unit Code</span>
            <span className={cblm.tagRo}>Read-only</span>
          </div>
          <div className={cn(cblmFieldRo("src-cs"), "font-mono")}>{ucMeta.unitCode}</div>
        </div>
        <div className={cblm.fieldGroup}>
          <div className={cblm.fieldLabel}>
            <span className={cblm.fieldLabelText}>NC Level</span>
            <span className={cblm.tagRo}>Read-only</span>
          </div>
          <div className={cblmFieldRo("src-cs")}>{ucMeta.ncLevel}</div>
        </div>
        <div className={cblm.fieldGroup}>
          <div className={cblm.fieldLabel}>
            <span className={cblm.fieldLabelText}>Module Number</span>
            <span className={cblm.tagEdit}>Editable</span>
          </div>
          <input
            className={cblm.fieldInput}
            value={moduleNumber}
            onChange={(e) => setModuleNumber(e.target.value)}
          />
        </div>
        <div className={cblm.fieldGroup}>
          <div className={cblm.fieldLabel}>
            <span className={cblm.fieldLabelText}>Module Title</span>
            <span className={cblm.tagEdit}>Editable</span>
          </div>
          <input
            className={cblm.fieldInput}
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
          />
        </div>
        <div className={cblm.fieldGroup}>
          <div className={cblm.fieldLabel}>
            <span className={cblm.fieldLabelText}>Document No.</span>
            <span className={cblm.tagRo}>Read-only — System-generated</span>
          </div>
          <div className={cn(cblmFieldRo("src-cs"), "font-mono")}>
            {ucMeta.documentNo}{" "}
            <span className="ml-2 font-sans text-[10px] text-[#999]">
              Format: [SECTOR/SUB-SECTOR][NNN] — auto-assigned, aligned with CLM
            </span>
          </div>
        </div>
        <div className={cblm.fieldGroup}>
          <div className={cblm.fieldLabel}>
            <span className={cblm.fieldLabelText}>Revision No.</span>
            <span className={cblm.tagRo}>Read-only — System-generated</span>
          </div>
          <div className={cn(cblm.fieldRo, "font-mono")}>
            {ucMeta.revision}{" "}
            <span className="ml-2 font-sans text-[10px] text-[#999]">
              From audit log — auto-incremented on each re-export
            </span>
          </div>
        </div>
        <div className={cblm.fieldGroup}>
          <div className={cblm.fieldLabel}>
            <span className={cblm.fieldLabelText}>Issued By</span>
            <span className={cblm.tagRo}>Read-only — System-generated</span>
          </div>
          <div className={cblmFieldRo("src-tmpl")}>TESDA</div>
        </div>
        <div className={cblm.fieldGroup}>
          <div className={cblm.fieldLabel}>
            <span className={cblm.fieldLabelText}>Developed By</span>
            <span className={cblm.tagEdit}>Editable — defaults to TESDA</span>
          </div>
          <input
            className={cblm.fieldInput}
            value={developedBy}
            onChange={(e) => setDevelopedBy(e.target.value)}
            placeholder="TESDA"
          />
          <p className="mt-0.5 text-[11px] text-[#999]">
            Default is TESDA. Override if a partner institution is developing this module.
          </p>
        </div>
        <div className={cblm.fieldGroup}>
          <div className={cblm.fieldLabel}>
            <span className={cblm.fieldLabelText}>Date Developed</span>
            <span className={cblm.tagEdit}>Editable — defaults to export date</span>
          </div>
          <input
            type="date"
            className={cn(cblm.fieldInput, "w-[180px]")}
            value={dateDeveloped}
            onChange={(e) => setDateDeveloped(e.target.value)}
          />
        </div>
        <div className={cblm.fieldGroup}>
          <div className={cblm.fieldLabel}>
            <span className={cblm.fieldLabelText}>Date Revised</span>
            <span className={cblm.tagEdit}>Editable — manual entry</span>
          </div>
          <input
            type="date"
            className={cn(cblm.fieldInput, "w-[180px]")}
            value={dateRevised}
            onChange={(e) => setDateRevised(e.target.value)}
          />
        </div>
      </div>

      <SectionDivider label="Revision History (Page 2 of exported document)" />

      <p className="mb-2.5 text-xs text-[#666]">
        Full revision history table appears on the page immediately after the cover page in the
        exported .docx. Revision No. is system-generated; other fields are editable.
      </p>

      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="bg-[#FAFAFA]">
            <th className="w-[100px] border border-[#E0E0E0] px-3 py-2 text-left font-semibold text-[#666]">
              Revision No.
              <br />
              <span className="text-[10px] font-normal">System-generated</span>
            </th>
            <th className="w-[120px] border border-[#E0E0E0] px-3 py-2 text-left font-semibold text-[#666]">
              Date Revised
              <br />
              <span className="text-[10px] font-normal">Manual entry</span>
            </th>
            <th className="border border-[#E0E0E0] px-3 py-2 text-left font-semibold text-[#666]">
              Description of Changes
              <br />
              <span className="text-[10px] font-normal">Manual entry</span>
            </th>
            <th className="w-[140px] border border-[#E0E0E0] px-3 py-2 text-left font-semibold text-[#666]">
              Revised By
              <br />
              <span className="text-[10px] font-normal">Manual entry</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {revRows.map((row, i) => (
            <tr key={row.revNo + i}>
              <td
                className={cn(
                  "border border-[#E0E0E0] px-3 py-1.5 font-mono",
                  row.placeholder ? "text-[#BDBDBD]" : "text-[#999]",
                )}
              >
                {row.revNo}
              </td>
              <td className="border border-[#E0E0E0] px-3 py-1.5">
                <input
                  type="date"
                  className="w-full border-0 bg-transparent font-sans text-xs focus:outline-none"
                  value={row.dateRevised}
                  onChange={(e) => updateRevRow(i, { dateRevised: e.target.value })}
                />
              </td>
              <td className="border border-[#E0E0E0] px-3 py-1.5">
                <input
                  className={cn(
                    "w-full border-0 bg-transparent font-sans text-xs focus:outline-none",
                    row.placeholder && !row.description && "text-[#BDBDBD]",
                  )}
                  value={row.description}
                  placeholder={row.placeholder ? "Enter description..." : undefined}
                  onChange={(e) => updateRevRow(i, { description: e.target.value })}
                />
              </td>
              <td className="border border-[#E0E0E0] px-3 py-1.5">
                <input
                  className={cn(
                    "w-full border-0 bg-transparent font-sans text-xs focus:outline-none",
                    row.placeholder && !row.revisedBy && "text-[#BDBDBD]",
                  )}
                  value={row.revisedBy}
                  placeholder={row.placeholder ? "Revised by..." : undefined}
                  onChange={(e) => updateRevRow(i, { revisedBy: e.target.value })}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className={cn(cblm.dynAdd, "mt-1.5")} onClick={addRevRow}>
        + Add Revision Row
      </button>
    </>
  );
}

function StubContent({ title }: { title: string }) {
  return (
    <div className="p-5 text-[13px] text-[#666]">
      <p>
        <strong>{title}</strong> — auto-populated from finalized CLM (UC-001) and CBC. Content
        matches the HTML mockup structure; edit fields when full copy is required.
      </p>
    </div>
  );
}

const validKinds = Object.keys(frontMatterMeta) as FrontMatterKind[];

export function CBLMFrontMatter() {
  const [searchParams] = useSearchParams();
  const { toast, showToast } = useCblmToast();
  const { saved, saveSheet, validateSheet } = useSaveValidate(showToast);

  const page = searchParams.get("page") as FrontMatterKind | null;
  const kind: FrontMatterKind =
    page && validKinds.includes(page) ? page : "cover";
  const meta = frontMatterMeta[kind];

  const nextNav = useMemo(() => {
    const order: FrontMatterKind[] = [
      "cover",
      "rev-history",
      "howto",
      "list",
      "module-content",
      "prerequisites",
    ];
    const idx = order.indexOf(kind);
    if (idx < 0 || idx >= order.length - 1) return undefined;
    const next = order[idx + 1];
    return {
      href: `/cblm/front-matter?page=${next}`,
      label: frontMatterMeta[next].label,
    };
  }, [kind]);

  const body =
    kind === "cover" ? (
      <CoverContent showToast={showToast} />
    ) : (
      <StubContent title={meta.title} />
    );

  return (
    <>
      <CblmEditorLayout
        sheetNav={
          <SheetNavigation
            title="Front Matter"
            subtitle={`${ucMeta.code} — Module 1`}
            items={frontMatterNavItems}
            activeId={kind}
            backHref="/cblm"
            backLabel="Module 1"
          />
        }
        toolbar={
          <EditorToolbar
            crumbs={[
              { label: "CBC", href: "/" },
              { label: `${ucMeta.code} CBLM`, href: "/cblm" },
              { label: meta.label },
            ]}
            nextHref={nextNav?.href}
            nextLabel={nextNav?.label}
            onSave={saveSheet}
            saved={saved}
            onValidate={validateSheet}
          />
        }
        notice={
          <NoticeBar>
            📋 <strong>Step 1 — Front Matter.</strong> Auto-initialized from qualification
            metadata. Read-only fields are system-generated or pulled from CS/CBC. Editable
            fields are override-allowed.
          </NoticeBar>
        }
        sourcePanel={
          <CblmSourcePanel
            title="Metadata Source"
            showPrimaryLabel={false}
            blocks={[
              {
                title: "Qualification",
                tag: "CS / CBC",
                tagClass: "sbt-cs",
                body: (
                  <>
                    {ucMeta.project}
                    <br />
                    Code: {ucMeta.qualificationCode}
                    <br />
                    Sector: {ucMeta.sector}
                    <br />
                    NC Level: II
                  </>
                ),
              },
              {
                title: "Module Source",
                tag: "CS",
                tagClass: "sbt-cs",
                body: (
                  <>
                    Module 1: {ucMeta.code}
                    <br />
                    {ucMeta.unitCode}
                  </>
                ),
              },
            ]}
            footerNote="No AI generation on front matter. All fields are metadata or template text."
          />
        }
      >
        {body}
      </CblmEditorLayout>
      <CblmToast toast={toast} />
    </>
  );
}
