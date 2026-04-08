import { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";

import {
  DOCUMENT_ID,
  SECTOR_PROJECT_ID,
  usePageNavigation,
} from "./pageUtils";

import { SICPreviewModal } from "../components/SICPreviewModal";
import { Breadcrumbs } from "./Dashboard";

export function SICView() {
  const { navigateToPage } = usePageNavigation();
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState<"draft" | "finalized">("draft");
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="p-6">
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
              label: "Specific Instructions for Candidate (SIC)",
              href: `/sic`,
            },
          ]}
        />
      </div>

      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#333] mb-1">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#FFF3E0] text-[#E65100] mr-2">
              PHASE 3
            </span>
            Specific Instructions for Candidate (SIC)
          </h1>
          <p className="text-sm text-[#666]">
            Derived from Assessor&apos;s Guide - Candidate-Friendly Version
          </p>
        </div>
        <span
          className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
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

      {/* Document Content */}
      <div className="bg-white border border-[#000] p-8 text-[13px] text-gray-800">
        {/* Legal Notice */}
        <div className="border border-black p-3 text-center mb-6 text-[12px] leading-tight font-bold">
          “No part of the Competency Assessment Tools (CATs) may be produced,
          distributed, or transmitted in any form or by any means, including
          photocopying, recording, or other electronic or mechanical methods,
          without prior written consent of TESDA. Any violation hereof shall be
          subject to the penalties provided for by applicable laws, rules and
          regulations.”
        </div>

        {/* Title */}
        <h2 className="font-bold mb-3">
          SPECIFIC INSTRUCTIONS FOR THE CANDIDATE
        </h2>

        {/* Info Table */}
        <div className="border border-black mb-4">
          <div className="grid grid-cols-3 border-b border-black">
            <div className="border-r border-black p-2">Qualification</div>
            <div className="col-span-2 p-2">
              {editMode ? (
                <input
                  className="w-full"
                  defaultValue="Shielded Metal Arc Welding (SMAW) NC II"
                />
              ) : (
                "Shielded Metal Arc Welding (SMAW) NC II"
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 border-b border-black">
            <div className="border-r border-black p-2">
              Units of Competency Covered
            </div>
            <div className="col-span-2 p-2 whitespace-pre-line">
              {editMode ? (
                <textarea
                  className="w-full"
                  defaultValue={`1. Perform Shielded Metal Arc Welding — Plate to Plate Joint
2. Perform Shielded Metal Arc Welding — Pipe to Pipe Joint
3. Repair Welds`}
                />
              ) : (
                `1. Perform Shielded Metal Arc Welding — Plate to Plate Joint
2. Perform Shielded Metal Arc Welding — Pipe to Pipe Joint
3. Repair Welds`
              )}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="border-r border-black p-2">Time Allotment</div>
            <div className="col-span-2 p-2">
              {editMode ? (
                <input defaultValue="Approximately 4 hours" />
              ) : (
                "Approximately 4 hours"
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <ol className="list-decimal ml-5 space-y-3">
          <li>
            You will be given a maximum of fifteen (15) minutes to familiarize
            with ALL the tools/materials/equipment that will be used.
          </li>

          <li>
            For safety reasons, you may be instructed to temporarily halt or
            completely end the demonstration at any given time.
          </li>

          <li>
            The 10 candidates will be divided into 2 groups. You will be
            assigned in one group of 5 candidates.
          </li>

          <li>Follow all safety procedures at all times.</li>

          <li>Ask the assessor if clarification is needed.</li>

          <li>Perform tasks according to given instructions.</li>

          <li>Ensure proper use of tools and equipment.</li>

          <li>Maintain cleanliness of your work area.</li>

          <li>
            The final assessment shall be the responsibility of your Accredited
            Assessor.
          </li>

          <li>
            At the end of the assessment, you shall be provided feedback on the
            assessment results. The feedback shall indicate whether you are:
          </li>
        </ol>

        {/* Checkbox Result */}
        <div className="flex gap-12 mt-6 ml-8">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            <span className="font-semibold">COMPETENT</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            <span className="font-semibold">NOT YET COMPETENT</span>
          </label>
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
          <SICPreviewModal onClose={() => setShowPreview(false)} />
        )}
      </div>
    </div>
  );
}
