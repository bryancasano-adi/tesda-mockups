import { useState } from "react";

import {
  ConsolidationMetaHeader,
  LetLoAccordion,
  LetSpecialInstructionsField,
  LetTableCell,
  LetTableHeader,
} from "../consolidation-shared";

type LetSection = {
  loNumber: number;
  title: string;
  activities: string[];
  instructions: string;
};

const INITIAL_SECTIONS: LetSection[] = [
  {
    loNumber: 1,
    title: "Prepare for EV inspection",
    activities: [
      "Read Information Sheet 1.1-1 on Safety Protocols for HV EV Inspection",
      "Answer Self-Check 1.1-1",
      "Compare your answers with Answer Key 1.1-1",
      "Read Information Sheet 1.1-2 on PPE Requirements for HV Work",
      "Perform Task Sheet 1.1-3 — EV Safety Preparation and LOTO [TS]",
    ],
    instructions:
      "Complete all self-checks without referring back to the Information Sheet. If you score below 80%, re-read the IS and re-attempt.",
  },
  {
    loNumber: 2,
    title: "Carry out visual inspection of EV components",
    activities: [
      "Read Information Sheet 1.2-1 on EV Exterior and Undercarriage Inspection",
      "Read Operation Sheet 1.2-1A on EV Diagnostic Scanner before the task [OS]",
      "Perform Task Sheet 1.2-1 — Visual Inspection of EV Exterior [TS]",
      "Perform Task Sheet 1.2-1A — EV Diagnostic System Scan [TS]",
    ],
    instructions:
      "Read Operation Sheet 1.2-1A in full BEFORE operating the diagnostic scanner. Equipment must not be operated without trainer supervision.",
  },
  {
    loNumber: 3,
    title: "Complete inspection report and documentation",
    activities: [
      "Read Information Sheet 1.3-1 on Inspection Report Documentation Standards",
      "Answer Self-Check 1.3-1 and compare with Answer Key 1.3-1",
      "Complete and submit your inspection report using fleet form AUT-F-001",
    ],
    instructions:
      "LO 3 is documentation-focused. No Task Sheet is required. Ensure report is complete before proceeding to the Job Sheet.",
  },
];

function ActivitySequenceTable({ activities }: { activities: string[] }) {
  return (
    <table className="w-full border-collapse overflow-hidden rounded-md">
      <thead>
        <tr>
          <LetTableHeader>Activity Sequence</LetTableHeader>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity) => (
          <tr key={activity}>
            <LetTableCell>
              <span className="mr-1.5 text-blue-700">●</span>
              {activity}
            </LetTableCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TesdaFormatPreview({
  activities,
  specialInstructions,
}: {
  activities: string[];
  specialInstructions: string;
}) {
  return (
    <div>
      <div className="mb-2 text-[10px] font-bold uppercase tracking-wide text-gray-400">
        TESDA Format Preview
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse">
          <thead>
            <tr>
              <LetTableHeader>Learning Activities</LetTableHeader>
              <LetTableHeader>Special Instructions</LetTableHeader>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={activity}>
                <LetTableCell className="w-[55%]">
                  <span className="mr-1.5 text-blue-700">●</span>
                  {activity}
                </LetTableCell>
                {index === 0 ? (
                  <LetTableCell
                    className="bg-blue-50 text-blue-900"
                    rowSpan={activities.length}
                  >
                    {specialInstructions.trim() || (
                      <span className="italic text-gray-400">—</span>
                    )}
                  </LetTableCell>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LetLoContent({
  section,
  onInstructionsChange,
}: {
  section: LetSection;
  onInstructionsChange: (value: string) => void;
}) {
  const instructionRows = Math.max(
    4,
    Math.min(8, section.activities.length + 1),
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <ActivitySequenceTable activities={section.activities} />
        <LetSpecialInstructionsField
          rows={instructionRows}
          value={section.instructions}
          onChange={onInstructionsChange}
        />
      </div>
      <TesdaFormatPreview
        activities={section.activities}
        specialInstructions={section.instructions}
      />
    </div>
  );
}

export function LearningExperiencesTableEditor() {
  const [sections, setSections] = useState(INITIAL_SECTIONS);
  const activityCount = sections.reduce(
    (total, section) => total + section.activities.length,
    0,
  );

  const updateInstructions = (loNumber: number, value: string) => {
    setSections((current) =>
      current.map((section) =>
        section.loNumber === loNumber
          ? { ...section, instructions: value }
          : section,
      ),
    );
  };

  return (
    <>
      <ConsolidationMetaHeader
        code="LET"
        extra={[
          { label: "Learning Outcomes", value: String(sections.length) },
          { label: "Activities", value: String(activityCount) },
        ]}
        type="Learning Experiences Table"
      />
      <p className="mb-4 text-xs text-gray-600">
        Auto-generated from finalized Step 2 sheets. Activity sequence is
        read-only; special instructions can be edited per learning outcome.
      </p>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <LetLoAccordion
            key={section.loNumber}
            activityCount={section.activities.length}
            defaultOpen={index === 0}
            loNumber={section.loNumber}
            title={section.title}
          >
            <LetLoContent
              section={section}
              onInstructionsChange={(value) =>
                updateInstructions(section.loNumber, value)
              }
            />
          </LetLoAccordion>
        ))}
      </div>
    </>
  );
}
