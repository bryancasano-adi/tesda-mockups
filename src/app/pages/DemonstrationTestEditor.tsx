import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, CheckCircle } from 'lucide-react';
import { DemoTestPreviewModal } from '../components/DemoTestPreviewModal';

export function DemonstrationTestEditor() {
  const navigate = useNavigate();
  const [selectedSet, setSelectedSet] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('A');
  const [selectedTab, setSelectedTab] = useState<'tasks' | 'rubric' | 'tools'>('tasks');
  const [showPreview, setShowPreview] = useState(false);

  // Demo of 5 variations status - now with state management
  const [setStatuses, setSetStatuses] = useState<{
    [key in 'A' | 'B' | 'C' | 'D' | 'E']: 'complete' | 'draft';
  }>({
    A: 'complete',
    B: 'complete',
    C: 'complete',
    D: 'draft',
    E: 'draft',
  });

  const toggleSetCompletion = (set: 'A' | 'B' | 'C' | 'D' | 'E') => {
    setSetStatuses((prev) => ({
      ...prev,
      [set]: prev[set] === 'complete' ? 'draft' : 'complete',
    }));
  };

  return (
    <div className="p-6">
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › Demonstration Test
      </div>

      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#333] mb-1">Demonstration Test (5 Variations)</h1>
          <p className="text-sm text-[#666]">
            Qualification: Shielded Metal Arc Welding (SMAW) NC II
          </p>
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32]">
          Finalized
        </span>
      </div>

      {/* Info Banner */}
      <div className="bg-[#E3F2FD] border border-[#90CAF9] rounded p-4 mb-5">
        <div className="flex items-start gap-3">
          <span className="text-xl">ℹ️</span>
          <div className="flex-1 text-sm text-[#1565C0]">
            <strong>5 Task Variations Required (Sets A-E)</strong>
            <div className="mt-1 text-xs">
              All 5 variations assess the SAME Performance Criteria and use a single 100-point rubric.
              Variations differ only in materials, tools, methods, scenarios, or conditions - NOT in
              difficulty or PCs covered. Packaged as Sets A-E for different assessment centers.
            </div>
          </div>
        </div>
      </div>

      {/* Set Selector */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6 p-5">
        <div className="text-sm font-semibold text-[#333] mb-3">Select Variation Set:</div>
        <div className="flex gap-3">
          {(['A', 'B', 'C', 'D', 'E'] as const).map((set) => (
            <button
              key={set}
              onClick={() => setSelectedSet(set)}
              className={`flex-1 px-4 py-3 rounded border-2 transition-all ${
                selectedSet === set
                  ? 'border-[#1976D2] bg-[#E3F2FD] text-[#1976D2]'
                  : 'border-[#E0E0E0] bg-white text-[#666] hover:border-[#90CAF9]'
              }`}
            >
              <div className="font-bold text-lg">Set {set}</div>
              <div className="text-xs mt-1">
                {setStatuses[set] === 'complete' ? (
                  <span className="text-[#2E7D32]">✅ Complete</span>
                ) : (
                  <span className="text-[#F57C00]">⚠️ Draft</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="flex border-b border-[#E0E0E0]">
          <button
            onClick={() => setSelectedTab('tasks')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              selectedTab === 'tasks'
                ? 'text-[#1976D2] border-[#1976D2] bg-[#F5FAFF]'
                : 'text-[#666] border-transparent hover:bg-[#FAFAFA]'
            }`}
          >
            Task Instructions (Set {selectedSet})
          </button>
          <button
            onClick={() => setSelectedTab('rubric')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              selectedTab === 'rubric'
                ? 'text-[#1976D2] border-[#1976D2] bg-[#F5FAFF]'
                : 'text-[#666] border-transparent hover:bg-[#FAFAFA]'
            }`}
          >
            Performance Rubric (Single - All Sets)
          </button>
          <button
            onClick={() => setSelectedTab('tools')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              selectedTab === 'tools'
                ? 'text-[#1976D2] border-[#1976D2] bg-[#F5FAFF]'
                : 'text-[#666] border-transparent hover:bg-[#FAFAFA]'
            }`}
          >
            Tools & Equipment (Set {selectedSet})
          </button>
        </div>

        <div className="p-6">
          {/* TAB: TASK INSTRUCTIONS */}
          {selectedTab === 'tasks' && (
            <div className="space-y-6">
              <div className="border-2 border-[#1976D2] rounded-lg p-5 bg-[#F5FAFF]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-base text-[#333] mb-1">
                      Set {selectedSet}: Perform Plate-to-Plate Welding
                    </h3>
                    <div className="text-xs text-[#666]">
                      Time Allotted:{' '}
                      <input
                        type="number"
                        className="w-12 px-2 py-1 border border-[#E0E0E0] rounded mx-1"
                        defaultValue={4}
                      />{' '}
                      hours
                      <input
                        type="number"
                        className="w-12 px-2 py-1 border border-[#E0E0E0] rounded mx-1"
                        defaultValue={0}
                      />{' '}
                      minutes
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-xs text-[#1976D2] hover:underline">Edit</button>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-[#666] uppercase mb-2">
                    Task Instructions:
                  </div>
                  <div className="p-4 bg-white rounded border border-[#E0E0E0] text-sm text-[#666] leading-relaxed">
                    <p className="mb-3">
                      <strong>You are required to perform plate-to-plate welding using SMAW process.</strong>
                    </p>
                    <ol className="list-decimal ml-5 space-y-2">
                      <li>
                        Prepare the work area and ensure compliance with safety standards
                        {selectedSet === 'A' && ' using the provided A36 steel plates'}
                        {selectedSet === 'B' && ' using the provided mild steel plates'}
                        {selectedSet === 'C' && ' with stainless steel base materials'}
                        {selectedSet === 'D' && ' using carbon steel workpieces'}
                        {selectedSet === 'E' && ' with low-alloy steel plates'}
                      </li>
                      <li>
                        Select and set up the appropriate electrode{' '}
                        {selectedSet === 'A' && '(E6013, 3.2mm diameter)'}
                        {selectedSet === 'B' && '(E6013, 2.5mm diameter)'}
                        {selectedSet === 'C' && '(E308L-16 for stainless)'}
                        {selectedSet === 'D' && '(E7018, 3.2mm diameter)'}
                        {selectedSet === 'E' && '(E6013, 4.0mm diameter)'}
                      </li>
                      <li>Clean and prepare the base metals according to WPS requirements</li>
                      <li>Perform the root pass according to WPS specifications</li>
                      <li>Complete the fill and cover passes ensuring proper penetration</li>
                      <li>Conduct visual inspection and clean the work area</li>
                    </ol>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xs font-semibold text-[#666] uppercase mb-2">Expected Output:</div>
                  <div className="p-3 bg-white rounded border border-[#E0E0E0] text-sm text-[#666]">
                    A properly welded plate-to-plate joint meeting WPS acceptance criteria with no visible
                    defects, proper bead appearance, and complete penetration.
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xs font-semibold text-[#666] uppercase mb-2">
                    Assessment Conditions:
                  </div>
                  <div className="p-3 bg-white rounded border border-[#E0E0E0] text-sm text-[#666]">
                    <ul className="list-disc ml-5 space-y-1">
                      <li>
                        Duration: 4 hours (including setup, execution, and cleanup)
                      </li>
                      <li>Setting: Welding workshop with adequate ventilation</li>
                      <li>Safety: Full PPE required throughout assessment</li>
                      <li>Observation: Assessor will observe entire process without interference</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-xs text-[#999] italic p-3 bg-[#FAFAFA] rounded border border-[#E0E0E0]">
                ℹ️ Note: This is Set {selectedSet} out of 5 variations. Each variation uses different materials
                or equipment but assesses the same Performance Criteria using the shared 100-point rubric.
              </div>
            </div>
          )}

          {/* TAB: PERFORMANCE RUBRIC (Single for all sets) */}
          {selectedTab === 'rubric' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#FFFDE7] border border-[#FFE082] rounded">
                <div className="flex items-start gap-2">
                  <span className="text-lg">⚠️</span>
                  <div className="flex-1 text-sm text-[#F57C00]">
                    <strong>Single Rubric for All 5 Variations</strong>
                    <div className="text-xs mt-1">
                      This 100-point rubric is used for ALL Sets (A-E). The criteria map directly to
                      Performance Criteria from the Evidence Plan and remain consistent across all variations.
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <div className="text-sm font-medium text-[#333] mb-1">
                    Performance Standards - 100 Point Rubric
                  </div>
                  <div className="text-xs text-[#666]">
                    Used for scoring all 5 task variations (Sets A, B, C, D, E)
                  </div>
                </div>

                <div className="overflow-x-auto border border-[#E0E0E0] rounded">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#FAFAFA]">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-12">
                          No.
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                          Performance Criteria / Clustered PC
                        </th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-24">
                          Max Points
                        </th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-24">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-[#FAFAFA]">
                        <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">1</td>
                        <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                          Electrode identification and selection according to WPS
                        </td>
                        <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                          <input
                            type="number"
                            className="w-16 px-2 py-1 border border-[#E0E0E0] rounded text-sm text-center"
                            defaultValue={15}
                          />
                        </td>
                        <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                          <button className="text-xs text-[#1976D2] hover:underline mx-1">✏️</button>
                          <button className="text-xs text-[#C62828] hover:underline mx-1">🗑️</button>
                        </td>
                      </tr>
                      <tr className="bg-[#FFFDE7] hover:bg-[#FFF9C4]">
                        <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">2</td>
                        <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                          Root pass execution according to WPS{' '}
                          <span className="text-[#F57C00] font-bold">*</span>
                        </td>
                        <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                          <input
                            type="number"
                            className="w-16 px-2 py-1 border border-[#E0E0E0] rounded text-sm text-center"
                            defaultValue={25}
                          />
                        </td>
                        <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                          <button className="text-xs text-[#1976D2] hover:underline mx-1">✏️</button>
                          <button className="text-xs text-[#C62828] hover:underline mx-1">🗑️</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-[#FAFAFA]">
                        <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">3</td>
                        <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                          Fill and cover pass quality
                        </td>
                        <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                          <input
                            type="number"
                            className="w-16 px-2 py-1 border border-[#E0E0E0] rounded text-sm text-center"
                            defaultValue={20}
                          />
                        </td>
                        <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                          <button className="text-xs text-[#1976D2] hover:underline mx-1">✏️</button>
                          <button className="text-xs text-[#C62828] hover:underline mx-1">🗑️</button>
                        </td>
                      </tr>
                      <tr className="bg-[#FFFDE7] hover:bg-[#FFF9C4]">
                        <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">4</td>
                        <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                          Visual inspection and acceptance criteria{' '}
                          <span className="text-[#F57C00] font-bold">*</span>
                        </td>
                        <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                          <input
                            type="number"
                            className="w-16 px-2 py-1 border border-[#E0E0E0] rounded text-sm text-center"
                            defaultValue={20}
                          />
                        </td>
                        <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                          <button className="text-xs text-[#1976D2] hover:underline mx-1">✏️</button>
                          <button className="text-xs text-[#C62828] hover:underline mx-1">🗑️</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-[#FAFAFA]">
                        <td className="px-4 py-3 text-sm">5</td>
                        <td className="px-4 py-3 text-sm">Safety compliance and work area management</td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="number"
                            className="w-16 px-2 py-1 border border-[#E0E0E0] rounded text-sm text-center"
                            defaultValue={20}
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button className="text-xs text-[#1976D2] hover:underline mx-1">✏️</button>
                          <button className="text-xs text-[#C62828] hover:underline mx-1">🗑️</button>
                        </td>
                      </tr>
                      <tr className="bg-[#E8F5E9]">
                        <td colSpan={2} className="px-4 py-3 text-sm font-bold text-right">
                          TOTAL POINTS
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-center">100</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <button className="mt-4 px-4 py-2 bg-white text-[#1976D2] border border-[#1976D2] rounded text-sm font-medium hover:bg-[#E3F2FD] transition-colors">
                  + Add Criterion
                </button>

                <div className="mt-6 p-4 bg-[#E8F5E9] border border-[#A5D6A7] rounded">
                  <div className="font-semibold text-sm text-[#2E7D32] mb-2">Competency Decision Rules:</div>
                  <ul className="text-sm text-[#1B5E20] space-y-1 ml-5 list-disc">
                    <li>
                      <strong>Competent (C)</strong>: Total score ≥ 75/100 AND all critical PCs (*) demonstrated
                      AND no unsafe practice observed
                    </li>
                    <li>
                      <strong>Not Yet Competent (NYC)</strong>: Score {'<'} 75 OR failure to demonstrate a
                      critical PC OR unsafe practice observed
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB: TOOLS & EQUIPMENT */}
          {selectedTab === 'tools' && (
            <div className="space-y-6">
              <div className="p-3 bg-[#E3F2FD] border border-[#90CAF9] rounded text-sm text-[#1565C0]">
                ℹ️ Tools and equipment list for <strong>Set {selectedSet}</strong>. Each variation may have
                different materials or tools while maintaining equivalent complexity.
              </div>

              <div>
                <h3 className="font-semibold text-sm text-[#333] mb-3">A. SUPPLIES AND MATERIALS</h3>
                <div className="overflow-x-auto border border-[#E0E0E0] rounded mb-4">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#FAFAFA]">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-12">
                          No.
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                          Item
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                          Specs
                        </th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-20">
                          Qty
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-20">
                          Unit
                        </th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-20">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-[#FAFAFA]">
                        <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">1</td>
                        <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">Steel Plates</td>
                        <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                          {selectedSet === 'A' && 'A36, 6mm x 150mm x 200mm'}
                          {selectedSet === 'B' && 'Mild Steel, 6mm x 150mm x 200mm'}
                          {selectedSet === 'C' && 'Stainless 304, 6mm x 150mm x 200mm'}
                          {selectedSet === 'D' && 'Carbon Steel, 8mm x 150mm x 200mm'}
                          {selectedSet === 'E' && 'Low-Alloy, 6mm x 150mm x 200mm'}
                        </td>
                        <td className="px-4 py-3 text-sm text-center border-b border-[#F0F0F0]">2</td>
                        <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">pieces</td>
                        <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                          <button className="text-xs text-[#C62828] hover:underline">🗑️</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-[#FAFAFA]">
                        <td className="px-4 py-3 text-sm">2</td>
                        <td className="px-4 py-3 text-sm">Welding Electrode</td>
                        <td className="px-4 py-3 text-sm">
                          {selectedSet === 'A' && 'E6013, 3.2mm diameter'}
                          {selectedSet === 'B' && 'E6013, 2.5mm diameter'}
                          {selectedSet === 'C' && 'E308L-16, 3.2mm diameter'}
                          {selectedSet === 'D' && 'E7018, 3.2mm diameter'}
                          {selectedSet === 'E' && 'E6013, 4.0mm diameter'}
                        </td>
                        <td className="px-4 py-3 text-sm text-center">1</td>
                        <td className="px-4 py-3 text-sm">kg</td>
                        <td className="px-4 py-3 text-center">
                          <button className="text-xs text-[#C62828] hover:underline">🗑️</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button className="px-4 py-2 bg-white text-[#1976D2] border border-[#1976D2] rounded text-sm font-medium hover:bg-[#E3F2FD] transition-colors">
                  + Add Supply/Material
                </button>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-[#333] mb-3">B. TOOLS AND EQUIPMENT</h3>
                <div className="overflow-x-auto border border-[#E0E0E0] rounded mb-4">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#FAFAFA]">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-12">
                          No.
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                          Item
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                          Specs
                        </th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-20">
                          Qty
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-20">
                          Unit
                        </th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-20">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-[#FAFAFA]">
                        <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">1</td>
                        <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">SMAW Machine</td>
                        <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                          AC/DC, 200A minimum
                        </td>
                        <td className="px-4 py-3 text-sm text-center border-b border-[#F0F0F0]">1</td>
                        <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">unit</td>
                        <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                          <button className="text-xs text-[#C62828] hover:underline">🗑️</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-[#FAFAFA]">
                        <td className="px-4 py-3 text-sm">2</td>
                        <td className="px-4 py-3 text-sm">Angle Grinder</td>
                        <td className="px-4 py-3 text-sm">4.5 inch</td>
                        <td className="px-4 py-3 text-sm text-center">1</td>
                        <td className="px-4 py-3 text-sm">unit</td>
                        <td className="px-4 py-3 text-center">
                          <button className="text-xs text-[#C62828] hover:underline">🗑️</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button className="px-4 py-2 bg-white text-[#1976D2] border border-[#1976D2] rounded text-sm font-medium hover:bg-[#E3F2FD] transition-colors">
                  + Add Tool/Equipment
                </button>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-[#333] mb-3">C. FACILITIES</h3>
                <div className="grid grid-cols-2 gap-4 p-4 bg-[#FAFAFA] rounded border border-[#E0E0E0]">
                  <div>
                    <label className="block text-xs font-medium text-[#666] mb-2">
                      Assessment Area (sqm)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                      defaultValue={25}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#666] mb-2">Office Area (sqm)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                      defaultValue={10}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
        >
          ← Back to Dashboard
        </button>
        <button
          onClick={() => toggleSetCompletion(selectedSet)}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2 ${
            setStatuses[selectedSet] === 'complete'
              ? 'bg-white text-[#666] border border-[#E0E0E0] hover:bg-[#F5F5F5]'
              : 'bg-[#2E7D32] text-white hover:bg-[#1B5E20]'
          }`}
        >
          <CheckCircle size={16} />
          {setStatuses[selectedSet] === 'complete' ? `Unmark Set ${selectedSet}` : `Mark Set ${selectedSet} as Complete`}
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
        <DemoTestPreviewModal
          selectedSet={selectedSet}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}