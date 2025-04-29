import React, { useState, useEffect } from 'react';
import { CheckCircle, ListTodo } from 'lucide-react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import EditTodoModal from './components/EditTodoModal';
import { Todo } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        // Parse the JSON and convert string dates back to Date objects
        return JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
      } catch (e) {
        console.error('Error parsing todos from localStorage', e);
        return [];
      }
    }
    return [];
  });
  
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (todoToEdit) {
      setEditingTodo(todoToEdit);
    }
  };

  const saveTodo = (updatedTodo: Todo) => {
    setTodos(
      todos.map(todo => 
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    );
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <ListTodo size={48} className="text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Daily Task Tracker</h1>
          <p className="text-gray-600">Keep track of your tasks and boost your productivity</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <TodoForm addTodo={addTodo} />
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Summary</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active Tasks:</span>
                  <span className="font-medium text-indigo-600">{activeTodosCount}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Completed:</span>
                  <span className="font-medium text-green-600">{completedTodosCount}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-medium">{todos.length}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">My Tasks</h2>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1 text-sm rounded-md ${
                      filter === 'all' 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter('active')}
                    className={`px-3 py-1 text-sm rounded-md ${
                      filter === 'active' 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setFilter('completed')}
                    className={`px-3 py-1 text-sm rounded-md ${
                      filter === 'completed' 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Completed
                  </button>
                </div>
              </div>
              
              <TodoList 
                todos={filteredTodos} 
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            </div>
          </div>
        </div>
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Daily Task Tracker - Built with ChatAndBuild</p>
        </footer>
      </div>
      
      {editingTodo && (
        <EditTodoModal 
          todo={editingTodo} 
          onClose={() => setEditingTodo(null)} 
          onSave={saveTodo}
        />
      )}
    </div>
  );
}

export default App;
