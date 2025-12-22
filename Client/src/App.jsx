import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo as deleteTodoService,
} from "./api/todoServices";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch todos on mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data.todos || []);
      } catch (error) {
        console.error("Failed to fetch todos", error);
        toast.error(error.response?.data?.error || "Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    try {
      const { todo } = await createTodo(text);
      setTodos([...todos, todo]);
    } catch (error) {
      console.error("Failed to add todo", error);
      toast.error(error.response?.data?.error || "Failed to add todo");
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todoToUpdate = todos.find((t) => t.id === id);
      if (!todoToUpdate) return;

      const updatedData = {
        title: todoToUpdate.title,
        completed: !todoToUpdate.completed,
      };

      const { todo: updatedTodo } = await updateTodo(id, updatedData);

      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Failed to toggle todo", error);
      toast.error(error.response?.data?.error || "Failed to toggle todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteTodoService(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo", error);
      toast.error(error.response?.data?.error || "Failed to delete todo");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white py-20 px-4">
      <Toaster position="top-right" />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          My Todo List
        </h1>

        <div className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm border border-slate-700 shadow-xl">
          <TodoInput onAdd={addTodo} />

          <div className="space-y-1">
            {todos.length === 0 ? (
              <p className="text-center text-slate-500 py-8">
                No tasks yet. Add one above!
              </p>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-700 flex justify-between text-sm text-slate-400">
            <span>{todos.filter((t) => !t.completed).length} items left</span>
            <span>{todos.length} total tasks</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
