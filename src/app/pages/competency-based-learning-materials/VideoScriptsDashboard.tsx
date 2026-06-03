import { Link } from "react-router-dom";
import { useState } from "react";
import { CblmPageLayout } from "@/app/components/competency-based-learning-materials/CblmEditorLayout";
import { CblmModal } from "@/app/components/competency-based-learning-materials/CblmPrimitives";
import {
  CblmToast,
  useCblmToast,
  useDropdown,
  useModal,
} from "@/app/components/competency-based-learning-materials/cblmMockupHooks";
import { ucMeta, videoScriptRows } from "@/app/data/cblmData";
import { cblm, cblmBadge, cblmBtn } from "@/app/components/competency-based-learning-materials/cblmClasses";

export function VideoScriptsDashboard() {
  const { toast, showToast } = useCblmToast();
  const modal = useModal();
  const dd = useDropdown();
  const [rows, setRows] = useState(videoScriptRows);

  return (
    <CblmPageLayout>
      <div className={cblm.breadcrumb}>
        <Link to="/">CBC</Link>
        {" › "}
        <Link to="/cblm">
          {ucMeta.code} CBLM
        </Link>
        {" › "}
        <strong>Video Scripts</strong>
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>
            Video Scripts — Module 1
          </h1>
          <p style={{ fontSize: 14, color: "#666" }}>{ucMeta.title}</p>
          <p style={{ fontSize: 12, color: "#999", marginTop: 4 }}>
            One script per Task Sheet or Job Sheet · Two-column AUDIO | VIDEO format · 3–5 min target
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            type="button"
            className={cblmBtn("primary")}
            onClick={() => modal.open("genVsModal")}
          >
            Generate Selected
          </button>
        </div>
      </div>

      <div
        style={{
          background: "#FFF8E1",
          border: "1px solid #FFE082",
          borderRadius: 4,
          padding: "12px 16px",
          marginBottom: 20,
          fontSize: 12,
          color: "#795548",
        }}
      >
        <strong>Gate rule:</strong> Video Scripts require a <strong>Finalized</strong> CBLM. TS
        1.1.1, TS 1.2.1, TS 1.2.2 are eligible. JS 1 is locked (CBLM still in Draft).
      </div>

      <div className={cblm.card}>
        <div className={cblm.cardHdr}>
          <span className={cblm.cardTitle}>Generation Settings</span>
        </div>
        <div
          className={cblm.cardBody}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}
        >
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>
              Minimum Duration (min)
            </div>
            <input type="number" defaultValue={3} min={1} max={10} className={cblm.fieldInput} style={{ width: 80 }} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>
              Maximum Duration (min)
            </div>
            <input type="number" defaultValue={5} min={1} max={15} className={cblm.fieldInput} style={{ width: 80 }} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>
              Generation Mode
            </div>
            <select className={cblm.fieldInput} style={{ width: 160 }} defaultValue="selected">
              <option value="selected">Selected only</option>
              <option value="all">All eligible sheets</option>
            </select>
          </div>
        </div>
      </div>

      <div className={cblm.card}>
        <div className={cblm.cardHdr}>
          <span className={cblm.cardTitle}>Task & Job Sheets — Script Status</span>
          <span style={{ fontSize: 12, color: "#666" }}>3 of 4 sheets eligible · 1 script in draft</span>
        </div>
        <table className={cblm.tbl}>
          <thead>
            <tr>
              <th className={`${cblm.tblTh} w-[140px]`}>Select / Type</th>
              <th className={cblm.tblTh}>Sheet Title</th>
              <th className={`${cblm.tblTh} w-[110px]`}>CBLM Status</th>
              <th className={`${cblm.tblTh} w-[110px]`}>Script Status</th>
              <th className={`${cblm.tblTh} w-[70px] text-center`}>Duration</th>
              <th className={`${cblm.tblTh} w-40 text-right`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className={cblm.tblRow}>
                <td className={cblm.tblTd}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input
                      type="checkbox"
                      disabled={!row.eligible}
                      checked={row.checked}
                      onChange={(e) =>
                        setRows((prev) =>
                          prev.map((r) =>
                            r.id === row.id ? { ...r, checked: e.target.checked } : r,
                          ),
                        )
                      }
                    />
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        background: row.type === "TS" ? "#F57C0022" : "#1B3A5C22",
                        color: row.type === "TS" ? "#F57C00" : "#1B3A5C",
                        borderRadius: 3,
                        padding: "1px 6px",
                      }}
                    >
                      {row.type}
                    </span>
                    <span style={{ fontFamily: "monospace", fontWeight: 600 }}>{row.code}</span>
                  </div>
                </td>
                <td className={cblm.tblTd}>{row.title}</td>
                <td className={cblm.tblTd}>
                  <span className={cblmBadge(row.cblmBadge)}>{row.cblmStatus}</span>
                </td>
                <td className={cblm.tblTd}>
                  <span className={cblmBadge(row.scriptBadge)}>{row.scriptStatus}</span>
                </td>
                <td className={`${cblm.tblTd} text-center text-xs text-[#666]`}>{row.duration}</td>
                <td className={cblm.tblTd}>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                    {row.eligible ? (
                      <Link
                        to={`/cblm/video-scripts/edit?sheet=${encodeURIComponent(row.code)}`}
                        className={cblmBtn("secondary", "text-[11px] px-2.5 py-1")}
                      >
                        View / Edit
                      </Link>
                    ) : (
                      <button type="button" className={cblmBtn("lock", "text-[11px]")}>
                        Locked
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CblmModal
        id="genVsModal"
        open={modal.isOpen("genVsModal")}
        onClose={modal.close}
        title="Generate Video Scripts"
        footer={
          <button
            type="button"
            className={cblmBtn("primary")}
            onClick={() => {
              modal.close();
              showToast("Video script generation queued", "#7C3AED");
            }}
          >
            Generate
          </button>
        }
      >
        <p style={{ fontSize: 13, color: "#666" }}>
          Generate scripts for selected eligible Task/Job sheets using AUDIO | VIDEO two-column format.
        </p>
      </CblmModal>

      <CblmToast toast={toast} />
    </CblmPageLayout>
  );
}
