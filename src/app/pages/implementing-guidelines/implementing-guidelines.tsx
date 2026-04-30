import { ImplementingGuidelinesView } from "@/app/components/implementing-guidelines/ImplementingGuidelinesView";
import { useState } from "react";

export function ImplementingGuidelines() {
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="size-full flex flex-col bg-gray-50">
      <ImplementingGuidelinesView
        editMode={editMode}
        setEditMode={setEditMode}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
