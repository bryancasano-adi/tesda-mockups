import { Link } from "react-router-dom";
import { useState } from "react";

import { CblmModal } from "./CblmPrimitives";
import { cblmFrontMatterPath } from "@/app/utils/cblmRoutes";
import { cblm, cblmBtn } from "./cblmClasses";
import { useModal } from "./cblmMockupHooks";
import { moduleReferences, ucMeta } from "@/app/data/cblmData";

const readinessRows = [
  {
    section: "Front Matter",
    dot: "#1B3A5C",
    sheets: "6 / 6",
    pct: 100,
    status: "✓ Included",
    color: "#2E7D32",
  },
  {
    section: "LO 1 — Prepare",
    dot: "#1565C0",
    sheets: "6 / 11",
    pct: 55,
    status: "✓ Included",
    color: "#2E7D32",
    warn: true,
  },
  {
    section: "LO 2 — Inspect",
    dot: "#1565C0",
    sheets: "0 / 11",
    pct: 0,
    status: "No validated sheets",
    color: "#BDBDBD",
    warn: true,
  },
  {
    section: "LO 3 — Document",
    dot: "#1565C0",
    sheets: "0 / 3",
    pct: 0,
    status: "No validated sheets",
    color: "#BDBDBD",
    warn: true,
  },
  {
    section: "Step 3 — Consolidation",
    dot: "#2E7D32",
    sheets: "0 / 3",
    pct: 0,
    status: "No validated sheets",
    color: "#BDBDBD",
    warn: true,
  },
  {
    section: "Video Scripts",
    dot: "#7C3AED",
    sheets: "1 / 4",
    pct: 25,
    status: "✓ Included (draft)",
    color: "#2E7D32",
    warn: true,
  },
];

const includeSections = [
  "Front Cover & Revision History",
  "How to Use This Module",
  "List of Competencies",
  "Module Content",
  "Prerequisites",
  "LO Summary Table",
  "Learning Experiences Table (LET)",
  "All Information Sheets",
  "All Self-Check & Answer Keys",
  "All Task Sheets",
  "All PCC Sheets",
  "All Operation Sheets",
  "Job Sheet (JS 1)",
];

const exportSettings = [
  "Mark unvalidated sheets [DRAFT]",
  "Include trainer signature block (validated sheets only)",
  "Include PCC in export",
  "Apply TESDA cover page template",
  "Generate Table of Contents",
];

