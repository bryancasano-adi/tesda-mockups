import { X, Download, FileText, Printer } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  dimension: string;
  testType: 'Knowledge' | 'Scenario';
  modelAnswer: string;
}

interface QuestioningToolPreviewModalProps {
  questions: Question[];
  onClose: () => void;
}

export function QuestioningToolPreviewModal({ questions, onClose }: QuestioningToolPreviewModalProps) {
  const knowledgeQuestions = questions.filter((q) => q.testType === 'Knowledge');
  const scenarioQuestions = questions.filter((q) => q.testType === 'Scenario');

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0E0E0] flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-[#333]">Questioning Tool Preview & Export</h2>
            <p className="text-sm text-[#666]">Oral Interview Script - Shielded Metal Arc Welding (SMAW) NC II</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F5F5F5] rounded transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-[#666]" />
          </button>
        </div>

        {/* Summary Banner */}
        <div className="px-6 py-3 bg-[#E8F5E9] border-b border-[#A5D6A7] flex-shrink-0">
          <div className="flex items-start gap-2">
            <span className="text-lg">✅</span>
            <div className="flex-1">
              <div className="text-sm font-medium text-[#2E7D32]">
                {questions.length} questions ready for oral assessment • Binary Scoring (S/NS)
              </div>
              <div className="text-xs text-[#2E7D32] mt-1">
                {knowledgeQuestions.length} Knowledge-based • {scenarioQuestions.length} Scenario-based
              </div>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-y-auto bg-[#F5F5F5] p-6">
          <div className="bg-white border border-[#E0E0E0] rounded-lg shadow-sm max-w-[800px] mx-auto p-8">
            {/* Document Header */}
            <div className="text-center mb-6 pb-6 border-b-2 border-[#1976D2]">
              <div className="text-xs text-[#999] uppercase tracking-wider mb-2">
                Technical Education and Skills Development Authority
              </div>
              <h1 className="text-xl font-bold text-[#333] mb-2">ORAL QUESTIONING TOOL</h1>
              <div className="text-sm text-[#666]">
                <div className="font-semibold mb-1">Shielded Metal Arc Welding (SMAW) NC II</div>
                <div className="text-xs">Binary Assessment: Satisfactory (S) / Not Satisfactory (NS)</div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-6 p-4 bg-[#E3F2FD] border border-[#90CAF9] rounded">
              <div className="text-sm font-semibold text-[#1976D2] mb-2">Instructions for Assessor:</div>
              <ul className="text-xs text-[#1565C0] space-y-1 ml-4">
                <li>• Ask questions in a neutral, non-leading manner</li>
                <li>• Allow candidate time to think and respond fully</li>
                <li>• Record responses using S (Satisfactory) or NS (Not Satisfactory)</li>
                <li>• Any unsafe knowledge response = Not Satisfactory</li>
                <li>• Use the model answers as a guide for acceptable responses</li>
              </ul>
            </div>

            {/* Questions */}
            <div className="space-y-4">
              {questions.slice(0, 5).map((q, index) => (
                <div
                  key={q.id}
                  className={`border-l-4 pl-4 ${
                    q.testType === 'Knowledge' ? 'border-[#2E7D32]' : 'border-[#F57C00]'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-bold text-white ${
                        q.testType === 'Knowledge' ? 'bg-[#2E7D32]' : 'bg-[#F57C00]'
                      }`}
                    >
                      Q{q.id}
                    </span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[#333] mb-1">
                        {q.testType === 'Scenario' && (
                          <strong className="text-[#F57C00]">SCENARIO: </strong>
                        )}
                        {q.question}
                      </div>
                      <div className="text-xs text-[#666] mb-2">
                        <strong>Dimension:</strong> {q.dimension} | <strong>Type:</strong>{' '}
                        {q.testType}-based
                      </div>
                      <div className="p-2 bg-[#FAFAFA] rounded text-xs text-[#666]">
                        <strong className="text-[#333]">Expected Answer:</strong> {q.modelAnswer}
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 border-2 border-[#2E7D32] rounded-full"></span>
                          <span className="text-[#2E7D32] font-medium">S</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 border-2 border-[#C62828] rounded-full"></span>
                          <span className="text-[#C62828] font-medium">NS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {questions.length > 5 && (
                <div className="p-3 bg-[#F5F5F5] rounded text-center text-xs text-[#666] italic">
                  ... {questions.length - 5} more questions (Total: {questions.length} questions)
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="mt-6 border border-[#E0E0E0] rounded p-4 bg-[#FAFAFA]">
              <div className="text-xs font-semibold text-[#333] mb-2">Assessment Summary</div>
              <div className="grid grid-cols-2 gap-3 text-xs text-[#666]">
                <div>
                  <div className="font-medium">Total Questions:</div>
                  <div>{questions.length}</div>
                </div>
                <div>
                  <div className="font-medium">Scoring Method:</div>
                  <div>Binary (S/NS)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#E0E0E0] bg-[#FAFAFA] flex justify-between items-center flex-shrink-0">
          <div className="text-xs text-[#666]">
            Preview reflects current question pool • {questions.length} questions
          </div>
          <div className="flex gap-2">
            {/* Download DOCX */}
            <button
              onClick={() => alert('Download Questioning Tool DOCX')}
              className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0] transition-colors flex items-center gap-2"
            >
              <Download size={16} />
              Download DOCX
            </button>

            {/* Export ZIP */}
            <button
              onClick={() => alert('Export as ZIP')}
              className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors flex items-center gap-2"
            >
              <FileText size={16} />
              Download ZIP
            </button>

            {/* Print Preview */}
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors flex items-center gap-2"
            >
              <Printer size={16} />
              Print Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
