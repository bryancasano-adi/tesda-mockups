import { useState } from "react";

import { getOperationSheetMock } from "@/app/data/operationSheetMockData";

import {
  FieldReadOnly,
  SectionDivider,
} from "../CblmFieldPrimitives";
import {
  ProcedureStepCard,
  type ProcedureStep,
} from "../ProcedureStepCard";

function defaultMock(sheetCode: string) {
  return (
    getOperationSheetMock(sheetCode) ?? {
      code: sheetCode,
      equipmentName: "Training equipment",
      steps: [
        { label: "Step 1", instruction: "" },
      ],
    }
  );
}

export function OperationSheetEditor({
  sheetCode = "1.2-1A",
}: {
  sheetCode?: string;
}) {
  const initial = defaultMock(sheetCode);
  const [equipmentName] = useState(initial.equipmentName);
  const [steps, setSteps] = useState<ProcedureStep[]>(initial.steps);

  return (
    <>
      <FieldReadOnly label="Equipment" value={equipmentName} />

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
        <ProcedureStepCard
          key={index}
          index={index}
          step={step}
          onChange={(next) =>
            setSteps(steps.map((item, i) => (i === index ? next : item)))
          }
          onRemove={() => setSteps(steps.filter((_, i) => i !== index))}
        />
      ))}
    </>
  );
}
