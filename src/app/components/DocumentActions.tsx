import { useState, useRef, useEffect } from "react";
import {
  ArrowPathIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  FolderArrowDownIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

interface DocumentActionsProps {
  documentName: string;
  status: "finalized" | "draft" | "not-started";
  onView: () => void;
  onEdit?: () => void;
  onDownload?: () => void;
  onFinalize?: () => void;
  onDelete?: () => void;
  onRefresh?: () => void;
  showGenerate?: boolean;
  showLogs?: boolean;
}

export function DocumentActions({
  documentName,
  status,
  onView,
  onEdit,
  onDownload,
  onFinalize,
  onDelete,
  onRefresh,
  showGenerate = false,
  showLogs = false,
}: DocumentActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Dropdown Menu - Ellipsis First */}
      <div ref={dropdownRef} className="relative">
        <button
          aria-label="Document actions"
          className="p-1.5 hover:bg-[#F5F5F5] rounded transition-colors text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          <EllipsisHorizontalIcon className="h-5 w-5 inline" />
        </button>

        {isOpen && (
          <div className="absolute right-0 bottom-full mb-1 w-48 bg-white border border-[#E0E0E0] rounded-lg shadow-lg z-[100] py-1">
            {/* Generate */}
            {showGenerate && (
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-[#F5F5F5] flex items-center gap-3 text-gray-700 font-medium"
                onClick={() => handleAction(onView)}
              >
                <DocumentTextIcon className="h-5 w-5 inline" />
                <span>Generate</span>
              </button>
            )}

            {/* View/Edit */}
            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-[#E3F2FD] bg-[#E3F2FD] flex items-center gap-3 border-l-2 border-[#1976D2] text-gray-700 font-medium"
              onClick={() =>
                handleAction(status === "finalized" ? onView : onEdit || onView)
              }
            >
              {status === "finalized" ? (
                <>
                  <EyeIcon className="h-5 w-5 inline" />
                  <span>View</span>
                </>
              ) : (
                <>
                  <PencilSquareIcon className="h-5 w-5 inline" />
                  <span>Edit</span>
                </>
              )}
            </button>

            {/* Download */}
            {status === "finalized" && onDownload && (
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-[#F5F5F5] flex items-center gap-3 text-gray-700 font-medium"
                onClick={() => handleAction(onDownload)}
              >
                <FolderArrowDownIcon className="h-5 w-5 inline" />
                <span>Download</span>
              </button>
            )}

            {/* View Logs */}
            {showLogs && (
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-[#F5F5F5] flex items-center gap-3 text-gray-700 font-medium"
                onClick={() =>
                  handleAction(() => alert("View Logs for " + documentName))
                }
              >
                <DocumentTextIcon className="h-5 w-5 inline" />
                <span>View Logs</span>
              </button>
            )}

            {/* Finalize */}
            {status === "draft" && onFinalize && (
              <>
                <div className="my-1 border-t border-[#E0E0E0]" />
                <button
                  className="w-full px-4 py-2 text-left text-sm hover:bg-[#E3F2FD] flex items-center gap-3 text-[#1976D2] font-medium text-gray-700 font-medium"
                  onClick={() => handleAction(onFinalize)}
                >
                  <CheckCircleIcon className="h-5 w-5 inline" />
                  <span>Finalize</span>
                </button>
              </>
            )}

            {/* Delete */}
            {onDelete && (
              <>
                <div className="my-1 border-t border-[#E0E0E0]" />
                <button
                  className="w-full px-4 py-2 text-left text-sm hover:bg-[#FFEBEE] flex items-center gap-3 text-gray-700 font-medium"
                  onClick={() => handleAction(onDelete)}
                >
                  <TrashIcon className="h-5 w-5 inline" />
                  <span>Delete</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Refresh Button - Second */}
      {onRefresh && (
        <button
          aria-label="Refresh"
          className="p-1.5 hover:bg-[#E3F2FD] rounded transition-colors text-gray-700 font-medium"
          onClick={onRefresh}
        >
          <ArrowPathIcon className="h-5 w-5 inline" />
        </button>
      )}
    </div>
  );
}
