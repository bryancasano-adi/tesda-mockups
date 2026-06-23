import { ClockIcon, PlayIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import { CblmModuleTable } from "@/app/components/competency-based-learning-materials/CblmModuleTable";
import { CblmPageShell } from "@/app/components/competency-based-learning-materials/CblmFrontendPrimitives";
import {
  CblmToast,
  useCblmToast,
} from "@/app/components/competency-based-learning-materials/cblmMockupHooks";
import {
  cblmDashboardModules,
  CBLM_PROJECT_NAME,
} from "@/app/data/cblmData";

export function CblmDashboard() {
  const { toast, showToast } = useCblmToast();
  const [generatingAll, setGeneratingAll] = useState(false);

  const basic = cblmDashboardModules.filter((m) => m.competencyType === "basic");
  const common = cblmDashboardModules.filter((m) => m.competencyType === "common");
  const core = cblmDashboardModules.filter((m) => m.competencyType === "core");
  const generatableCount = core.filter((m) => m.moiReady && !m.cblmId).length;

  const handleGenerateAll = () => {
    setGeneratingAll(true);
    setTimeout(() => {
      setGeneratingAll(false);
      showToast("CBLM generation complete", "#2563EB");
    }, 1500);
  };

  return (
    <CblmPageShell>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Competency-Based Learning Material (CBLM)
          </h1>
          <p className="mt-1 text-sm text-gray-500">{CBLM_PROJECT_NAME}</p>
          <p className="mt-1 text-xs text-gray-400">
            {common.length + core.length} MOI modules → {generatableCount} ready
            to generate
          </p>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          disabled={generatingAll || generatableCount === 0}
          type="button"
          onClick={handleGenerateAll}
        >
          <PlayIcon className="h-4 w-4" />
          {generatingAll ? "Generating…" : `Generate All (${generatableCount})`}
        </button>
      </div>

      <div className="mb-5 flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 p-4">
        <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />
        <div>
          <div className="text-sm font-semibold text-orange-700">
            Phase 1 Active — Restricted Inputs Only
          </div>
          <p className="mt-1 text-xs leading-6 text-amber-900">
            Each CBLM document is generated from its corresponding MOI module
            once CLM, Course Design, and MOI phases are complete. Information
            Sheet body content uses LLM knowledge plus CS, CBC, and MOI
            documents only. Phase 2 (user-provided URLs) is gated behind TESDA
            quality validation.
          </p>
        </div>
      </div>

      <div className="space-y-0">
        <CblmModuleTable
          competencyType="basic"
          modules={basic}
          title={`Basic Competencies (${basic.length})`}
        />
        <CblmModuleTable
          competencyType="common"
          modules={common}
          title={`Common Competencies (${common.length})`}
          onGenerate={() => showToast("CBLM generation started", "#2563EB")}
        />
        <CblmModuleTable
          competencyType="core"
          modules={core}
          title={`Core Competencies (${core.length})`}
          onGenerate={() => showToast("CBLM generation started", "#2563EB")}
        />
      </div>

      <CblmToast toast={toast} />
    </CblmPageShell>
  );
}
