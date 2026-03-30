import { X } from 'lucide-react';

interface WorkflowGuideProps {
  onClose: () => void;
}

export function WorkflowGuide({ onClose }: WorkflowGuideProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-[#1976D2] to-[#1565C0] text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome to CATS Development</h2>
            <p className="text-sm opacity-90">Understanding the 3-Phase Workflow</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Overview */}
          <div className="bg-[#E3F2FD] border border-[#90CAF9] rounded-lg p-5">
            <h3 className="font-bold text-lg text-[#1976D2] mb-2">📦 What You'll Create</h3>
            <p className="text-sm text-[#1565C0] mb-3">
              This system helps you build <strong>5 complete CATS packages</strong> (Sets A-E) for
              Shielded Metal Arc Welding NC II. Each package contains 6 documents, totaling{' '}
              <strong>30 deliverable documents</strong>.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded border border-[#90CAF9]">
                <div className="font-semibold text-sm text-[#333] mb-1">Per-Package (Unique)</div>
                <ul className="text-xs text-[#666] space-y-0.5">
                  <li>• Assessor's Guide</li>
                  <li>• SIC</li>
                  <li>• Written Test + TOS</li>
                  <li>• Rating Sheet</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded border border-[#90CAF9]">
                <div className="font-semibold text-sm text-[#333] mb-1">Shared (All 5)</div>
                <ul className="text-xs text-[#666] space-y-0.5">
                  <li>• SAG</li>
                  <li>• CARS</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Phase 1 */}
          <div className="border-l-4 border-[#1976D2] pl-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-[#1976D2] text-white text-xs font-bold rounded">PHASE 1</span>
              <h3 className="font-bold text-lg">Foundation Documents</h3>
            </div>
            <p className="text-sm text-[#666] mb-3">
              Create the Evidence Plan (4-column table mapping Performance Criteria to assessment methods)
              and generate the Outline document.
            </p>
            <div className="bg-[#F5F5F5] p-3 rounded text-xs text-[#666]">
              <strong>Next step:</strong> Once Evidence Plan is finalized → Proceed to Phase 2
            </div>
          </div>

          {/* Phase 2 */}
          <div className="border-l-4 border-[#2E7D32] pl-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-[#2E7D32] text-white text-xs font-bold rounded">PHASE 2</span>
              <h3 className="font-bold text-lg">Pool Generation</h3>
            </div>
            <p className="text-sm text-[#666] mb-3">
              Build 3 master pools that will be distributed into 5 packages:
            </p>
            <div className="space-y-2 mb-3">
              <div className="flex items-start gap-3 bg-[#F5F5F5] p-3 rounded">
                <span className="text-xl">🔨</span>
                <div className="flex-1">
                  <div className="font-semibold text-sm">Demonstration Test Pool</div>
                  <div className="text-xs text-[#666]">
                    5 variations (A-E) with different materials/equipment but same Performance Criteria
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[#F5F5F5] p-3 rounded">
                <span className="text-xl">💬</span>
                <div className="flex-1">
                  <div className="font-semibold text-sm">Questioning Tool Pool</div>
                  <div className="text-xs text-[#666]">
                    25 questions (5 per PC) covering 4 Dimensions (Skills, Knowledge, Critical Aspect, Safety)
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[#F5F5F5] p-3 rounded">
                <span className="text-xl">📝</span>
                <div className="flex-1">
                  <div className="font-semibold text-sm">Written Test Pool (MCQ)</div>
                  <div className="text-xs text-[#666]">
                    50 multiple choice items + TOS (will be distributed as subsets to 5 packages)
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#F5F5F5] p-3 rounded text-xs text-[#666]">
              <strong>Next step:</strong> Once all 3 pools are finalized → Proceed to Phase 3
            </div>
          </div>

          {/* Phase 3 */}
          <div className="border-l-4 border-[#F57C00] pl-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-[#F57C00] text-white text-xs font-bold rounded">PHASE 3</span>
              <h3 className="font-bold text-lg">5-Package Assembly (2 Steps)</h3>
            </div>
            <p className="text-sm text-[#666] mb-3">
              Distribute Phase 2 pools into 5 complete CATS packages:
            </p>
            <div className="space-y-3">
              <div className="bg-[#FFF3E0] border border-[#FFB74D] p-3 rounded">
                <div className="font-semibold text-sm text-[#E65100] mb-2">Step 1: Create 5 Assessor's Guides</div>
                <p className="text-xs text-[#F57C00] mb-2">
                  Each AG (Set A-E) is compiled from Phase 2 pools using distribution settings.
                </p>
                <div className="text-xs text-[#666] bg-white p-2 rounded">
                  <strong>Gate:</strong> Each AG must be finalized before its remaining 5 documents can be generated.
                </div>
              </div>

              <div className="bg-[#FFF3E0] border border-[#FFB74D] p-3 rounded">
                <div className="font-semibold text-sm text-[#E65100] mb-2">Step 2: Generate Remaining Documents</div>
                <p className="text-xs text-[#F57C00] mb-2">
                  For each finalized AG, generate: SIC, Written Test, Rating Sheet (unique) + SAG, CARS (shared).
                </p>
                <div className="text-xs text-[#666] bg-white p-2 rounded">
                  <strong>Gate:</strong> All 30 documents must be finalized to unlock final export.
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-[#FFFDE7] border border-[#FFE082] rounded-lg p-5">
            <h3 className="font-bold text-sm text-[#F57C00] mb-3">💡 Quick Tips</h3>
            <ul className="space-y-2 text-sm text-[#F57C00]">
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>Follow the phases in order - each phase unlocks the next</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>Use the "By Phase" view to see your workflow progress</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>Use the "By Package" view to track document completion across all 5 packages</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>The blue "Next Step" banner at the top always shows what to do next</span>
              </li>
            </ul>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#1976D2] text-white rounded-lg font-bold hover:bg-[#1565C0] transition-colors"
          >
            Got it! Let's Start
          </button>
        </div>
      </div>
    </div>
  );
}
