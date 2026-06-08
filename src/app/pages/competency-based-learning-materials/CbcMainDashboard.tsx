import { useNavigate } from "react-router-dom";
import { CblmPageLayout } from "@/app/components/competency-based-learning-materials/CblmEditorLayout";
import { CblmDotsMenu, CblmModal } from "@/app/components/competency-based-learning-materials/CblmPrimitives";
import {
  CblmToast,
  useCblmToast,
  useDropdown,
  useModal,
} from "@/app/components/competency-based-learning-materials/cblmMockupHooks";
import {
  cblm,
  cblmBadge,
  cblmBtn,
  cblmDdItem,
} from "@/app/components/competency-based-learning-materials/cblmClasses";
import {
  CBLM_PROJECT_NAME,
  cbcOtherDocuments,
  cbcUnits,
} from "@/app/data/cblmData";
import { CBC_BASE } from "@/app/utils/cblmRoutes";

function CblmPill({
  locked,
  progress,
  children,
}: {
  locked: boolean;
  progress?: number;
  children: React.ReactNode;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 10px",
        borderRadius: 12,
        background: locked ? "#F5F5F5" : "#FFF8E1",
        color: locked ? "#BDBDBD" : "#F57C00",
        border: locked ? "1px solid #E0E0E0" : "none",
      }}
    >
      {children}
      {!locked && progress !== undefined && (
        <span
          style={{
            display: "inline-block",
            width: 40,
            height: 4,
            background: "#F0F0F0",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <span
            style={{
              display: "block",
              height: "100%",
              width: `${progress}%`,
              background: "#F57C00",
              borderRadius: 2,
            }}
          />
        </span>
      )}
    </span>
  );
}

function UcRowMenu({
  unit,
  menuId,
  open,
  onToggle,
  onOpenClm,
  onOpenCblm,
}: {
  unit: (typeof cbcUnits)[0];
  menuId: string;
  open: boolean;
  onToggle: (e: React.MouseEvent) => void;
  onOpenClm: () => void;
  onOpenCblm: () => void;
}) {
  return (
    <CblmDotsMenu menuId={menuId} open={open} onToggle={onToggle} header={`${unit.code} — CLM`}>
      <div className={cblmDdItem()} role="menuitem" onClick={onOpenClm}>
        View CLM
      </div>
      <div className={cblmDdItem()} role="menuitem">
        Download CLM (.docx)
      </div>
      <div className={cblm.ddSep} />
      <div className={cblm.ddHdr}>{unit.code} — CBLM</div>
      {unit.cblmLocked ? (
        <div
          style={{
            padding: "10px 16px",
            cursor: "not-allowed",
            opacity: 0.7,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 500, color: "#BDBDBD" }}>🔒 Generate CBLM</div>
          <div style={{ fontSize: 11, color: "#BDBDBD", marginTop: 2 }}>{unit.cblmMenuSub}</div>
        </div>
      ) : (
        <div
          style={{ padding: "10px 16px", cursor: "pointer" }}
          role="menuitem"
          onClick={onOpenCblm}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#F5F8FF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "";
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 500, color: "#1565C0" }}>Open CBLM →</div>
          <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{unit.cblmMenuSub}</div>
        </div>
      )}
      <div className={cblmDdItem({ disabled: unit.cblmLocked })} role="menuitem">
        Export CBLM (.docx)
      </div>
      <div className={cblm.ddSep} />
      <div className={cblmDdItem({ danger: true })} role="menuitem">
        Delete CLM
      </div>
    </CblmDotsMenu>
  );
}

