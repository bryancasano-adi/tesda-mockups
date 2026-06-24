import { useState } from "react";

import {
  FieldReadOnly,
  SectionDivider,
  fieldLabelClass,
  fieldTextareaClass,
  fieldValueViewClass,
} from "../CblmFieldPrimitives";
import {
  MOCK_ANSWER_KEY_ANSWERS,
  MOCK_SELF_CHECK_QUESTIONS,
} from "../self-check-mock-data";
import {
  createMockSelfCheckQuestion,
  getMockSelfCheckAnswer,
  normalizeSelfCheckQuestion,
  PAIRED_INFORMATION_SHEET_TITLE,
  resolveLegacyAnswerLetter,
} from "../self-check-utils";
import type { SelfCheckQuestion } from "../self-check-types";
import { MetaHeader } from "../sheet-editor-shared";

function AnswerKeyAnswerCard({
  index,
  answer,
  question,
  onChange,
  onRemove,
}: {
  index: number;
  answer: string;
  question?: SelfCheckQuestion;
  onChange: (next: string) => void;
  onRemove: () => void;
}) {
  const displayValue = resolveLegacyAnswerLetter(answer, question);

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
      <div className="space-y-3 p-3">
        {question?.questionText && (
          <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-600">
            Question: {question.questionText}
          </div>
        )}
        <div>
          <div className={fieldLabelClass}>Correct Answer</div>
          <textarea
            className={fieldTextareaClass}
            rows={3}
            value={displayValue}
            onChange={(event) => onChange(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export function AnswerKeyEditor({ sheetCode = "1.1-1" }: { sheetCode?: string }) {
  const pairedQuestions = MOCK_SELF_CHECK_QUESTIONS.map(normalizeSelfCheckQuestion);
  const [answers, setAnswers] = useState(MOCK_ANSWER_KEY_ANSWERS);

  const updateAnswer = (index: number, next: string) => {
    setAnswers(answers.map((item, i) => (i === index ? next : item)));
  };

  const removeAnswer = (index: number) => {
    setAnswers(answers.filter((_, i) => i !== index));
  };

  const addAnswer = () => {
    const mockQuestion = createMockSelfCheckQuestion({
      contentTitle: PAIRED_INFORMATION_SHEET_TITLE,
      loTitle: PAIRED_INFORMATION_SHEET_TITLE,
    });
    setAnswers([
      ...answers,
      getMockSelfCheckAnswer(mockQuestion) || "[MOCK] Correct answer",
    ]);
  };

  return (
    <>
      <MetaHeader code={sheetCode} type="Answer Key" />
      <FieldReadOnly label="Paired Self-Check" value="Self-Check 1.1-1" />
      <SectionDivider label="Answers" />
      <div className="mb-3 flex justify-end">
        <button
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          type="button"
          onClick={addAnswer}
        >
          + Add Answer
        </button>
      </div>
      {answers.map((answer, index) => (
        <AnswerKeyAnswerCard
          key={index}
          answer={answer}
          index={index}
          question={pairedQuestions[index]}
          onChange={(next) => updateAnswer(index, next)}
          onRemove={() => removeAnswer(index)}
        />
      ))}
      {answers.length === 0 && <div className={fieldValueViewClass}>—</div>}
    </>
  );
}
