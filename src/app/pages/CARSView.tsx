import { useState } from 'react';
import { useNavigate } from 'react-router';

export function CARSView() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState<'draft' | 'finalized'>('draft');

  return (
    <div className="p-6">
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › CARS
      </div>

      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#333] mb-1">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#FFF3E0] text-[#E65100] mr-2">
              PHASE 3
            </span>
            CARS (Competency Assessment Results Summary)
          </h1>
          <p className="text-sm text-[#666]">Template Pre-filled with Qualification Info - Blank Fields for Results</p>
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
          <span className="text-xs text-[#999] bg-[#FAFAFA] px-2 py-1 rounded">
            Template structure with editable assessment results
          </span>
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

      {/* CARS Document */}
      <div className="bg-white border border-[#E0E0E0] rounded p-8">
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b-2 border-[#1976D2]">
          <div className="font-bold text-lg text-[#1E3A5F] mb-4">
            TECHNICAL EDUCATION AND SKILLS DEVELOPMENT AUTHORITY
          </div>
          <div className="text-xl font-bold text-[#1976D2] my-4">COMPETENCY ASSESSMENT RESULTS SUMMARY</div>
          <div className="text-sm text-[#666]">(CARS)</div>
        </div>

        {/* Qualification Information - Pre-filled */}
        <div className="mb-8 p-5 bg-[#FAFAFA] border border-[#E0E0E0] rounded">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xs text-[#999]">🔒</span>
            <h3 className="font-semibold text-sm text-[#666]">QUALIFICATION INFORMATION (Pre-filled)</h3>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#666] mb-1">Qualification Title:</label>
                <div className="text-sm text-[#333] font-medium">
                  Shielded Metal Arc Welding (SMAW) NC II
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#666] mb-1">Qualification Level:</label>
                <div className="text-sm text-[#333]">NC II</div>
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#666] mb-1">Units of Competency Covered:</label>
              <ul className="text-sm text-[#333] space-y-1 ml-5 list-decimal">
                <li>Perform Shielded Metal Arc Welding — Plate to Plate Joint</li>
                <li>Perform Shielded Metal Arc Welding — Pipe to Pipe Joint</li>
                <li>Repair Welds</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Candidate Information - Editable */}
        <div className="mb-8 p-5 border-2 border-[#1976D2] rounded">
          <div className="mb-3 flex items-center gap-2">
            {editMode && <span className="text-xs text-[#1976D2]">✏️</span>}
            <h3 className="font-semibold text-sm text-[#333]">CANDIDATE INFORMATION</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#666] mb-1">Last Name:</label>
              {editMode ? (
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  placeholder="Enter last name"
                />
              ) : (
                <div className="border-b border-[#999] pb-1 h-9"></div>
              )}
            </div>
            <div>
              <label className="block text-xs text-[#666] mb-1">First Name:</label>
              {editMode ? (
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  placeholder="Enter first name"
                />
              ) : (
                <div className="border-b border-[#999] pb-1 h-9"></div>
              )}
            </div>
            <div>
              <label className="block text-xs text-[#666] mb-1">Middle Name:</label>
              {editMode ? (
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  placeholder="Enter middle name"
                />
              ) : (
                <div className="border-b border-[#999] pb-1 h-9"></div>
              )}
            </div>
            <div>
              <label className="block text-xs text-[#666] mb-1">ULI/Trainee ID:</label>
              {editMode ? (
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  placeholder="Enter ULI"
                />
              ) : (
                <div className="border-b border-[#999] pb-1 h-9"></div>
              )}
            </div>
          </div>
        </div>

        {/* Assessment Details - Editable */}
        <div className="mb-8 p-5 border-2 border-[#1976D2] rounded">
          <div className="mb-3 flex items-center gap-2">
            {editMode && <span className="text-xs text-[#1976D2]">✏️</span>}
            <h3 className="font-semibold text-sm text-[#333]">ASSESSMENT DETAILS</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-[#666] mb-1">Assessment Date:</label>
              {editMode ? (
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                />
              ) : (
                <div className="border-b border-[#999] pb-1 h-9"></div>
              )}
            </div>
            <div>
              <label className="block text-xs text-[#666] mb-1">Assessment Center:</label>
              {editMode ? (
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  placeholder="Enter center name"
                />
              ) : (
                <div className="border-b border-[#999] pb-1 h-9"></div>
              )}
            </div>
            <div>
              <label className="block text-xs text-[#666] mb-1">Assessor Name:</label>
              {editMode ? (
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  placeholder="Enter assessor name"
                />
              ) : (
                <div className="border-b border-[#999] pb-1 h-9"></div>
              )}
            </div>
          </div>
        </div>

        {/* Assessment Results Table */}
        <div className="mb-8">
          <h3 className="font-semibold text-sm text-[#333] mb-3">ASSESSMENT RESULTS</h3>
          <div className="overflow-x-auto border border-[#E0E0E0] rounded">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1976D2] text-white">
                  <th className="text-left px-4 py-3 text-xs font-semibold border-b border-[#1565C0]">
                    Assessment Component
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold border-b border-[#1565C0] w-32">
                    Score
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold border-b border-[#1565C0] w-32">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-[#FAFAFA]">
                  <td className="px-4 py-3 text-sm border-b border-[#E0E0E0]">Demonstration Test</td>
                  <td className="px-4 py-3 text-center border-b border-[#E0E0E0]">
                    {editMode ? (
                      <input
                        type="text"
                        className="w-20 px-2 py-1 border border-[#E0E0E0] rounded text-sm text-center"
                        placeholder="__/100"
                      />
                    ) : (
                      <div className="text-sm text-[#999]">__/100</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center border-b border-[#E0E0E0]">
                    {editMode ? (
                      <select className="px-3 py-1 border border-[#E0E0E0] rounded text-sm">
                        <option value="">-</option>
                        <option value="C">✅ C (Competent)</option>
                        <option value="NYC">❌ NYC (Not Yet Competent)</option>
                      </select>
                    ) : (
                      <div className="text-sm text-[#999]">_____</div>
                    )}
                  </td>
                </tr>
                <tr className="hover:bg-[#FAFAFA]">
                  <td className="px-4 py-3 text-sm border-b border-[#E0E0E0]">Oral Questioning</td>
                  <td className="px-4 py-3 text-center border-b border-[#E0E0E0]">
                    {editMode ? (
                      <input
                        type="text"
                        className="w-20 px-2 py-1 border border-[#E0E0E0] rounded text-sm text-center"
                        placeholder="S/NS"
                      />
                    ) : (
                      <div className="text-sm text-[#999]">____</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center border-b border-[#E0E0E0]">
                    {editMode ? (
                      <select className="px-3 py-1 border border-[#E0E0E0] rounded text-sm">
                        <option value="">-</option>
                        <option value="C">✅ C (Competent)</option>
                        <option value="NYC">❌ NYC (Not Yet Competent)</option>
                      </select>
                    ) : (
                      <div className="text-sm text-[#999]">_____</div>
                    )}
                  </td>
                </tr>
                <tr className="hover:bg-[#FAFAFA]">
                  <td className="px-4 py-3 text-sm border-b border-[#E0E0E0]">Written Test</td>
                  <td className="px-4 py-3 text-center border-b border-[#E0E0E0]">
                    {editMode ? (
                      <input
                        type="text"
                        className="w-20 px-2 py-1 border border-[#E0E0E0] rounded text-sm text-center"
                        placeholder="__/30"
                      />
                    ) : (
                      <div className="text-sm text-[#999]">__/30</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center border-b border-[#E0E0E0]">
                    {editMode ? (
                      <select className="px-3 py-1 border border-[#E0E0E0] rounded text-sm">
                        <option value="">-</option>
                        <option value="C">✅ C (Competent)</option>
                        <option value="NYC">❌ NYC (Not Yet Competent)</option>
                      </select>
                    ) : (
                      <div className="text-sm text-[#999]">_____</div>
                    )}
                  </td>
                </tr>
                <tr className="bg-[#E8F5E9]">
                  <td className="px-4 py-3 text-sm font-bold">OVERALL RESULT</td>
                  <td className="px-4 py-3 text-center text-sm font-bold">-</td>
                  <td className="px-4 py-3 text-center">
                    {editMode ? (
                      <select className="px-3 py-1 border border-[#2E7D32] rounded text-sm font-bold bg-white">
                        <option value="">-</option>
                        <option value="C">✅ COMPETENT</option>
                        <option value="NYC">❌ NOT YET COMPETENT</option>
                      </select>
                    ) : (
                      <div className="text-sm font-bold text-[#999]">____________</div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommendations - Editable */}
        <div className="mb-8 p-5 border-2 border-[#1976D2] rounded">
          <div className="mb-3 flex items-center gap-2">
            {editMode && <span className="text-xs text-[#1976D2]">✏️</span>}
            <h3 className="font-semibold text-sm text-[#333]">ASSESSOR'S RECOMMENDATIONS</h3>
          </div>
          {editMode ? (
            <textarea
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm min-h-[100px]"
              placeholder="Enter assessor's recommendations and feedback..."
            />
          ) : (
            <div className="border border-[#E0E0E0] rounded p-3 min-h-[100px] bg-[#FAFAFA]">
              <div className="text-sm text-[#999]">[Assessor's recommendations will appear here]</div>
            </div>
          )}
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-8 pt-6 border-t border-[#E0E0E0]">
          <div>
            <div className="text-sm text-[#666] mb-2">Assessed by:</div>
            <div className="border-b-2 border-[#333] pb-1 mb-2 h-12"></div>
            <div className="text-xs text-[#999] text-center">Assessor's Signature over Printed Name</div>
            <div className="mt-4">
              <div className="text-xs text-[#666] mb-1">Date:</div>
              <div className="border-b border-[#333] pb-1"></div>
            </div>
          </div>
          <div>
            <div className="text-sm text-[#666] mb-2">Verified by:</div>
            <div className="border-b-2 border-[#333] pb-1 mb-2 h-12"></div>
            <div className="text-xs text-[#999] text-center">Assessment Center Head's Signature over Printed Name</div>
            <div className="mt-4">
              <div className="text-xs text-[#666] mb-1">Date:</div>
              <div className="border-b border-[#333] pb-1"></div>
            </div>
          </div>
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
            Export to DOCX
          </button>
        </div>
      </div>
    </div>
  );
}
