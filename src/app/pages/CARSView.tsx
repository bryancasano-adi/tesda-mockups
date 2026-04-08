import { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";

import {
  DOCUMENT_ID,
  SECTOR_PROJECT_ID,
  usePageNavigation,
} from "./pageUtils";

import { CARSPreviewModal } from "../components/CARSPreviewModal";
import { Breadcrumbs } from "./Dashboard";

export function CARSView() {
  const { navigateToPage } = usePageNavigation();

  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState<"draft" | "finalized">("draft");
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="p-6 text-gray-800">
      <div className="text-sm text-[#666] mb-4">
        <Breadcrumbs
          items={[
            {
              label: "Sector Details",
              href: `/`,
            },
            {
              label: "Sector Projects",
              href: `/`,
            },
            {
              label: "Competency Assessment Tools (CATs)",
              href: `/`,
            },
            {
              label: "CARS (Competency Assessment Results Summary)",
              href: `/cars`,
            },
          ]}
        />
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#333] mb-1">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#FFF3E0] text-[#E65100] mr-2">
              PHASE 3
            </span>
            CARS (Competency Assessment Results Summary)
          </h1>
          <p className="text-sm text-[#666]">
            Template Pre-filled with Qualification Info - Blank Fields for
            Results
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded text-xs font-semibold ${
            status === "finalized"
              ? "bg-[#E8F5E9] text-[#2E7D32]"
              : "bg-[#FFF3E0] text-[#F57C00]"
          }`}
        >
          {status === "finalized" ? "Finalized" : "Draft"}
        </span>
      </div>

      {/* Edit Mode Toggle & Actions */}
      <div className="bg-white border border-[#E0E0E0] rounded p-4 mb-5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm text-[#666]">Edit Mode:</span>
            <div className="relative inline-block w-12 h-6">
              <input
                checked={editMode}
                className="sr-only peer"
                type="checkbox"
                onChange={() => setEditMode(!editMode)}
              />
              <div className="w-12 h-6 bg-[#E0E0E0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1976D2]" />
            </div>
            <span
              className={`text-sm font-medium ${editMode ? "text-[#1976D2]" : "text-[#999]"}`}
            >
              {editMode ? "ON" : "OFF"}
            </span>
          </label>
        </div>
      </div>

      {/* Document */}
      <div className="bg-white border rounded p-8">
        {/* Qualification Info */}
        <div className="mb-8 p-5 bg-[#FAFAFA] border rounded">
          <h3 className="font-semibold text-sm text-[#666] mb-3">
            QUALIFICATION INFORMATION
          </h3>

          <div className="text-sm text-[#333]">
            <div className="mb-2 font-medium">
              Shielded Metal Arc Welding (SMAW) NC II
            </div>

            <ul className="list-decimal ml-5 space-y-1">
              <li>Perform SMAW — Plate to Plate Joint</li>
              <li>Perform SMAW — Pipe to Pipe Joint</li>
              <li>Repair Welds</li>
            </ul>
          </div>
        </div>

        {/* Candidate + Assessment Info */}
        <div className="mb-8 p-5 border-2 border-[#1976D2] rounded">
          <h3 className="font-semibold text-sm text-[#333] mb-3">
            CANDIDATE & ASSESSMENT DETAILS
          </h3>

          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              "Candidate Name",
              "Assessor Name",
              "Assessment Center",
              "Assessment Date",
            ].map((label) => (
              <div key={label}>
                <div className="text-xs text-[#666] mb-1">{label}</div>
                {editMode ? (
                  <input className="w-full px-3 py-2 border rounded" />
                ) : (
                  <div className="border-b h-8" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Units of Competency */}
        <div className="mb-8">
          <h3 className="font-semibold text-sm text-[#333] mb-3">
            UNITS OF COMPETENCY
          </h3>

          <div className="overflow-x-auto border rounded">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1976D2] text-white">
                  <th className="px-4 py-3 text-left text-xs">Unit</th>
                  <th className="px-4 py-3 text-left text-xs">
                    Assessment Method
                  </th>
                  <th className="px-4 py-3 text-center text-xs">
                    Satisfactory
                  </th>
                  <th className="px-4 py-3 text-center text-xs">
                    Not Satisfactory
                  </th>
                </tr>
              </thead>

              <tbody>
                {[
                  "Perform SMAW – Plate to Plate Joint",
                  "Perform SMAW – Pipe to Pipe Joint",
                  "Repair Welds",
                ].map((unit, i) => (
                  <tr key={i} className="hover:bg-[#FAFAFA]">
                    <td className="px-4 py-3 border-t text-sm">{unit}</td>

                    <td className="px-4 py-3 border-t text-sm">
                      A. Demonstration / Observation <br />
                      B. Oral Questioning
                    </td>

                    <td className="px-4 py-3 border-t text-center">
                      <input disabled={!editMode} type="checkbox" />
                    </td>

                    <td className="px-4 py-3 border-t text-center">
                      <input disabled={!editMode} type="checkbox" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note */}
        <div className="text-xs text-[#666] bg-[#FAFAFA] border p-3 rounded mb-6">
          Note: Satisfactory Performance shall only be given to candidates who
          demonstrated all competencies successfully.
        </div>

        {/* Recommendation */}
        <div className="mb-8 p-5 border-2 border-[#1976D2] rounded">
          <h3 className="font-semibold text-sm mb-3">RECOMMENDATION</h3>

          <div className="space-y-4 text-sm">
            {[
              "For Issuance of NC/COC",
              "For Submission of Additional Documents",
              "For Re-assessment",
            ].map((text) => (
              <div key={text}>
                <label className="flex items-start gap-2">
                  <input type="checkbox" />
                  {text}
                </label>
                <div className="border-b mt-2 h-6" />
              </div>
            ))}
          </div>
        </div>

        {/* Standards Met */}
        <div className="mb-6 flex items-center gap-4 text-sm">
          <span>Did the candidate meet required standards?</span>
          <label className="flex gap-1">
            <input type="checkbox" /> Yes
          </label>
          <label className="flex gap-1">
            <input type="checkbox" /> No
          </label>
        </div>

        {/* Overall Evaluation */}
        <div className="mb-8">
          <h3 className="font-semibold text-sm mb-2">OVERALL EVALUATION</h3>

          <div className="flex gap-6 text-sm">
            <label className="flex gap-2">
              <input type="checkbox" /> Competent
            </label>
            <label className="flex gap-2">
              <input type="checkbox" /> Not Yet Competent
            </label>
          </div>
        </div>

        {/* Comments */}
        <div className="mb-8">
          <h3 className="font-semibold text-sm mb-2">GENERAL COMMENTS</h3>

          {editMode ? (
            <textarea className="w-full border rounded p-2 text-sm h-24" />
          ) : (
            <div className="border rounded h-24 bg-[#FAFAFA]" />
          )}
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-8 pt-6 border-t">
          {["Assessor", "Center Head"].map((role) => (
            <div key={role}>
              <div className="text-sm mb-2">{role} Signature</div>
              <div className="border-b h-10 mb-2" />
              <div className="text-xs text-center text-[#999]">
                Signature over Printed Name
              </div>

              <div className="mt-3 text-xs">Date:</div>
              <div className="border-b h-6" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex justify-between">
        <button
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
          onClick={() => navigateToPage("package-navigator")}
        >
          ← Back to Package Navigator
        </button>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
            Save Draft
          </button>
          <button
            className="px-4 py-2 bg-white text-[#1976D2] border border-[#1976D2] rounded text-sm font-medium hover:bg-[#E3F2FD] transition-colors flex items-center gap-2"
            onClick={() => setShowPreview(true)}
          >
            <EyeIcon className="w-5 h-5 inline" />
            Preview
          </button>
          {status === "draft" && (
            <button
              className="px-4 py-2 bg-[#2E7D32] text-white rounded text-sm font-medium hover:bg-[#1B5E20] transition-colors"
              onClick={() => setStatus("finalized")}
            >
              Finalize
            </button>
          )}
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <CARSPreviewModal onClose={() => setShowPreview(false)} />
        )}
      </div>
    </div>
  );
}
