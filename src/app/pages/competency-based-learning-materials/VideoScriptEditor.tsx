import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { CblmEditorLayout } from "@/app/components/competency-based-learning-materials/CblmEditorLayout";
import { SheetNavigation } from "@/app/components/competency-based-learning-materials/SheetNavigation";
import { EditorToolbar } from "@/app/components/competency-based-learning-materials/EditorToolbar";
import { NoticeBar } from "@/app/components/competency-based-learning-materials/NoticeBar";
import { MetaStrip, FieldEditable } from "@/app/components/competency-based-learning-materials/CblmPrimitives";
import {
  CblmToast,
  useCblmToast,
  useSaveValidate,
} from "@/app/components/competency-based-learning-materials/cblmMockupHooks";
import { ucMeta, videoScriptRows } from "@/app/data/cblmData";
import { cblm, cblmBadge, cblmBtn, cblmSourceTag } from "@/app/components/competency-based-learning-materials/cblmClasses";
import { cn } from "@/app/components/ui/utils";

const vsNavItems = videoScriptRows
  .filter((r) => r.eligible)
  .map((r) => ({
    id: r.id,
    label: `${r.code} — ${r.title}`,
    badge: r.scriptStatus,
    badgeClass: r.scriptBadge,
    dotColor: r.scriptStatus === "Draft" ? "#F57C00" : "#2E7D32",
    href: `/cblm/video-scripts/edit?sheet=${encodeURIComponent(r.code)}`,
  }));

const scriptRows = [
  { time: "0:00–0:15", audio: "Welcome. Today we prepare a BEV for safe inspection using mandatory LOTO.", video: "Wide shot: fleet yard, technician approaches BEV with PPE kit." },
  { time: "0:15–0:45", audio: "First, post warning signs and confirm the vehicle is stationary.", video: "Close-up: parking brake, wheel chocks, warning sign placement." },
  { time: "0:45–1:30", audio: "Don Class 0 gloves and verify no damage before HV approach.", video: "Macro: glove inspection, tester checks voltage meter calibration." },
  { time: "1:30–2:15", audio: "Execute ignition-off sequence and wait five minutes for capacitor discharge.", video: "Interior: power-down, timer overlay, MSD location callout." },
  { time: "2:15–3:00", audio: "Apply lockout tag and record zero-voltage verification on AUT-F-001.", video: "LOTO padlock, meter reading, form entry." },
];

export function VideoScriptEditor() {
  const [searchParams] = useSearchParams();
  const sheet = searchParams.get("sheet") || "TS 1.1.1";
  const row = videoScriptRows.find((r) => r.code === sheet) ?? videoScriptRows[0];
  const { toast, showToast } = useCblmToast();
  const { saved, saveSheet, validateSheet } = useSaveValidate(showToast);
  const [intro, setIntro] = useState(
    "This video demonstrates the pre-inspection safety preparation procedure for battery electric vehicles in a fleet servicing environment.",
  );

  return (
    <>
      <CblmEditorLayout
        sheetNav={
          <SheetNavigation
            title="Video Scripts"
            subtitle={`${ucMeta.code} — Module 1`}
            items={[
              { id: "vs-dash", label: "← All Scripts", badge: "Dashboard", badgeClass: "snb-active", dotColor: "#1565C0", href: "/cblm/video-scripts" },
              ...vsNavItems,
            ]}
            activeId={row.id}
            backHref="/cblm/video-scripts"
            backLabel="Video Scripts"
          />
        }
        toolbar={
          <EditorToolbar
            crumbs={[
              { label: "CBC", href: "/" },
              { label: `${ucMeta.code} CBLM`, href: "/cblm" },
              { label: "Video Scripts", href: "/cblm/video-scripts" },
              { label: row.code },
            ]}
            backHref="/cblm/video-scripts"
            backLabel="Scripts"
            onSave={saveSheet}
            onValidate={validateSheet}
            saved={saved}
          />
        }
        notice={
          <NoticeBar>
            🎬 <strong>{row.code}</strong> — Video Script · Two-column AUDIO | VIDEO · Target 3–5 min
          </NoticeBar>
        }
        sourcePanel={
          <div className={cblm.srcPanel}>
            <div className={cblm.spHdr}>
              📂 <span className={cblm.spTitle}>Source Task Sheet</span>
            </div>
            <div className={cblm.spBody}>
              <div className={cblm.spBlock}>
                <div className={cblm.spBh}>
                  <span className={cblm.spBl}>{row.code}</span>
                  <span className={cblmSourceTag("sbt-cbc")}>TS</span>
                </div>
                <div className={cblm.spBb}>{row.title}</div>
              </div>
            </div>
          </div>
        }
      >
        <MetaStrip
          items={[
            { label: "Script For", value: row.code },
            { label: "Source Sheet", value: row.title },
            { label: "Status", value: <span className={cblmBadge("b-draft")}>Draft</span> },
            { label: "Duration Target", value: "3–5 minutes" },
          ]}
        />
        <FieldEditable
          label="Opening Narration"
          value={intro}
          onChange={setIntro}
          rows={2}
          aiBoxId="ai-vs-intro"
          showToast={showToast}
        />
        <table className={cblm.vsTbl}>
          <thead>
            <tr>
              <th className={cblm.vsTh} style={{ width: 80 }}>Time</th>
              <th className={cblm.vsTh}>AUDIO (Narration)</th>
              <th className={cblm.vsTh}>VIDEO (Visual)</th>
            </tr>
          </thead>
          <tbody>
            {scriptRows.map((r) => (
              <tr key={r.time}>
                <td className={`${cblm.vsTd} font-mono text-[11px]`}>{r.time}</td>
                <td className={cblm.vsTd}>
                  <textarea className={cblm.fieldEdit} rows={2} defaultValue={r.audio} />
                </td>
                <td className={cblm.vsTd}>
                  <textarea className={cblm.fieldEdit} rows={2} defaultValue={r.video} />
                </td>
              </tr>
            ))}
            <tr className={cblm.vsTmplRow}>
              <td className={cblm.vsTd}>+</td>
              <td className={cn(cblm.vsTd, "italic")} colSpan={2}>
                Add row…
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-3">
          <Link to="/cblm" className={cblmBtn("secondary", "text-xs")}>
            ← Module 1
          </Link>
        </div>
      </CblmEditorLayout>
      <CblmToast toast={toast} />
    </>
  );
}
