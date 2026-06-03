import { useState } from "react";
import {
  CblmBadge,
  FieldEditable,
  FieldReadOnly,
  MetaStrip,
  SectionDivider,
} from "../CblmPrimitives";
import { cblm, cblmBtn } from "../cblmClasses";

const BODY_DEFAULT = `1. HIGH-VOLTAGE SAFETY FUNDAMENTALS

Electric vehicles operate with traction battery systems ranging from 200V to over 800V DC. These voltage levels are potentially lethal. Before any inspection activity, technicians must understand and apply the following protocols:

1.1 Mandatory Personal Protective Equipment (PPE)
• Class 0 or Class 1 insulating gloves rated for the vehicle's system voltage
• Insulating safety footwear (EH-rated)
• High-visibility vest in fleet environments
• Face shield when working near battery pack connectors

1.2 Lockout/Tagout (LOTO) Procedure
Before commencing any EV inspection involving the HV system:
Step 1: Park vehicle on a level, stable surface. Apply parking brake.
Step 2: Turn off the main ignition and remove the key card or fob.
Step 3: Wait a minimum of 5 minutes for capacitors to discharge.
Step 4: Locate and disengage the Manual Service Disconnect (MSD) if present.
Step 5: Apply lockout tag and verify zero-voltage state with an approved voltage meter.`;

export function InformationSheetEditor({
  showToast,
}: {
  showToast: (msg: string, color?: string) => void;
}) {
  const [lo, setLo] = useState(
    "After completing this Information Sheet, you will be able to identify and apply mandatory safety protocols required before and during the inspection of high-voltage electric vehicles in a fleet servicing environment.",
  );
  const [body, setBody] = useState(BODY_DEFAULT);
  const [img, setImg] = useState(
    "Technical diagram showing a side-view cutaway of an EV with orange HV cables highlighted, PPE-equipped technician in position, and callout labels identifying MSD location, HV battery pack, and traction motor.",
  );

  return (
    <>
      <MetaStrip
        items={[
          { label: "Sheet Code", value: <span className="font-mono text-[#1565C0]">IS 1.1.1</span> },
          { label: "Type", value: "Information Sheet" },
          { label: "LO", value: "1.1 — Prepare for EV inspection" },
          { label: "Content Item", value: "1 — Safety Protocols" },
          { label: "Status", value: <CblmBadge variant="b-validated">✓ Validated</CblmBadge> },
          { label: "Phase", value: <span className="text-[#1565C0]">Phase 1 (LLM + CS/CBC/CLM)</span> },
        ]}
      />
      <FieldReadOnly
        label="IS Title"
        value="Safety Protocols for High-Voltage Electric Vehicle Inspection"
        sourceTag="Source: CBC content item name"
      />
      <FieldEditable label="Learning Objective" value={lo} onChange={setLo} rows={2} aiBoxId="ai-lo" showToast={showToast} />
      <FieldEditable label="Body Content" value={body} onChange={setBody} rows={14} aiBoxId="ai-body" showToast={showToast} />
      <FieldEditable label="Recommended Image Description" value={img} onChange={setImg} rows={3} aiBoxId="ai-img" showToast={showToast} />
      <div className="mt-1.5 rounded border border-[#FFE082] bg-[#FFF8E1] px-3 py-2 text-[11px] text-[#795548]">
        ⚠️ Trainer takes this description to an external image generation tool. K-Galing does not generate images.
      </div>
      <SectionDivider label="References — Auto-compiled" />
      <table className={cblm.tbl}>
        <thead>
          <tr>
            <th className={cblm.tblTh}>Source Document</th>
            <th className={cblm.tblTh}>Type</th>
            <th className={`${cblm.tblTh} text-center`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["AUTBEV-CS-2025-v2.pdf", "b-validated", "CS"],
            ["AUTBEV-CBC-2025-v1.pdf", "b-done", "CBC"],
            ["CLM-UC001-2025.pdf", "b-draft", "CLM"],
          ].map(([doc, badge, type]) => (
            <tr key={doc} className={cblm.tblRow}>
              <td className={`${cblm.tblTd} font-mono`}>{doc}</td>
              <td className={cblm.tblTd}>
                <CblmBadge variant={badge}>{type}</CblmBadge>
              </td>
              <td className={`${cblm.tblTd} text-center`}>
                <button type="button" className={cblmBtn("secondary", "text-[11px] px-2 py-0.5")}>
                  ⚑ Flag
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
