import { Link } from "react-router-dom";
import { useState } from "react";
import { CblmPageLayout } from "@/app/components/competency-based-learning-materials/CblmEditorLayout";
import {
  CBLM_PROJECT_NAME,
  clmLearningOutcomes,
  clmMeta,
  ucMeta,
} from "@/app/data/cblmData";
import { cblm, cblmBadge, cblmBtn } from "@/app/components/competency-based-learning-materials/cblmClasses";
import { CBC_BASE } from "@/app/utils/cblmRoutes";

const CLM_TABS = ["Learning Outcomes", "Methodology", "Resources", "Assessment"] as const;

export function ClmUcView() {
  const [activeTab, setActiveTab] = useState<(typeof CLM_TABS)[number]>("Learning Outcomes");

  return (
    <CblmPageLayout>
      <div className={cblm.breadcrumb}>
        Training Projects ›{" "}
        <Link to={CBC_BASE} style={{ color: "#1565C0" }}>
          {CBLM_PROJECT_NAME}
        </Link>{" "}
        ›{" "}
        <Link to={CBC_BASE} style={{ color: "#1565C0" }}>
          CBC Generation
        </Link>{" "}
        › <strong>{ucMeta.code} CLM</strong>
      </div>

      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-1 flex items-center gap-2.5">
            <h1 className="text-[19px] font-semibold">{ucMeta.titleLower}</h1>
            <span className={cblmBadge("b-finalized", "shrink-0 whitespace-nowrap")}>✓ CLM Finalized</span>
          </div>
          <p className="text-[13px] text-[#666]">
            {ucMeta.code} · {ucMeta.unitCode} · {ucMeta.project} · {ucMeta.ncLevel} · {clmMeta.hours}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" className={cblmBtn("secondary", "text-xs")}>
            Regenerate CLM
          </button>
          <button type="button" className={cblmBtn("secondary", "text-xs")}>
            Download CLM
          </button>
          <Link to={CBC_BASE} className={cblmBtn("secondary", "text-xs")}>
            ← Back to CBC
          </Link>
        </div>
      </div>

      <div className="mb-5 overflow-hidden rounded-md border border-[#E0E0E0] bg-white">
        <div className="grid grid-cols-4 border-b border-[#F0F0F0]">
          {[
            ["Sector", ucMeta.sector],
            ["Methodology", clmMeta.methodology],
            ["Finalized by", clmMeta.finalizedBy],
            ["Date finalized", clmMeta.dateFinalized],
          ].map(([label, value], i) => (
            <div
              key={label}
              className="px-5 py-3"
              style={{ borderRight: i < 3 ? "1px solid #F0F0F0" : undefined }}
            >
              <div className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#999]">
                {label}
              </div>
              <div className="text-[13px] font-medium">{value}</div>
            </div>
          ))}
        </div>

        <div className="flex border-b-2 border-[#E0E0E0] px-5">
          {CLM_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className="mb-[-2px] border-b-2 px-5 py-2.5 text-[13px] font-medium transition-colors"
              style={{
                color: activeTab === tab ? "#1565C0" : "#888",
                borderBottomColor: activeTab === tab ? "#1565C0" : "transparent",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Learning Outcomes" &&
          clmLearningOutcomes.map((lo) => (
            <div
              key={lo.no}
              className="flex items-start gap-3.5 border-b border-[#F5F5F5] px-5 py-3.5 last:border-b-0"
            >
              <div className="mt-px flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1565C0] text-xs font-bold text-white">
                {lo.no}
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-medium">{lo.title}</div>
                <div className="mt-1 text-xs leading-relaxed text-[#888]">
                  {lo.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className={`mr-1 inline-block rounded-[3px] px-[7px] py-px text-[10px] font-semibold ${tag.className}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                  · {lo.meta}
                </div>
              </div>
              <span className={cblmBadge("b-finalized", "shrink-0 text-[11px]")}>✓ {lo.status}</span>
            </div>
          ))}

        {activeTab !== "Learning Outcomes" && (
          <div className="px-5 py-8 text-center text-sm text-[#999]">
            {activeTab} content — available in full CLM editor (mockup placeholder).
          </div>
        )}

        <div
          className="flex flex-wrap items-center gap-6 border-t border-[#F0F0F0] bg-[#FAFAFA] px-5 py-3 text-xs text-[#666]"
        >
          <span>3 learning outcomes</span>
          <span className="text-[#E0E0E0]">|</span>
          <span>6 IS · 6 SC/AK · 3 TS · 3 PCC · 1 OS</span>
          <span className="text-[#E0E0E0]">|</span>
          <span>52 hours total</span>
          <span className="text-[#E0E0E0]">|</span>
          <span className="font-medium text-[#1565C0]">
            Revision 00 · Document No: {clmMeta.documentNo}
          </span>
        </div>
      </div>

      <div className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-[#555]">CBLM Generation</div>

      <div className="mb-5 overflow-hidden rounded-md border border-[#90CAF9] bg-[#E3F2FD]">
        <div className="flex items-center justify-between gap-3 border-b border-[#BBDEFB] px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#1565C0] text-white">
              📄
            </div>
            <div>
              <div className="text-sm font-semibold text-[#042C53]">CBLM — Module 1</div>
              <div className="mt-px text-xs text-[#1565C0]">
                CLM is Finalized — CBLM generation is available for this unit
              </div>
            </div>
          </div>
          <span className={cblmBadge("b-draft", "shrink-0 text-[11px]")}>In Progress</span>
        </div>

        <div className="mx-5 my-4 overflow-hidden rounded-md border border-[#BBDEFB] bg-white">
          <div className="flex items-start gap-4 px-4 py-3.5">
            <div className="flex-1">
              <div className="text-[13px] font-semibold">
                CBLM — {ucMeta.code} · {ucMeta.titleLower}
              </div>
              <div className="mt-1 text-xs leading-relaxed text-[#666]">
                Document No: {ucMeta.documentNo} · Revision {ucMeta.revision} · Module 1 of 3
              </div>
              <div className="mt-1 text-xs text-[#666]">
                Step 2 of 3 in progress · IS generation for LO 1 complete · LO 2 & LO 3 not started
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <div className="h-[5px] max-w-[180px] flex-1 overflow-hidden rounded-sm bg-[#BBDEFB]">
                  <div className="h-full w-[29%] rounded-sm bg-[#1565C0]" />
                </div>
                <span className="text-[11px] font-medium text-[#1565C0]">6 of 21 sheets validated</span>
                <span className="text-[11px] text-[#999]">· Last updated {clmMeta.lastUpdated}</span>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {[
                  ["6 Validated", "#E8F5E9", "#2E7D32"],
                  ["1 Draft", "#FFF3E0", "#F57C00"],
                  ["3 Not started", "#F5F5F5", "#666"],
                  ["11 Locked", "#FAFAFA", "#BDBDBD"],
                ].map(([label, bg, color]) => (
                  <span
                    key={label as string}
                    className="rounded-[10px] px-2 py-0.5 text-[11px] font-medium"
                    style={{
                      background: bg as string,
                      color: color as string,
                      border: label === "11 Locked" ? "1px solid #E0E0E0" : undefined,
                    }}
                  >
                    {label as string}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              <Link to={`${CBC_BASE}/cblm`} className={cblmBtn("primary", "text-[13px] px-4 py-2.5 font-semibold")}>
                Open CBLM →
              </Link>
              <Link to={`${CBC_BASE}/export`} className={cblmBtn("secondary", "text-xs px-3.5 py-1.5")}>
                Export .docx
              </Link>
            </div>
          </div>
          <div className="px-4 pb-3.5">
            <div className="flex gap-1.5">
              <div className="flex-1 rounded bg-[#E8F5E9] px-2.5 py-1.5">
                <div className="text-[10px] font-bold text-[#2E7D32]">✓ STEP 1</div>
                <div className="text-[11px] text-[#2E7D32]">Auto-initialization</div>
              </div>
              <div className="flex-1 rounded border border-[#90CAF9] bg-[#E3F2FD] px-2.5 py-1.5">
                <div className="text-[10px] font-bold text-[#1565C0]">▶ STEP 2</div>
                <div className="text-[11px] text-[#1565C0]">Sheet generation</div>
              </div>
              <div className="flex-1 rounded bg-[#F5F5F5] px-2.5 py-1.5 opacity-60">
                <div className="text-[10px] font-bold text-[#BDBDBD]">🔒 STEP 3</div>
                <div className="text-[11px] text-[#BDBDBD]">Consolidation (JS, LET)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 pb-3.5 text-xs text-[#1565C0]">
          Video Scripts become available after this CBLM is Finalized.{" "}
          <Link to={`${CBC_BASE}/video-scripts`} className="font-medium text-[#1565C0]">
            View Video Script dashboard →
          </Link>
        </div>
      </div>

      <div className="mb-2.5 text-xs text-[#999]">
        Other units in this qualification — CBLM locked until CLM finalized
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3">
        {[
          {
            code: "UC-002",
            status: "CLM status: Draft — finalize CLM first",
            title: "Service BEV mechanical system and components · 148 hrs",
          },
          {
            code: "UC-003",
            status: "CLM status: Not started",
            title: "Maintain electric vehicle battery system · — hrs",
          },
        ].map((uc) => (
          <div
            key={uc.code}
            className="overflow-hidden rounded-md border border-[#E0E0E0] bg-[#FAFAFA]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-[#F0F0F0] px-5 py-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#BDBDBD] text-white">
                  🔒
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[#555]">{uc.code} — CBLM</div>
                  <div className="mt-px text-[11px] text-[#BDBDBD]">{uc.status}</div>
                </div>
              </div>
              <span className={cblmBadge("b-pending", "shrink-0 text-[11px]")}>Locked</span>
            </div>
            <div className="px-5 py-3">
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center gap-1.5 rounded border border-[#E0E0E0] bg-[#F5F5F5] px-4 py-2.5 text-[13px] font-medium text-[#BDBDBD]"
              >
                🔒 Generate CBLM
              </button>
              <div className="mt-2 text-[11px] text-[#BDBDBD]">{uc.title}</div>
            </div>
          </div>
        ))}
      </div>
    </CblmPageLayout>
  );
}
