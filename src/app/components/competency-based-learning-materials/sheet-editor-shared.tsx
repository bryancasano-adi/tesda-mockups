import { useState } from "react";

import { SectionDivider } from "./CblmFieldPrimitives";

function ReferenceTypeBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    CS: "bg-green-50 text-green-700 border-green-200",
    CBC: "bg-blue-50 text-blue-700 border-blue-200",
    CLM: "bg-amber-50 text-amber-800 border-amber-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
        styles[type] ?? "bg-gray-50 text-gray-600 border-gray-200"
      }`}
    >
      {type}
    </span>
  );
}

const MOCK_REFERENCES = [
  { filename: "AUTBEV-CS-2025-v2.pdf", type: "CS" },
  { filename: "AUTBEV-CBC-2025-v1.pdf", type: "CBC" },
  { filename: "CLM-UC001-2025.pdf", type: "CLM" },
];

export function InlineReferencesSection({ sheetCode }: { sheetCode: string }) {
  const [flagged, setFlagged] = useState<Set<string>>(new Set());

  const toggleFlag = (ref: string) => {
    setFlagged((current) => {
      const next = new Set(current);
      if (next.has(ref)) next.delete(ref);
      else next.add(ref);
      return next;
    });
  };

  return (
    <>
      <SectionDivider label="References — Auto-compiled" />
      <p className="mb-4 text-xs text-gray-600">
        Sources used during generation of {sheetCode}. Trainer should verify
        accuracy before acceptance.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse bg-white text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs uppercase text-gray-500">
              <th className="px-4 py-2.5 font-semibold text-gray-600">
                Source Document
              </th>
              <th className="px-4 py-2.5 text-center font-semibold text-gray-600">
                Type
              </th>
              <th className="px-4 py-2.5 text-right font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {MOCK_REFERENCES.map((ref) => {
              const isFlagged = flagged.has(ref.filename);
              return (
                <tr key={ref.filename} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-mono text-xs text-gray-700">
                    {ref.filename}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <ReferenceTypeBadge type={ref.type} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      className={`rounded-md border px-2 py-1 text-[11px] font-semibold ${
                        isFlagged
                          ? "border-red-200 bg-red-50 text-red-700"
                          : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                      type="button"
                      onClick={() => toggleFlag(ref.filename)}
                    >
                      {isFlagged ? "Flagged" : "⚑ Flag"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
