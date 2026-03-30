import { X, Download, FileText, Printer } from 'lucide-react';
import { MCQItem } from '../data/mcqQuestions';

interface MCQPreviewModalProps {
  items: MCQItem[];
  onClose: () => void;
}

export function MCQPreviewModal({ items, onClose }: MCQPreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0E0E0] flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-[#333]">Written Test Preview & Export</h2>
            <p className="text-sm text-[#666]">Multiple Choice Questions - Shielded Metal Arc Welding (SMAW) NC II</p>
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
        <div className="px-6 py-3 bg-[#E3F2FD] border-b border-[#90CAF9] flex-shrink-0">
          <div className="flex items-start gap-2">
            <span className="text-lg">📝</span>
            <div className="flex-1">
              <div className="text-sm font-medium text-[#1976D2]">
                {items.length} multiple choice questions • 4 options each • Single correct answer
              </div>
              <div className="text-xs text-[#1976D2] mt-1">
                Factual, Scenario, and Application-based items
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
              <h1 className="text-xl font-bold text-[#333] mb-2">WRITTEN TEST</h1>
              <div className="text-sm text-[#666]">
                <div className="font-semibold mb-1">Shielded Metal Arc Welding (SMAW) NC II</div>
                <div className="text-xs">Multiple Choice • {items.length} Items</div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-6 p-4 bg-[#FFF3E0] border border-[#FFB74D] rounded">
              <div className="text-sm font-semibold text-[#F57C00] mb-2">Instructions:</div>
              <ul className="text-xs text-[#E65100] space-y-1 ml-4">
                <li>• Read each question carefully before selecting your answer</li>
                <li>• Select the BEST answer for each question</li>
                <li>• Mark your answers clearly on the answer sheet provided</li>
                <li>• Do not write on this test booklet</li>
              </ul>
            </div>

            {/* Questions (showing first 5) */}
            <div className="space-y-6">
              {items.slice(0, 5).map((item) => (
                <div key={item.id} className="border-l-4 border-[#1976D2] pl-4">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-[#1976D2] text-white min-w-[50px] text-center">
                      {item.id}
                    </span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[#333] mb-3">
                        {item.type === 'Scenario' && (
                          <strong className="text-[#F57C00]">SCENARIO: </strong>
                        )}
                        {item.question}
                      </div>
                      <div className="space-y-2 ml-2">
                        <div className="text-sm text-[#333]">
                          <strong>A.</strong> {item.options.a}
                          {item.correctAnswer === 'a' && <span className="text-[#2E7D32] ml-2">✓</span>}
                        </div>
                        <div className="text-sm text-[#333]">
                          <strong>B.</strong> {item.options.b}
                          {item.correctAnswer === 'b' && <span className="text-[#2E7D32] ml-2">✓</span>}
                        </div>
                        <div className="text-sm text-[#333]">
                          <strong>C.</strong> {item.options.c}
                          {item.correctAnswer === 'c' && <span className="text-[#2E7D32] ml-2">✓</span>}
                        </div>
                        <div className="text-sm text-[#333]">
                          <strong>D.</strong> {item.options.d}
                          {item.correctAnswer === 'd' && <span className="text-[#2E7D32] ml-2">✓</span>}
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-[#666]">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                          item.type === 'Factual' ? 'bg-[#E3F2FD] text-[#1976D2]' :
                          item.type === 'Scenario' ? 'bg-[#FFF3E0] text-[#F57C00]' :
                          'bg-[#E8F5E9] text-[#2E7D32]'
                        }`}>
                          {item.type}
                        </span>
                        <span className="ml-2">{item.cognitiveLevel}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {items.length > 5 && (
                <div className="p-3 bg-[#F5F5F5] rounded text-center text-xs text-[#666] italic">
                  ... {items.length - 5} more questions (Total: {items.length} questions)
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#E0E0E0] bg-[#FAFAFA] flex justify-between items-center flex-shrink-0">
          <div className="text-xs text-[#666]">
            Preview reflects current MCQ pool • {items.length} items
          </div>
          <div className="flex gap-2">
            {/* Download DOCX */}
            <button
              onClick={() => alert('Download MCQ Test DOCX')}
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
