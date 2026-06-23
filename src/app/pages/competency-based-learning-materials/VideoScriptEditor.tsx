import { Navigate, useSearchParams } from "react-router-dom";

import { CblmEditorLayout } from "@/app/components/competency-based-learning-materials/CblmEditorLayout";
import { VideoScriptEditorContent } from "@/app/components/competency-based-learning-materials/VideoScriptEditorContent";
import { VideoScriptEditorShell } from "@/app/components/competency-based-learning-materials/VideoScriptEditorShell";
import {
  buildMockVideoScriptDocument,
  estimateScriptDurationMinutes,
  resolveActiveVideoScriptRow,
} from "@/app/components/competency-based-learning-materials/mock-video-scripts-utils";
import { videoScriptRows } from "@/app/data/cblmData";
import { cblmVideoScriptsPath } from "@/app/utils/cblmRoutes";

export function VideoScriptEditor() {
  const [searchParams] = useSearchParams();
  const sheet = searchParams.get("sheet");
  const row = resolveActiveVideoScriptRow(videoScriptRows, sheet);

  if (!row || row.scriptStatus !== "draft") {
    return <Navigate replace to={cblmVideoScriptsPath()} />;
  }

  const document = buildMockVideoScriptDocument(row);

  if (!document) {
    return <Navigate replace to={cblmVideoScriptsPath()} />;
  }

  return (
    <CblmEditorLayout sheetNav={null} sourcePanel={null} notice={null} toolbar={null}>
      <VideoScriptEditorShell
        activeSheetCode={row.code}
        durationEstimate={estimateScriptDurationMinutes(document.lines)}
        rows={videoScriptRows}
        scriptCode={document.scriptCode}
        sourcePccCode={document.sourcePccCode}
        sourceSheetCode={document.sourceSheetCode}
      >
        <VideoScriptEditorContent document={document} />
      </VideoScriptEditorShell>
    </CblmEditorLayout>
  );
}
