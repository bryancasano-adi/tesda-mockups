import type { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { SheetKind, sheetMeta } from "./Dashboard";
import { CblmEditorLayout } from "@/app/components/competency-based-learning-materials/CblmEditorLayout";
import { SheetNavigation } from "@/app/components/competency-based-learning-materials/SheetNavigation";
import { EditorToolbar } from "@/app/components/competency-based-learning-materials/EditorToolbar";
import { NoticeBar } from "@/app/components/competency-based-learning-materials/NoticeBar";
import {
  CblmSourcePanel,
  defaultSheetSourceBlocks,
} from "@/app/components/competency-based-learning-materials/CblmSourcePanel";
import {
  CblmToast,
  useCblmToast,
  useSaveValidate,
} from "@/app/components/competency-based-learning-materials/cblmMockupHooks";
import { moduleSheetNavItems, ucMeta } from "@/app/data/cblmData";
import { InformationSheetEditor } from "@/app/components/competency-based-learning-materials/editors/InformationSheetEditor";
import { TaskSheetEditor } from "@/app/components/competency-based-learning-materials/editors/TaskSheetEditor";
import { JobSheetEditor } from "@/app/components/competency-based-learning-materials/editors/JobSheetEditor";
import { LearningExperiencesTableEditor } from "@/app/components/competency-based-learning-materials/editors/LearningExperiencesTableEditor";
import { PlaceholderSheetEditor } from "@/app/components/competency-based-learning-materials/editors/PlaceholderSheetEditor";

const NAV_ACTIVE: Record<SheetKind, string> = {
  "information-sheet": "is-1-1-1",
  "task-sheet": "ts-1-1-1",
  "job-sheet": "js-1",
  "learning-experiences-table": "let-1",
  "self-check": "sc-1-1-1",
  "answer-key": "ak-1-1-1",
  "performance-criterion": "ts-1-1-1",
  "outcome-statement": "is-1-1-1",
};

const NOTICE: Partial<Record<SheetKind, ReactNode>> = {
  "information-sheet": (
    <>
      📋 <strong>IS 1.1.1</strong> — Information Sheet. AI-synthesized content is editable.
      Copied content from CS/CBC is read-only.
    </>
  ),
  "task-sheet": (
    <>
      📋 <strong>TS 1.1.1</strong> — Task Sheet. Generated because LO 1 assessment criteria
      require demonstration of LOTO and PPE procedures.
    </>
  ),
  "job-sheet": (
    <>
      📋 <strong>JS 1</strong> — Job Sheet. Consolidates all Task Sheets from Module 1.
    </>
  ),
  "learning-experiences-table": (
    <>
      📋 <strong>LET</strong> — Auto-generated from validated sheets. Editable activities and
      special instructions per LO.
    </>
  ),
};

export function CBLMEditor() {
  const [searchParams] = useSearchParams();
  const { toast, showToast } = useCblmToast();
  const { saved, saveSheet, validateSheet } = useSaveValidate(showToast);

  const page = searchParams.get("page") as SheetKind | null;
  const validKinds = Object.keys(sheetMeta) as SheetKind[];
  const kind: SheetKind =
    page && validKinds.includes(page) ? page : "information-sheet";
  const meta = sheetMeta[kind];
  const activeNavId = NAV_ACTIVE[kind] ?? "is-1-1-1";

  const renderEditor = () => {
    switch (kind) {
      case "information-sheet":
        return <InformationSheetEditor showToast={showToast} />;
      case "task-sheet":
        return <TaskSheetEditor showToast={showToast} />;
      case "job-sheet":
        return <JobSheetEditor showToast={showToast} />;
      case "learning-experiences-table":
        return <LearningExperiencesTableEditor />;
      default:
        return <PlaceholderSheetEditor kind={kind} meta={meta} />;
    }
  };

  return (
    <>
      <CblmEditorLayout
        sheetNav={
          <SheetNavigation
            title="Module 1"
            subtitle={`${ucMeta.code} — EV Inspection`}
            items={moduleSheetNavItems}
            activeId={activeNavId}
            backHref="/cbc/cblm"
            backLabel="Back to Module 1"
          />
        }
        toolbar={
          <EditorToolbar
            crumbs={[
              { label: "CBC", href: "/" },
              { label: `${ucMeta.code} CBLM`, href: "/cbc/cblm" },
              { label: meta.code },
            ]}
            backHref="/cbc/cblm"
            backLabel="Module"
            nextHref={
              kind === "information-sheet" ? "/cbc/editor?page=task-sheet" : undefined
            }
            nextLabel={kind === "information-sheet" ? "TS 1.1.1" : undefined}
            onSave={saveSheet}
            onValidate={validateSheet}
            saved={saved}
          />
        }
        notice={
          <NoticeBar>
            {NOTICE[kind] ?? (
              <>
                📋 <strong>{meta.code}</strong> — {meta.label}
              </>
            )}
          </NoticeBar>
        }
        sourcePanel={
          <CblmSourcePanel
            blocks={defaultSheetSourceBlocks}
            footerNote={
              <>
                <strong style={{ color: "#1565C0" }}>Phase 1</strong> — LLM knowledge +
                CS/CBC/CLM only.
                <br />
                No URL fetch or web search in Phase 1.
              </>
            }
          />
        }
      >
        {renderEditor()}
      </CblmEditorLayout>
      <CblmToast toast={toast} />
    </>
  );
}
