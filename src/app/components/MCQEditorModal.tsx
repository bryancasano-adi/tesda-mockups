import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { MCQItem } from '../data/mcqQuestions';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface MCQEditorModalProps {
  item: MCQItem | null;
  onSave: (item: MCQItem) => void;
  onClose: () => void;
}

export function MCQEditorModal({ item, onSave, onClose }: MCQEditorModalProps) {
  const [formData, setFormData] = useState<MCQItem>({
    id: item?.id || 0,
    question: item?.question || '',
    options: item?.options || { a: '', b: '', c: '', d: '' },
    correctAnswer: item?.correctAnswer || 'a',
    type: item?.type || 'Factual',
    cognitiveLevel: item?.cognitiveLevel || 'Remember',
    articleNumber: item?.articleNumber || 1,
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0E0E0] flex justify-between items-center flex-shrink-0">
          <h2 className="text-lg font-semibold text-[#333]">
            {item ? `Edit Item ${item.id}` : 'Add New Item'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F5F5F5] rounded transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-[#666]" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-5">
            {/* Question Field with WYSIWYG */}
            <div>
              <label className="block text-sm font-semibold text-[#333] mb-2">Question *</label>
              <div className="border border-[#E0E0E0] rounded">
                <ReactQuill
                  theme="snow"
                  value={formData.question}
                  onChange={(value) => setFormData({ ...formData, question: value })}
                  modules={modules}
                  placeholder="Enter question text..."
                />
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#333] mb-2">Option A *</label>
                <input
                  type="text"
                  value={formData.options.a}
                  onChange={(e) =>
                    setFormData({ ...formData, options: { ...formData.options, a: e.target.value } })
                  }
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  placeholder="Enter option A"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#333] mb-2">Option B *</label>
                <input
                  type="text"
                  value={formData.options.b}
                  onChange={(e) =>
                    setFormData({ ...formData, options: { ...formData.options, b: e.target.value } })
                  }
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  placeholder="Enter option B"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#333] mb-2">Option C *</label>
                <input
                  type="text"
                  value={formData.options.c}
                  onChange={(e) =>
                    setFormData({ ...formData, options: { ...formData.options, c: e.target.value } })
                  }
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  placeholder="Enter option C"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#333] mb-2">Option D *</label>
                <input
                  type="text"
                  value={formData.options.d}
                  onChange={(e) =>
                    setFormData({ ...formData, options: { ...formData.options, d: e.target.value } })
                  }
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  placeholder="Enter option D"
                />
              </div>
            </div>

            {/* Metadata Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#333] mb-2">Correct Answer *</label>
                <select
                  value={formData.correctAnswer}
                  onChange={(e) =>
                    setFormData({ ...formData, correctAnswer: e.target.value as 'a' | 'b' | 'c' | 'd' })
                  }
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                >
                  <option value="a">A</option>
                  <option value="b">B</option>
                  <option value="c">C</option>
                  <option value="d">D</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#333] mb-2">Item Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value as 'Factual' | 'Scenario' | 'Application' })
                  }
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                >
                  <option value="Factual">Factual</option>
                  <option value="Scenario">Scenario</option>
                  <option value="Application">Application</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#333] mb-2">Cognitive Level *</label>
                <select
                  value={formData.cognitiveLevel}
                  onChange={(e) => setFormData({ ...formData, cognitiveLevel: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                >
                  <option value="Remember">Remember</option>
                  <option value="Understand">Understand</option>
                  <option value="Apply">Apply</option>
                  <option value="Analyze">Analyze</option>
                  <option value="Remember / Understand">Remember / Understand</option>
                  <option value="Understand / Apply">Understand / Apply</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#333] mb-2">Article Number *</label>
                <select
                  value={formData.articleNumber}
                  onChange={(e) => setFormData({ ...formData, articleNumber: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                >
                  <option value="1">1. Occupational Safety and Health</option>
                  <option value="2">2. Equipment Operation</option>
                  <option value="3">3. Preventive Maintenance</option>
                  <option value="4">4. Job or Role in the Workplace</option>
                  <option value="5">5. Equipment/Supply Identification</option>
                  <option value="6">6. Mathematics/Computation</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E0E0E0] bg-[#FAFAFA] flex justify-end gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0] transition-colors flex items-center gap-2"
          >
            <Save size={16} />
            Save Item
          </button>
        </div>
      </div>
    </div>
  );
}
