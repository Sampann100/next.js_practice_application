import { Trash2 } from "lucide-react";

export default function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
  isDeleting,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-6">
          <Trash2 className="text-rose-600 w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Delete Product?</h2>
        <p className="text-slate-500 mt-3 leading-relaxed">
          This will permanently remove the item. This action <span className="text-rose-600 font-bold">cannot be undone</span>.
        </p>
        <div className="flex gap-3 mt-10">
          <button onClick={onClose} disabled={isDeleting} className="flex-1 px-6 py-4 rounded-2xl border-2 border-slate-100 font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            Go Back
          </button>
          <button onClick={onConfirm} disabled={isDeleting} className="flex-1 px-6 py-4 rounded-2xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-100">
            {isDeleting ? "Deleting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}