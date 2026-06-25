import { Navigate, useSearchParams } from "react-router-dom";
import { SheetKind, sheetMeta } from "./Dashboard";
import { CblmEditorLayout } from "@/app/components/competency-based-learning-materials/CblmEditorLayout";
import { SheetEditorShell } from "@/app/components/competency-based-learning-materials/SheetEditorShell";
import {
  resolveEditorNavItem,
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
import { OperationSheetEditor } from "@/app/components/competency-based-learning-materials/editors/OperationSheetEditor";
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
  const sheetParam = searchParams.get("sheet");
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
  const navItem =
    kind in SHEET_PAGE_CONFIG
      ? resolveEditorNavItem(kind as SheetEditorPage, sheetParam)
      : undefined;
  const activeSheetCode = navItem?.code ?? pageConfig?.sheetCode ?? meta.code;
  const activeSheetType =
    navItem?.sheetType ?? pageConfig?.sheetType ?? "information-sheet";
  const sheetStatus = navItem?.status ?? pageConfig?.status;

  const renderEditor = () => {
    const editorKey = `${kind}:${activeSheetCode}`;

    switch (kind) {
      case "information-sheet":
        return (
          <InformationSheetEditor key={editorKey} sheetCode={activeSheetCode} />
        );
      case "self-check":
        return <SelfCheckEditor key={editorKey} sheetCode={activeSheetCode} />;
      case "answer-key":
        return <AnswerKeyEditor key={editorKey} sheetCode={activeSheetCode} />;
      case "task-sheet":
        return <TaskSheetEditor key={editorKey} sheetCode={activeSheetCode} />;
      case "performance-criterion":
        return <PccEditor key={editorKey} sheetCode={activeSheetCode} />;
      case "operation-sheet":
        return (
          <OperationSheetEditor key={editorKey} sheetCode={activeSheetCode} />
        );
      default:
        return <PlaceholderSheetEditor kind={kind} meta={meta} />;
    }
  };

  if (!pageConfig) {
    return (
      <>
        <CblmEditorLayout sheetNav={null} sourcePanel={null} notice={null} toolbar={null}>
          <SheetEditorShell
            activeSheetCode={activeSheetCode}
            activeSheetType={activeSheetType}
            sheetStatus={sheetStatus ?? "draft"}
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
          activeSheetCode={activeSheetCode}
          activeSheetType={activeSheetType}
          sheetStatus={sheetStatus}
        >
          {renderEditor()}
        </SheetEditorShell>
      </CblmEditorLayout>
      <CblmToast toast={toast} />
    </>
  );
}
