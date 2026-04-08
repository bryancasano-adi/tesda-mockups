import { useState } from "react";
import { EyeIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

import {
  DOCUMENT_ID,
  SECTOR_PROJECT_ID,
  usePageNavigation,
} from "./pageUtils";

import {
  Page,
  Table,
  Row,
  Footer,
  RatingSheetPreviewModal,
} from "../components/RatingSheetPreviewModal";
import { Breadcrumbs } from "./Dashboard";

export function RatingSheetView() {
  const { navigateToPage } = usePageNavigation();
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState<"draft" | "finalized">("draft");
  const [showPreview, setShowPreview] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleJumpToSection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);

    if (value) setCurrentPage(value);
  };

  /* ✅ EXACT SAME CONTENT AS MODAL — JUST SPLIT */
  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <Page>
            <div className="text-center">
              <div className="border p-2 text-xs mb-6">
                “No part of the Competency Assessment Tools (CATs) may be
                produced, distributed, or transmitted in any form or by any
                means, including photocopying, recording, or other electronic or
                mechanical methods, without prior written consent of TESDA.”
              </div>

              <ImageWithFallback
                alt="logo"
                className="mx-auto mb-2"
                height={80}
                src="/tesda-cropped-logo.png"
                width={80}
              />

              <div className="font-semibold text-sm mb-6">
                TECHNICAL EDUCATION AND SKILLS DEVELOPMENT AUTHORITY
              </div>

              <div className="text-2xl mt-10">National Assessment</div>
              <div className="mt-6">for</div>

              <div className="text-red-600 font-bold text-2xl mt-6">
                QUALIFICATION TITLE
              </div>

              <div className="mt-2">(Full Qualification)</div>

              <div className="text-2xl font-bold mt-16">RATING SHEET</div>
            </div>
          </Page>
        );

      case 2:
        return (
          <Page>
            <div className="text-xs text-right mb-2">
              TESDA-OP-QSO-02-F09
              <br />
              Rev. No. 01 12/05/17
            </div>

            <Table>
              <tr>
                <td className="w-40">Reference No.</td>
                <td colSpan={10} />
              </tr>
            </Table>

            <div className="font-bold mt-3 text-sm">
              RATING SHEET FOR DEMONSTRATION/OBSERVATION WITH ORAL QUESTIONING
            </div>

            <Table>
              <Row span="Candidate’s name:" />
              <Row span="Assessor’s name:" />
              <Row red span="Qualification:" value="QUALIFICATION TITLE" />
              <Row span="Units of Competency Covered" />
              <Row span="Date of Assessment:" />
              <Row span="Time of Assessment:" />
            </Table>

            <div className="text-xs mt-3">
              <strong>INSTRUCTION:</strong> Put a tick (✔) mark...
            </div>

            <table className="w-full border mt-3 text-xs">
              <thead>
                <tr>
                  <th className="border p-2 text-left w-1/2">
                    Part I. Performance
                  </th>
                  <th className="border w-20">Satisfactory</th>
                  <th className="border w-20">Not Satisfactory</th>
                  <th className="border w-32">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    <td className="border p-2">•</td>
                    <td className="border" />
                    <td className="border" />
                    <td className="border" />
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 text-sm">
              The candidate’s demonstration was:
            </div>

            <div className="flex gap-10 mt-2 text-sm">
              <span>Satisfactory ☐</span>
              <span>Not Satisfactory ☐</span>
            </div>

            <Footer page="1" />
          </Page>
        );

      case 3:
        return (
          <Page>
            <Table>
              <Row span="Qualification:" />
              <Row
                span="Units of Competency Covered"
                value="BASIC AND COMMON COMPETENCIES"
              />
            </Table>

            <div className="mt-4 font-semibold">PART II. Oral Questioning</div>

            <div className="text-xs mt-2">
              <strong>INSTRUCTIONS:</strong>
              <ol className="ml-4 list-decimal">
                <li>Ask at least 3 questions</li>
                <li>Put a tick (✔)</li>
                <li>Mark response</li>
                <li>Complete feedback</li>
              </ol>
            </div>

            <table className="w-full border mt-3 text-xs">
              <thead>
                <tr>
                  <th className="border p-1 text-left">Standard Questions</th>
                  <th className="border w-20">Tick ✔</th>
                  <th className="border w-16">YES</th>
                  <th className="border w-16">NO</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    <td className="border p-1">{i + 1}.</td>
                    <td className="border" />
                    <td className="border" />
                    <td className="border" />
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-3 text-sm">Feedback to candidate:</div>
            <div className="border h-24" />

            <div className="mt-4 text-sm">
              The candidate’s required knowledge was:
            </div>

            <div className="flex gap-10 mt-2 text-sm">
              <span>Satisfactory ☐</span>
              <span>Not Satisfactory ☐</span>
            </div>

            <div className="mt-4 text-sm">
              The candidate’s overall performance was:
            </div>

            <div className="flex gap-10 mt-2 text-sm">
              <span>Satisfactory ☐</span>
              <span>Not Satisfactory ☐</span>
            </div>

            <Footer page="2" />
          </Page>
        );

      case 4:
        return (
          <Page>
            <Table>
              <Row span="Candidate’s Signature:" value="Date:" />
              <Row span="Assessor’s Signature:" value="Date:" />
            </Table>

            <Footer page="3" />
          </Page>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 text-gray-800">
      {/* HEADER */}
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
              label: "Rating Sheet (Rubrics)",
              href: `/rating-sheet`,
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
            Rating Sheet (Rubrics)
          </h1>
          <p className="text-sm text-[#666]">
            Compiled Scoring Guide - Auto-generated from Phase 2 Tests
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

      {/* Edit Mode Toggle */}
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
          {editMode && (
            <span className="text-xs text-[#F57C00] bg-[#FFF3E0] px-2 py-1 rounded">
              <InformationCircleIcon className="w-5 h-5 inline text-blue-500" />{" "}
              Locked sections cannot be edited
            </span>
          )}
        </div>
      </div>

      {/* VIEWER CONTAINER (same as AssessorsGuide) */}
      <div className="bg-white border border-[#E0E0E0] rounded overflow-hidden">
        {/* Page Navigation */}
        <div className="px-5 py-3 bg-[#FAFAFA] border-b border-[#E0E0E0] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              className={`px-3 py-1.5 bg-white text-[#666] border border-[#E0E0E0] rounded text-xs font-medium transition-colors ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#F5F5F5]"
              }`}
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
            >
              ◀ Previous
            </button>
            <span className="text-sm text-[#666]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`px-3 py-1.5 bg-white text-[#666] border border-[#E0E0E0] rounded text-xs font-medium transition-colors ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#F5F5F5]"
              }`}
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
            >
              Next ▶
            </button>
          </div>
          <select
            className="px-3 py-1.5 bg-white border border-[#E0E0E0] rounded text-sm text-[#666]"
            value=""
            onChange={handleJumpToSection}
          >
            <option value="">Jump...</option>
            <option value="1">Cover</option>
            <option value="2">Performance</option>
            <option value="3">Oral</option>
            <option value="4">Signatures</option>
          </select>
        </div>

        {/* Document Content */}
        <div className="p-8 max-h-[600px] overflow-y-auto">{renderPage()}</div>
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
          <RatingSheetPreviewModal onClose={() => setShowPreview(false)} />
        )}
      </div>
    </div>
  );
}
