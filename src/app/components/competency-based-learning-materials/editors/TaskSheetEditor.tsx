import { useState } from "react";

import {
  FieldEditable,
  FieldEditableInput,
  FieldReadOnly,
  SectionDivider,
  fieldInputClass,
  fieldLabelClass,
  fieldLabelRowClass,
} from "../CblmFieldPrimitives";
import { MetaHeader } from "../sheet-editor-shared";

type TaskStep = { label: string; instruction: string };

function BulletListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div className="mb-4">
      <div className={fieldLabelRowClass}>
        <span className={fieldLabelClass}>{label}</span>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              className={`${fieldInputClass} min-w-0 flex-1`}
              value={item}
              onChange={(event) => {
                const next = [...items];
                next[index] = event.target.value;
                onChange(next);
              }}
            />
            <button
              className="shrink-0 rounded px-1.5 py-0.5 text-xs text-gray-400 hover:bg-red-50 hover:text-red-600"
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        className="mt-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
        type="button"
        onClick={() => onChange([...items, ""])}
      >
        + Add Item
      </button>
    </div>
  );
}

function TaskSheetStepCard({
  index,
  step,
  onChange,
  onRemove,
}: {
  index: number;
  step: TaskStep;
  onChange: (next: TaskStep) => void;
  onRemove: () => void;
}) {
  return (
    <div className="mb-3 overflow-hidden rounded-md border border-gray-200 bg-white">
      <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-3 py-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-[11px] font-bold text-white">
          {index + 1}
        </div>
        <input
          className="min-w-0 flex-1 rounded-md border border-gray-300 px-2 py-1 text-xs font-medium text-gray-800 outline-none focus:border-blue-500"
          value={step.label}
          onChange={(event) => onChange({ ...step, label: event.target.value })}
        />
        <button
          className="shrink-0 rounded px-1.5 py-0.5 text-xs text-gray-400 hover:bg-red-50 hover:text-red-600"
          type="button"
          onClick={onRemove}
        >
          ✕
        </button>
      </div>
      <div className="p-3">
        <textarea
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
          rows={3}
          value={step.instruction}
          onChange={(event) =>
            onChange({ ...step, instruction: event.target.value })
          }
        />
      </div>
    </div>
  );
}

export function TaskSheetEditor({ sheetCode = "1.1-3" }: { sheetCode?: string }) {
  const [objective, setObjective] = useState(
    "Given a stationary BEV unit in a fleet yard, perform the mandatory LOTO procedure and PPE donning sequence to achieve a verified zero-voltage, safe-to-inspect state within 10 minutes and to TESDA safety standard.",
  );
  const [supplies, setSupplies] = useState([
    "Class 0 insulating gloves rated at min. 1000V AC / 1500V DC",
    "CAT III voltage meter (min. 600V rating)",
    "Lockout padlock and danger tag (LOTO kit)",
  ]);
  const [tools, setTools] = useState([
    "High-visibility vest and EH-rated safety footwear",
    "Approved zero-voltage verification meter",
  ]);
  const [nominalTime, setNominalTime] = useState("45 minutes");
  const [steps, setSteps] = useState<TaskStep[]>([
    {
      label: "Conduct area assessment",
      instruction:
        "Confirm the BEV is stationary and stable. Post warning signs within 2 metres.",
    },
    {
      label: "Don PPE",
      instruction:
        "Put on Class 0 insulating gloves. Inspect gloves for cracks before use.",
    },
    {
      label: "Turn off ignition",
      instruction:
        "Turn off ignition, remove key fob, wait 5 minutes for capacitor discharge.",
    },
  ]);

  return (
    <>
      <MetaHeader
        code={sheetCode}
        extra={[
          { label: "Learning Outcome", value: "1.1 — Prepare for inspection" },
          { label: "Paired PCC", value: "Performance Criteria Checklist 1.1-3" },
        ]}
        type="Task Sheet"
      />

      <FieldReadOnly
        label="Task Sheet Title"
        value="Perform Pre-Inspection EV Safety Preparation and LOTO Procedure"
      />

      <FieldEditable
        editing
        label="Performance Objective"
        rows={4}
        value={objective}
        onChange={setObjective}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <BulletListEditor
          items={supplies}
          label="Supplies/Materials"
          onChange={setSupplies}
        />
        <BulletListEditor
          items={tools}
          label="Tools and Equipment"
          onChange={setTools}
        />
      </div>

      <FieldReadOnly
        hint="Derived from CBC learning outcome assessment methods."
        label="Assessment Method(s)"
        value="Direct observation by trainer using Performance Criteria Checklist 1.1-3. Trainee must achieve all YES responses."
      />

      <SectionDivider label="Steps/Procedure" />
      <div className="mb-3 flex justify-end">
        <button
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          type="button"
          onClick={() =>
            setSteps([
              ...steps,
              { label: `Step ${steps.length + 1}`, instruction: "" },
            ])
          }
        >
          + Add Step
        </button>
      </div>
      {steps.map((step, index) => (
        <TaskSheetStepCard
          key={index}
          index={index}
          step={step}
          onChange={(next) =>
            setSteps(steps.map((item, i) => (i === index ? next : item)))
          }
          onRemove={() => setSteps(steps.filter((_, i) => i !== index))}
        />
      ))}

      <FieldEditableInput
        editing
        hint="Optional nominal duration for trainer planning."
        label="Nominal Time"
        value={nominalTime}
        onChange={setNominalTime}
      />
    </>
  );
}
