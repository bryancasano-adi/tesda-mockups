import { useState } from "react";

import {
  FieldEditable,
  FieldReadOnly,
} from "../CblmFieldPrimitives";
import {
  InlineReferencesSection,
  MetaHeader,
} from "../sheet-editor-shared";

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

export function InformationSheetEditor() {
  const sheetCode = "IS 1.1.1";
  const [lo, setLo] = useState(
    "After completing this Information Sheet, you will be able to identify and apply mandatory safety protocols required before and during the inspection of high-voltage electric vehicles in a fleet servicing environment.",
  );
  const [body, setBody] = useState(BODY_DEFAULT);
  const [img, setImg] = useState(
    "Technical diagram showing a side-view cutaway of an EV with orange HV cables highlighted, PPE-equipped technician in position, and callout labels identifying MSD location, HV battery pack, and traction motor.",
  );

  return (
    <>
      <MetaHeader code={sheetCode} type="Information Sheet" />
      <FieldReadOnly
        label="IS Title"
        value="Safety Protocols for High-Voltage Electric Vehicle Inspection"
      />
      <FieldEditable
        editing
        label="Learning Objective"
        rows={3}
        value={lo}
        onChange={setLo}
      />
      <FieldEditable
        editing
        label="Body Content"
        rows={14}
        value={body}
        onChange={setBody}
      />
      <p className="mb-4 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-900">
        Trainer takes the image description to an external image generation tool.
        K-Galing does not generate images.
      </p>
      <FieldEditable
        editing
        label="Recommended Image Description"
        rows={4}
        value={img}
        onChange={setImg}
      />
      <InlineReferencesSection sheetCode={sheetCode} />
    </>
  );
}
