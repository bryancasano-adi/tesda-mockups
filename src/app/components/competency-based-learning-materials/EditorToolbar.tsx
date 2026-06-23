import { Link } from "react-router-dom";
import { cblm, cblmBtn } from "./cblmClasses";

export function EditorToolbar({
  backHref,
  backLabel,
  nextHref,
  nextLabel,
  onSave,
  onValidate,
  saved,
  showValidate = true,
}: {
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
      <div className="flex items-center gap-1.5">
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
