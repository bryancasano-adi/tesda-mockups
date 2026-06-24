import { useState } from "react";

import {
  FieldEditable,
  FieldEditableInput,
  FieldReadOnly,
  SectionDivider,
  fieldInputClass,
} from "../CblmFieldPrimitives";
import {
  ConsolidationMetaHeader,
  exportCheckboxClass,
} from "../consolidation-shared";

type Episode = {
  label: string;
  instruction: string;
  sourceTsCode?: string;
};

const INITIAL_EPISODES: Episode[] = [
  {
    label: "Set up inspection area and brief supervisor",
    instruction:
      "Confirm BEV unit assignment. Brief fleet supervisor on inspection scope.",
  },
  {
    label: "Perform LOTO and PPE donning",
    instruction: "Execute full LOTO procedure per Task Sheet 1.1-3.",
    sourceTsCode: "1.1-3",
  },
  {
    label: "Carry out visual inspection of EV exterior",
    instruction:
      "Systematically inspect body panels, tyres, undercarriage per Task Sheet 1.2-1.",
    sourceTsCode: "1.2-1",
  },
  {
    label: "Connect and operate EV diagnostic scanner",
    instruction: "Connect diagnostic scanner per Operation Sheet 1.2-1A procedure.",
    sourceTsCode: "1.2-1A",
  },
  {
    label: "Complete and submit inspection report",
    instruction:
      "Compile all findings into AUT-F-001 and submit to supervisor.",
  },
];

const PCC_CRITERIA = [
  "Execute LOTO procedure correctly before any HV inspection work",
  "Don PPE correctly and maintain throughout the session",
  "Complete visual inspection without missing critical safety items",
  "Operate diagnostic scanner per Operation Sheet 1.2-1A without trainer intervention",
  "Submit complete inspection report using fleet form AUT-F-001",
];

function JobSheetEpisodeCard({
  index,
  episode,
  onChange,
}: {
  index: number;
  episode: Episode;
  onChange: (next: Episode) => void;
}) {
  return (
    <div className="mb-3 overflow-hidden rounded-md border border-gray-200 bg-white">
      <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-3 py-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-[11px] font-bold text-white">
          {index + 1}
        </div>
        <input
          className="min-w-0 flex-1 rounded-md border border-gray-300 px-2 py-1 text-xs font-medium text-gray-800 outline-none focus:border-blue-500"
          value={episode.label}
          onChange={(event) =>
            onChange({ ...episode, label: event.target.value })
          }
        />
        {episode.sourceTsCode ? (
          <span className="shrink-0 rounded bg-blue-50 px-1.5 py-px text-[10px] font-bold text-blue-700">
            Task Sheet {episode.sourceTsCode}
          </span>
        ) : null}
      </div>
      <div className="p-3">
        <textarea
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
          rows={3}
          value={episode.instruction}
          onChange={(event) =>
            onChange({ ...episode, instruction: event.target.value })
          }
        />
      </div>
    </div>
  );
}

export function JobSheetEditor({
  showToast: _showToast,
}: {
  showToast: (msg: string, color?: string) => void;
}) {
  const [title, setTitle] = useState(
    "Carry Out a Complete Pre-Service Inspection of a Battery Electric Vehicle",
  );
  const [objective, setObjective] = useState(
    "Given a BEV unit assigned from fleet, carry out a full pre-service safety preparation, systematic visual inspection, EV diagnostic scan, and documentation to fleet inspection standard, achieving a score of 80% or above on the Job Sheet PCC.",
  );
  const [nominalTime, setNominalTime] = useState("2 hours 30 minutes");
  const [episodes, setEpisodes] = useState(INITIAL_EPISODES);

  const updateEpisode = (index: number, next: Episode) => {
    setEpisodes((current) =>
      current.map((episode, episodeIndex) =>
        episodeIndex === index ? next : episode,
      ),
    );
  };

  return (
    <>
      <ConsolidationMetaHeader
        code="1.1-3"
        extra={[
          {
            label: "Integrates",
            value: "Task Sheet 1.1-3 · Task Sheet 1.2-1 · Task Sheet 1.2-1A",
          },
        ]}
        type="Job Sheet"
      />

      <FieldEditableInput
        label="Job Title"
        value={title}
        onChange={setTitle}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <FieldEditable
          label="Performance Objective"
          rows={4}
          value={objective}
          onChange={setObjective}
        />
        <div>
          <FieldEditableInput
            hint="Total time for the integrated capstone session."
            label="Nominal Time"
            value={nominalTime}
            onChange={setNominalTime}
          />
          <FieldReadOnly
            hint="Derived from CLM assessment methods for integrated task sheets."
            label="Assessment Method"
            value="Direct observation by trainer using Job Sheet PCC. All 3 TS episodes must be observed in one continuous session."
          />
        </div>
      </div>

      <SectionDivider label="Integrated Task Episodes" />
      {episodes.map((episode, index) => (
        <JobSheetEpisodeCard
          key={`${index}-${episode.sourceTsCode ?? "custom"}`}
          episode={episode}
          index={index}
          onChange={(next) => updateEpisode(index, next)}
        />
      ))}

      <SectionDivider label="Job Sheet PCC" />
      <div className="overflow-x-auto rounded-md border border-gray-200 bg-white">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs uppercase text-gray-500">
              <th className="px-4 py-2.5 font-semibold">
                Criteria — Did the trainee...
              </th>
              <th className="w-16 px-4 py-2.5 text-center font-semibold">
                YES
              </th>
              <th className="w-16 px-4 py-2.5 text-center font-semibold">
                NO
              </th>
              <th className="w-40 px-4 py-2.5 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody>
            {PCC_CRITERIA.map((criterion, index) => (
              <tr key={criterion} className="border-b border-gray-100">
                <td className="px-4 py-3 text-gray-800">
                  {index + 1}. {criterion}
                </td>
                <td className="px-4 py-3 text-center">
                  <input
                    aria-label="Yes"
                    className={exportCheckboxClass}
                    readOnly
                    type="checkbox"
                  />
                </td>
                <td className="px-4 py-3 text-center">
                  <input
                    aria-label="No"
                    className={exportCheckboxClass}
                    readOnly
                    type="checkbox"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    className={`${fieldInputClass} h-auto min-h-[38px] py-1.5`}
                    placeholder="Notes"
                    type="text"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="grid gap-4 border-t border-gray-200 px-4 py-4 text-xs text-gray-600 sm:grid-cols-3">
          <label className="grid gap-1">
            <span className="font-semibold text-gray-700">
              Trainer / Assessor
            </span>
            <input className={fieldInputClass} type="text" />
          </label>
          <label className="grid gap-1">
            <span className="font-semibold text-gray-700">Trainee</span>
            <input className={fieldInputClass} type="text" />
          </label>
          <label className="grid gap-1">
            <span className="font-semibold text-gray-700">Date</span>
            <input className={fieldInputClass} type="date" />
          </label>
        </div>
      </div>
    </>
  );
}
