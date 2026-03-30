import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmDialogProps {
  itemNumber: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmDialog({ itemNumber, onConfirm, onCancel }: DeleteConfirmDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0E0E0]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FFEBEE] rounded-full">
              <AlertTriangle size={24} className="text-[#C62828]" />
            </div>
            <h2 className="text-lg font-semibold text-[#333]">Delete MCQ Item</h2>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <p className="text-sm text-[#666] mb-4">
            Are you sure you want to delete <strong>Item {itemNumber}</strong>?
          </p>
          <div className="p-3 bg-[#FFF3E0] border border-[#FFB74D] rounded text-sm text-[#E65100]">
            ⚠️ This action cannot be undone. The item will be permanently removed from the pool.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E0E0E0] bg-[#FAFAFA] flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#C62828] text-white rounded text-sm font-medium hover:bg-[#B71C1C] transition-colors"
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}
