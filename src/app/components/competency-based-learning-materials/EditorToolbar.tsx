import { Link } from "react-router-dom";
import { cblm, cblmBtn } from "./cblmClasses";

export function EditorToolbar({
  crumbs,
  backHref,
  backLabel,
  nextHref,
  nextLabel,
  onSave,
  onValidate,
  saved,
  showValidate = true,
}: {
  crumbs: { label: string; href?: string }[];
  backHref?: string;
  backLabel?: string;
  nextHref?: string;
  nextLabel?: string;
  onSave: () => void;
  onValidate?: () => void;
  saved?: boolean;
  showValidate?: boolean;
}) {
  return (
    <div className={cblm.editorBar}>
      <div className={cblm.breadcrumb} style={{ margin: 0 }}>
        {crumbs.map((c, i) => (
          <span key={c.label}>
            {i > 0 && " › "}
            {c.href ? (
              <Link to={c.href}>{c.label}</Link>
            ) : (
              <strong>{c.label}</strong>
            )}
          </span>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-1.5">
        {backHref && backLabel && (
          <Link to={backHref} className={cblmBtn("secondary", "text-xs")}>
            ← {backLabel}
          </Link>
        )}
        {nextHref && nextLabel && (
          <Link to={nextHref} className={cblmBtn("secondary", "text-xs")}>
            {nextLabel} →
          </Link>
        )}
        <button
          type="button"
          className={cblmBtn("secondary", "text-xs")}
          onClick={onSave}
        >
          {saved ? "Saved" : "Save"}
        </button>
        {showValidate && onValidate && (
          <button
            type="button"
            className={cblmBtn("primary", "text-xs")}
            onClick={onValidate}
          >
            ✓ Finalize
          </button>
        )}
      </div>
    </div>
  );
}
