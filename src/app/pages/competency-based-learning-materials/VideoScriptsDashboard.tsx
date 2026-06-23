import { CblmPageShell } from "@/app/components/competency-based-learning-materials/CblmFrontendPrimitives";
import { VideoScriptsView } from "@/app/components/competency-based-learning-materials/VideoScriptsView";
import {
  CblmToast,
  useCblmToast,
} from "@/app/components/competency-based-learning-materials/cblmMockupHooks";

export function VideoScriptsDashboard() {
  const { toast, showToast } = useCblmToast();

  return (
    <CblmPageShell>
      <VideoScriptsView showToast={showToast} />
      <CblmToast toast={toast} />
    </CblmPageShell>
  );
}