export function ConsolidationExportContent({
  showToast,
}: {
  showToast: (msg: string, color?: string) => void;
}) {
  const modal = useModal();
  const flaggedCount = moduleReferences.filter((ref) => ref.flagged).length;
  const [fileName, setFileName] = useState(`${ucMeta.documentNo}.docx`);

  return (
    <div className="space-y-5">
      {flaggedCount > 0 && (
        <div className="rounded-md border border-[#FFCDD2] bg-[#FFEBEE] px-4 py-3">
          <p className="text-sm font-semibold text-[#C62828]">
            {flaggedCount} flagged reference
            {flaggedCount === 1 ? "" : "s"} will appear with a visible ⚑
            FLAGGED indicator in the exported document.
          </p>
        </div>
      )}

      <div className="rounded-md border border-[#FFB74D] bg-[#FFF3E0] px-4 py-3">
        <p className="text-sm font-semibold text-[#E65100]">
          21 of 34 content sheets are not yet validated
        </p>
        <p className="mt-1 text-xs leading-relaxed text-[#795548]">
          Unvalidated sheets will be included but marked <strong>[DRAFT]</strong>.
          Finalize all sheets before distributing externally.
        </p>
      </div>

      <div className={cblm.card} style={{ marginBottom: 0 }}>
        <div className={cblm.cardHdr}>
          <span className={cblm.cardTitle}>Document Control — Export Metadata</span>
          <Link
            className="text-blue-700 hover:underline"
            to={cblmFrontMatterPath()}
          >
            Edit in Front Matter →
          </Link>
        </div>
        <div
          className={cblm.cardBody}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            padding: 0,
          }}
        >
          {[
            ["Document No.", ucMeta.documentNo],
            ["Revision No.", ucMeta.revision],
            ["Qualification", ucMeta.project],
            ["Module", "Module 1 of 3"],
            ["Issued By", "TESDA"],
            ["Developed By", "Joel Fornoles"],
            ["Date Developed", "May 2026"],
            ["Date Revised", "—"],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                padding: "14px 20px",
                borderRight: "1px solid #F0F0F0",
                borderBottom: "1px solid #F0F0F0",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#999",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: label === "Document No." ? "monospace" : "inherit",
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={cblm.card} style={{ marginBottom: 0 }}>
        <div className={cblm.cardHdr}>
          <span className={cblm.cardTitle}>Sheet Readiness by Section</span>
          <span style={{ fontSize: 12, color: "#666" }}>
            7 of 38 total sheets validated
          </span>
        </div>
        <table className={cblm.tbl}>
          <thead>
            <tr>
              <th className={cblm.tblTh}>Section</th>
              <th className={`${cblm.tblTh} w-[120px] text-center`}>Sheets</th>
              <th className={`${cblm.tblTh} w-60`}>Readiness</th>
              <th className={`${cblm.tblTh} w-[120px] text-center`}>
                Export Status
              </th>
            </tr>
          </thead>
          <tbody>
            {readinessRows.map((row) => (
              <tr key={row.section} className={cblm.tblRow}>
                <td className={cblm.tblTd}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: row.dot,
                      }}
                    />
                    <span style={{ fontSize: 13, fontWeight: 500 }}>
                      {row.section}
                    </span>
                    {row.warn && (
                      <span style={{ fontSize: 10, color: "#F57C00" }}>
                        ⚠ Unvalidated marked [DRAFT]
                      </span>
                    )}
                  </div>
                </td>
                <td className={`${cblm.tblTd} text-center`}>{row.sheets}</td>
                <td className={cblm.tblTd}>
                  <div className="flex items-center gap-2">
                    <div className={`${cblm.progBar} flex-1`}>
                      <div
                        className={cblm.progFill}
                        style={{
                          width: `${row.pct}%`,
                          background: row.pct > 0 ? "#1565C0" : "#BDBDBD",
                        }}
                      />
                    </div>
                    <span style={{ fontSize: 12, color: "#666", width: 32 }}>
                      {row.pct}%
                    </span>
                  </div>
                </td>
                <td
                  className={`${cblm.tblTd} text-center text-xs`}
                  style={{ color: row.color }}
                >
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={cblm.card} style={{ marginBottom: 0 }}>
        <div className={cblm.cardHdr}>
          <span className={cblm.cardTitle}>Export Options</span>
        </div>
        <div className="grid gap-6 p-5 sm:grid-cols-2">
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#999]">
              Include Sections
            </h4>
            <div className="space-y-1">
              {includeSections.map((label) => (
                <label
                  key={label}
                  className="flex items-start gap-2 py-1 text-sm text-[#555]"
                >
                  <input
                    checked
                    className="mt-0.5 h-4 w-4 accent-[#1565C0]"
                    type="checkbox"
                    readOnly
                  />
                  <span>{label}</span>
                </label>
              ))}
              <label className="flex items-start gap-2 py-1 text-sm text-[#BDBDBD]">
                <input
                  checked={false}
                  className="mt-0.5 h-4 w-4"
                  disabled
                  type="checkbox"
                />
                <span>Video Scripts</span>
              </label>
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#999]">
                Export Settings
              </h4>
              <div className="space-y-1 rounded-md border border-[#E0E0E0] bg-[#FAFAFA] p-3">
                {exportSettings.map((label) => (
                  <label
                    key={label}
                    className="flex items-start gap-2 py-1 text-sm text-[#555]"
                  >
                    <input
                      checked={label !== "Generate Table of Contents"}
                      className="mt-0.5 h-4 w-4 accent-[#1565C0]"
                      type="checkbox"
                      readOnly
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label
                className="mb-1.5 block text-xs font-semibold text-[#666]"
                htmlFor="export-file-name"
              >
                Output File Name
              </label>
              <input
                className={cblm.fieldInput}
                id="export-file-name"
                type="text"
                value={fileName}
                onChange={(event) => setFileName(event.target.value)}
              />
              <p className="mt-2 text-[11px] text-[#999]">
                Format: Microsoft Word .docx — TESDA CBLM template styles applied
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        className="hidden"
        id="cblm-export-open"
        type="button"
        onClick={() => modal.open("exportModal")}
      />

      <CblmModal
        darkHeader
        footer={
          <>
            <button
              className={cblmBtn("secondary")}
              type="button"
              onClick={modal.close}
            >
              Cancel
            </button>
            <button
              className={cblmBtn("primary")}
              type="button"
              onClick={() => {
                modal.close();
                showToast(`Export started — ${fileName}`, "#1565C0");
              }}
            >
              Download
            </button>
          </>
        }
        id="exportModal"
        open={modal.isOpen("exportModal")}
        title="Export CBLM as .docx"
        onClose={modal.close}
      >
        <p style={{ fontSize: 13, color: "#666" }}>
          Generates a Word document following the TESDA CBLM template: front
          matter, module content, sheets, job sheet, learning experiences table,
          and references.
        </p>
        <p className="mt-2 font-mono text-xs text-[#333]">{fileName}</p>
        {flaggedCount > 0 && (
          <p className="mt-2 text-xs text-[#C62828]">
            {flaggedCount} reference{flaggedCount === 1 ? "" : "s"} will be
            marked ⚑ FLAGGED in the references table.
          </p>
        )}
      </CblmModal>
    </div>
  );
}
