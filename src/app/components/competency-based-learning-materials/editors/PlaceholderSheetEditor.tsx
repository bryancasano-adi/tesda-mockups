import { Link } from "react-router-dom";
import type { SheetKind } from "@/app/pages/competency-based-learning-materials/Dashboard";
import { cblmBtn } from "../cblmClasses";

export function PlaceholderSheetEditor({
  kind,
  meta,
}: {
  kind: SheetKind;
  meta: { code: string; label: string };
}) {
  return (
    <div style={{ padding: 24, textAlign: "center", color: "#666" }}>
      <p style={{ fontSize: 14, marginBottom: 12 }}>
        <strong>{meta.code}</strong> — {meta.label} mockup is not included in the
        current HTML export set.
      </p>
      <p style={{ fontSize: 12, marginBottom: 16 }}>
        Translated editors: IS, TS, JS, LET, and Video Scripts.
      </p>
      <Link to="/cblm/editor?page=information-sheet" className={cblmBtn("primary", "text-xs")}>
        Open IS 1.1.1 Editor
      </Link>
    </div>
  );
}
