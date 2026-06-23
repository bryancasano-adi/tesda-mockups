"use client";

import { Link } from "react-router-dom";
import { PlayIcon } from "@heroicons/react/24/outline";

import {
  CBLMStatusBadge,
  cn,
  competencySectionCardClass,
} from "./CblmFrontendPrimitives";
import { cblmModulePath } from "@/app/utils/cblmRoutes";
import type { CblmDashboardModule } from "@/app/data/cblmData";

export function CblmModuleTable({
  title,
  competencyType,
  modules,
  onGenerate,
}: {
  title: string;
  competencyType: "basic" | "common" | "core";
  modules: CblmDashboardModule[];
  onGenerate?: (module: CblmDashboardModule) => void;
}) {
  if (modules.length === 0) return null;

  return (
    <div
      className={cn(
        "mt-6 overflow-x-auto rounded-lg bg-white shadow-sm",
        competencySectionCardClass(competencyType),
      )}
    >
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left text-[11px] uppercase tracking-wide text-gray-500">
              <th className="px-4 py-3">MOI / Unit of Competency</th>
              <th className="w-36 px-4 py-3">Unit Code</th>
              <th className="w-40 px-4 py-3 text-center">CBLM Status</th>
              <th className="w-44 px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module) => {
              const canOpen = Boolean(module.cblmId);
              const isBasic = module.competencyType === "basic";

              return (
                <tr
                  key={module.unitCode}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-800">
                      {module.unitTitle}
                    </div>
                    {!isBasic && !module.moiReady && (
                      <div className="mt-1 text-[11px] text-amber-700">
                        Generate MOI in CBC before generating CBLM
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 font-mono text-xs text-gray-600">
                    {module.unitCode}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <CBLMStatusBadge status={module.status} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {isBasic ? (
                        <button
                          className="rounded-md border border-gray-300 bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500"
                          disabled
                          type="button"
                        >
                          View Only
                        </button>
                      ) : canOpen ? (
                        <Link
                          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 no-underline"
                          to={cblmModulePath(module.cblmId)}
                        >
                          Open
                        </Link>
                      ) : (
                        <button
                          className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                          disabled={!module.moiReady}
                          type="button"
                          onClick={() => onGenerate?.(module)}
                        >
                          <PlayIcon className="h-3.5 w-3.5" />
                          Generate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
