/**
 * Legacy editor content — replaced by editors/* components.
 * Kept as a thin stub for any external imports.
 */
import type { SheetKind } from "@/app/pages/competency-based-learning-materials/Dashboard";

export function EditorContent({ kind }: { kind: SheetKind }) {
  return (
    <p style={{ padding: 24, color: "#666", fontSize: 13 }}>
      Editor content for <strong>{kind}</strong> is rendered via dedicated editor components in
      Editor.tsx.
    </p>
  );
}
