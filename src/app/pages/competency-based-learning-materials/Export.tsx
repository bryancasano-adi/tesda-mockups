import { Navigate } from "react-router-dom";

/** Legacy route — export lives inside the consolidation shell. */
export function CBLMExport() {
  return <Navigate replace to="/cblm/demo/consolidation?page=export" />;
}
