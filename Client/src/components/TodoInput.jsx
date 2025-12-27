import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2, Plus } from "lucide-react";

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (text.trim().length < 3) {
      toast.error("Title must be at least 3 characters long");
      return;
    }

    setLoading(true);
    const success = await onAdd(text);
    if (success) {
      setText("");
      toast.success("Todo added successfully");
    }
    setLoading(false);
  };

  const isDisabled = !text.trim() || loading;

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={text}
        disabled={loading}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isDisabled}
        className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
      >
        {loading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <div className="flex items-center gap-1">
            <Plus size={20} />
            <span>Add</span>
          </div>
        )}
      </button>
    </form>
  );
}