export function CbcMainDashboard() {
  const navigate = useNavigate();
  const { toast, showToast } = useCblmToast();
  const dropdown = useDropdown();
  const modal = useModal();

  return (
    <CblmPageLayout>
      <div className={cblm.breadcrumb}>
        Training Projects › <span style={{ color: "#1565C0" }}>{CBLM_PROJECT_NAME}</span> › CBC
        Generation
      </div>

      <div className="mb-5 flex items-start justify-between">
        <div>
          <h1 className="mb-1 text-[20px] font-semibold">Competency-Based Curriculum (CBC)</h1>
          <p className="text-sm text-[#666]">Battery Electric Vehicle (BEV) Servicing Level II</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className={cblmBtn("secondary")}>
            View CBC
          </button>
          <button type="button" className={cblmBtn("primary")}>
            Regenerate All CLMs
          </button>
        </div>
      </div>

      <div className={cblm.card}>
        <div className={cblm.cardHdr}>
          <div>
            <div className={cblm.cardTitle}>Contextual Learning Matrix (CLM)</div>
            <div className="mt-0.5 text-xs text-[#666]">
              Phase 1 · one CLM per core unit of competency ·{" "}
              <em>row click opens the CLM · use ⋯ menu to access CBLM</em>
            </div>
          </div>
          <div className={cblm.ddWrap}>
            <button
              type="button"
              className={cblmBtn("secondary", "text-xs gap-1")}
              onClick={(e) => dropdown.toggle("aggregate-actions", e)}
            >
              ⋮ Actions ▾
            </button>
            <div className={dropdown.isOpen("aggregate-actions") ? `${cblm.ddMenu} ${cblm.ddMenuOpen}` : cblm.ddMenu}>
              <div className={cblm.ddHdr}>CLM — all units</div>
              <div className={cblmDdItem()}>Export all CLMs (.docx)</div>
              <div className={cblmDdItem()}>Download all CLMs (.zip)</div>
              <div className={cblm.ddSep} />
              <div className={cblm.ddHdr}>CBLM — all units</div>
              <div className={cblmDdItem()} onClick={() => modal.open("bulkCblmModal")}>
                Export all CBLMs (.docx)
              </div>
              <div className={cblmDdItem()}>Download all CBLMs (.zip)</div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 20px",
            borderBottom: "1px solid #F0F0F0",
            flexWrap: "wrap",
          }}
        >
          <span className="text-xs font-medium text-[#333]" style={{ minWidth: 96 }}>
            CLM Progress
          </span>
          {[
            ["UC-001 ✓", 100, "#2E7D32"],
            ["UC-002 Draft", 35, "#F57C00"],
            ["UC-003 —", 0, "#E0E0E0"],
          ].map(([label, pct, color]) => (
            <div key={label as string} style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 120 }}>
              <div style={{ flex: 1, height: 6, background: "#F0F0F0", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: color as string, borderRadius: 3 }} />
              </div>
              <span className="text-[11px] text-[#666] whitespace-nowrap">{label as string}</span>
            </div>
          ))}
        </div>

        <table className={cblm.tbl} style={{ marginTop: 8 }}>
          <thead>
            <tr>
              <th className={cblm.tblTh} style={{ width: 80 }}>
                UC Code
              </th>
              <th className={cblm.tblTh}>Unit of Competency</th>
              <th className={cblm.tblTh} style={{ width: 120 }}>
                CLM Status
              </th>
              <th className={cblm.tblTh} style={{ width: 200 }}>
                CBLM Status
                <span className="block text-[10px] font-normal text-[#aaa]">passive — open via ⋯ menu</span>
              </th>
              <th className={cblm.tblTh} style={{ width: 48, textAlign: "center" }} />
            </tr>
          </thead>
          <tbody>
            {cbcUnits.map((unit) => (
              <tr
                key={unit.code}
                className={cblm.tblRowClickable}
                onClick={() => navigate(unit.clmHref)}
              >
                <td className={`${cblm.tblTd} font-medium text-[#1565C0]`}>{unit.code}</td>
                <td className={cblm.tblTd}>
                  <div style={{ fontWeight: 500, color: unit.hoursMuted ? "#888" : "#333" }}>{unit.title}</div>
                  <div className="mt-0.5 text-xs" style={{ color: unit.hoursMuted ? "#BDBDBD" : "#999" }}>
                    {unit.hours}
                  </div>
                </td>
                <td className={cblm.tblTd}>
                  <span className={cblmBadge(unit.clmBadge)}>
                    {unit.clmStatus === "Finalized" ? "✓ " : ""}
                    {unit.clmStatus}
                  </span>
                </td>
                <td className={cblm.tblTd}>
                  <CblmPill locked={unit.cblmLocked} progress={unit.cblmProgress}>
                    {unit.cblmLocked ? "🔒 Locked" : unit.cblmStatus}
                  </CblmPill>
                  <div
                    className="mt-1 pl-0.5 text-[10px]"
                    style={{ color: unit.cblmLocked ? "#BDBDBD" : "#1565C0" }}
                  >
                    {unit.cblmSubtext}
                  </div>
                </td>
                <td className={cblm.tblTd} style={{ textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                  <UcRowMenu
                    unit={unit}
                    menuId={`uc-menu-${unit.code}`}
                    open={dropdown.isOpen(`uc-${unit.code}`)}
                    onToggle={(e) => dropdown.toggle(`uc-${unit.code}`, e)}
                    onOpenClm={() => navigate(unit.clmHref)}
                    onOpenCblm={() => unit.cblmHref && navigate(unit.cblmHref)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            padding: "10px 20px",
            background: "#FFFDE7",
            borderTop: "1px solid #FFF176",
            fontSize: 12,
            color: "#795548",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>
            <strong>Gate rule:</strong> CBLM generation unlocks per UC only when its CLM reaches{" "}
            <strong>Finalized</strong> state. Use the ⋯ menu on each row to open, generate, or export
            CBLM for that UC.
          </span>
        </div>
      </div>

      <div className={cblm.card}>
        <div className={cblm.cardHdr}>
          <span className={cblm.cardTitle}>Other CBC Documents</span>
        </div>
        <table className={cblm.tbl}>
          <thead>
            <tr>
              <th className={cblm.tblTh}>Document Type</th>
              <th className={cblm.tblTh} style={{ width: 130 }}>
                Status
              </th>
              <th className={cblm.tblTh} style={{ width: 260 }}>
                Progress
              </th>
              <th className={cblm.tblTh} style={{ textAlign: "right", width: 100 }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cbcOtherDocuments.map((doc) => (
              <tr
                key={doc.title}
                className={cblm.tblRowClickable}
                onClick={() => showToast(`${doc.title} — not yet available in this mockup`, "#888")}
              >
                <td className={cblm.tblTd}>
                  <div className="font-medium">{doc.title}</div>
                  <div className="mt-0.5 text-xs text-[#999]">{doc.subtitle}</div>
                </td>
                <td className={cblm.tblTd}>
                  <span className={cblmBadge("b-pending")}>{doc.status}</span>
                </td>
                <td className={cblm.tblTd}>
                  <div className={cblm.progBar}>
                    <div className={cblm.progFill} style={{ width: `${doc.progress}%`, background: "#1565C0" }} />
                  </div>
                  <div className={cblm.progText}>{doc.progressText}</div>
                </td>
                <td className={cblm.tblTd} style={{ textAlign: "right" }}>
                  <button
                    type="button"
                    className={cblmBtn("secondary", "text-xs opacity-50 cursor-not-allowed")}
                    disabled
                  >
                    Start
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={cblm.card}>
        <div className={cblm.cardHdr}>
          <span className={cblm.cardTitle}>CBC Workflow</span>
        </div>
        <div className={cblm.cardBody}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => navigate(`${CBC_BASE}/clm`)}
              onKeyDown={(e) => e.key === "Enter" && navigate(`${CBC_BASE}/clm`)}
              style={{
                border: "1px solid #1565C0",
                borderRadius: 6,
                padding: 16,
                background: "#F5F8FF",
                cursor: "pointer",
              }}
            >
              <div className="text-[10px] font-bold uppercase tracking-wide text-[#1565C0]">Phase 1 — Active</div>
              <div className="mt-1 text-sm font-semibold">CLM Generation</div>
              <div className="mt-1 text-xs leading-relaxed text-[#666]">
                Generate one Contextual Learning Matrix per core unit of competency. Finalizing each CLM
                unlocks its CBLM.
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1">
                <span className={cblmBadge("b-finalized", "text-[11px]")}>UC-001 ✓</span>
                <span className={cblmBadge("b-draft", "text-[11px]")}>UC-002 Draft</span>
                <span className={cblmBadge("b-pending", "text-[11px]")}>UC-003 —</span>
              </div>
            </div>
            {[
              ["Phase 2", "Course Design", "Nominal duration, entry requirements, delivery mode, learning resources and facilities.", "Unlocks after all CLMs complete"],
              ["Phase 3", "MOI Assembly", "Assemble Modules of Instruction for Basic, Common and Core competencies.", "Unlocks after Course Design"],
            ].map(([phase, title, desc, note]) => (
              <div
                key={phase as string}
                style={{
                  border: "1px solid #E0E0E0",
                  borderRadius: 6,
                  padding: 16,
                  background: "#FAFAFA",
                  opacity: 0.7,
                }}
              >
                <div className="text-[10px] font-bold uppercase tracking-wide text-[#BDBDBD]">{phase as string}</div>
                <div className="mt-1 text-sm font-semibold text-[#999]">{title as string}</div>
                <div className="mt-1 text-xs leading-relaxed text-[#999]">{desc as string}</div>
                <div className="mt-2.5 text-[11px] text-[#BDBDBD]">{note as string}</div>
              </div>
            ))}
          </div>
          <div
            className="mt-3.5 rounded border border-[#A5D6A7] bg-[#E8F5E9] px-3.5 py-2.5 text-xs text-[#1B5E20]"
          >
            <strong>Note on CBLM:</strong> CBLM documents are generated from within each CLM view, not as a
            separate workflow phase. Finalizing a CLM unlocks CBLM generation for that unit via the ⋯ menu
            or from inside the CLM view.
          </div>
        </div>
      </div>

      <CblmModal
        id="bulkCblmModal"
        open={modal.isOpen("bulkCblmModal")}
        onClose={modal.close}
        title={`Export all CBLMs — ${CBLM_PROJECT_NAME}`}
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
                showToast("Exporting 1 CBLM…", "#1565C0");
              }}
            >
              Export 1 CBLM
            </button>
          </>
        }
      >
        <div className="mb-3.5 rounded border border-[#FFE082] bg-[#FFF3E0] px-3.5 py-2.5 text-xs text-[#795548]">
          Only CBLMs that have been started will be included. Unfinalized sheets export with a{" "}
          <strong>[DRAFT]</strong> watermark.
        </div>
        <div className="space-y-1 text-[13px] leading-8 text-[#555]">
          <div className="flex items-center gap-2.5">
            <span className="text-[#2E7D32]">✔</span>
            <span>
              <strong>UC-001</strong> — In Progress (40% validated) — exports with [DRAFT]
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-[#BDBDBD]">
            <span>■</span>
            <span>
              <strong>UC-002</strong> — CBLM not started — skipped
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-[#BDBDBD]">
            <span>■</span>
            <span>
              <strong>UC-003</strong> — CBLM not started — skipped
            </span>
          </div>
        </div>
      </CblmModal>

      <CblmToast toast={toast} />
    </CblmPageLayout>
  );
}
