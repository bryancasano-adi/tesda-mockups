import { useState } from "react";
import { FlagIcon, TrashIcon } from "@heroicons/react/24/outline";

import { SectionDivider } from "../CblmPrimitives";
import { cblm, cblmBadge, cblmBtn } from "../cblmClasses";
import { moduleReferences } from "@/app/data/cblmData";

type ReferenceRow = {
  name: string;
  type: string;
  usedIn: string;
  flagged: boolean;
};

const TYPE_BADGE: Record<string, string> = {
  CS: "bg-[#E3F2FD] text-[#1565C0]",
  CBC: "bg-[#E8F5E9] text-[#2E7D32]",
  CLM: "bg-[#FFF3E0] text-[#F57C00]",
};

export function ConsolidatedReferencesEditor({
  showToast,
}: {
  showToast: (msg: string, color?: string) => void;
}) {
  const [references, setReferences] = useState<ReferenceRow[]>(
    moduleReferences.map((ref) => ({ ...ref })),
  );

  const toggleFlag = (name: string) => {
    setReferences((prev) =>
      prev.map((ref) =>
        ref.name === name ? { ...ref, flagged: !ref.flagged } : ref,
      ),
    );
    showToast("Reference flag updated", "#1565C0");
  };

  const removeReference = (name: string) => {
    setReferences((prev) => prev.filter((ref) => ref.name !== name));
    showToast("Reference removed", "#C62828");
  };

  return (
    <>
      <div className="mb-5 grid gap-3 rounded-md border border-[#E0E0E0] bg-[#FAFAFA] p-4 text-xs sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="text-[#999]">Code</div>
          <div className="font-mono font-semibold text-[#1565C0]">REF</div>
        </div>
        <div>
          <div className="text-[#999]">Type</div>
          <div className="font-semibold text-[#333]">Consolidated References</div>
        </div>
        <div>
          <div className="text-[#999]">Documents</div>
          <div className="font-semibold text-[#333]">{references.length}</div>
        </div>
      </div>

      <SectionDivider label="Reference Documents" />
      <p className="mb-4 text-xs text-[#666]">
        References across all Information Sheets. Verify accuracy before
        finalizing. Flagged citations appear with a visible indicator in the
        exported document.
      </p>

      {references.length === 0 ? (
        <p className="text-sm text-[#999]">
          No references compiled yet. References are aggregated from finalized
          information sheets after Step 2 is finalized.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className={cblm.tbl}>
            <thead>
              <tr>
                <th className={cblm.tblTh}>Source Document</th>
                <th className={`${cblm.tblTh} text-center`}>Type</th>
                <th className={cblm.tblTh}>Used In</th>
                <th className={`${cblm.tblTh} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {references.map((ref) => (
                <tr
                  key={ref.name}
                  className={
                    ref.flagged
                      ? "border-b border-[#FFCDD2] bg-[#FFEBEE]/40"
                      : cblm.tblRow
                  }
                >
                  <td className={cblm.tblTd}>
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                      <span>{ref.name}</span>
                      {ref.flagged && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#C62828]">
                          <FlagIcon className="h-3.5 w-3.5" />
                          Flagged
                        </span>
                      )}
                    </div>
                  </td>
                  <td className={`${cblm.tblTd} text-center`}>
                    <span
                      className={cblmBadge(
                        "b-validated",
                        TYPE_BADGE[ref.type] ?? "",
                      )}
                    >
                      {ref.type}
                    </span>
                  </td>
                  <td className={`${cblm.tblTd} text-xs`}>{ref.usedIn}</td>
                  <td className={`${cblm.tblTd} text-right`}>
                    <div className="inline-flex items-center gap-2">
                      {ref.flagged ? (
                        <button
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#C62828] hover:text-[#B71C1C]"
                          type="button"
                          onClick={() => toggleFlag(ref.name)}
                        >
                          <FlagIcon className="h-3.5 w-3.5" />
                          Flagged
                        </button>
                      ) : (
                        <button
                          className={cblmBtn("secondary", "text-[11px] px-2 py-1")}
                          type="button"
                          onClick={() => toggleFlag(ref.name)}
                        >
                          <FlagIcon className="mr-1 inline h-3.5 w-3.5 text-[#666]" />
                          Flag
                        </button>
                      )}
                      <button
                        aria-label={`Remove ${ref.name}`}
                        className={cblmBtn("secondary", "text-[11px] px-2 py-1 hover:border-[#FFCDD2] hover:bg-[#FFEBEE] hover:text-[#C62828]")}
                        type="button"
                        onClick={() => removeReference(ref.name)}
                      >
                        <TrashIcon className="mr-1 inline h-3.5 w-3.5" />
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
