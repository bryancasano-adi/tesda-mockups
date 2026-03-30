import { useState } from 'react';
import { useNavigate } from 'react-router';

export function AssessorsGuide() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState<'draft' | 'finalized'>('draft');

  return (
    <div className="p-6">
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › Assessor's Guide
      </div>

      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#333] mb-1">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#FFF3E0] text-[#E65100] mr-2">
              PHASE 3
            </span>
            Assessor's Guide
          </h1>
          <p className="text-sm text-[#666]">Compiled Document - Final Deliverable</p>
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
          {editMode && (
            <span className="text-xs text-[#F57C00] bg-[#FFF3E0] px-2 py-1 rounded">
              ℹ️ Locked sections cannot be edited
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

      {/* Document Preview/Editor */}
      <div className="bg-white border border-[#E0E0E0] rounded overflow-hidden">
        {/* Page Navigation */}
        <div className="px-5 py-3 bg-[#FAFAFA] border-b border-[#E0E0E0] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 bg-white text-[#666] border border-[#E0E0E0] rounded text-xs font-medium hover:bg-[#F5F5F5] transition-colors">
              ◄ Previous
            </button>
            <span className="text-sm text-[#666]">Page 5 of 12</span>
            <button className="px-3 py-1.5 bg-white text-[#666] border border-[#E0E0E0] rounded text-xs font-medium hover:bg-[#F5F5F5] transition-colors">
              Next ►
            </button>
          </div>
          <select className="px-3 py-1.5 bg-white border border-[#E0E0E0] rounded text-sm text-[#666]">
            <option>Jump to Section...</option>
            <option>Cover Page</option>
            <option>Page 4: Evidence Plan</option>
            <option>Page 5: Specific Instructions</option>
            <option>Page 6: Assessment Guide</option>
            <option>Page 8: Questions & Answers</option>
            <option>Page 10: Tools & Equipment</option>
            <option>Page 11: Answer Keys</option>
          </select>
        </div>

        {/* Document Content */}
        <div className="p-8 max-h-[600px] overflow-y-auto">
          {/* Page 1: Cover Page */}
          <div className="mb-8 p-6 border border-[#E0E0E0] rounded bg-[#FAFAFA]">
            <div className="text-center space-y-4">
              <div className="text-xs text-[#999] uppercase tracking-wide">Page 1</div>
              <div className="font-bold text-lg text-[#1E3A5F]">TECHNICAL EDUCATION AND SKILLS DEVELOPMENT AUTHORITY</div>
              <div className="text-base font-semibold text-[#333] mt-6">National Assessment for</div>
              <div className="text-xl font-bold text-[#1976D2] my-4">
                SHIELDED METAL ARC WELDING (SMAW) NC II
              </div>
              <div className="text-lg font-semibold text-[#333] mt-6">ASSESSOR'S GUIDE</div>
            </div>
          </div>

          {/* Page 4: Evidence Plan (Locked) */}
          <div className="mb-8 p-6 border-2 border-[#E0E0E0] rounded bg-white relative">
            <div className="absolute top-2 right-2 px-2 py-1 bg-[#E0E0E0] rounded text-xs text-[#666]">
              🔒 Locked - From Phase 1
            </div>
            <div className="text-xs text-[#999] uppercase tracking-wide mb-3">Page 4</div>
            <h2 className="text-base font-bold text-[#333] mb-4">EVIDENCE PLAN</h2>
            <div className="text-sm text-[#666] mb-3">
              <strong>Qualification Title:</strong> Shielded Metal Arc Welding (SMAW) NC II
            </div>
            <div className="text-sm text-[#666] mb-4">
              <strong>Units of Competency Covered:</strong>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>Perform Shielded Metal Arc Welding — Plate to Plate Joint</li>
                <li>Perform Shielded Metal Arc Welding — Pipe to Pipe Joint</li>
                <li>Repair Welds</li>
              </ul>
            </div>
            <div className="text-xs text-[#999] italic">
              [Full Evidence Plan table from Phase 1 - Not editable here]
            </div>
          </div>

          {/* Page 5: Specific Instructions for Assessor (Editable) */}
          <div className="mb-8 p-6 border-2 border-[#1976D2] rounded bg-white relative">
            {editMode && (
              <div className="absolute top-2 right-2 px-2 py-1 bg-[#E3F2FD] rounded text-xs text-[#1976D2]">
                ✏️ Editable
              </div>
            )}
            <div className="text-xs text-[#999] uppercase tracking-wide mb-3">Page 5</div>
            <h2 className="text-base font-bold text-[#333] mb-4">SPECIFIC INSTRUCTIONS FOR THE ASSESSOR</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#666] mb-2">Qualification Title:</label>
                {editMode ? (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                    defaultValue="Shielded Metal Arc Welding (SMAW) NC II"
                  />
                ) : (
                  <div className="text-sm text-[#333]">Shielded Metal Arc Welding (SMAW) NC II</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#666] mb-2">Time Allotted:</label>
                {editMode ? (
                  <div className="flex gap-3">
                    <input
                      type="text"
                      className="px-3 py-2 border border-[#E0E0E0] rounded text-sm w-40"
                      defaultValue="4 hours"
                      placeholder="Per candidate"
                    />
                    <span className="text-sm text-[#666] self-center">per candidate /</span>
                    <input
                      type="text"
                      className="px-3 py-2 border border-[#E0E0E0] rounded text-sm w-40"
                      defaultValue="8 hours"
                      placeholder="For 10 candidates"
                    />
                    <span className="text-sm text-[#666] self-center">for 10 candidates</span>
                  </div>
                ) : (
                  <div className="text-sm text-[#333]">4 hours per candidate / 8 hours for 10 candidates</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#666] mb-2">Instructions:</label>
                {editMode ? (
                  <textarea
                    className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm min-h-[200px]"
                    defaultValue={`1. Conduct orientation (10 minutes) to explain the assessment process and answer candidate questions.

2. Provide complete set of supplies, materials, tools, and equipment as specified in the list.

3. Ensure the assessment area meets the minimum space requirements and safety standards.

4. Observe candidates during the demonstration test without interference unless safety is compromised.

5. Use the rating sheet to evaluate performance against the specified criteria.

6. Conduct the oral questioning session after the demonstration test.

7. Administer the written test in a separate quiet area.

8. Compile all results using the CARS template.`}
                  />
                ) : (
                  <div className="text-sm text-[#666] whitespace-pre-line">
                    {`1. Conduct orientation (10 minutes) to explain the assessment process and answer candidate questions.

2. Provide complete set of supplies, materials, tools, and equipment as specified in the list.

3. Ensure the assessment area meets the minimum space requirements and safety standards.

4. Observe candidates during the demonstration test without interference unless safety is compromised.

5. Use the rating sheet to evaluate performance against the specified criteria.

6. Conduct the oral questioning session after the demonstration test.

7. Administer the written test in a separate quiet area.

8. Compile all results using the CARS template.`}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Page 6: Assessment Guide for Demonstration */}
          <div className="mb-8 p-6 border border-[#E0E0E0] rounded bg-[#FAFAFA]">
            <div className="absolute top-2 right-2 px-2 py-1 bg-[#E0E0E0] rounded text-xs text-[#666]">
              🔒 Auto-compiled from Demonstration Test
            </div>
            <div className="text-xs text-[#999] uppercase tracking-wide mb-3">Page 6-7</div>
            <h2 className="text-base font-bold text-[#333] mb-4">ASSESSMENT GUIDE FOR DEMONSTRATION</h2>
            <div className="text-sm text-[#666]">
              [Performance criteria and rubrics from Demonstration Test - Phase 2]
            </div>
          </div>

          {/* Additional Pages Placeholder */}
          <div className="text-center py-8 text-sm text-[#999]">
            ... Additional pages (8-12) follow ...
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
