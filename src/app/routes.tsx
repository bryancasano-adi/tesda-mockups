import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "./components/RootLayout";

import { CATSDashboard } from "./pages/competency-assessment-tool/CATSDashboard";
import { EvidencePlanEditor } from "./pages/competency-assessment-tool/EvidencePlanEditor";
import { OutlineView } from "./pages/competency-assessment-tool/OutlineView";
import { DemonstrationTestEditor } from "./pages/competency-assessment-tool/DemonstrationTestEditor";
import { QuestioningToolEditor } from "./pages/competency-assessment-tool/QuestioningToolEditor";
import { QuestioningToolConfig } from "./pages/competency-assessment-tool/QuestioningToolConfig";
import { MCQConfig } from "./pages/competency-assessment-tool/MCQConfig";
import { MCQEditor } from "./pages/competency-assessment-tool/MCQEditor";
import { MCQTOSSummary } from "./pages/competency-assessment-tool/MCQTOSSummary";
import { MCQExternalAnalysis } from "./pages/competency-assessment-tool/MCQExternalAnalysis";
import { DistributionSettings } from "./pages/competency-assessment-tool/DistributionSettings";
import { AGAssemblyStatus } from "./pages/competency-assessment-tool/AGAssemblyStatus";
import { PackageNavigator } from "./pages/competency-assessment-tool/PackageNavigator";
import { AssessorsGuide } from "./pages/competency-assessment-tool/AssessorsGuide";
import { SICView } from "./pages/competency-assessment-tool/SICView";
import { WrittenTestView } from "./pages/competency-assessment-tool/WrittenTestView";
import { RatingSheetView } from "./pages/competency-assessment-tool/RatingSheetView";
import { SAGView } from "./pages/competency-assessment-tool/SAGView";
import { CARSView } from "./pages/competency-assessment-tool/CARSView";
import { FinalExport } from "./pages/competency-assessment-tool/FinalExport";
import { NotFound } from "./pages/competency-assessment-tool/NotFound";
import { LevelAlignmentMatrix } from "./pages/level-alignment-matrix/level-alignment-matrix";
import { ImplementingGuidelines } from "./pages/implementing-guidelines/implementing-guidelines";
import { LandingPage } from "./pages/LandingPage";
import { CblmDashboard } from "./pages/competency-based-learning-materials/CblmDashboard";
import { CBLMModule } from "./pages/competency-based-learning-materials/Module";
import { CBLMEditor } from "./pages/competency-based-learning-materials/Editor";
import { CBLMFrontMatter } from "./pages/competency-based-learning-materials/FrontMatter";
import { CBLMConsolidation } from "./pages/competency-based-learning-materials/Consolidation";
import { CBLMExport } from "./pages/competency-based-learning-materials/Export";
import { VideoScriptsDashboard } from "./pages/competency-based-learning-materials/VideoScriptsDashboard";
import { VideoScriptEditor } from "./pages/competency-based-learning-materials/VideoScriptEditor";
import { ControlDashboard } from "./pages/control-dashboard/Dashboard";
import { CBLM_BASE } from "./utils/cblmRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "/lam", Component: LevelAlignmentMatrix },
      { path: "/ig", Component: ImplementingGuidelines },
      {
        path: CBLM_BASE,
        children: [
          { index: true, Component: CblmDashboard },
          {
            path: ":cblmId",
            children: [
              { index: true, Component: CBLMModule },
              { path: "editor", Component: CBLMEditor },
              { path: "consolidation", Component: CBLMConsolidation },
              { path: "front-matter", Component: CBLMFrontMatter },
              { path: "export", Component: CBLMExport },
              {
                path: "video-scripts",
                children: [
                  { index: true, Component: VideoScriptsDashboard },
                  { path: "edit", Component: VideoScriptEditor },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "/cbc",
        element: <Navigate replace to={CBLM_BASE} />,
      },
      {
        path: "/cbc/clm",
        element: <Navigate replace to={CBLM_BASE} />,
      },
      { path: "/cats", Component: CATSDashboard },
      { path: "/cats/evidence-plan", Component: EvidencePlanEditor },
      { path: "/cats/outline", Component: OutlineView },
      { path: "/cats/demonstration-test", Component: DemonstrationTestEditor },
      { path: "/cats/questioning-tool", Component: QuestioningToolEditor },
      {
        path: "/cats/questioning-tool-config",
        Component: QuestioningToolConfig,
      },
      { path: "/cats/mcq-config", Component: MCQConfig },
      { path: "/cats/mcq", Component: MCQEditor },
      { path: "/cats/mcq-tos", Component: MCQTOSSummary },
      { path: "/cats/mcq-analysis", Component: MCQExternalAnalysis },
      { path: "/cats/distribution-settings", Component: DistributionSettings },
      { path: "/cats/ag-assembly", Component: AGAssemblyStatus },
      { path: "/cats/package-navigator", Component: PackageNavigator },
      { path: "/cats/assessors-guide", Component: AssessorsGuide },
      { path: "/cats/sic", Component: SICView },
      { path: "/cats/written-test", Component: WrittenTestView },
      { path: "/cats/rating-sheet", Component: RatingSheetView },
      { path: "/cats/sag", Component: SAGView },
      { path: "/cats/cars", Component: CARSView },
      { path: "/cats/export", Component: FinalExport },
      { path: "/control-dashboard", Component: ControlDashboard },
      { path: "*", Component: NotFound },
    ],
  },
]);
