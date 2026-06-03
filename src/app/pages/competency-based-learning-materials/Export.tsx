import { Link } from "react-router-dom";
import { CblmPageLayout } from "@/app/components/competency-based-learning-materials/CblmEditorLayout";
import { CblmModal } from "@/app/components/competency-based-learning-materials/CblmPrimitives";
import {
  CblmToast,
  useCblmToast,
  useModal,
} from "@/app/components/competency-based-learning-materials/cblmMockupHooks";
import { ucMeta } from "@/app/data/cblmData";
import { cblm, cblmBtn } from "@/app/components/competency-based-learning-materials/cblmClasses";

const readinessRows = [
  { section: "Front Matter", dot: "#1B3A5C", sheets: "6 / 6", pct: 100, status: "✓ Included", color: "#2E7D32" },
  { section: "LO 1 — Prepare", dot: "#1565C0", sheets: "6 / 11", pct: 55, status: "✓ Included", color: "#2E7D32", warn: true },
  { section: "LO 2 — Inspect", dot: "#1565C0", sheets: "0 / 11", pct: 0, status: "No validated sheets", color: "#BDBDBD", warn: true },
  { section: "LO 3 — Document", dot: "#1565C0", sheets: "0 / 3", pct: 0, status: "No validated sheets", color: "#BDBDBD", warn: true },
  { section: "Step 3 — Consolidation", dot: "#2E7D32", sheets: "0 / 3", pct: 0, status: "No validated sheets", color: "#BDBDBD", warn: true },
  { section: "Video Scripts", dot: "#7C3AED", sheets: "1 / 4", pct: 25, status: "✓ Included (draft)", color: "#2E7D32", warn: true },
];

export function CBLMExport() {
  const { toast, showToast } = useCblmToast();
  const modal = useModal();

  return (
    <CblmPageLayout>
      <div className={cblm.breadcrumb}>
        <Link to="/">CBC</Link>
        {" › "}
        <Link to="/cblm">
          {ucMeta.code} CBLM
        </Link>
        {" › "}
        <strong>Export .docx</strong>
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>
            Export CBLM — {ucMeta.code}
          </h1>
          <p style={{ fontSize: 14, color: "#666" }}>{ucMeta.titleLower}</p>
          <p style={{ fontSize: 12, color: "#999", marginTop: 4 }}>
            {ucMeta.project} · {ucMeta.module} · Document No: {ucMeta.documentNo} · Revision No:{" "}
            {ucMeta.revision}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link to="/cblm" className={cblmBtn("secondary")}>
            ← Back to Module
          </Link>
          <button type="button" className={cblmBtn("primary")} onClick={() => modal.open("exportModal")}>
            ⬇ Export as .docx
          </button>
        </div>
      </div>

      <div
        style={{
          background: "#FFF3E0",
          border: "1px solid #FFB74D",
          borderRadius: 4,
          padding: "12px 16px",
          marginBottom: 20,
        }}
      >
        <div style={{ fontWeight: 600, color: "#E65100", marginBottom: 4 }}>
          21 of 34 content sheets are not yet validated
        </div>
        <div style={{ fontSize: 12, color: "#795548" }}>
          Unvalidated sheets will be included but marked <strong>[DRAFT]</strong>. Finalize all sheets
          before distributing externally.
        </div>
      </div>

      <div className={cblm.card}>
        <div className={cblm.cardHdr}>
          <span className={cblm.cardTitle}>Document Control — Export Metadata</span>
          <Link to="/cblm/front-matter" style={{ fontSize: 12, color: "#1565C0" }}>
            Edit in Front Matter →
          </Link>
        </div>
        <div className={cblm.cardBody} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, padding: 0 }}>
          {[
            ["Document No.", ucMeta.documentNo],
            ["Revision No.", ucMeta.revision],
            ["Qualification", ucMeta.project],
            ["Module", "Module 1 of 3"],
          ].map(([l, v]) => (
            <div key={l} style={{ padding: "14px 20px", borderRight: "1px solid #F0F0F0", borderBottom: "1px solid #F0F0F0" }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#999", textTransform: "uppercase", marginBottom: 4 }}>{l}</div>
              <div style={{ fontSize: 13, fontWeight: 500, fontFamily: "monospace" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={cblm.card}>
        <div className={cblm.cardHdr}>
          <span className={cblm.cardTitle}>Sheet Readiness by Section</span>
          <span style={{ fontSize: 12, color: "#666" }}>7 of 38 total sheets validated</span>
        </div>
        <table className={cblm.tbl}>
          <thead>
            <tr>
              <th className={cblm.tblTh}>Section</th>
              <th className={`${cblm.tblTh} w-[120px] text-center`}>Sheets</th>
              <th className={`${cblm.tblTh} w-60`}>Readiness</th>
              <th className={`${cblm.tblTh} w-[120px] text-center`}>Export Status</th>
            </tr>
          </thead>
          <tbody>
            {readinessRows.map((r) => (
              <tr key={r.section} className={cblm.tblRow}>
                <td className={cblm.tblTd}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.dot }} />
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{r.section}</span>
                    {r.warn && (
                      <span style={{ fontSize: 10, color: "#F57C00" }}>⚠ Unvalidated marked [DRAFT]</span>
                    )}
                  </div>
                </td>
                <td className={`${cblm.tblTd} text-center`}>{r.sheets}</td>
                <td className={cblm.tblTd}>
                  <div className="flex items-center gap-2">
                    <div className={`${cblm.progBar} flex-1`}>
                      <div
                        className={cblm.progFill}
                        style={{
                          width: `${r.pct}%`,
                          background: r.pct > 0 ? "#1565C0" : "#BDBDBD",
                        }}
                      />
                    </div>
                    <span style={{ fontSize: 12, color: "#666", width: 32 }}>{r.pct}%</span>
                  </div>
                </td>
                <td className={`${cblm.tblTd} text-center text-xs`} style={{ color: r.color }}>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CblmModal
        id="exportModal"
        open={modal.isOpen("exportModal")}
        onClose={modal.close}
        title="Export CBLM as .docx"
        darkHeader
        footer={
          <>
            <button type="button" className={cblmBtn("secondary")} onClick={modal.close}>
              Cancel
            </button>
            <button
              type="button"
              className={cblmBtn("primary")}
              onClick={() => {
                modal.close();
                showToast("Export started — AUT-BEV-001.docx", "#1565C0");
              }}
            >
              Download
            </button>
          </>
        }
      >
        <p style={{ fontSize: 13, color: "#666" }}>
          Generates a Word document following the TESDA CBLM template: front matter, module content,
          sheets, job sheet, learning experiences table, and references.
        </p>
      </CblmModal>

      <CblmToast toast={toast} />
    </CblmPageLayout>
  );
}
