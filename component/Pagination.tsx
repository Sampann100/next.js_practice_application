import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ current, total, onPageChange }: { current: number; total: number; onPageChange: (p: number) => void }) {
  if (total <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-12 pb-10">
      <button
        disabled={current === 1}
        onClick={() => onPageChange(current - 1)}
        className="p-4 rounded-2xl border-2 border-slate-100 text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-all"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex gap-2">
        {[...Array(total)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`w-12 h-12 rounded-2xl font-black transition-all ${
              current === i + 1 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-slate-400 hover:bg-slate-50"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        disabled={current === total}
        onClick={() => onPageChange(current + 1)}
        className="p-4 rounded-2xl border-2 border-slate-100 text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-all"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}