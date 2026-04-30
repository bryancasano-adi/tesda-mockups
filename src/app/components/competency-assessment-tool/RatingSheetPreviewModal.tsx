import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  FolderArrowDownIcon,
  InformationCircleIcon,
  PrinterIcon,
} from "@heroicons/react/24/solid";

interface Props {
  onClose: () => void;
}

export function RatingSheetPreviewModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-7xl max-h-[95vh] rounded shadow-xl flex flex-col">
        {/* HEADER */}

        <div className="px-6 py-4 border-b border-[#E0E0E0] flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-[#333]">
              Rating Sheet (Rubrics) Preview & Export
            </h2>
            <p className="text-sm text-[#666]">
              Shielded Metal Arc Welding (SMAW) NC II
            </p>
          </div>
          <button
            aria-label="Close"
            className="p-2 hover:bg-[#F5F5F5] rounded transition-colors"
            onClick={onClose}
          >
            <XMarkIcon className="w-5 h-5 inline text-gray-500" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="px-6 py-3 bg-[#E3F2FD] border-b border-gray-300 flex-shrink-0">
          <div className="flex items-start gap-2">
            <span className="text-lg">
              <InformationCircleIcon className="w-8 h-8 inline text-blue-500" />
            </span>
            <div className="flex-1">
              <div className="text-sm font-medium text-[#1976D2]">
                Final Deliverable - Phase 3
              </div>
              <div className="text-xs text-[#1565C0] mt-1">
                This document compiles all assessment tools from Phase 2 with
                instructions for assessors.
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto bg-[#e5e5e5] p-6 space-y-6">
          {/* ================= PAGE 1 ================= */}
          <Page>
            <div className="text-center">
              <div className="border p-2 text-xs mb-6">
                “No part of the Competency Assessment Tools (CATs) may be
                produced, distributed, or transmitted in any form or by any
                means, including photocopying, recording, or other electronic or
                mechanical methods, without prior written consent of TESDA. Any
                violation hereof shall be subject to the penalties provided for
                by applicable laws, rules and regulations.”
              </div>

              <img
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

          {/* ================= PAGE 2 ================= */}
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

            {/* PERFORMANCE TABLE */}
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

          {/* ================= PAGE 3 ================= */}
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

            {/* QUESTIONS TABLE */}
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

          {/* ================= PAGE 4 ================= */}
          <Page>
            <Table>
              <Row span="Candidate’s Signature:" value="Date:" />
              <Row span="Assessor’s Signature:" value="Date:" />
            </Table>

            <Footer page="3" />
          </Page>
        </div>

        {/* FOOTER ACTIONS (MATCH IMAGE) */}
        <div className="px-6 py-3 border-t border-gray-300 bg-gray-100 flex justify-between items-center">
          <div className="text-xs text-gray-600">
            Rating Sheet Document • 4 Pages
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded flex items-center gap-2">
              <FolderArrowDownIcon className="w-4 h-4" />
              Download
            </button>

            <button
              className="px-4 py-2 bg-white border border-gray-300 text-gray-600 text-sm rounded flex items-center gap-2"
              onClick={() => window.print()}
            >
              <PrinterIcon className="w-4 h-4" />
              Print Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

export function Page({ children }: any) {
  return (
    <div className="bg-white w-[794px] min-h-[1123px] mx-auto p-10 shadow">
      {children}
    </div>
  );
}

export function Table({ children }: any) {
  return (
    <table className="w-full border text-xs mt-2">
      <tbody>{children}</tbody>
    </table>
  );
}

export function Row({ span, value, red }: any) {
  return (
    <tr>
      <td className="border p-2 w-1/3">{span}</td>
      <td className={`border p-2 ${red ? "text-red-600 font-semibold" : ""}`}>
        {value}
      </td>
    </tr>
  );
}

export function Footer({ page }: { page: string }) {
  return (
    <div className="flex justify-between mt-10 text-xs">
      <div>
        QUALICODE ver. 1.00
        <br />
        <span className="text-red-600 font-bold">QUALIFICATION TITLE</span>
      </div>
      <div>{page}</div>
    </div>
  );
}
