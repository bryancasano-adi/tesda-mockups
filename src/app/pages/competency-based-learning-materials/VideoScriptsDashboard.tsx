import { Link } from "react-router-dom";
import { useState, type ReactNode } from "react";
import { CblmPageLayout } from "@/app/components/competency-based-learning-materials/CblmEditorLayout";
import { CblmDotsMenu, CblmModal } from "@/app/components/competency-based-learning-materials/CblmPrimitives";
import {
  CblmToast,
  useCblmToast,
  useDropdown,
  useModal,
} from "@/app/components/competency-based-learning-materials/cblmMockupHooks";
import { ucMeta, videoScriptRows, type VideoScriptRow } from "@/app/data/cblmData";
import {
  cblm,
  cblmBadge,
  cblmBtn,
  cblmDdItem,
} from "@/app/components/competency-based-learning-materials/cblmClasses";
import { cn } from "@/app/components/ui/utils";

function VsMenuItem({
  disabled,
  danger,
  onClick,
  to,
  children,
}: {
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
  to?: string;
  children: ReactNode;
}) {
  const className = cblmDdItem({ disabled, danger, className: "w-full" });
  if (to && !disabled) {
    return (
      <Link to={to} role="menuitem" className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function sheetEditorHref(code: string) {
  return `/cblm/video-scripts/edit?sheet=${encodeURIComponent(code)}`;
}

function RowActions({
  row,
  dd,
  showToast,
}: {
  row: VideoScriptRow;
  dd: ReturnType<typeof useDropdown>;
  showToast: (msg: string, color?: string) => void;
}) {
  const menuId = `vs-row-${row.id}`;
  const editorHref = sheetEditorHref(row.code);
  const hasScript = row.scriptBadge === "b-draft";
  const notGenerated = row.scriptBadge === "b-pending";
  const locked = !row.eligible || row.scriptBadge === "b-locked";

  return (
    <div className="flex items-center justify-end gap-2">
      {hasScript && (
        <Link to={editorHref} className={cblmBtn("secondary", "text-[11px] px-2.5 py-1")}>
          View / Edit
        </Link>
      )}
      {notGenerated && row.eligible && (
        <button
          type="button"
          className={cblmBtn("primary", "text-[11px] px-2.5 py-1")}
          onClick={() => showToast(`Generating ${row.code} script…`, "#1565C0")}
        >
          Generate
        </button>
      )}
      {locked && (
        <span className="text-xs text-[#BDBDBD]">🔒 Finalize CBLM first</span>
      )}

      <CblmDotsMenu
        menuId={menuId}
        header={`${row.code} — Video Script`}
        open={dd.isOpen(menuId)}
        onToggle={(e) => dd.toggle(menuId, e)}
      >
        <VsMenuItem disabled={!hasScript} to={hasScript ? editorHref : undefined}>
          View Script
        </VsMenuItem>
        <VsMenuItem disabled={!hasScript} to={hasScript ? editorHref : undefined}>
          Edit Script
        </VsMenuItem>
        <div className={cblm.ddSep} />
        {hasScript && (
          <VsMenuItem
            disabled
            onClick={() => showToast(`Regenerating ${row.code}…`, "#1565C0")}
          >
            Regenerate Script
          </VsMenuItem>
        )}
        {notGenerated && row.eligible && (
          <VsMenuItem onClick={() => showToast(`Generating ${row.code} script…`, "#1565C0")}>
            Generate Script
          </VsMenuItem>
        )}
        <VsMenuItem
          disabled={!hasScript}
          onClick={() => showToast(`Exporting ${row.code}…`, "#1565C0")}
        >
          Export Script (.docx)
        </VsMenuItem>
        {locked && (
          <>
            <div className={cblm.ddSep} />
            <VsMenuItem disabled>🔒 Finalize CBLM first</VsMenuItem>
          </>
        )}
        <div className={cblm.ddSep} />
        <VsMenuItem
          danger
          disabled={!hasScript}
          onClick={() => showToast(`Delete ${row.code} script`, "#C62828")}
        >
          Delete Script
        </VsMenuItem>
      </CblmDotsMenu>
    </div>
  );
}

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
        <div className={cn("relative flex items-center gap-2", dd.isOpen("vs-all") && "z-50")}>
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
            <select
              className={cn(
                cblm.fieldInput,
                "cursor-pointer appearance-none bg-[length:12px] bg-[right_10px_center] bg-no-repeat pr-9",
              )}
              style={{
                width: 160,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26 26' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              }}
              defaultValue="selected"
            >
              <option value="selected">Selected only</option>
              <option value="all">All eligible sheets</option>
            </select>
          </div>
        </div>
      </div>

      <div className={cn(cblm.card, "overflow-visible")}>
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
              <tr
                key={row.id}
                className={cn(cblm.tblRow, dd.isOpen(`vs-row-${row.id}`) && "relative z-50")}
              >
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
                  <RowActions row={row} dd={dd} showToast={showToast} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={cblm.card}>
        <div className={cblm.cardHdr}>
          <span className={cblm.cardTitle}>Video Script Format</span>
        </div>
        <div className={cn(cblm.cardBody, "grid grid-cols-2 gap-5")}>
          <div>
            <div className="mb-2 text-xs font-semibold text-[#555]">Document Structure</div>
            <div className="flex flex-col gap-1 text-xs text-[#666]">
              <div className="rounded-sm border border-[#E0E0E0] bg-[#FAFAFA] px-2.5 py-1.5 font-mono text-[#999] italic">
                OBB — Opening Billboard (read-only)
              </div>
              <div className="rounded-sm border border-[#BBDEFB] bg-[#E3F2FD] px-2.5 py-1.5">
                Generated rows — one per procedure step
              </div>
              <div className="rounded-sm border border-[#E0E0E0] bg-[#FAFAFA] px-2.5 py-1.5 font-mono text-[#999] italic">
                CBB — Closing Billboard (read-only)
              </div>
            </div>
          </div>
          <div>
            <div className="mb-2 text-xs font-semibold text-[#555]">Generation Rules</div>
            <div className="text-xs leading-8 text-[#666]">
              <ul className="list-disc ml-5 *:-mb-2">
                <li>Second-person &ldquo;You&rdquo; point of view</li>
                <li>Short sentences — conversational but formal</li>
                <li>PCC quality standards integrated into steps</li>
                <li>Source: Finalized Task Sheet + paired PCC</li>
              </ul>
         
            </div>
          </div>
        </div>
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
