interface DeleteConfirmDialogProps {
  itemNumber: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmDialog({
  itemNumber,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 text-gray-800">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0E0E0]">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-[#333]">
              Delete MCQ Item
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <p className="text-sm text-[#666] mb-4">
            Are you sure you want to delete <strong>Item {itemNumber}</strong>?
            This action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E0E0E0] bg-[#FAFAFA] flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#C62828] text-white rounded text-sm font-medium hover:bg-[#B71C1C] transition-colors"
            onClick={onConfirm}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}
