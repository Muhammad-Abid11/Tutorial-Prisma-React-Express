import { useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Master Tailwind CSS', completed: false },
    { id: 3, text: 'Build a cool app', completed: false },
  ])

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }])
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white py-20 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          My Todo List
        </h1>
        
        <div className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm border border-slate-700 shadow-xl">
          <TodoInput onAdd={addTodo} />
          
          <div className="space-y-1">
            {todos.length === 0 ? (
              <p className="text-center text-slate-500 py-8">No tasks yet. Add one above!</p>
            ) : (
              todos.map(todo => (
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
            <span>{todos.filter(t => !t.completed).length} items left</span>
            <span>{todos.length} total tasks</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
