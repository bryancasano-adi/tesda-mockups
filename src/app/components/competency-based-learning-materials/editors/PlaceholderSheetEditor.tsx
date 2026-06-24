import { Link } from "react-router-dom";
import type { SheetKind } from "@/app/pages/competency-based-learning-materials/Dashboard";
import { cblmEditorPath } from "@/app/utils/cblmRoutes";

export function PlaceholderSheetEditor({
  meta,
}: {
  kind: SheetKind;
  meta: { code: string; label: string };
}) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-8 text-center text-sm text-gray-600">
      <p className="mb-2 font-semibold text-gray-800">
        {meta.code} — {meta.label}
      </p>
      <p className="mb-4 text-xs text-gray-500">
        This sheet type is not included in the current mockup set.
      </p>
      <Link
        className="inline-flex rounded-md bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white no-underline hover:bg-blue-800"
        to={cblmEditorPath(undefined, "information-sheet")}
      >
        Open Information Sheet 1.1-1 Editor
      </Link>
    </div>
  );
}
