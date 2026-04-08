import {
  ArchiveBoxIcon,
  ArrowDownTrayIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  FolderIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

import {
  DOCUMENT_ID,
  SECTOR_PROJECT_ID,
  usePageNavigation,
} from "./pageUtils";
import { Breadcrumbs } from "./Dashboard";

export function FinalExport() {
  const { navigateToPage } = usePageNavigation();

  const packageStatuses = {
    A: { completed: 6, total: 6, finalized: true },
    B: { completed: 4, total: 6, finalized: false },
    C: { completed: 2, total: 6, finalized: false },
    D: { completed: 1, total: 6, finalized: false },
    E: { completed: 0, total: 6, finalized: false },
  };

  const allPackagesFinalized = Object.values(packageStatuses).every(
    (pkg) => pkg.finalized,
  );
  const totalCompleted = Object.values(packageStatuses).reduce(
    (sum, pkg) => sum + pkg.completed,
    0,
  );

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
              label: "Final Export",
              href: `/exoort`,
            },
          ]}
        />
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#333] mb-1">
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#FFF3E0] text-[#E65100] mr-2">
            PHASE 3
          </span>
          Final CATS Export
        </h1>
        <p className="text-sm text-[#666]">
          Download individual packages or master ZIP with all 30 documents
        </p>
      </div>

      {/* Validation Summary */}
      {!allPackagesFinalized && (
        <div className="bg-[#FFEBEE] border-l-4 border-[#C62828] p-5 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="font-semibold text-sm text-[#C62828] mb-2">
                Export Not Available
              </div>
              <div className="text-sm text-[#C62828] mb-3">
                All 5 packages must be finalized (30/30 documents) before export
                is enabled.
              </div>
              <div className="text-xs text-[#C62828] space-y-1">
                <div>
                  Current progress: {totalCompleted}/30 documents completed
                </div>
                <div>
                  Packages incomplete:{" "}
                  {
                    Object.values(packageStatuses).filter((p) => !p.finalized)
                      .length
                  }
                  /5
                </div>
              </div>
              <button
                className="mt-3 px-4 py-2 bg-[#C62828] text-white rounded text-sm font-medium hover:bg-[#B71C1C] transition-colors"
                onClick={() => navigateToPage("package-navigator")}
              >
                → Go to Package Navigator to Complete
              </button>
            </div>
          </div>
        </div>
      )}

      {allPackagesFinalized && (
        <div className="bg-[#E8F5E9] border border-[#A5D6A7] rounded p-5 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">
              <CheckIcon className="w-5 h-5 inline text-green-500" />
            </span>
            <div className="flex-1">
              <div className="font-semibold text-sm text-[#2E7D32] mb-2">
                All Packages Ready for Export!
              </div>
              <div className="text-sm text-[#1B5E20]">
                30/30 documents finalized • All validation checks passed • Ready
                to download
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Package Status Grid */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <div className="font-semibold text-[15px] text-[#333]">
            Package Completion Status
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-5 gap-4">
            {Object.entries(packageStatuses).map(([pkg, status]) => (
              <div
                key={pkg}
                className={`p-4 rounded-lg border-2 ${
                  status.finalized
                    ? "border-[#2E7D32] bg-[#F1F8F4]"
                    : "border-[#E0E0E0] bg-white"
                }`}
              >
                <div className="text-center mb-3">
                  <div className="text-3xl mb-2">
                    {status.finalized ? (
                      <CheckIcon className="w-5 h-5 inline text-green-500" />
                    ) : (
                      <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                    )}
                  </div>
                  <div className="font-bold text-sm text-[#333]">
                    Package {pkg}
                  </div>
                </div>
                <div className="mb-2">
                  <div className="w-full h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${status.finalized ? "bg-green-500" : "bg-yellow-500"}`}
                      style={{
                        width: `${(status.completed / status.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="text-xs text-center text-[#666]">
                  {status.completed}/{status.total} docs
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Package Downloads */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <div className="font-semibold text-[15px] text-[#333]">
            Individual Package Downloads
          </div>
          <div className="text-xs text-[#666]">
            Download each package separately (6 documents per ZIP)
          </div>
        </div>
        <div className="p-5">
          <div className="space-y-3">
            {Object.entries(packageStatuses).map(([pkg, status]) => (
              <div
                key={pkg}
                className={`flex items-center justify-between p-4 rounded border ${
                  status.finalized
                    ? "border-[#2E7D32] bg-[#F1F8F4]"
                    : "border-[#E0E0E0] bg-[#FAFAFA]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    <ArchiveBoxIcon className="w-8 h-8 inline text-amber-900" />
                  </span>
                  <div>
                    <div className="font-semibold text-sm text-[#333]">
                      CATS Package {pkg} - SMAW NC II
                    </div>
                    <div className="text-xs text-[#666]">
                      Contains: AG, SIC, Written Test, Rating Sheet, SAG, CARS
                    </div>
                  </div>
                </div>
                <button
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    status.finalized
                      ? "bg-[#1976D2] text-white hover:bg-[#1565C0]"
                      : "bg-[#E0E0E0] text-[#999] cursor-not-allowed"
                  }`}
                  disabled={!status.finalized}
                >
                  {status.finalized ? "Download Package ZIP" : "Not Ready"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Master ZIP Download */}
      <div className="bg-white border-2 border-[#1976D2] rounded mb-6">
        <div className="px-5 py-4 bg-[#E3F2FD] border-b border-[#1976D2]">
          <div className="font-semibold text-[15px] text-[#333]">
            Master ZIP - All 5 Packages
          </div>
          <div className="text-xs text-[#666]">
            Download all 30 documents in one master ZIP file
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start gap-4">
            <span className="text-5xl">
              <ArrowDownTrayIcon className="w-10 h-10 inline mr-2 text-sky-500" />
            </span>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-[#333] mb-2">
                CATS_Master_SMAW_NC_II_All_Packages.zip
              </h3>
              <div className="text-sm text-[#666] mb-4">
                <strong>Contains:</strong> 5 package folders × 6 documents each
                = 30 total files
              </div>
              <div className="text-xs text-[#666] mb-4 space-y-1">
                <div>
                  <FolderIcon className="w-4 h-4 inline mr-2 text-yellow-500" />{" "}
                  Package_A/ → 6 documents
                </div>
                <div>
                  <FolderIcon className="w-4 h-4 inline mr-2 text-yellow-500" />{" "}
                  Package_B/ → 6 documents
                </div>
                <div>
                  <FolderIcon className="w-4 h-4 inline mr-2 text-yellow-500" />{" "}
                  Package_C/ → 6 documents
                </div>
                <div>
                  <FolderIcon className="w-4 h-4 inline mr-2 text-yellow-500" />{" "}
                  Package_D/ → 6 documents
                </div>
                <div>
                  <FolderIcon className="w-4 h-4 inline mr-2 text-yellow-500" />{" "}
                  Package_E/ → 6 documents
                </div>
              </div>
              <button
                className={`px-6 py-3 rounded text-sm font-bold transition-colors ${
                  allPackagesFinalized
                    ? "bg-[#2E7D32] text-white hover:bg-[#1B5E20]"
                    : "bg-[#E0E0E0] text-[#999] cursor-not-allowed"
                }`}
                disabled={!allPackagesFinalized}
              >
                {allPackagesFinalized ? (
                  <>
                    <ArrowDownTrayIcon className="w-5 h-5 inline mr-2 text-zinc-500" />
                    Download Master ZIP (All 30 Documents)
                  </>
                ) : (
                  <>
                    <LockClosedIcon className="w-5 h-5 inline mr-2 text-sky-500" />
                    Complete All Packages to Unlock
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Document Manifest */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <div className="font-semibold text-[15px] text-[#333]">
            Document Manifest (30 Files)
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#E0E0E0]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#666]">
                  Document
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#666]">
                  Type
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#666]">
                  A
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#666]">
                  B
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#666]">
                  C
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#666]">
                  D
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#666]">
                  E
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#F0F0F0]">
                <td className="px-4 py-3 text-sm">Assessor&apos;s Guide</td>
                <td className="px-4 py-3 text-xs text-[#666]">Per-package</td>
                <td className="text-center px-4 py-3 text-lg">
                  {packageStatuses.A.finalized ? (
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  )}
                </td>
                <td className="text-center px-4 py-3 text-lg">
                  {packageStatuses.B.finalized ? (
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  )}
                </td>
                <td className="text-center px-4 py-3 text-lg">
                  {packageStatuses.C.finalized ? (
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  )}
                </td>
                <td className="text-center px-4 py-3 text-lg">
                  {packageStatuses.D.finalized ? (
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  )}
                </td>
                <td className="text-center px-4 py-3 text-lg">
                  {packageStatuses.E.finalized ? (
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  )}
                </td>
              </tr>
              <tr className="border-b border-[#F0F0F0]">
                <td className="px-4 py-3 text-sm">SIC</td>
                <td className="px-4 py-3 text-xs text-[#666]">Per-package</td>
                <td className="text-center px-4 py-3 text-lg">
                  {packageStatuses.A.finalized ? (
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  )}
                </td>
                <td className="text-center px-4 py-3 text-lg">
                  {packageStatuses.B.finalized ? (
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  )}
                </td>
                <td className="text-center px-4 py-3 text-lg">
                  {packageStatuses.C.finalized ? (
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  )}
                </td>
                <td className="text-center px-4 py-3 text-lg">
                  {packageStatuses.D.finalized ? (
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  )}
                </td>
                <td className="text-center px-4 py-3 text-lg">
                  {packageStatuses.E.finalized ? (
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  )}
                </td>
              </tr>
              <tr className="border-b border-[#F0F0F0]">
                <td className="px-4 py-3 text-sm">Written Test + TOS</td>
                <td className="px-4 py-3 text-xs text-[#666]">Per-package</td>
                <td className="text-center px-4 py-3 text-lg">
                  {packageStatuses.A.finalized ? (
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  )}
                </td>
                <td className="text-center px-4 py-3 text-lg">
                  {packageStatuses.B.finalized ? (
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  )}
                </td>
                <td className="text-center px-4 py-3 text-lg">
                  {packageStatuses.C.finalized ? (
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  )}
                </td>
                <td className="text-center px-4 py-3 text-lg">
                  {packageStatuses.D.finalized ? (
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  )}
                </td>
                <td className="text-center px-4 py-3 text-lg">
                  {packageStatuses.E.finalized ? (
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  )}
                </td>
              </tr>
              <tr className="border-b border-[#F0F0F0]">
                <td className="px-4 py-3 text-sm">Rating Sheet</td>
                <td className="px-4 py-3 text-xs text-[#666]">Per-package</td>
                <td className="text-center px-4 py-3 text-lg">
                  {packageStatuses.A.finalized ? (
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  )}
                </td>
                <td className="text-center px-4 py-3 text-lg">
                  {packageStatuses.B.finalized ? (
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  )}
                </td>
                <td className="text-center px-4 py-3 text-lg">
                  {packageStatuses.C.finalized ? (
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  )}
                </td>
                <td className="text-center px-4 py-3 text-lg">
                  {packageStatuses.D.finalized ? (
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  )}
                </td>
                <td className="text-center px-4 py-3 text-lg">
                  {packageStatuses.E.finalized ? (
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  )}
                </td>
              </tr>
              <tr className="border-b border-[#F0F0F0]">
                <td className="px-4 py-3 text-sm">SAG</td>
                <td className="px-4 py-3 text-xs">
                  <span className="px-2 py-0.5 rounded text-xs bg-[#E3F2FD] text-[#1976D2]">
                    Shared
                  </span>
                </td>
                <td className="text-center px-4 py-3 text-lg" colSpan={5}>
                  <CheckIcon className="w-5 h-5 inline text-green-500" />
                </td>
              </tr>
              <tr className="border-b border-[#F0F0F0]">
                <td className="px-4 py-3 text-sm">CARS</td>
                <td className="px-4 py-3 text-xs">
                  <span className="px-2 py-0.5 rounded text-xs bg-[#E3F2FD] text-[#1976D2]">
                    Shared
                  </span>
                </td>
                <td className="text-center px-4 py-3 text-lg" colSpan={5}>
                  <CheckIcon className="w-5 h-5 inline text-green-500" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
          onClick={() => navigateToPage("package-navigator")}
        >
          ← Back to Package Navigator
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#1976D2] transition-colors"
          onClick={() => navigateToPage("")}
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}
