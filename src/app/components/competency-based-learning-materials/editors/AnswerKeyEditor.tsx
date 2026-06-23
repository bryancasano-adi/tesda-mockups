import { useState } from "react";

import {
  FieldReadOnly,
  SectionDivider,
  fieldTextareaClass,
} from "../CblmFieldPrimitives";
import { MetaHeader } from "../sheet-editor-shared";

function AnswerKeyAnswerCard({
  index,
  answer,
  onChange,
  onRemove,
}: {
  index: number;
  answer: string;
  onChange: (next: string) => void;
  onRemove: () => void;
}) {
  return (
    <div className="mb-3 overflow-hidden rounded-md border border-gray-200 bg-white">
      <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-3 py-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-[11px] font-bold text-white">
          {index + 1}
        </div>
        <div className="min-w-0 flex-1 text-xs font-medium text-gray-800">
          Answer {index + 1}
        </div>
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
          className={fieldTextareaClass}
          rows={3}
          value={answer}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  );
}

export function AnswerKeyEditor() {
  const sheetCode = "AK 1.1.1";
  const [answers, setAnswers] = useState([
    "A minimum of 5 minutes must elapse after ignition off to allow HV capacitors to discharge to a safe level.",
    "Class 0 or Class 1 insulating gloves rated for the vehicle system voltage, EH-rated safety footwear, high-visibility vest, and face shield when working near battery connectors.",
    "Park and stabilize the vehicle, turn off ignition and remove key fob, wait 5 minutes, locate and disengage the MSD if present, apply lockout tag, and verify zero-voltage with an approved meter.",
  ]);

  const updateAnswer = (index: number, next: string) => {
    setAnswers(answers.map((item, i) => (i === index ? next : item)));
  };

  const removeAnswer = (index: number) => {
    setAnswers(answers.filter((_, i) => i !== index));
  };

  return (
    <>
      <MetaHeader code={sheetCode} type="Answer Key" />
      <FieldReadOnly label="Paired Self-Check" value="SC 1.1.1" />
      <SectionDivider label="Answers" />
      <div className="mb-3 flex justify-end">
        <button
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          type="button"
          onClick={() => setAnswers([...answers, ""])}
        >
          + Add Answer
        </button>
      </div>
      {answers.map((answer, index) => (
        <AnswerKeyAnswerCard
          key={index}
          answer={answer}
          index={index}
          onChange={(next) => updateAnswer(index, next)}
          onRemove={() => removeAnswer(index)}
        />
      ))}
    </>
  );
}
