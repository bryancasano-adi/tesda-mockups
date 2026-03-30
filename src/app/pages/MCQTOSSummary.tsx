import { useState } from 'react';
import { useNavigate } from 'react-router';

export function MCQTOSSummary() {
  const navigate = useNavigate();

  // Simulated TOS data auto-generated from MCQ items
  const tosData = [
    {
      unitTitle: 'Prepare and Maintain Tools and Equipment',
      learning: 20,
      process: 15,
      application: 10,
      total: 45,
    },
    {
      unitTitle: 'Perform Manual Metal Arc Welding',
      learning: 15,
      process: 20,
      application: 10,
      total: 45,
    },
    {
      unitTitle: 'Apply Safety Practices',
      learning: 5,
      process: 3,
      application: 2,
      total: 10,
    },
  ];

  const totals = {
    learning: tosData.reduce((sum, row) => sum + row.learning, 0),
    process: tosData.reduce((sum, row) => sum + row.process, 0),
    application: tosData.reduce((sum, row) => sum + row.application, 0),
    total: tosData.reduce((sum, row) => sum + row.total, 0),
  };

  return (
    <div className="p-6">
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › MCQ TOS Summary
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#333] mb-1">
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#C8E6C9] text-[#1B5E20] mr-2">
            PHASE 2
          </span>
          MCQ Table of Specifications (TOS) Summary
        </h1>
        <p className="text-sm text-[#666]">Auto-generated from 50 MCQ items • Reference-only document</p>
      </div>

      {/* Info Banner */}
      <div className="bg-[#E3F2FD] border border-[#90CAF9] rounded p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-xl">ℹ️</span>
          <div className="flex-1 text-sm text-[#1565C0]">
            <strong>Auto-Generated TOS:</strong> This table is automatically calculated from your 50 MCQ items
            based on their assigned unit competency and cognitive level tags. Any changes to MCQ items will
            automatically update this TOS. This is for <strong>reference and reconciliation only</strong> — the
            official TOS is generated per-package during Phase 3 distribution.
          </div>
        </div>
      </div>

      {/* TOS Table */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <div className="font-semibold text-[15px] text-[#333]">Master Pool TOS (50 Items)</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FAFAFA] border-b-2 border-[#E0E0E0]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#666]">
                  Unit of Competency / Unit Title
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#666]">
                  Learning<br />
                  (Recall/Knowledge)
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#666]">
                  Process<br />
                  (Comprehension)
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#666]">
                  Application<br />
                  (Problem-Solving)
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] bg-[#E8F5E9]">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {tosData.map((row, idx) => (
                <tr key={idx} className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
                  <td className="px-4 py-3 text-sm font-medium text-[#333]">{row.unitTitle}</td>
                  <td className="text-center px-4 py-3 text-sm text-[#666]">{row.learning}</td>
                  <td className="text-center px-4 py-3 text-sm text-[#666]">{row.process}</td>
                  <td className="text-center px-4 py-3 text-sm text-[#666]">{row.application}</td>
                  <td className="text-center px-4 py-3 text-sm font-bold text-[#1976D2] bg-[#F5FAFF]">
                    {row.total}
                  </td>
                </tr>
              ))}
              {/* Totals Row */}
              <tr className="bg-[#E8F5E9] border-t-2 border-[#2E7D32]">
                <td className="px-4 py-3 text-sm font-bold text-[#1B5E20]">Total Number of Items</td>
                <td className="text-center px-4 py-3 text-sm font-bold text-[#1B5E20]">{totals.learning}</td>
                <td className="text-center px-4 py-3 text-sm font-bold text-[#1B5E20]">{totals.process}</td>
                <td className="text-center px-4 py-3 text-sm font-bold text-[#1B5E20]">{totals.application}</td>
                <td className="text-center px-4 py-3 text-lg font-bold text-[#2E7D32]">{totals.total}</td>
              </tr>
              {/* Percentage Row */}
              <tr className="bg-[#F1F8F4]">
                <td className="px-4 py-3 text-sm font-semibold text-[#666]">Percentage (%)</td>
                <td className="text-center px-4 py-3 text-sm text-[#666]">
                  {Math.round((totals.learning / totals.total) * 100)}%
                </td>
                <td className="text-center px-4 py-3 text-sm text-[#666]">
                  {Math.round((totals.process / totals.total) * 100)}%
                </td>
                <td className="text-center px-4 py-3 text-sm text-[#666]">
                  {Math.round((totals.application / totals.total) * 100)}%
                </td>
                <td className="text-center px-4 py-3 text-sm font-bold text-[#2E7D32]">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Reconciliation Check */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <div className="font-semibold text-[15px] text-[#333]">Reconciliation Check</div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#E8F5E9] border border-[#A5D6A7] rounded">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">✅</span>
                <div className="font-semibold text-sm text-[#2E7D32]">Item Count Match</div>
              </div>
              <div className="text-xs text-[#1B5E20]">
                Total items in TOS ({totals.total}) matches MCQ pool count (50 items)
              </div>
            </div>

            <div className="p-4 bg-[#E8F5E9] border border-[#A5D6A7] rounded">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">✅</span>
                <div className="font-semibold text-sm text-[#2E7D32]">Coverage Check</div>
              </div>
              <div className="text-xs text-[#1B5E20]">
                All 3 unit competencies covered • All cognitive levels represented
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-[#FFFDE7] border border-[#FFE082] rounded text-xs text-[#F57C00]">
            ⚠️ <strong>Note:</strong> This is the master pool TOS. During Phase 3 distribution, each of the 5
            packages will receive a subset of items and generate its own per-package TOS automatically.
          </div>
        </div>
      </div>

      {/* Visual Distribution */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <div className="font-semibold text-[15px] text-[#333]">Cognitive Level Distribution</div>
        </div>
        <div className="p-5">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#666]">Learning / Recall</span>
                <span className="font-semibold text-[#1976D2]">
                  {totals.learning} items ({Math.round((totals.learning / totals.total) * 100)}%)
                </span>
              </div>
              <div className="h-4 bg-[#E0E0E0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1976D2]"
                  style={{ width: `${(totals.learning / totals.total) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#666]">Process / Comprehension</span>
                <span className="font-semibold text-[#F57C00]">
                  {totals.process} items ({Math.round((totals.process / totals.total) * 100)}%)
                </span>
              </div>
              <div className="h-4 bg-[#E0E0E0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F57C00]"
                  style={{ width: `${(totals.process / totals.total) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#666]">Application / Problem-Solving</span>
                <span className="font-semibold text-[#7B1FA2]">
                  {totals.application} items ({Math.round((totals.application / totals.total) * 100)}%)
                </span>
              </div>
              <div className="h-4 bg-[#E0E0E0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#7B1FA2]"
                  style={{ width: `${(totals.application / totals.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
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
          <button className="px-4 py-2 bg-white text-[#1976D2] border border-[#1976D2] rounded text-sm font-medium hover:bg-[#E3F2FD] transition-colors">
            Download TOS (PDF)
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
