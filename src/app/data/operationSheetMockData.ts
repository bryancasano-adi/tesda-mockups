import type { ProcedureStep } from "@/app/components/competency-based-learning-materials/ProcedureStepCard";

export type OperationSheetMock = {
  code: string;
  equipmentName: string;
  steps: ProcedureStep[];
};

/** BEV Servicing — LO 2 diagnostic scanner operation sheet (pairs with IS / TS 1.2-1A). */
export const OPERATION_SHEET_MOCKS: Record<string, OperationSheetMock> = {
  "1.2-1A": {
    code: "1.2-1A",
    equipmentName: "EV Diagnostic Scanner (OBD-II)",
    steps: [
      {
        label: "Step 1",
        instruction:
          "Inspect the EV diagnostic scanner, cable, and connectors for damage, wear, or contamination before use.",
      },
      {
        label: "Step 2",
        instruction:
          "Connect the scanner to the vehicle OBD-II port following manufacturer instructions. Confirm communication with the HV system controller.",
      },
      {
        label: "Step 3",
        instruction:
          "Operate the scanner to retrieve fault codes and live data. Follow PPE requirements and trainer supervision at all times.",
      },
      {
        label: "Step 4",
        instruction:
          "Shut down the scanner, disconnect safely, perform post-operation checks, and store the equipment in the designated cabinet.",
      },
    ],
  },
};

export function getOperationSheetMock(
  sheetCode: string,
): OperationSheetMock | undefined {
  return OPERATION_SHEET_MOCKS[sheetCode];
}
