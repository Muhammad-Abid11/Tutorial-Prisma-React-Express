import { useState } from "react";
import { Loader2, Trash2, CheckCircle2, Circle } from "lucide-react";
import toast from "react-hot-toast";
export default function TodoItem({ todo, onToggle, onDelete }) {
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    const success = await onToggle(todo.id);
    if (success) {
      toast.success("Todo toggled successfully");
    }
    setIsToggling(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const success = await onDelete(todo.id);
    if (success) {
      toast.success("Todo deleted successfully");
    }
    setIsDeleting(false);
  };

  return (
    <div className="flex items-center justify-between p-4 mb-3 bg-slate-800 rounded-lg border border-slate-700 hover:border-purple-500/50 transition-all group">
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggle}
          disabled={isToggling || isDeleting}
          className={`w-6 h-6 rounded flex items-center justify-center transition-all ${todo.completed
            ? "text-purple-500"
            : "text-slate-500 hover:text-purple-400"
            } disabled:opacity-50`}
        >
          {isToggling ? (
            <Loader2 size={20} className="animate-spin" />
          ) : todo.completed ? (
            <CheckCircle2 size={24} fill="currentColor" className="text-purple-600" />
          ) : (
            <Circle size={24} />
          )}
        </button>
        <span
          className={`text-lg transition-all ${todo.completed ? "text-slate-500 line-through" : "text-slate-100"
            }`}
        >
          {todo.title}
        </span>
      </div>
      <button
        onClick={handleDelete}
        disabled={isToggling || isDeleting}
        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 p-2 transition-all disabled:opacity-50"
        aria-label="Delete todo"
      >
        {isDeleting ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Trash2 size={18} />
        )}
      </button>
    </div>
  );
}
