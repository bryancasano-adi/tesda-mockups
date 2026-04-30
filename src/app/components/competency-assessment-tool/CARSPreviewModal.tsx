import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  FolderArrowDownIcon,
  InformationCircleIcon,
  PrinterIcon,
} from "@heroicons/react/24/solid";

interface CARSPreviewModalProps {
  onClose: () => void;
}

export function CARSPreviewModal({ onClose }: CARSPreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-300 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-[#333]">
              CARS Preview & Export
            </h2>
            <p className="text-sm text-[#666]">
              Shielded Metal Arc Welding (SMAW) NC II
            </p>
          </div>
          <button className="p-2 hover:bg-[#F5F5F5] rounded" onClick={onClose}>
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="px-6 py-3 bg-[#E3F2FD] border-b border-gray-300">
          <div className="flex gap-2 items-start">
            <InformationCircleIcon className="w-5 h-5 text-blue-500" />
            <div>
              <div className="text-sm font-medium text-[#1976D2]">
                Competency Assessment Results Summary (CARS)
              </div>
              <div className="text-xs text-[#1565C0]">
                TESDA Official Document Format Preview
              </div>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-y-auto bg-[#F5F5F5] p-6">
          <div className="bg-white border border-gray-300 max-w-[800px] mx-auto p-6 text-[12px] text-black">
            {/* Top Right */}
            <div className="text-right text-[11px] mb-2">
              TESDA-OP-QSO-02-F08 <br />
              Rev. No. 00 03/01/17
            </div>

            {/* Reference */}
            <table className="w-full border border-black mb-2">
              <tbody>
                <tr>
                  <td className="border border-black p-1 w-1/4">
                    Reference. No.
                  </td>
                  <td className="border border-black p-1" />
                </tr>
              </tbody>
            </table>

            <div className="text-center text-[11px] mb-1">
              To be filled up by the Competency Assessor
            </div>

            <div className="text-center font-bold mb-2">
              Competency Assessment Results Summary (CARS) - TESDA Copy
            </div>

            {/* Info Table */}
            <table className="w-full border border-black mb-2">
              <tbody>
                <tr>
                  <td className="border p-1 w-1/4">Candidate Name:</td>
                  <td className="border p-1" colSpan={3} />
                </tr>
                <tr>
                  <td className="border p-1 w-1/4">Assessor Name:</td>
                  <td className="border p-1" colSpan={3} />
                </tr>
                <tr>
                  <td className="border p-1 w-1/4">Title of Qualification:</td>
                  <td className="border p-1" colSpan={3}>
                    Shielded Metal Arc Welding (SMAW) NC II
                  </td>
                </tr>
                <tr>
                  <td className="border p-1">Assessment Center:</td>
                  <td className="border p-1" />
                  <td className="border p-1 w-1/4">Date of Assessment:</td>
                  <td className="border p-1 w-1/4" />
                </tr>
              </tbody>
            </table>

            {/* Description */}
            <div className="border border-black p-1 mb-2 text-[11px]">
              The performance of the candidate in the following unit(s) of
              competency and corresponding assessment methods
            </div>

            {/* Main Table */}
            <table className="w-full border border-black text-[11px]">
              <thead>
                <tr>
                  <th className="border p-1">
                    Units of Competency (Full Qualification)
                  </th>
                  <th className="border p-1">Assessment Method</th>
                  <th className="border p-1 w-20">Satisfactory</th>
                  <th className="border p-1 w-24">Not Satisfactory</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Perform SMAW – Plate to Plate Joint",
                  "Perform SMAW – Pipe to Pipe Joint",
                  "Repair Welds",
                ].map((unit, i) => (
                  <tr key={i}>
                    <td className="border p-1">• {unit}</td>
                    <td className="border p-1">
                      A. Demonstration / Observation <br />
                      B. Oral Questioning
                    </td>
                    <td className="border p-1 text-center">□</td>
                    <td className="border p-1 text-center">□</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Note */}
            <div className="border border-black text-[10px] p-1 mt-1">
              Note: Satisfactory Performance shall only be given to candidate
              who demonstrated successfully all the competencies.
            </div>

            {/* Recommendation */}
            <table className="w-full border border-black mt-2 text-[11px]">
              <tr>
                <td className="border p-1 w-1/4">Recommendation:</td>
                <td className="border p-1">
                  ☐ For Issuance of NC/COC <br />
                  <span className="text-[10px]">
                    (Indicate title/s if full qualification is not met)
                  </span>
                  <div className="border-b mt-1" />
                </td>
                <td className="border p-1">
                  ☐ For Submission of Additional Documents
                  <div className="border-b mt-1" />
                </td>
                <td className="border p-1">
                  ☐ For Re-assessment
                  <div className="border-b mt-1" />
                </td>
              </tr>
            </table>

            {/* Standards */}
            <table className="w-full border border-black text-[11px]">
              <tr>
                <td className="border p-1">
                  Did the candidate’s overall performance meet the required
                  standards?
                </td>
                <td className="border p-1 text-center w-16">☐ Yes</td>
                <td className="border p-1 text-center w-16">☐ No</td>
              </tr>
            </table>

            {/* Overall */}
            <table className="w-full border border-black text-[11px]">
              <tr>
                <td className="border p-1 w-1/4">OVERALL EVALUATION</td>
                <td className="border p-1 text-center">☐ Competent</td>
                <td className="border p-1 text-center">☐ Not Yet Competent</td>
              </tr>
            </table>

            {/* Comments */}
            <div className="border border-black p-1 text-[11px] h-16">
              <strong>General Comments</strong> (Strengths/Improvements needed)
            </div>

            {/* Signatures */}
            <table className="w-full border border-black text-[11px]">
              <tr>
                <td className="border p-1">Candidate signature:</td>
                <td className="border p-1">Date:</td>
              </tr>
              <tr>
                <td className="border p-1">Assessor signature:</td>
                <td className="border p-1">Date:</td>
              </tr>
              <tr>
                <td className="border p-1">
                  Assessment Center Manager signature:
                </td>
                <td className="border p-1">Date:</td>
              </tr>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-300 bg-[#FAFAFA] flex justify-between items-center">
          <div className="text-xs text-[#666]">
            CARS Document • TESDA Copy • Page 1
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm flex items-center gap-2">
              <FolderArrowDownIcon className="w-5 h-5" />
              Download
            </button>

            <button
              className="px-4 py-2 border border-gray-300 text-gray-600 rounded text-sm flex items-center gap-2"
              onClick={() => window.print()}
            >
              <PrinterIcon className="w-5 h-5" />
              Print Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
