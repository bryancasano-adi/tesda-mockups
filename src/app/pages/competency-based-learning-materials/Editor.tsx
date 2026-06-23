import { Navigate, useSearchParams } from "react-router-dom";
import { SheetKind, sheetMeta } from "./Dashboard";
import { CblmEditorLayout } from "@/app/components/competency-based-learning-materials/CblmEditorLayout";
import { SheetEditorShell } from "@/app/components/competency-based-learning-materials/SheetEditorShell";
import {
  SHEET_PAGE_CONFIG,
  type SheetEditorPage,
} from "@/app/components/competency-based-learning-materials/sheet-nav";
import {
  CblmToast,
  useCblmToast,
} from "@/app/components/competency-based-learning-materials/cblmMockupHooks";
import { InformationSheetEditor } from "@/app/components/competency-based-learning-materials/editors/InformationSheetEditor";
import { SelfCheckEditor } from "@/app/components/competency-based-learning-materials/editors/SelfCheckEditor";
import { AnswerKeyEditor } from "@/app/components/competency-based-learning-materials/editors/AnswerKeyEditor";
import { TaskSheetEditor } from "@/app/components/competency-based-learning-materials/editors/TaskSheetEditor";
import { PccEditor } from "@/app/components/competency-based-learning-materials/editors/PccEditor";
import { consolidationNavHref } from "@/app/utils/cblmRoutes";
import { PlaceholderSheetEditor } from "@/app/components/competency-based-learning-materials/editors/PlaceholderSheetEditor";

const CONSOLIDATION_EDITOR_PAGES: Partial<
  Record<SheetKind, "job-sheet" | "learning-experiences">
> = {
  "job-sheet": "job-sheet",
  "learning-experiences-table": "learning-experiences",
};

export function CBLMEditor() {
  const [searchParams] = useSearchParams();
  const { toast } = useCblmToast();

  const page = searchParams.get("page") as SheetKind | null;
  const validKinds = Object.keys(sheetMeta) as SheetKind[];
  const kind: SheetKind =
    page && validKinds.includes(page) ? page : "information-sheet";

  const consolidationPage = CONSOLIDATION_EDITOR_PAGES[kind];
  if (consolidationPage) {
    return <Navigate replace to={consolidationNavHref(consolidationPage)} />;
  }

  const meta = sheetMeta[kind];
  const pageConfig =
    kind in SHEET_PAGE_CONFIG
      ? SHEET_PAGE_CONFIG[kind as SheetEditorPage]
      : undefined;

  const renderEditor = () => {
    switch (kind) {
      case "information-sheet":
        return <InformationSheetEditor />;
      case "self-check":
        return <SelfCheckEditor />;
      case "answer-key":
        return <AnswerKeyEditor />;
      case "task-sheet":
        return <TaskSheetEditor />;
      case "performance-criterion":
        return <PccEditor />;
      default:
        return <PlaceholderSheetEditor kind={kind} meta={meta} />;
    }
  };

  if (!pageConfig) {
    return (
      <>
        <CblmEditorLayout sheetNav={null} sourcePanel={null} notice={null} toolbar={null}>
          <SheetEditorShell
            activeSheetCode={meta.code}
            activeSheetType="information-sheet"
            sheetStatus="draft"
          >
            {renderEditor()}
          </SheetEditorShell>
        </CblmEditorLayout>
        <CblmToast toast={toast} />
      </>
    );
  }

  return (
    <>
      <CblmEditorLayout sheetNav={null} sourcePanel={null} notice={null} toolbar={null}>
        <SheetEditorShell
          activeSheetCode={pageConfig.sheetCode}
          activeSheetType={pageConfig.sheetType}
          sheetStatus={pageConfig.status}
        >
          {renderEditor()}
        </SheetEditorShell>
      </CblmEditorLayout>
      <CblmToast toast={toast} />
    </>
  );
}
