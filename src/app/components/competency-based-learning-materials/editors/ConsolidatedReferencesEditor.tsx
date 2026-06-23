import { useState } from "react";
import { FlagIcon, TrashIcon } from "@heroicons/react/24/outline";

import { SectionDivider } from "../CblmFieldPrimitives";
import {
  ConsolidationMetaHeader,
  ReferenceTypeBadge,
} from "../consolidation-shared";
import { moduleReferences } from "@/app/data/cblmData";

type ReferenceRow = {
  name: string;
  type: string;
  usedIn: string;
  flagged: boolean;
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
      <ConsolidationMetaHeader
        code="REF"
        extra={[{ label: "Documents", value: String(references.length) }]}
        type="Consolidated References"
      />

      <SectionDivider label="Reference Documents" />
      <p className="mb-4 text-xs text-gray-600">
        References across all Information Sheets. Verify accuracy before
        finalizing. Flagged citations appear with a visible indicator in the
        exported document.
      </p>

      {references.length === 0 ? (
        <p className="text-sm text-gray-500">
          No references compiled yet. References are aggregated from finalized
          information sheets after Step 2 is finalized.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse bg-white text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs uppercase text-gray-500">
                <th className="px-4 py-2.5 font-semibold text-gray-600">
                  Source Document
                </th>
                <th className="px-4 py-2.5 text-center font-semibold text-gray-600">
                  Type
                </th>
                <th className="px-4 py-2.5 font-semibold text-gray-600">
                  Used In
                </th>
                <th className="px-4 py-2.5 text-right font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {references.map((ref) => (
                <tr
                  key={ref.name}
                  className={
                    ref.flagged
                      ? "border-b border-red-100 bg-red-50/40"
                      : "border-b border-gray-100"
                  }
                >
                  <td className="px-4 py-3 font-mono text-xs text-gray-700">
                    <div className="flex flex-wrap items-center gap-2">
                      <span>{ref.name}</span>
                      {ref.flagged && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-700">
                          <FlagIcon className="h-3.5 w-3.5" />
                          Flagged
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <ReferenceTypeBadge type={ref.type} />
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">
                    {ref.usedIn}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      {ref.flagged ? (
                        <button
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-700 hover:text-red-800"
                          type="button"
                          onClick={() => toggleFlag(ref.name)}
                        >
                          <FlagIcon className="h-3.5 w-3.5" />
                          Flagged
                        </button>
                      ) : (
                        <button
                          className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-[11px] font-semibold text-gray-700 hover:bg-gray-50"
                          type="button"
                          onClick={() => toggleFlag(ref.name)}
                        >
                          <FlagIcon className="h-3.5 w-3.5 text-gray-500" />
                          Flag
                        </button>
                      )}
                      <button
                        aria-label={`Remove ${ref.name}`}
                        className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-[11px] font-semibold text-gray-700 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                        type="button"
                        onClick={() => removeReference(ref.name)}
                      >
                        <TrashIcon className="h-3.5 w-3.5" />
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
