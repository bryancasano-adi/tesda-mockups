import { useState } from 'react';
import { useNavigate } from 'react-router';

export function RatingSheetView() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState<'draft' | 'finalized'>('draft');
  const [selectedTab, setSelectedTab] = useState<'demo' | 'oral' | 'written' | 'conversion'>('demo');

  return (
    <div className="p-6">
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › Rating Sheet
      </div>

      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#333] mb-1">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#FFF3E0] text-[#E65100] mr-2">
              PHASE 3
            </span>
            Rating Sheet (Rubrics)
          </h1>
          <p className="text-sm text-[#666]">Compiled Scoring Guide - Auto-generated from Phase 2 Tests</p>
        </div>
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            status === 'finalized' ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#FFF3E0] text-[#F57C00]'
          }`}
        >
          {status === 'finalized' ? '✅ Finalized' : '⚠️ Draft'}
        </span>
      </div>

      {/* Edit Mode Toggle & Actions */}
      <div className="bg-white border border-[#E0E0E0] rounded p-4 mb-5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm text-[#666]">Edit Mode:</span>
            <div className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={editMode}
                onChange={() => setEditMode(!editMode)}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-[#E0E0E0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1976D2]"></div>
            </div>
            <span className={`text-sm font-medium ${editMode ? 'text-[#1976D2]' : 'text-[#999]'}`}>
              {editMode ? 'ON' : 'OFF'}
            </span>
          </label>
          {!editMode && (
            <span className="text-xs text-[#999] bg-[#FAFAFA] px-2 py-1 rounded">
              🔒 Most content auto-compiled from Phase 2
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
            Download Preview
          </button>
          {status === 'draft' && (
            <button
              onClick={() => setStatus('finalized')}
              className="px-4 py-2 bg-[#2E7D32] text-white rounded text-sm font-medium hover:bg-[#1B5E20] transition-colors"
            >
              Finalize Document
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-[#E0E0E0] rounded">
        <div className="flex border-b border-[#E0E0E0]">
          <button
            onClick={() => setSelectedTab('demo')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              selectedTab === 'demo'
                ? 'text-[#1976D2] border-[#1976D2] bg-[#F5FAFF]'
                : 'text-[#666] border-transparent hover:bg-[#FAFAFA]'
            }`}
          >
            Section A: Demonstration (S/NS + Scorecard)
          </button>
          <button
            onClick={() => setSelectedTab('oral')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              selectedTab === 'oral'
                ? 'text-[#1976D2] border-[#1976D2] bg-[#F5FAFF]'
                : 'text-[#666] border-transparent hover:bg-[#FAFAFA]'
            }`}
          >
            Section B: Oral Questions + Answers
          </button>
        </div>

        <div className="p-6">
          {/* Demonstration Scoring */}
          {selectedTab === 'demo' && (
            <div>
              <div className="mb-4 p-3 bg-[#E3F2FD] border border-[#90CAF9] rounded text-sm text-[#1565C0]">
                🔒 Auto-compiled from Demonstration Test rubrics (Phase 2)
              </div>

              <h3 className="font-semibold text-sm text-[#333] mb-3">
                TASK A: Perform Plate-to-Plate Welding
              </h3>

              <div className="overflow-x-auto border border-[#E0E0E0] rounded">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#FAFAFA]">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-12">
                        No.
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                        Performance Criteria
                      </th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-24">
                        Points
                      </th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-24">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-[#FAFAFA]">
                      <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">1</td>
                      <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                        Electrode identification and selection according to WPS
                      </td>
                      <td className="px-4 py-3 text-center text-sm border-b border-[#F0F0F0]">15</td>
                      <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                        <input
                          type="number"
                          className="w-16 px-2 py-1 border border-[#E0E0E0] rounded text-sm text-center"
                          placeholder="0"
                          max={15}
                        />
                      </td>
                    </tr>
                    <tr className="bg-[#FFFDE7] hover:bg-[#FFF9C4]">
                      <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">2</td>
                      <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                        Root pass execution according to WPS{' '}
                        <span className="text-[#F57C00] font-bold">*</span>
                      </td>
                      <td className="px-4 py-3 text-center text-sm border-b border-[#F0F0F0]">25</td>
                      <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                        <input
                          type="number"
                          className="w-16 px-2 py-1 border border-[#E0E0E0] rounded text-sm text-center"
                          placeholder="0"
                          max={25}
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-[#FAFAFA]">
                      <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">3</td>
                      <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">Fill and cover pass quality</td>
                      <td className="px-4 py-3 text-center text-sm border-b border-[#F0F0F0]">20</td>
                      <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                        <input
                          type="number"
                          className="w-16 px-2 py-1 border border-[#E0E0E0] rounded text-sm text-center"
                          placeholder="0"
                          max={20}
                        />
                      </td>
                    </tr>
                    <tr className="bg-[#FFFDE7] hover:bg-[#FFF9C4]">
                      <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">4</td>
                      <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                        Visual inspection and acceptance criteria{' '}
                        <span className="text-[#F57C00] font-bold">*</span>
                      </td>
                      <td className="px-4 py-3 text-center text-sm border-b border-[#F0F0F0]">20</td>
                      <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                        <input
                          type="number"
                          className="w-16 px-2 py-1 border border-[#E0E0E0] rounded text-sm text-center"
                          placeholder="0"
                          max={20}
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-[#FAFAFA]">
                      <td className="px-4 py-3 text-sm">5</td>
                      <td className="px-4 py-3 text-sm">Safety compliance and work area management</td>
                      <td className="px-4 py-3 text-center text-sm">20</td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="number"
                          className="w-16 px-2 py-1 border border-[#E0E0E0] rounded text-sm text-center"
                          placeholder="0"
                          max={20}
                        />
                      </td>
                    </tr>
                    <tr className="bg-[#E8F5E9]">
                      <td colSpan={2} className="px-4 py-3 text-sm font-bold text-right">
                        TOTAL SCORE
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-center">100</td>
                      <td className="px-4 py-3 text-sm font-bold text-center">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Oral Questioning Scoring */}
          {selectedTab === 'oral' && (
            <div>
              <div className="mb-4 p-3 bg-[#E3F2FD] border border-[#90CAF9] rounded text-sm text-[#1565C0]">
                🔒 Auto-compiled from Questioning Tool (Phase 2) - Binary Scoring (S/NS)
              </div>

              <h3 className="font-semibold text-sm text-[#333] mb-3">ORAL QUESTIONING SCORING GUIDE</h3>

              <div className="overflow-x-auto border border-[#E0E0E0] rounded">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#FAFAFA]">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-12">
                        No.
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                        Question Topic
                      </th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-32">
                        Result
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      'WPS interpretation and electrode selection',
                      'Root pass procedure and quality standards',
                      'Defect identification and repair methods',
                      'Safety procedures and PPE requirements',
                      'Visual inspection acceptance criteria',
                    ].map((topic, index) => (
                      <tr key={index} className="hover:bg-[#FAFAFA]">
                        <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">{index + 1}</td>
                        <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">{topic}</td>
                        <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                          <select className="px-3 py-1 border border-[#E0E0E0] rounded text-sm">
                            <option value="">-</option>
                            <option value="S">✅ S (Satisfactory)</option>
                            <option value="NS">❌ NS (Not Satisfactory)</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 bg-[#FFFDE7] border border-[#FFE082] rounded text-sm">
                <strong>Scoring:</strong> Candidate must achieve "S" (Satisfactory) on all questions to pass the
                oral questioning component.
              </div>
            </div>
          )}

          {/* Written Test Answer Sheet */}
          {selectedTab === 'written' && (
            <div>
              <div className="mb-4 p-3 bg-[#E3F2FD] border border-[#90CAF9] rounded text-sm text-[#1565C0]">
                🔒 Auto-compiled from Written Test (Phase 2)
              </div>

              <h3 className="font-semibold text-sm text-[#333] mb-3">WRITTEN TEST ANSWER SHEET</h3>

              <div className="grid grid-cols-3 gap-4">
                {/* Set A */}
                <div className="border border-[#E0E0E0] rounded p-4">
                  <h4 className="font-semibold text-sm text-[#333] mb-3">SET A</h4>
                  <div className="grid grid-cols-5 gap-2 text-xs">
                    {Array.from({ length: 30 }, (_, i) => (
                      <div key={i} className="text-center">
                        <div className="text-[#999]">{i + 1}.</div>
                        <div className="font-semibold">A</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Set B */}
                <div className="border border-[#E0E0E0] rounded p-4">
                  <h4 className="font-semibold text-sm text-[#333] mb-3">SET B</h4>
                  <div className="grid grid-cols-5 gap-2 text-xs">
                    {Array.from({ length: 30 }, (_, i) => (
                      <div key={i} className="text-center">
                        <div className="text-[#999]">{i + 1}.</div>
                        <div className="font-semibold">B</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Set C */}
                <div className="border border-[#E0E0E0] rounded p-4">
                  <h4 className="font-semibold text-sm text-[#333] mb-3">SET C</h4>
                  <div className="grid grid-cols-5 gap-2 text-xs">
                    {Array.from({ length: 30 }, (_, i) => (
                      <div key={i} className="text-center">
                        <div className="text-[#999]">{i + 1}.</div>
                        <div className="font-semibold">C</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Score Conversion Table */}
          {selectedTab === 'conversion' && (
            <div>
              <h3 className="font-semibold text-sm text-[#333] mb-3">SCORE CONVERSION TABLES</h3>

              <div className="space-y-6">
                {/* Demonstration Score Conversion */}
                <div>
                  <h4 className="text-sm font-semibold text-[#666] mb-2">Demonstration Test</h4>
                  <div className="overflow-x-auto border border-[#E0E0E0] rounded">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[#FAFAFA]">
                          <th className="text-center px-4 py-2 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                            Raw Score
                          </th>
                          <th className="text-center px-4 py-2 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                            Percentage
                          </th>
                          <th className="text-center px-4 py-2 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                            Rating
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-[#FAFAFA]">
                          <td className="px-4 py-2 text-sm text-center border-b border-[#F0F0F0]">90-100</td>
                          <td className="px-4 py-2 text-sm text-center border-b border-[#F0F0F0]">90-100%</td>
                          <td className="px-4 py-2 text-sm text-center border-b border-[#F0F0F0]">
                            Outstanding
                          </td>
                        </tr>
                        <tr className="hover:bg-[#FAFAFA]">
                          <td className="px-4 py-2 text-sm text-center border-b border-[#F0F0F0]">80-89</td>
                          <td className="px-4 py-2 text-sm text-center border-b border-[#F0F0F0]">80-89%</td>
                          <td className="px-4 py-2 text-sm text-center border-b border-[#F0F0F0]">
                            Very Satisfactory
                          </td>
                        </tr>
                        <tr className="bg-[#E8F5E9] hover:bg-[#C8E6C9]">
                          <td className="px-4 py-2 text-sm text-center border-b border-[#F0F0F0]">75-79</td>
                          <td className="px-4 py-2 text-sm text-center border-b border-[#F0F0F0]">75-79%</td>
                          <td className="px-4 py-2 text-sm text-center font-semibold border-b border-[#F0F0F0]">
                            Satisfactory (PASSING)
                          </td>
                        </tr>
                        <tr className="bg-[#FFEBEE] hover:bg-[#FFCDD2]">
                          <td className="px-4 py-2 text-sm text-center">0-74</td>
                          <td className="px-4 py-2 text-sm text-center">0-74%</td>
                          <td className="px-4 py-2 text-sm text-center font-semibold text-[#C62828]">
                            Not Yet Competent
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Written Test Score Conversion */}
                <div>
                  <h4 className="text-sm font-semibold text-[#666] mb-2">Written Test (30 items)</h4>
                  <div className="overflow-x-auto border border-[#E0E0E0] rounded">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[#FAFAFA]">
                          <th className="text-center px-4 py-2 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                            Correct Answers
                          </th>
                          <th className="text-center px-4 py-2 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                            Percentage
                          </th>
                          <th className="text-center px-4 py-2 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                            Rating
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-[#FAFAFA]">
                          <td className="px-4 py-2 text-sm text-center border-b border-[#F0F0F0]">27-30</td>
                          <td className="px-4 py-2 text-sm text-center border-b border-[#F0F0F0]">90-100%</td>
                          <td className="px-4 py-2 text-sm text-center border-b border-[#F0F0F0]">
                            Outstanding
                          </td>
                        </tr>
                        <tr className="hover:bg-[#FAFAFA]">
                          <td className="px-4 py-2 text-sm text-center border-b border-[#F0F0F0]">24-26</td>
                          <td className="px-4 py-2 text-sm text-center border-b border-[#F0F0F0]">80-87%</td>
                          <td className="px-4 py-2 text-sm text-center border-b border-[#F0F0F0]">
                            Very Satisfactory
                          </td>
                        </tr>
                        <tr className="bg-[#E8F5E9] hover:bg-[#C8E6C9]">
                          <td className="px-4 py-2 text-sm text-center border-b border-[#F0F0F0]">23</td>
                          <td className="px-4 py-2 text-sm text-center border-b border-[#F0F0F0]">77%</td>
                          <td className="px-4 py-2 text-sm text-center font-semibold border-b border-[#F0F0F0]">
                            Satisfactory (PASSING)
                          </td>
                        </tr>
                        <tr className="bg-[#FFEBEE] hover:bg-[#FFCDD2]">
                          <td className="px-4 py-2 text-sm text-center">0-22</td>
                          <td className="px-4 py-2 text-sm text-center">0-73%</td>
                          <td className="px-4 py-2 text-sm text-center font-semibold text-[#C62828]">
                            Not Yet Competent
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
        >
          ← Back to Dashboard
        </button>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
            Save Draft
          </button>
          <button className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0] transition-colors">
            Export to XLSX
          </button>
        </div>
      </div>
    </div>
  );
}