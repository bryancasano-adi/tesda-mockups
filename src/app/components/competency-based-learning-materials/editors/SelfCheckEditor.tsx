import { useState } from "react";

import {
  FieldReadOnly,
  SectionDivider,
  fieldTextareaClass,
} from "../CblmFieldPrimitives";
import { MetaHeader } from "../sheet-editor-shared";

function SelfCheckQuestionCard({
  index,
  question,
  onChange,
  onRemove,
}: {
  index: number;
  question: string;
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
          Question {index + 1}
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
          value={question}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  );
}

export function SelfCheckEditor() {
  const sheetCode = "SC 1.1.1";
  const [questions, setQuestions] = useState([
    "What is the minimum wait time after turning off the ignition before commencing high-voltage inspection work on a BEV?",
    "Which personal protective equipment is mandatory when working within 2 metres of an energized HV battery pack?",
    "What is the correct sequence for applying Lockout/Tagout (LOTO) before EV inspection?",
  ]);

  const updateQuestion = (index: number, next: string) => {
    setQuestions(questions.map((item, i) => (i === index ? next : item)));
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <>
      <MetaHeader code={sheetCode} type="Self-Check" />
      <FieldReadOnly label="Paired Information Sheet" value="IS 1.1.1" />
      <SectionDivider label="Questions" />
      <div className="mb-3 flex justify-end">
        <button
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          type="button"
          onClick={() => setQuestions([...questions, ""])}
        >
          + Add Question
        </button>
      </div>
      {questions.map((question, index) => (
        <SelfCheckQuestionCard
          key={index}
          index={index}
          question={question}
          onChange={(next) => updateQuestion(index, next)}
          onRemove={() => removeQuestion(index)}
        />
      ))}
    </>
  );
}
