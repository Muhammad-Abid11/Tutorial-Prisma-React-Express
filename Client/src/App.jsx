import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo as deleteTodoService,
} from "./api/todoServices";
import Logout from "./components/Logout";

// Private Route Component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/signin" />;
};

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch todos on mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data.todos || []);
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/signin");
        }
        console.error("Failed to fetch todos", error);
        toast.error(error.response?.data?.error || "Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [navigate]);

  const addTodo = async (text) => {
    try {
      const { todo } = await createTodo(text);
      setTodos((prev) => [todo, ...prev]);
      return true;
    } catch (error) {
      console.error("Failed to add todo", error);
      toast.error(error.response?.data?.error || "Failed to add todo");
      return false;
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todoToUpdate = todos.find((t) => t.id === id);
      if (!todoToUpdate) return false;

      const updatedData = {
        title: todoToUpdate.title,
        completed: !todoToUpdate.completed,
      };

      const { todo: updatedTodo } = await updateTodo(id, updatedData);

      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
      return true;
    } catch (error) {
      console.error("Failed to toggle todo", error);
      toast.error(error.response?.data?.error || "Failed to toggle todo");
      return false;
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteTodoService(id);
      setTodos(todos.filter((todo) => todo.id !== id));
      return true;
    } catch (error) {
      console.error("Failed to delete todo", error);
      toast.error(error.response?.data?.error || "Failed to delete todo");
      return false;
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
    <div className="min-h-screen bg-slate-900 text-white py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Logout />

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

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <TodoApp />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
