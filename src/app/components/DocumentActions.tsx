import { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Eye, Download, Edit, FileText, Trash2, CheckCircle, RefreshCw } from 'lucide-react';

interface DocumentActionsProps {
  documentName: string;
  status: 'finalized' | 'draft' | 'not-started';
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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Dropdown Menu - Ellipsis First */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 hover:bg-[#F5F5F5] rounded transition-colors"
          aria-label="Document actions"
        >
          <MoreHorizontal size={18} className="text-[#666]" />
        </button>

        {isOpen && (
          <div className="absolute right-0 bottom-full mb-1 w-48 bg-white border border-[#E0E0E0] rounded-lg shadow-lg z-[100] py-1">
            {/* Generate */}
            {showGenerate && (
              <button
                onClick={() => handleAction(onView)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-[#F5F5F5] flex items-center gap-3"
              >
                <FileText size={16} className="text-[#666]" />
                <span>Generate</span>
              </button>
            )}

            {/* View/Edit */}
            <button
              onClick={() => handleAction(status === 'finalized' ? onView : (onEdit || onView))}
              className="w-full px-4 py-2 text-left text-sm hover:bg-[#E3F2FD] bg-[#E3F2FD] flex items-center gap-3 border-l-2 border-[#1976D2]"
            >
              {status === 'finalized' ? (
                <>
                  <Eye size={16} className="text-[#1976D2]" />
                  <span className="font-medium text-[#1976D2]">View</span>
                </>
              ) : (
                <>
                  <Edit size={16} className="text-[#1976D2]" />
                  <span className="font-medium text-[#1976D2]">Edit</span>
                </>
              )}
            </button>

            {/* Download */}
            {status === 'finalized' && onDownload && (
              <button
                onClick={() => handleAction(onDownload)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-[#F5F5F5] flex items-center gap-3"
              >
                <Download size={16} className="text-[#666]" />
                <span>Download</span>
              </button>
            )}

            {/* View Logs */}
            {showLogs && (
              <button
                onClick={() => handleAction(() => alert('View Logs for ' + documentName))}
                className="w-full px-4 py-2 text-left text-sm hover:bg-[#F5F5F5] flex items-center gap-3"
              >
                <FileText size={16} className="text-[#666]" />
                <span>View Logs</span>
              </button>
            )}

            {/* Finalize */}
            {status === 'draft' && onFinalize && (
              <>
                <div className="my-1 border-t border-[#E0E0E0]" />
                <button
                  onClick={() => handleAction(onFinalize)}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-[#E3F2FD] flex items-center gap-3 text-[#1976D2] font-medium"
                >
                  <CheckCircle size={16} />
                  <span>Finalize</span>
                </button>
              </>
            )}

            {/* Delete */}
            {onDelete && (
              <>
                <div className="my-1 border-t border-[#E0E0E0]" />
                <button
                  onClick={() => handleAction(onDelete)}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-[#FFEBEE] flex items-center gap-3 text-[#D32F2F]"
                >
                  <Trash2 size={16} />
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
          onClick={onRefresh}
          className="p-1.5 hover:bg-[#E3F2FD] rounded transition-colors"
          aria-label="Refresh"
        >
          <RefreshCw size={16} className="text-[#1976D2]" />
        </button>
      )}
    </div>
  );
}