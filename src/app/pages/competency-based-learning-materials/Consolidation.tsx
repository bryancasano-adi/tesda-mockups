import type { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

import { CblmEditorLayout } from "@/app/components/competency-based-learning-materials/CblmEditorLayout";
import { ConsolidationShell } from "@/app/components/competency-based-learning-materials/ConsolidationShell";
import { ConsolidationExportContent } from "@/app/components/competency-based-learning-materials/ConsolidationExportContent";
import { JobSheetEditor } from "@/app/components/competency-based-learning-materials/editors/JobSheetEditor";
import { LearningExperiencesTableEditor } from "@/app/components/competency-based-learning-materials/editors/LearningExperiencesTableEditor";
import { ConsolidatedReferencesEditor } from "@/app/components/competency-based-learning-materials/editors/ConsolidatedReferencesEditor";
import {
  CONSOLIDATION_NAV,
  type ConsolidationPageId,
} from "@/app/components/competency-based-learning-materials/consolidation-nav";
import {
  CblmToast,
  useCblmToast,
} from "@/app/components/competency-based-learning-materials/cblmMockupHooks";
import {
  consolidationPageStatuses,
  ucMeta,
} from "@/app/data/cblmData";

function pageNotice(page: ConsolidationPageId) {
  switch (page) {
    case "job-sheet":
      return "JS 1 — Job Sheet. Consolidates all Task Sheets from Module 1. Synthesized content is editable. Generated after Step 2 is finalized.";
    case "learning-experiences":
      return "LET — Auto-generated from finalized Step 2 sheets. Editable activities and special instructions per LO.";
    case "references":
      return "References — consolidated from inline references across all Information Sheets.";
    case "export":
      return "Export — download the complete CBLM module as a TESDA-formatted Word document.";
    default:
      return "Step 3 — Consolidation.";
  }
}

export function CBLMConsolidation() {
  const [searchParams] = useSearchParams();
  const { toast, showToast } = useCblmToast();

  const pageParam = searchParams.get("page") as ConsolidationPageId | null;
  const validPages = CONSOLIDATION_NAV.map((item) => item.id);
  const page: ConsolidationPageId =
    pageParam && validPages.includes(pageParam) ? pageParam : "job-sheet";

  const pageStatus = consolidationPageStatuses[page];

  const renderPage = (): ReactNode => {
    switch (page) {
      case "job-sheet":
        return <JobSheetEditor showToast={showToast} />;
      case "learning-experiences":
        return <LearningExperiencesTableEditor />;
      case "references":
        return <ConsolidatedReferencesEditor showToast={showToast} />;
      case "export":
        return <ConsolidationExportContent showToast={showToast} />;
      default:
        return null;
    }
  };

  return (
    <>
      <CblmEditorLayout sheetNav={null} sourcePanel={null} notice={null} toolbar={null}>
        <ConsolidationShell
          activePage={page}
          notice={pageNotice(page)}
          pageStatus={page === "export" ? undefined : pageStatus}
          taskSheetCodes="TS 1.1.1"
        >
          {renderPage()}
        </ConsolidationShell>
      </CblmEditorLayout>
      <CblmToast toast={toast} />
    </>
  );
}
