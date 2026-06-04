import { useState } from "react";
import { CblmBadge, FieldEditable, FieldReadOnly, MetaStrip, SectionDivider } from "../CblmPrimitives";
import { cblm } from "../cblmClasses";

function DynList({
  items,
  onChange,
  onAdd,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  onAdd: () => void;
}) {
  return (
    <>
      <div className={cblm.dynList}>
        {items.map((item, i) => (
          <div className={cblm.dynRow} key={i}>
            <input
              className={cblm.dynInput}
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
            />
            <button
              type="button"
              className={cblm.dynRm}
              onClick={() => onChange(items.filter((_, j) => j !== i))}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button type="button" className={cblm.dynAdd} onClick={onAdd}>
        + Add Item
      </button>
    </>
  );
}

export function TaskSheetEditor({
  showToast,
}: {
  showToast: (msg: string, color?: string) => void;
}) {
  const [title, setTitle] = useState(
    "Perform Pre-Inspection EV Safety Preparation and LOTO Procedure",
  );
  const [objective, setObjective] = useState(
    "Given a stationary BEV unit in a fleet yard, perform the mandatory LOTO procedure and PPE donning sequence to achieve a verified zero-voltage, safe-to-inspect state within 10 minutes and to TESDA safety standard.",
  );
  const [mats, setMats] = useState([
    "Class 0 insulating gloves rated at min. 1000V AC / 1500V DC",
    "CAT III voltage meter (min. 600V rating)",
    "Lockout padlock and danger tag (LOTO kit)",
    "High-visibility vest and EH-rated safety footwear",
  ]);

  return (
    <>
      <MetaStrip
        items={[
          { label: "Sheet Code", value: <span className="font-mono text-[#F57C00]">TS 1.1.1</span> },
          { label: "Type", value: "Task Sheet" },
          { label: "LO", value: "1.1 — Prepare for inspection" },
          { label: "Status", value: <CblmBadge variant="b-draft">Draft</CblmBadge> },
          { label: "Triggers OS?", value: <span className="text-xs text-[#666]">No — no powered equipment in scope</span> },
        ]}
      />
      <FieldEditable label="Task Title" value={title} onChange={setTitle} rows={1} aiBoxId="ai-ts-title" showToast={showToast} />
      <div className="grid grid-cols-2 gap-4">
        <FieldEditable label="Performance Objective" value={objective} onChange={setObjective} rows={3} aiBoxId="ai-ts-obj" showToast={showToast} />
        <div>
          <div className={cblm.fieldGroup}>
            <div className={cblm.fieldLabel}>
              <span className={cblm.fieldLabelText}>Nominal Time</span>
              <span className={cblm.tagEdit}>Editable</span>
            </div>
            <input className={cblm.fieldInput} defaultValue="45 minutes" style={{ width: 160 }} />
          </div>
          <FieldReadOnly
            label="Assessment Method"
            value="Direct observation by trainer using PCC 1.1.1. Trainee must achieve all YES responses."
            sourceClass="src-cbc"
          />
        </div>
      </div>
      <div className={cblm.fieldGroup}>
        <div className={cblm.fieldLabel}>
          <span className={cblm.fieldLabelText}>Tools, Equipment & Materials</span>
          <span className={cblm.tagEdit}>Editable</span>
        </div>
        <DynList items={mats} onChange={setMats} onAdd={() => setMats([...mats, ""])} />
      </div>
      <SectionDivider label="Procedure Steps" />
      {[
        ["1", "Conduct area assessment", "Confirm the BEV is stationary and stable. Post warning signs within 2 metres."],
        ["2", "Don PPE", "Put on Class 0 insulating gloves. Inspect gloves for cracks before use."],
        ["3", "Turn off ignition", "Turn off ignition, remove key fob, wait 5 minutes for capacitor discharge."],
      ].map(([num, label, text]) => (
        <div className={cblm.stepCard} key={num}>
          <div className={cblm.stepHdr}>
            <div className={cblm.stepNum}>{num}</div>
            <span className="flex-1 text-xs font-medium">{label}</span>
          </div>
          <div className={cblm.stepBody}>
            <textarea rows={2} defaultValue={text} />
          </div>
        </div>
      ))}
    </>
  );
}
