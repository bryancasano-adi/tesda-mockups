import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  FolderArrowDownIcon,
  InformationCircleIcon,
  PrinterIcon,
} from "@heroicons/react/24/solid";

import { MCQItem } from "../data/mcqQuestions";

interface Props {
  type: "test" | "answer";
  selectedPackage: string;
  questions: (MCQItem & { num: number })[];
  onClose: () => void;
}

export function WrittenTestPreviewModal({
  type,
  selectedPackage,
  questions,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-300 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-[#333]">
              {type === "test" ? "Written Test Preview" : "Answer Key Preview"}
            </h2>
            <p className="text-sm text-[#666]">
              SMAW NC II • Package {selectedPackage}
            </p>
          </div>

          <button className="p-2 hover:bg-[#F5F5F5] rounded" onClick={onClose}>
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="px-6 py-3 bg-[#E3F2FD] border-b border-gray-300 flex gap-2">
          <InformationCircleIcon className="w-5 h-5 text-blue-500" />
          <div className="text-xs text-[#1565C0]">
            {type === "test"
              ? "Candidate-facing test (no answers shown)"
              : "Official answer key for assessors"}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[#F5F5F5] p-6">
          <div className="bg-white border border-gray-300 max-w-[800px] mx-auto p-8 text-[13px]">
            {/* TITLE */}
            <h2 className="font-bold mb-4 text-center">
              {type === "test"
                ? "COMPETENCY ASSESSMENT - WRITTEN TEST"
                : "ANSWER KEY"}
              <br />
              PACKAGE {selectedPackage}
            </h2>

            {/* QUESTIONS */}
            {type === "test" &&
              questions.map((q) => (
                <div key={q.id} className="mb-4">
                  <div className="font-medium">
                    {q.num}. {q.question}
                  </div>
                  <div className="ml-4">
                    <div>A. {q.options.a}</div>
                    <div>B. {q.options.b}</div>
                    <div>C. {q.options.c}</div>
                    <div>D. {q.options.d}</div>
                  </div>
                </div>
              ))}

            {/* ANSWER KEY */}
            {type === "answer" && (
              <div className="grid grid-cols-2 gap-2">
                {questions.map((q) => (
                  <div
                    key={q.id}
                    className="flex justify-between border-b border-gray-300"
                  >
                    <span>{q.num}</span>
                    <span className="font-bold uppercase">
                      {q.correctAnswer}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-300 bg-[#FAFAFA] flex justify-between items-center">
          <div className="text-xs text-[#666]">
            {type === "test" ? "Test Document" : "Answer Key"} • Package{" "}
            {selectedPackage}
          </div>

          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm flex items-center gap-2"
              onClick={() => window.print()}
            >
              <FolderArrowDownIcon className="w-5 h-5" />
              Download
            </button>

            <button
              className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded text-sm flex items-center gap-2"
              onClick={() => window.print()}
            >
              <PrinterIcon className="w-5 h-5" />
              Print Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
