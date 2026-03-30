import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, Plus, Edit2, Trash2, CheckCircle, Save } from 'lucide-react';
import { initialMCQItems, MCQItem } from '../data/mcqQuestions';
import { MCQEditorModal } from '../components/MCQEditorModal';
import { DeleteConfirmDialog } from '../components/DeleteConfirmDialog';
import { MCQPreviewModal } from '../components/MCQPreviewModal';
import { TOSPreviewModal } from '../components/TOSPreviewModal';

export function MCQEditor() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'mcq' | 'tos'>('mcq');
  const [mcqItems, setMcqItems] = useState<MCQItem[]>(initialMCQItems);
  const [editingItem, setEditingItem] = useState<MCQItem | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showTOSPreview, setShowTOSPreview] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);

  const handleSaveItem = (item: MCQItem) => {
    if (item.id === 0) {
      // New item
      const newId = Math.max(...mcqItems.map((i) => i.id)) + 1;
      setMcqItems([...mcqItems, { ...item, id: newId }]);
    } else {
      // Edit existing
      setMcqItems(mcqItems.map((i) => (i.id === item.id ? item : i)));
    }
  };

  const handleDeleteItem = (id: number) => {
    setMcqItems(mcqItems.filter((i) => i.id !== id));
    setDeletingItemId(null);
  };

  const handleAddNew = () => {
    setEditingItem({
      id: 0,
      question: '',
      options: { a: '', b: '', c: '', d: '' },
      correctAnswer: 'a',
      type: 'Factual',
      cognitiveLevel: 'Remember',
      articleNumber: 1,
    });
    setShowAddModal(true);
  };

  // Calculate TOS data
  const calculateTOS = () => {
    const tosData = [
      { article: '1. Occupational Safety and Health', target: 4, percentage: 10 },
      { article: '2. Equipment Operation', target: 12, percentage: 30 },
      { article: '3. Preventive Maintenance Servicing/Inspection', target: 6, percentage: 15 },
      { article: '4. Job or Role in the Workplace', target: 2, percentage: 5 },
      { article: '5. Equipment/Supply Identification and Usage', target: 15, percentage: 37.5 },
      { article: '6. Mathematics/Computation', target: 1, percentage: 2.5 },
    ];

    return tosData.map((article, idx) => {
      const articleNum = idx + 1;
      const articleItems = mcqItems.filter((item) => item.articleNumber === articleNum);
      
      const factual = articleItems.filter((item) => item.type === 'Factual').map((item) => item.id);
      const comprehension = articleItems.filter((item) => item.type === 'Scenario').map((item) => item.id);
      const application = articleItems.filter((item) => item.type === 'Application').map((item) => item.id);
      
      return {
        ...article,
        factual: factual.length > 0 ? factual.join(',') : '–',
        comprehension: comprehension.length > 0 ? comprehension.join(',') : '–',
        application: application.length > 0 ? application.join(',') : '–',
        total: articleItems.length,
      };
    });
  };

  const tosData = calculateTOS();
  const totalItems = mcqItems.length;
  const factualCount = mcqItems.filter((i) => i.type === 'Factual').length;
  const scenarioCount = mcqItems.filter((i) => i.type === 'Scenario').length;
  const applicationCount = mcqItems.filter((i) => i.type === 'Application').length;

  return (
    <div className="p-6">
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › MCQ Pool + TOS
      </div>

      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#333] mb-1">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#E8F5E9] text-[#2E7D32] mr-2">
              PHASE 2
            </span>
            MCQ Pool + Table of Specifications
          </h1>
          <p className="text-sm text-[#666]">{totalItems} Items · Factual / Scenario / Application · External Item Analysis</p>
        </div>
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
          isFinalized ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#FFF3E0] text-[#F57C00]'
        }`}>
          {isFinalized ? 'Finalized' : 'Draft'}
        </span>
      </div>

      {/* Progress */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6 p-5">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-[#333]">Item Development Progress</span>
          <span className="text-sm text-[#666]">{totalItems} of 50 items ({((totalItems / 50) * 100).toFixed(0)}%)</span>
        </div>
        <div className="w-full h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
          <div className="h-full bg-[#1976D2]" style={{ width: `${(totalItems / 50) * 100}%` }} />
        </div>
      </div>

      {/* Tab Toggle */}
      <div className="inline-flex border border-[#E0E0E0] rounded overflow-hidden mb-6">
        <button
          onClick={() => setSelectedTab('mcq')}
          className={`px-5 py-2 text-sm font-medium transition-colors ${
            selectedTab === 'mcq' ? 'bg-[#1976D2] text-white' : 'bg-white text-[#666] hover:bg-[#F5F5F5]'
          }`}
        >
          MCQ Items ({totalItems})
        </button>
        <button
          onClick={() => setSelectedTab('tos')}
          className={`px-5 py-2 text-sm font-medium transition-colors ${
            selectedTab === 'tos' ? 'bg-[#1976D2] text-white' : 'bg-white text-[#666] hover:bg-[#F5F5F5]'
          }`}
        >
          Table of Specifications
        </button>
      </div>

      {selectedTab === 'mcq' ? (
        <div className="bg-white border border-[#E0E0E0] rounded mb-6">
          <div className="px-5 py-4 border-b border-[#E0E0E0] flex justify-between items-center">
            <span className="text-[15px] font-semibold text-[#333]">Multiple Choice Questions</span>
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0] flex items-center gap-2"
            >
              <Plus size={16} />
              Add Item
            </button>
          </div>

          <div className="p-6 space-y-4">
            {mcqItems.map((item) => (
              <div
                key={item.id}
                className="border border-[#E0E0E0] rounded-lg p-5 hover:border-[#1976D2] transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-[#1976D2] text-white">
                      Item {item.id}
                    </span>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                        item.type === 'Factual'
                          ? 'bg-[#E3F2FD] text-[#1976D2]'
                          : item.type === 'Scenario'
                          ? 'bg-[#FFF3E0] text-[#F57C00]'
                          : 'bg-[#E8F5E9] text-[#2E7D32]'
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="text-xs text-[#999]">{item.cognitiveLevel}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setShowAddModal(false);
                      }}
                      className="p-1.5 text-[#1976D2] hover:bg-[#E3F2FD] rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => setDeletingItemId(item.id)}
                      className="p-1.5 text-[#C62828] hover:bg-[#FFEBEE] rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div
                  className="text-sm text-[#333] mb-4 font-medium"
                  dangerouslySetInnerHTML={{ __html: item.question }}
                />

                <div className="space-y-2 ml-4">
                  <div className="flex items-start gap-2">
                    <span
                      className={`text-sm font-semibold ${item.correctAnswer === 'a' ? 'text-[#2E7D32]' : 'text-[#666]'}`}
                    >
                      A.
                    </span>
                    <span
                      className={`text-sm ${item.correctAnswer === 'a' ? 'text-[#2E7D32] font-medium' : 'text-[#666]'}`}
                    >
                      {item.options.a}
                      {item.correctAnswer === 'a' && ' ✓ (Correct Answer)'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span
                      className={`text-sm font-semibold ${item.correctAnswer === 'b' ? 'text-[#2E7D32]' : 'text-[#666]'}`}
                    >
                      B.
                    </span>
                    <span
                      className={`text-sm ${item.correctAnswer === 'b' ? 'text-[#2E7D32] font-medium' : 'text-[#666]'}`}
                    >
                      {item.options.b}
                      {item.correctAnswer === 'b' && ' ✓ (Correct Answer)'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span
                      className={`text-sm font-semibold ${item.correctAnswer === 'c' ? 'text-[#2E7D32]' : 'text-[#666]'}`}
                    >
                      C.
                    </span>
                    <span
                      className={`text-sm ${item.correctAnswer === 'c' ? 'text-[#2E7D32] font-medium' : 'text-[#666]'}`}
                    >
                      {item.options.c}
                      {item.correctAnswer === 'c' && ' ✓ (Correct Answer)'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span
                      className={`text-sm font-semibold ${item.correctAnswer === 'd' ? 'text-[#2E7D32]' : 'text-[#666]'}`}
                    >
                      D.
                    </span>
                    <span
                      className={`text-sm ${item.correctAnswer === 'd' ? 'text-[#2E7D32] font-medium' : 'text-[#666]'}`}
                    >
                      {item.options.d}
                      {item.correctAnswer === 'd' && ' ✓ (Correct Answer)'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Table of Specifications */
        <div className="bg-white border border-[#E0E0E0] rounded mb-6">
          <div className="px-5 py-4 border-b border-[#E0E0E0]">
            <span className="text-[15px] font-semibold text-[#333]">
              Table of Specifications (TOS)
            </span>
          </div>

          {/* Detailed TOS Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1976D2]">
                  <th colSpan={6} className="px-4 py-3 text-center font-bold text-white border border-[#E0E0E0]">
                    TABLE OF SPECIFICATION
                  </th>
                </tr>
                <tr className="bg-[#1976D2]">
                  <th colSpan={6} className="px-4 py-2 text-center font-semibold text-white border border-[#E0E0E0]">
                    SHIELDED METAL ARC WELDING (SMAW) – National Certificate II
                  </th>
                </tr>
                <tr className="bg-[#1976D2]">
                  <th colSpan={6} className="px-4 py-2 text-center font-semibold text-white border border-[#E0E0E0]">
                    Written Test
                  </th>
                </tr>
                <tr className="bg-[#FAFAFA]">
                  <th rowSpan={2} className="text-left px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0] align-middle">
                    ARTICLE NUMBER
                  </th>
                  <th colSpan={3} className="text-center px-4 py-2 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                    TEST ITEM DISTRIBUTION
                  </th>
                  <th rowSpan={2} className="text-center px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0] align-middle">
                    TOTAL NO. OF<br />ITEMS
                  </th>
                  <th rowSpan={2} className="text-center px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0] align-middle">
                    PERCENTAGE<br />(%)
                  </th>
                </tr>
                <tr className="bg-[#FAFAFA]">
                  <th className="text-center px-4 py-2 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                    TYPE I<br />Factual Knowledge
                  </th>
                  <th className="text-center px-4 py-2 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                    TYPE 2<br />Comprehension
                  </th>
                  <th className="text-center px-4 py-2 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                    TYPE 3<br />Application
                  </th>
                </tr>
              </thead>
              <tbody>
                {tosData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAFAFA]">
                    <td className="px-4 py-3 text-sm border border-[#E0E0E0]">{row.article}</td>
                    <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">{row.factual}</td>
                    <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">{row.comprehension}</td>
                    <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">{row.application}</td>
                    <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0] font-semibold">{row.total}</td>
                    <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">{row.percentage}</td>
                  </tr>
                ))}
                <tr className="bg-[#E8F5E9]">
                  <td className="px-4 py-3 text-sm font-bold text-right border border-[#E0E0E0]">TOTAL</td>
                  <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0] font-semibold">{factualCount}</td>
                  <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0] font-semibold">{scenarioCount}</td>
                  <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0] font-semibold">{applicationCount}</td>
                  <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0] font-bold">{totalItems}</td>
                  <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0] font-bold">100%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Summary Table */}
          <div className="p-5 border-t border-[#E0E0E0]">
            <div className="text-xs font-semibold text-[#666] uppercase mb-3">Summary by Article</div>
            <table className="w-full border border-[#E0E0E0]">
              <thead>
                <tr className="bg-[#FAFAFA]">
                  <th className="text-left px-4 py-2 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                    ARTICLE/DESCRIPTION
                  </th>
                  <th className="text-center px-4 py-2 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                    NO. OF ITEMS
                  </th>
                  <th className="text-center px-4 py-2 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                    PERCENTAGE (%)
                  </th>
                </tr>
              </thead>
              <tbody>
                {tosData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAFAFA]">
                    <td className="px-4 py-2 text-sm border border-[#E0E0E0]">{row.article}</td>
                    <td className="px-4 py-2 text-sm text-center border border-[#E0E0E0]">{row.total}</td>
                    <td className="px-4 py-2 text-sm text-center border border-[#E0E0E0]">{row.percentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Finalize Section */}
      <div className="bg-white border border-[#E0E0E0] rounded p-5 mb-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="font-semibold text-sm text-[#333] mb-1">Finalize MCQ Pool</div>
            <div className="text-xs text-[#666]">
              Once finalized, this pool will be locked and ready for pilot testing and item analysis.
              All {totalItems} items will be included in the Table of Specifications.
            </div>
          </div>
          <button
            onClick={() => {
              setIsFinalized(!isFinalized);
              alert(isFinalized ? 'MCQ pool unlocked for editing' : 'MCQ pool finalized successfully!');
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

      {/* Footer Actions */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
        >
          ← Back to Dashboard
        </button>
        <button
          onClick={() => alert('Draft saved successfully!')}
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors flex items-center gap-2"
        >
          <Save size={16} />
          Save Draft
        </button>
        <button
          onClick={() => setShowPreview(true)}
          className="px-4 py-2 bg-white text-[#1976D2] border border-[#1976D2] rounded text-sm font-medium hover:bg-[#E3F2FD] transition-colors flex items-center gap-2"
        >
          <Eye size={16} />
          Preview
        </button>
        <button
          onClick={() => setShowTOSPreview(true)}
          className="px-4 py-2 bg-white text-[#1976D2] border border-[#1976D2] rounded text-sm font-medium hover:bg-[#E3F2FD] transition-colors flex items-center gap-2"
        >
          <Eye size={16} />
          TOS Preview
        </button>
      </div>

      {/* Modals */}
      {(editingItem || showAddModal) && (
        <MCQEditorModal
          item={editingItem}
          onSave={handleSaveItem}
          onClose={() => {
            setEditingItem(null);
            setShowAddModal(false);
          }}
        />
      )}

      {deletingItemId && (
        <DeleteConfirmDialog
          itemNumber={deletingItemId}
          onConfirm={() => handleDeleteItem(deletingItemId)}
          onCancel={() => setDeletingItemId(null)}
        />
      )}

      {showPreview && <MCQPreviewModal items={mcqItems} onClose={() => setShowPreview(false)} />}
      {showTOSPreview && (
        <TOSPreviewModal
          tosData={tosData}
          totalItems={totalItems}
          factualCount={factualCount}
          scenarioCount={scenarioCount}
          applicationCount={applicationCount}
          onClose={() => setShowTOSPreview(false)}
        />
      )}
    </div>
  );
}