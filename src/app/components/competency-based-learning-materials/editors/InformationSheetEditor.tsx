import { useState } from "react";

import {
  FieldEditable,
  FieldReadOnly,
} from "../CblmFieldPrimitives";
import {
  InlineReferencesSection,
} from "../sheet-editor-shared";

type InformationSheetMock = {
  title: string;
  lo: string;
  body: string;
  img: string;
};

const MOCK_INFORMATION_SHEETS: Record<string, InformationSheetMock> = {
  "1.1-1": {
    title: "Safety Protocols for High-Voltage Electric Vehicle Inspection",
    lo: "After completing this Information Sheet, you will be able to identify and apply mandatory safety protocols required before and during the inspection of high-voltage electric vehicles in a fleet servicing environment.",
    body: `1. HIGH-VOLTAGE SAFETY FUNDAMENTALS

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
Step 5: Apply lockout tag and verify zero-voltage state with an approved voltage meter.`,
    img: "Technical diagram showing a side-view cutaway of an EV with orange HV cables highlighted, PPE-equipped technician in position, and callout labels identifying MSD location, HV battery pack, and traction motor.",
  },
  "1.1-2": {
    title: "PPE Requirements for HV Work",
    lo: "After completing this Information Sheet, you will be able to select, inspect, and don the correct personal protective equipment required for high-voltage electric vehicle inspection tasks.",
    body: `1. PPE REQUIREMENTS FOR HIGH-VOLTAGE WORK

Technicians working on or near high-voltage EV systems must wear PPE rated for the system voltage and inspected before each use.

1.1 Insulating Gloves
• Class 0 (1,000V AC / 1,500V DC) minimum for most BEV fleet units
• Visual inspection for cuts, punctures, or ozone cracking before each use
• Air-test before donning; store in approved glove bag when not in use

1.2 Footwear and Body Protection
• EH-rated safety footwear (ASTM F2413)
• Arc-rated clothing where HV connector work is performed
• High-visibility vest in active fleet yards

1.3 Face and Eye Protection
• Face shield rated for electrical hazard when working near live connectors
• Safety glasses worn under face shield at all times`,
    img: "Labeled photo layout of PPE items laid out on a workbench: Class 0 insulating gloves, EH-rated boots, high-visibility vest, face shield, and voltage-rated tester with inspection checklist card.",
  },
  "1.1-3": {
    title: "Inspection Tools and Equipment",
    lo: "After completing this Information Sheet, you will be able to identify and prepare the tools and equipment required for pre-inspection EV safety verification.",
    body: `1. INSPECTION TOOLS AND EQUIPMENT

Pre-inspection safety verification requires calibrated, voltage-rated tools kept in a dedicated EV service kit.

1.1 Voltage Verification
• CAT III or CAT IV digital multimeter rated for the vehicle system voltage
• Approved zero-voltage test leads with insulated probes
• Non-contact voltage detector as a secondary check only

1.2 LOTO and Safety Kit
• Lockout padlocks, danger tags, and hasps
• Manual Service Disconnect removal tool (vehicle-specific)
• Warning signs and barrier tape for work zone demarcation

1.3 Documentation
• Pre-inspection safety checklist (fleet standard form)
• Pen or tablet for recording verification readings and timestamps`,
    img: "Top-down photo of an EV pre-inspection tool kit: digital multimeter, insulated probes, LOTO kit, MSD tool, warning signs, and completed safety checklist on a clipboard.",
  },
};

const DEFAULT_SHEET_CODE = "1.1-1";

export function InformationSheetEditor({
  sheetCode = DEFAULT_SHEET_CODE,
}: {
  sheetCode?: string;
}) {
  const mock =
    MOCK_INFORMATION_SHEETS[sheetCode] ??
    MOCK_INFORMATION_SHEETS[DEFAULT_SHEET_CODE];
  const [lo, setLo] = useState(mock.lo);
  const [body, setBody] = useState(mock.body);
  const [img, setImg] = useState(mock.img);

  return (
    <>
      <FieldReadOnly label="IS Title" value={mock.title} />
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
