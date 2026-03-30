import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, Edit2, Save, X, CheckCircle } from 'lucide-react';
import { QuestioningToolPreviewModal } from '../components/QuestioningToolPreviewModal';
import { initialQuestions, type Question } from '../data/questioningToolQuestions';

export function QuestioningToolEditor() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'tabular' | 'script'>('tabular');
  const [showPreview, setShowPreview] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isFinalized, setIsFinalized] = useState(false);

  // Initial questions state - now using all 25 questions
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);

  // Edit state for inline editing
  const [editForm, setEditForm] = useState<Question | null>(null);

  // Calculate distributions dynamically
  const knowledgeCount = questions.filter((q) => q.testType === 'Knowledge').length;
  const scenarioCount = questions.filter((q) => q.testType === 'Scenario').length;
  const totalQuestions = questions.length;

  const dimensionCounts = questions.reduce((acc, q) => {
    acc[q.dimension] = (acc[q.dimension] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleEdit = (question: Question) => {
    setEditingId(question.id);
    setEditForm({ ...question });
  };

  const handleSave = () => {
    if (editForm) {
      setQuestions(questions.map((q) => (q.id === editForm.id ? editForm : q)));
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  return (
    <div className="p-6">
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › Questioning Tool
      </div>

      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#333] mb-1">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#E8F5E9] text-[#2E7D32] mr-2">
              PHASE 2
            </span>
            Questioning Tool Pool
          </h1>
          <p className="text-sm text-[#666]">25 Questions · Binary S/NS · 4 Dimensions Coverage</p>
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32]">
          Finalized
        </span>
      </div>

      {/* View Toggle */}
      <div className="inline-flex border border-[#E0E0E0] rounded overflow-hidden mb-6">
        <button
          onClick={() => setViewMode('tabular')}
          className={`px-5 py-2 text-sm font-medium transition-colors ${
            viewMode === 'tabular'
              ? 'bg-[#2E7D32] text-white'
              : 'bg-white text-[#666] hover:bg-[#F5F5F5]'
          }`}
        >
          Tabular Format (Validation)
        </button>
        <button
          onClick={() => setViewMode('script')}
          className={`px-5 py-2 text-sm font-medium transition-colors ${
            viewMode === 'script'
              ? 'bg-[#2E7D32] text-white'
              : 'bg-white text-[#666] hover:bg-[#F5F5F5]'
          }`}
        >
          Interview Script (Download)
        </button>
      </div>

      {viewMode === 'tabular' ? (
        <>
          {/* Coverage Summary */}
          <div className="bg-white border border-[#E0E0E0] rounded mb-6">
            <div className="px-5 py-4 border-b border-[#E0E0E0]">
              <span className="text-[15px] font-semibold text-[#333]">Coverage Summary</span>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#F5F5F5] rounded">
                  <div className="text-xs font-semibold text-[#999] uppercase mb-2">
                    Question Type Distribution
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666]">Knowledge-based:</span>
                      <span className="font-semibold text-[#333]">{knowledgeCount} ({((knowledgeCount / totalQuestions) * 100).toFixed(0)}%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666]">Scenario-based:</span>
                      <span className="font-semibold text-[#2E7D32]">{scenarioCount} ({((scenarioCount / totalQuestions) * 100).toFixed(0)}%)</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-[#F5F5F5] rounded">
                  <div className="text-xs font-semibold text-[#999] uppercase mb-2">
                    Dimensions of Competency
                  </div>
                  <div className="space-y-1.5">
                    {Object.entries(dimensionCounts).map(([dimension, count]) => (
                      <div key={dimension} className="flex justify-between text-sm">
                        <span className="text-[#666]">{dimension}:</span>
                        <span className="font-semibold text-[#333]">{count} questions</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabular Format */}
          <div className="bg-white border border-[#E0E0E0] rounded mb-6">
            <div className="px-5 py-4 border-b border-[#E0E0E0]">
              <span className="text-[15px] font-semibold text-[#333]">25 Questions with Model Answers</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#FAFAFA]">
                    <th className="text-center px-3 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0] w-12">
                      #
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                      Question
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0] w-40">
                      Dimension of Competency
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0] w-32">
                      Test Type
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0] w-64">
                      Model Answer
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0] w-24">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((q) => (
                    <tr key={q.id} className={q.id % 2 === 0 ? 'bg-[#FFFEF5] hover:bg-[#FFF9E6]' : 'hover:bg-[#FAFAFA]'}>
                      <td className="px-3 py-3 text-sm text-center border border-[#E0E0E0] font-semibold">
                        {q.id}
                      </td>
                      {editingId === q.id && editForm ? (
                        // Edit mode
                        <>
                          <td className="px-4 py-3 text-sm border border-[#E0E0E0]">
                            <textarea
                              value={editForm.question}
                              onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                              className="w-full px-2 py-1 border border-[#E0E0E0] rounded text-sm min-h-[60px]"
                            />
                          </td>
                          <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">
                            <select
                              value={editForm.dimension}
                              onChange={(e) => setEditForm({ ...editForm, dimension: e.target.value })}
                              className="w-full px-2 py-1 border border-[#E0E0E0] rounded text-sm"
                            >
                              <option>Task Skills</option>
                              <option>Task Management</option>
                              <option>Contingency Management</option>
                              <option>Job/Role Environment</option>
                            </select>
                          </td>
                          <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">
                            <select
                              value={editForm.testType}
                              onChange={(e) => setEditForm({ ...editForm, testType: e.target.value as 'Knowledge' | 'Scenario' })}
                              className="w-full px-2 py-1 border border-[#E0E0E0] rounded text-sm"
                            >
                              <option value="Knowledge">Knowledge</option>
                              <option value="Scenario">Scenario</option>
                            </select>
                          </td>
                          <td className="px-4 py-3 text-sm border border-[#E0E0E0]">
                            <textarea
                              value={editForm.modelAnswer}
                              onChange={(e) => setEditForm({ ...editForm, modelAnswer: e.target.value })}
                              className="w-full px-2 py-1 border border-[#E0E0E0] rounded text-sm min-h-[60px]"
                            />
                          </td>
                        </>
                      ) : (
                        // View mode
                        <>
                          <td className="px-4 py-3 text-sm border border-[#E0E0E0]">
                            {q.testType === 'Scenario' ? <strong>Scenario:</strong> : null} {q.question}
                          </td>
                          <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">{q.dimension}</td>
                          <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                q.testType === 'Knowledge' ? 'bg-[#E3F2FD] text-[#1976D2]' : 'bg-[#FFF3E0] text-[#F57C00]'
                              }`}
                            >
                              {q.testType}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm border border-[#E0E0E0] text-[#666]">
                            {q.modelAnswer}
                          </td>
                        </>
                      )}
                      <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0] w-24">
                        {editingId === q.id ? (
                          <div className="flex gap-1 justify-center">
                            <button
                              onClick={handleSave}
                              className="p-1.5 text-[#2E7D32] hover:bg-[#E8F5E9] rounded transition-colors"
                              title="Save"
                            >
                              <Save size={16} />
                            </button>
                            <button
                              onClick={handleCancel}
                              className="p-1.5 text-[#C62828] hover:bg-[#FFEBEE] rounded transition-colors"
                              title="Cancel"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEdit(q)}
                            className="p-1.5 text-[#1976D2] hover:bg-[#E3F2FD] rounded transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Finalize Button */}
          <div className="bg-white border border-[#E0E0E0] rounded p-5">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="font-semibold text-sm text-[#333] mb-1">Finalize Question Pool</div>
                <div className="text-xs text-[#666]">
                  Once finalized, this pool will be locked and ready for use in Phase 3 package assembly. All 25 questions will be used to generate the Interview Script.
                </div>
              </div>
              <button
                onClick={() => {
                  setIsFinalized(!isFinalized);
                  alert(isFinalized ? 'Question pool unlocked for editing' : 'Question pool finalized successfully!');
                }}
                className={`px-5 py-2.5 rounded text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
                  isFinalized
                    ? 'bg-white text-[#666] border border-[#E0E0E0] hover:bg-[#F5F5F5]'
                    : 'bg-[#2E7D32] text-white hover:bg-[#1B5E20]'
                }`}
              >
                <CheckCircle size={16} />
                {isFinalized ? 'Unfinalize Pool' : 'Finalize Pool'}
              </button>
            </div>
          </div>
        </>
      ) : (
        /* Interview Script Format */
        <div className="bg-white border border-[#E0E0E0] rounded mb-6">
          <div className="px-5 py-4 border-b border-[#E0E0E0]">
            <span className="text-[15px] font-semibold text-[#333]">
              Oral Interview Script (Ready-to-Use)
            </span>
          </div>
          <div className="p-6 space-y-6">
            <div className="p-4 bg-[#E3F2FD] border-l-4 border-[#1976D2]">
              <div className="font-semibold text-sm text-[#1976D2] mb-2">Instructions for Assessor:</div>
              <ul className="text-sm text-[#1565C0] space-y-1 ml-4">
                <li>• Ask questions in a neutral, non-leading manner</li>
                <li>• Allow candidate time to think and respond</li>
                <li>• Record responses using S (Satisfactory) or NS (Not Satisfactory)</li>
                <li>• Any unsafe knowledge response = Not Satisfactory</li>
              </ul>
            </div>

            <div className="space-y-5">
              {questions.map((q) => (
                <div key={q.id} className={`border-l-4 ${q.testType === 'Knowledge' ? 'border-[#2E7D32]' : 'border-[#F57C00]'} pl-4`}>
                  <div className="flex items-start gap-2 mb-2">
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-[#2E7D32] text-white">
                      Q{q.id}
                    </span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[#333] mb-1">
                        {q.testType === 'Scenario' ? <strong className="text-[#F57C00]">SCENARIO:</strong> : null} {q.question}
                      </div>
                      <div className="text-xs text-[#666] mb-2">
                        <strong>Dimension:</strong> {q.dimension} | <strong>Type:</strong> {q.testType}-based
                      </div>
                      <div className="p-3 bg-[#FAFAFA] rounded text-sm text-[#666]">
                        <strong className="text-[#333]">Expected Answer:</strong> {q.modelAnswer}
                      </div>
                      <div className="mt-2 flex items-center gap-4">
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="radio" name={`q${q.id}`} className="w-4 h-4" />
                          <span className="text-[#2E7D32] font-medium">S - Satisfactory</span>
                        </label>
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="radio" name={`q${q.id}`} className="w-4 h-4" />
                          <span className="text-[#C62828] font-medium">NS - Not Satisfactory</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-3 justify-end">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
        >
          ← Back to Dashboard
        </button>
        <button className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
          Save Draft
        </button>
        <button
          onClick={() => setShowPreview(true)}
          className="px-4 py-2 bg-white text-[#1976D2] border border-[#1976D2] rounded text-sm font-medium hover:bg-[#E3F2FD] transition-colors flex items-center gap-2"
        >
          <Eye size={16} />
          Preview
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <QuestioningToolPreviewModal
          questions={questions}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}