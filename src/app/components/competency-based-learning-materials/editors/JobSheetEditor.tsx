import { useState } from "react";
import { CblmBadge, FieldEditable, FieldReadOnly, MetaStrip, SectionDivider } from "../CblmPrimitives";
import { cblm } from "../cblmClasses";

export function JobSheetEditor({
  showToast,
}: {
  showToast: (msg: string, color?: string) => void;
}) {
  const [title, setTitle] = useState(
    "Carry Out a Complete Pre-Service Inspection of a Battery Electric Vehicle",
  );
  const [objective, setObjective] = useState(
    "Given a BEV unit assigned from fleet, carry out a full pre-service safety preparation, systematic visual inspection, EV diagnostic scan, and documentation to fleet inspection standard, achieving a score of 80% or above on the Job Sheet PCC.",
  );

  const steps = [
    ["1", "Set up inspection area and brief supervisor", "Confirm BEV unit assignment. Brief fleet supervisor on inspection scope."],
    ["2", "Perform LOTO and PPE donning", "Execute full LOTO procedure per TS 1.1.1.", "TS 1.1.1"],
    ["3", "Carry out visual inspection of EV exterior", "Systematically inspect body panels, tyres, undercarriage per TS 1.2.1.", "TS 1.2.1"],
    ["4", "Connect and operate EV diagnostic scanner", "Connect diagnostic scanner per OS 1.2.1 procedure.", "TS 1.2.2"],
    ["5", "Complete and submit inspection report", "Compile all findings into AUT-F-001 and submit to supervisor."],
  ];

  return (
    <>
      <MetaStrip
        items={[
          { label: "Code", value: <span className="font-mono text-[#1B3A5C]">JS 1</span> },
          { label: "Type", value: "Job Sheet — Capstone" },
          { label: "Integrates", value: <span className="text-xs">TS 1.1.1 · TS 1.2.1 · TS 1.2.2</span> },
          { label: "Status", value: <CblmBadge variant="b-draft">Draft</CblmBadge> },
        ]}
      />
      <FieldEditable label="Job Title" value={title} onChange={setTitle} rows={1} aiBoxId="ai-js-title" showToast={showToast} />
      <div className="grid grid-cols-2 gap-4">
        <FieldEditable label="Performance Objective" value={objective} onChange={setObjective} rows={4} aiBoxId="ai-js-obj" showToast={showToast} />
        <div>
          <div className={cblm.fieldGroup}>
            <div className={cblm.fieldLabel}>
              <span className={cblm.fieldLabelText}>Nominal Time</span>
              <span className={cblm.tagEdit}>Editable</span>
            </div>
            <input className={cblm.fieldInput} defaultValue="2 hours 30 minutes" style={{ width: 200 }} />
          </div>
          <FieldReadOnly
            label="Assessment Method"
            value="Direct observation by trainer using Job Sheet PCC. All 3 TS episodes must be observed in one continuous session."
            sourceClass="src-clm"
          />
        </div>
      </div>
      <SectionDivider label="Integrated Task Episodes" />
      {steps.map(([num, label, text, ts]) => (
        <div className={cblm.stepCard} key={num}>
          <div className={cblm.stepHdr}>
            <div className={cblm.stepNum}>{num}</div>
            <span className="flex-1 text-xs font-medium">
              {label}
              {ts && (
                <span className="ml-1.5 rounded-[3px] bg-[#1B3A5C22] px-1.5 py-px text-[10px] font-bold text-[#1B3A5C]">
                  {ts}
                </span>
              )}
            </span>
          </div>
          <div className={cblm.stepBody}>
            <textarea rows={2} defaultValue={text} />
          </div>
        </div>
      ))}
    </>
  );
}
