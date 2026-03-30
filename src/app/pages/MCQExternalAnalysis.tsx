import { useNavigate } from 'react-router';

export function MCQExternalAnalysis() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › MCQ External Analysis
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#333] mb-1">
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#C8E6C9] text-[#1B5E20] mr-2">
            PHASE 2
          </span>
          MCQ External Analysis Guide
        </h1>
        <p className="text-sm text-[#666]">Step-by-step pilot test workflow • Download for external validation</p>
      </div>

      {/* Info Banner */}
      <div className="bg-[#E3F2FD] border border-[#90CAF9] rounded p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-xl">ℹ️</span>
          <div className="flex-1 text-sm text-[#1565C0]">
            <strong>External Pilot Testing:</strong> Before finalizing your 50 MCQ items, conduct a pilot test
            with a sample group to validate item quality, difficulty, and discrimination. This guide provides
            the step-by-step process for conducting and analyzing the pilot test externally.
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="bg-white border-2 border-[#1976D2] rounded mb-6">
        <div className="px-5 py-4 bg-[#E3F2FD] border-b border-[#1976D2]">
          <div className="font-semibold text-[15px] text-[#333]">Download Pilot Test Materials</div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button className="flex items-start gap-3 p-4 bg-white border border-[#E0E0E0] rounded hover:border-[#1976D2] hover:bg-[#F5FAFF] transition-all">
              <span className="text-3xl">📝</span>
              <div className="flex-1 text-left">
                <div className="font-semibold text-sm text-[#333] mb-1">MCQ Test Booklet (50 items)</div>
                <div className="text-xs text-[#666]">Formatted for pilot testing • No answers shown</div>
              </div>
            </button>

            <button className="flex items-start gap-3 p-4 bg-white border border-[#E0E0E0] rounded hover:border-[#1976D2] hover:bg-[#F5FAFF] transition-all">
              <span className="text-3xl">📋</span>
              <div className="flex-1 text-left">
                <div className="font-semibold text-sm text-[#333] mb-1">Answer Sheet Template</div>
                <div className="text-xs text-[#666]">For pilot test participants</div>
              </div>
            </button>

            <button className="flex items-start gap-3 p-4 bg-white border border-[#E0E0E0] rounded hover:border-[#1976D2] hover:bg-[#F5FAFF] transition-all">
              <span className="text-3xl">🔑</span>
              <div className="flex-1 text-left">
                <div className="font-semibold text-sm text-[#333] mb-1">Answer Key + Item Analysis Sheet</div>
                <div className="text-xs text-[#666]">For scoring and analysis</div>
              </div>
            </button>

            <button className="flex items-start gap-3 p-4 bg-white border border-[#E0E0E0] rounded hover:border-[#1976D2] hover:bg-[#F5FAFF] transition-all">
              <span className="text-3xl">📊</span>
              <div className="flex-1 text-left">
                <div className="font-semibold text-sm text-[#333] mb-1">Excel Analysis Template</div>
                <div className="text-xs text-[#666]">Automated difficulty & discrimination calculator</div>
              </div>
            </button>
          </div>

          <button className="w-full px-6 py-3 bg-[#1976D2] text-white rounded text-sm font-bold hover:bg-[#1565C0] transition-colors">
            📥 Download Complete Pilot Test Package (ZIP)
          </button>
        </div>
      </div>

      {/* Step-by-Step Workflow */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <div className="font-semibold text-[15px] text-[#333]">Pilot Test Workflow (5 Steps)</div>
        </div>
        <div className="p-5">
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1976D2] text-white flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-[#333] mb-2">Prepare Pilot Test</div>
                <div className="text-sm text-[#666] mb-2">
                  Download the MCQ Test Booklet and Answer Sheet Template. Print 30-50 copies (recommended sample
                  size: 30-50 participants from target population).
                </div>
                <div className="text-xs text-[#999] bg-[#FAFAFA] p-2 rounded border border-[#E0E0E0]">
                  <strong>Best Practice:</strong> Include participants with varying skill levels (high, medium,
                  low) for better discrimination analysis.
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1976D2] text-white flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-[#333] mb-2">Administer Test</div>
                <div className="text-sm text-[#666] mb-2">
                  Conduct the pilot test under controlled conditions. Allow 45-60 minutes. Ensure no coaching or
                  collaboration.
                </div>
                <div className="text-xs text-[#999] bg-[#FAFAFA] p-2 rounded border border-[#E0E0E0]">
                  <strong>Tip:</strong> Record test duration and any questions participants found confusing for
                  later revision.
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1976D2] text-white flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-[#333] mb-2">Score Answer Sheets</div>
                <div className="text-sm text-[#666] mb-2">
                  Use the Answer Key to score all answer sheets. Calculate total score for each participant.
                </div>
                <div className="text-xs text-[#999] bg-[#FAFAFA] p-2 rounded border border-[#E0E0E0]">
                  <strong>Formula:</strong> Total Score = Number of Correct Answers ÷ 50 × 100
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F57C00] text-white flex items-center justify-center font-bold">
                4
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-[#333] mb-2">Conduct Item Analysis</div>
                <div className="text-sm text-[#666] mb-2">
                  Use the Excel Analysis Template to calculate:
                </div>
                <ul className="text-sm text-[#666] ml-5 space-y-1 list-disc mb-2">
                  <li>
                    <strong>Difficulty Index (P):</strong> % of participants who answered correctly (Target: 0.30
                    - 0.80)
                  </li>
                  <li>
                    <strong>Discrimination Index (D):</strong> Difference between high and low scorers (Target:
                    ≥0.30)
                  </li>
                  <li>
                    <strong>Distractor Analysis:</strong> Check if all options are plausible
                  </li>
                </ul>
                <div className="text-xs text-[#999] bg-[#FFFDE7] p-2 rounded border border-[#FFE082]">
                  ⚠️ <strong>Red Flags:</strong> Items with P {'<'} 0.20 (too difficult), P {'>'} 0.90 (too
                  easy), or D {'<'} 0.20 (poor discrimination) should be revised or removed.
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2E7D32] text-white flex items-center justify-center font-bold">
                5
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-[#333] mb-2">Revise and Finalize</div>
                <div className="text-sm text-[#666] mb-2">
                  Based on analysis results, revise problematic items. Replace items with poor psychometric
                  properties. Re-test if significant changes are made.
                </div>
                <div className="text-xs text-[#999] bg-[#E8F5E9] p-2 rounded border border-[#A5D6A7]">
                  ✅ <strong>Final Pool:</strong> Aim for 50 quality items with good difficulty and
                  discrimination indices before distribution into 5 packages.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Criteria Table */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <div className="font-semibold text-[15px] text-[#333]">Item Quality Criteria</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#E0E0E0]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#666]">Metric</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#666]">Formula</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#666]">Target Range</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#666]">Action if Out of Range</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#F0F0F0]">
                <td className="px-4 py-3 text-sm font-medium">Difficulty Index (P)</td>
                <td className="px-4 py-3 text-xs text-[#666]">
                  P = Correct responses ÷ Total responses
                </td>
                <td className="px-4 py-3 text-sm text-[#2E7D32]">0.30 - 0.80</td>
                <td className="px-4 py-3 text-xs text-[#666]">
                  Revise wording or adjust complexity
                </td>
              </tr>
              <tr className="border-b border-[#F0F0F0]">
                <td className="px-4 py-3 text-sm font-medium">Discrimination Index (D)</td>
                <td className="px-4 py-3 text-xs text-[#666]">
                  D = P(high) - P(low)
                </td>
                <td className="px-4 py-3 text-sm text-[#2E7D32]">≥ 0.30</td>
                <td className="px-4 py-3 text-xs text-[#666]">
                  Check distractors, revise or remove
                </td>
              </tr>
              <tr className="border-b border-[#F0F0F0]">
                <td className="px-4 py-3 text-sm font-medium">Distractor Effectiveness</td>
                <td className="px-4 py-3 text-xs text-[#666]">
                  Each distractor selected by ≥5%
                </td>
                <td className="px-4 py-3 text-sm text-[#2E7D32]">5% - 30%</td>
                <td className="px-4 py-3 text-xs text-[#666]">
                  Replace ineffective distractors
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={() => navigate('/mcq')}
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
        >
          ← Back to MCQ Editor
        </button>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0] transition-colors">
            📥 Download Pilot Test Package
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-[#2E7D32] text-white rounded text-sm font-medium hover:bg-[#1B5E20] transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
