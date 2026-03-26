import { useState } from 'react';
import { useNavigate } from 'react-router';

export function MCQEditor() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'mcq' | 'tos'>('mcq');

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
          <p className="text-sm text-[#666]">50 Items · Factual / Scenario / Application · External Item Analysis</p>
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF3E0] text-[#F57C00]">
          Draft
        </span>
      </div>

      {/* Progress */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6 p-5">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-[#333]">Item Development Progress</span>
          <span className="text-sm text-[#666]">47 of 50 items (94%)</span>
        </div>
        <div className="w-full h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
          <div className="h-full bg-[#F57C00]" style={{ width: '94%' }} />
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
          MCQ Items (47)
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
            <button className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0]">
              + Add Item
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Sample MCQ Item */}
            <div className="border border-[#E0E0E0] rounded-lg p-5 hover:border-[#1976D2] transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-[#1976D2] text-white">
                    Item 1
                  </span>
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-[#E3F2FD] text-[#1976D2]">
                    Factual
                  </span>
                  <span className="text-xs text-[#999]">Remember / Understand</span>
                </div>
                <div className="flex gap-2">
                  <button className="text-[#1976D2] text-sm hover:underline">Edit</button>
                  <button className="text-[#C62828] text-sm hover:underline">Delete</button>
                </div>
              </div>

              <div className="text-sm text-[#333] mb-4 font-medium">
                Which electrode is most suitable for welding low carbon steel in a flat position?
              </div>

              <div className="space-y-2 ml-4">
                <div className="flex items-start gap-2">
                  <span className="text-sm font-semibold text-[#2E7D32]">A.</span>
                  <span className="text-sm text-[#2E7D32] font-medium">E6013 ✓ (Correct Answer)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm font-semibold text-[#666]">B.</span>
                  <span className="text-sm text-[#666]">E7018</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm font-semibold text-[#666]">C.</span>
                  <span className="text-sm text-[#666]">E6010</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm font-semibold text-[#666]">D.</span>
                  <span className="text-sm text-[#666]">E8018</span>
                </div>
              </div>
            </div>

            {/* Scenario-based item */}
            <div className="border border-[#E0E0E0] rounded-lg p-5 hover:border-[#1976D2] transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-[#1976D2] text-white">
                    Item 2
                  </span>
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-[#FFF3E0] text-[#F57C00]">
                    Scenario
                  </span>
                  <span className="text-xs text-[#999]">Understand / Apply</span>
                </div>
                <div className="flex gap-2">
                  <button className="text-[#1976D2] text-sm hover:underline">Edit</button>
                  <button className="text-[#C62828] text-sm hover:underline">Delete</button>
                </div>
              </div>

              <div className="text-sm text-[#333] mb-4">
                <strong className="text-[#F57C00]">SCENARIO:</strong> You are welding a plate-to-plate joint
                when you notice the electrode is sticking frequently. What should you do first?
              </div>

              <div className="space-y-2 ml-4">
                <div className="flex items-start gap-2">
                  <span className="text-sm font-semibold text-[#666]">A.</span>
                  <span className="text-sm text-[#666]">Change to a different electrode brand</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm font-semibold text-[#2E7D32]">B.</span>
                  <span className="text-sm text-[#2E7D32] font-medium">
                    Check and increase the amperage if it is too low ✓ (Correct Answer)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm font-semibold text-[#666]">C.</span>
                  <span className="text-sm text-[#666]">Reduce the travel speed</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm font-semibold text-[#666]">D.</span>
                  <span className="text-sm text-[#666]">Stop welding and report the issue immediately</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F5F5F5] rounded text-center text-sm text-[#666] italic">
              ... 45 more items (Total: 47 items drafted, 3 pending)
            </div>

            <div className="bg-[#FFF3E0] border-l-4 border-[#F57C00] p-4">
              <div className="font-semibold text-sm text-[#F57C00] mb-2">Next Steps:</div>
              <ol className="text-sm text-[#E65100] space-y-1 ml-4 list-decimal">
                <li>Complete remaining 3 items</li>
                <li>Download MCQ for pilot testing (minimum 20 students)</li>
                <li>Perform external item analysis using difficulty index</li>
                <li>Return to system: edit, retain, or discard items based on analysis</li>
                <li>Regenerate TOS based on final MCQ</li>
              </ol>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-[#E0E0E0] rounded mb-6">
          <div className="px-5 py-4 border-b border-[#E0E0E0]">
            <span className="text-[15px] font-semibold text-[#333]">
              Table of Specifications (TOS) - Draft
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FAFAFA]">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                    Element & PC
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                    Knowledge Focus
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                    Cognitive Level
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                    Item Placement
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                    No. of MCQs
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                    Item Numbers
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-[#FAFAFA]">
                  <td className="px-4 py-3 text-sm border border-[#E0E0E0]">
                    Element 1, PC 1:<br />Electrode identification
                  </td>
                  <td className="px-4 py-3 text-sm border border-[#E0E0E0]">
                    Electrode types and specifications
                  </td>
                  <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">
                    Remember / Understand
                  </td>
                  <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">Factual</td>
                  <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0] font-semibold">3</td>
                  <td className="px-4 py-3 text-sm border border-[#E0E0E0]">1, 8, 15</td>
                </tr>
                <tr className="hover:bg-[#FAFAFA]">
                  <td className="px-4 py-3 text-sm border border-[#E0E0E0]">
                    Element 1, PC 2:<br />Machine setup
                  </td>
                  <td className="px-4 py-3 text-sm border border-[#E0E0E0]">WPS interpretation</td>
                  <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">
                    Understand / Apply
                  </td>
                  <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">Scenario</td>
                  <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0] font-semibold">5</td>
                  <td className="px-4 py-3 text-sm border border-[#E0E0E0]">2, 9, 16, 23, 30</td>
                </tr>
                <tr className="hover:bg-[#FAFAFA]">
                  <td className="px-4 py-3 text-sm border border-[#E0E0E0]">
                    Element 1, PC 4:<br />Safety compliance
                  </td>
                  <td className="px-4 py-3 text-sm border border-[#E0E0E0]">OSHS standards</td>
                  <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">Apply</td>
                  <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">Application</td>
                  <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0] font-semibold">4</td>
                  <td className="px-4 py-3 text-sm border border-[#E0E0E0]">3, 10, 17, 24</td>
                </tr>
                <tr className="hover:bg-[#FAFAFA]">
                  <td
                    colSpan={6}
                    className="px-4 py-3 text-center text-sm text-[#999] italic border border-[#E0E0E0]"
                  >
                    ... Additional rows for remaining PCs
                  </td>
                </tr>
                <tr className="bg-[#E8F5E9]">
                  <td
                    colSpan={4}
                    className="px-4 py-3 text-sm font-bold text-right border border-[#E0E0E0]"
                  >
                    TOTAL
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-center border border-[#E0E0E0]">47</td>
                  <td className="px-4 py-3 text-sm border border-[#E0E0E0]">1-47</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-5">
            <div className="bg-[#E3F2FD] border-l-4 border-[#1976D2] p-4">
              <div className="font-semibold text-sm text-[#1976D2] mb-2">TOS Reconciliation Status:</div>
              <div className="space-y-1 text-sm text-[#1565C0]">
                <div>✓ All MCQ items mapped to PCs marked for Multiple Choice</div>
                <div>✓ Sum of MCQ items = 47 (Target: 50)</div>
                <div>⚠️ 3 items pending to reach target of 50</div>
                <div>✓ All item numbers accounted for (no gaps or duplicates)</div>
                <div>✓ Cognitive levels align with item placement categories</div>
              </div>
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
          Download for Pilot Testing
        </button>
        <button className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0] transition-colors">
          Continue Editing
        </button>
      </div>
    </div>
  );
}
