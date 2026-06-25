import { useState } from "react";

import {
  FieldReadOnly,
  SectionDivider,
  fieldLabelClass,
  fieldTextareaClass,
  fieldValueViewClass,
} from "../CblmFieldPrimitives";
import { MOCK_SELF_CHECK_QUESTIONS } from "../self-check-mock-data";
import {
  createMockSelfCheckQuestion,
  normalizeSelfCheckQuestion,
  PAIRED_INFORMATION_SHEET_TITLE,
  SELF_CHECK_DIRECTION,
} from "../self-check-utils";
import type { SelfCheckOptionLetter, SelfCheckQuestion } from "../self-check-types";

function SelfCheckQuestionCard({
  index,
  question,
  onChange,
  onRemove,
}: {
  index: number;
  question: SelfCheckQuestion;
  onChange: (next: SelfCheckQuestion) => void;
  onRemove: () => void;
}) {
  const normalized = normalizeSelfCheckQuestion(question);

  const updateOption = (letter: SelfCheckOptionLetter, text: string) => {
    onChange({
      ...normalized,
      options: normalized.options.map((option) =>
        option.letter === letter ? { ...option, text } : option,
      ),
    });
  };

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
      <div className="space-y-3 p-3">
        <div>
          <div className={fieldLabelClass}>Question</div>
          <textarea
            className={fieldTextareaClass}
            rows={3}
            value={normalized.questionText}
            onChange={(event) =>
              onChange({ ...normalized, questionText: event.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          {normalized.options.map((option) => (
            <div key={option.letter}>
              <div className={fieldLabelClass}>Choice {option.letter}</div>
              <textarea
                className={fieldTextareaClass}
                rows={2}
                value={option.text}
                onChange={(event) => updateOption(option.letter, event.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SelfCheckEditor({ sheetCode = "1.1-1" }: { sheetCode?: string }) {
  const [questions, setQuestions] = useState<SelfCheckQuestion[]>(
    MOCK_SELF_CHECK_QUESTIONS,
  );

  const updateQuestion = (index: number, next: SelfCheckQuestion) => {
    setQuestions(questions.map((item, i) => (i === index ? next : item)));
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      createMockSelfCheckQuestion({
        contentTitle: PAIRED_INFORMATION_SHEET_TITLE,
        loTitle: PAIRED_INFORMATION_SHEET_TITLE,
      }),
    ]);
  };

  return (
    <>
      <FieldReadOnly label="Paired Sheet" value="Information Sheet 1.1-1" />
      <SectionDivider label="Direction" />
      <div className={fieldValueViewClass}>{SELF_CHECK_DIRECTION}</div>
      <SectionDivider label="Questions" />
      <div className="mb-3 flex justify-end">
        <button
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          type="button"
          onClick={addQuestion}
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
      {questions.length === 0 && <div className={fieldValueViewClass}>—</div>}
    </>
  );
}
