import { Link } from "react-router-dom";
import { CblmPageLayout } from "@/app/components/competency-based-learning-materials/CblmEditorLayout";
import { LoAccordion, CblmModal } from "@/app/components/competency-based-learning-materials/CblmPrimitives";
import {
  moduleLearningOutcomes,
  moduleReferences,
  ucMeta,
} from "@/app/data/cblmData";
import {
  CblmToast,
  useCblmToast,
  useModal,
} from "@/app/components/competency-based-learning-materials/cblmMockupHooks";
import { cblm, cblmBadge, cblmBtn } from "@/app/components/competency-based-learning-materials/cblmClasses";

function SheetRow({
  sheet,
}: {
  sheet: (typeof moduleLearningOutcomes)[0]["sheets"][0];
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        border: "1px solid #E0E0E0",
        borderRadius: 4,
        overflow: "hidden",
        marginBottom: 5,
        background: "#fff",
        opacity: sheet.locked ? 0.55 : 1,
      }}
    >
      <div style={{ width: 4, background: sheet.typeColor, alignSelf: "stretch", flexShrink: 0 }} />
      <div style={{ flex: 1, padding: "8px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              background: sheet.typeBg,
              color: sheet.typeColor,
              borderRadius: 3,
              padding: "1px 6px",
            }}
          >
            {sheet.type}
          </span>
          <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 600 }}>{sheet.code}</span>
          <span style={{ fontSize: 12, color: "#555", flex: 1 }}>{sheet.title}</span>
          <span className={cblmBadge(sheet.badgeClass)}>{sheet.status}</span>
          {sheet.locked ? (
            <button type="button" className={cblmBtn("lock", "text-[11px] px-2.5 py-0.5")}>
              🔒 Locked
            </button>
          ) : sheet.editorHref ? (
            <Link to={sheet.editorHref} className={cblmBtn("secondary", "text-[11px] px-2.5 py-0.5")}>
              View / Edit
            </Link>
          ) : (
            <button type="button" className={cblmBtn("secondary", "text-[11px] px-2.5 py-0.5")}>
              View / Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function CBLMModule() {
  const { toast, showToast } = useCblmToast();
  const modal = useModal();

  return (
    <CblmPageLayout>
      <div className={cblm.breadcrumb}>
        <Link to="/">
          CBC Generation
        </Link>
        {" › "}
        <span style={{ color: "#1565C0" }}>{ucMeta.code} CLM</span>
        {" › "}
        <strong>CBLM</strong>
      </div>

      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-[20px] font-semibold mb-1">CBLM — {ucMeta.code}</h1>
          <p className="text-[14px] text-gray-600">{ucMeta.titleLower}</p>
          <p className="text-[12px] text-gray-400 mt-1">
 
            {ucMeta.project} · {ucMeta.module} · Document No: {ucMeta.documentNo}
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Link to="/cblm/front-matter" className={cblmBtn("secondary")}>
            📄 Front Matter
          </Link>
          <Link to="/cblm/video-scripts" className={cblmBtn("secondary")}>
            🎬 Video Scripts
          </Link>
          <Link to="/cblm/export" className={cblmBtn("secondary")}>
            ⬇ Export .docx
          </Link>
          <button type="button" className={cblmBtn("success")} onClick={() => modal.open("finalizeModal")}>
            ✓ Finalize Module
          </button>
        </div>
      </div>

      <div className={cblm.card}>
        <div className={cblm.cardHdr}>
          <span className={cblm.cardTitle}>Module 1 Generation Status</span>
          <span className={cblmBadge("b-draft")}>In Progress — Step 2</span>
        </div>
        <div style={{ padding: "16px 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 14 }}>
            {[
              ["6", "Sheets Finalized", "#E8F5E9", "#2E7D32"],
              ["1", "In Draft", "#FFF3E0", "#F57C00"],
              ["3", "Not Started", "#F5F5F5", "#9E9E9E"],
              ["11", "Locked", "#FAFAFA", "#BDBDBD"],
            ].map(([n, l, bg, c]) => (
              <div key={l} style={{ textAlign: "center", padding: 12, border: "1px solid #E0E0E0", borderRadius: 4, background: bg }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: c }}>{n}</div>
                <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
          <div className={cblm.progBar} style={{ height: 10 }}>
            <div className={cblm.progFill} style={{ width: "29%", background: "#1565C0" }} />
          </div>
          <div className={cblm.progText}>
            6 of 21 sheets complete · Step 3 consolidation locked until Step 2 is fully validated
          </div>
        </div>
      </div>

      <div className={cblm.card}>
        <div className={cblm.cardHdr} style={{ background: "#E8F5E9" }}>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E7D32] text-[13px] font-bold text-white">1</div>
            <span className={cblm.cardTitle}>Step 1 — Auto-Initialization</span>
            <span className={cblmBadge("b-finalized")}>✓ Complete</span>
          </div>
        </div>
        <div
          style={{
            padding: "14px 20px",
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          {[
            "Front Cover",
            "How to Use Module",
            "List of Competencies",
            "Module Content",
            "Prerequisites",
            "LO Summary Table",
          ].map((label) => (
            <span
              key={label}
              style={{
                fontSize: 12,
                background: "#E8F5E9",
                color: "#2E7D32",
                borderRadius: 3,
                padding: "3px 10px",
              }}
            >
              ✓ {label}
            </span>
          ))}
        </div>
        <div
          style={{
            padding: "8px 20px",
            borderTop: "1px solid #E0E0E0",
            fontSize: 12,
            color: "#666",
            background: "#FAFAFA",
          }}
        >
          All Step 1 sections are auto-populated from the Finalized CLM ({ucMeta.code}) and CBC. Read-only — no AI
          generation.{" "}
          <Link to="/cblm/front-matter" style={{ color: "#1565C0", marginLeft: 8 }}>
            View Front Cover →
          </Link>
        </div>
      </div>

      <div className={cblm.card}>
        <div className={cblm.cardHdr}>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1565C0] text-[13px] font-bold text-white">2</div>
            <span className={cblm.cardTitle}>Step 2 — Sheet Generation</span>
            <span className={cblmBadge("b-draft")}>In Progress</span>
          </div>
          <button type="button" className={cblmBtn("primary", "text-xs")} onClick={() => modal.open("genModal")}>
            ⚙ Generate All Sheets
          </button>
        </div>
        <div style={{ padding: "16px 20px" }}>
          {moduleLearningOutcomes.map((lo) => (
            <LoAccordion
              key={lo.no}
              id={`mod-lo${lo.no}`}
              number={lo.no}
              title={lo.title}
              subtitle={`Learning Outcome ${lo.no}`}
              progress={lo.badge}
              defaultOpen={lo.defaultOpen}
            >
              {lo.sheets.map((s) => (
                <SheetRow key={s.code} sheet={s} />
              ))}
            </LoAccordion>
          ))}
        </div>
      </div>

      <div className={cblm.card} style={{ opacity: 0.6 }}>
        <div className={cblm.cardHdr} style={{ background: "#FAFAFA" }}>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#BDBDBD] text-[13px] font-bold text-white">
              3
            </div>
            <span className={cblm.cardTitle} style={{ color: "#999" }}>
              Step 3 — Consolidation
            </span>
            <span className={cblmBadge("b-locked")}>🔒 Locked — complete Step 2 first</span>
          </div>
        </div>
        <div style={{ padding: "14px 20px", display: "flex", gap: 10 }}>
          {[
            { label: "JS 1 →", to: "/cblm/editor?page=job-sheet" },
            { label: "LET →", to: "/cblm/editor?page=learning-experiences-table" },
            { label: "Export →", to: "/cblm/export" },
          ].map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              style={{
                fontSize: 12,
                background: "#FAFAFA",
                color: "#1565C0",
                border: "1px solid #1565C0",
                borderRadius: 3,
                padding: "3px 10px",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
        <div
          style={{
            padding: "8px 20px",
            borderTop: "1px solid #E0E0E0",
            fontSize: 12,
            color: "#999",
            background: "#FAFAFA",
          }}
        >
          Job Sheet and LET are generated automatically after all Step 2 sheets are validated for all 3 LOs.
        </div>
      </div>

      <div className={cblm.card}>
        <div className={cblm.cardHdr}>
          <span className={`${cblm.cardTitle} text-[#2E7D32]`}>
            🎬 Video Scripts (Media Scripts)
          </span>
          <Link to="/cblm/video-scripts" className={cblmBtn("secondary", "text-xs")}>
            Open Video Scripts Dashboard
          </Link>
        </div>
        <div className={`${cblm.cardBody} text-xs text-[#666]`}>
          Finalized CBLM unlocks Video Script generation. One script per Task Sheet or Job Sheet in AUDIO | VIDEO format.
        </div>
      </div>

      <div className={cblm.card}>
        <div className={cblm.cardHdr}>
          <span className={cblm.cardTitle}>Reference Documents</span>
        </div>
        <table className={cblm.tbl}>
          <thead>
            <tr>
              <th className={cblm.tblTh}>Document</th>
              <th className={cblm.tblTh}>Type</th>
              <th className={cblm.tblTh}>Used In</th>
              <th className={cblm.tblTh}>Flag</th>
            </tr>
          </thead>
          <tbody>
            {moduleReferences.map((r) => (
              <tr key={r.name} className={cblm.tblRow}>
                <td className={`${cblm.tblTd} font-mono`}>{r.name}</td>
                <td className={cblm.tblTd}>
                  <span className={cblmBadge("b-validated", "text-[10px]")}>
                    {r.type}
                  </span>
                </td>
                <td className={cblm.tblTd}>{r.usedIn}</td>
                <td className={cblm.tblTd}>
                  {r.flagged ? (
                    <span style={{ color: "#C62828", fontSize: 11 }}>⚑ Flagged</span>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CblmModal
        id="genModal"
        open={modal.isOpen("genModal")}
        onClose={modal.close}
        title="Generate All Sheets"
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
                showToast("Sheet generation started", "#1565C0");
              }}
            >
              Generate
            </button>
          </>
        }
      >
        <p style={{ fontSize: 13, color: "#666" }}>
          Generate all eligible sheets for Module 1 using Phase 1 rules (LLM + CS/CBC/CLM).
        </p>
      </CblmModal>

      <CblmModal
        id="finalizeModal"
        open={modal.isOpen("finalizeModal")}
        onClose={modal.close}
        title="Finalize Module 1"
        darkHeader
        footer={
          <button
            type="button"
            className={cblmBtn("success")}
            onClick={() => {
              modal.close();
              showToast("Module finalized", "#2E7D32");
            }}
          >
            Finalize
          </button>
        }
      >
        <p style={{ fontSize: 13 }}>Finalize Module 1 CBLM when all required sheets are validated.</p>
      </CblmModal>

      <CblmToast toast={toast} />
    </CblmPageLayout>
  );
}
