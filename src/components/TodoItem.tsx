import React from 'react';
import { Check, Calendar, Trash2, Edit } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  toggleComplete, 
  deleteTodo,
  editTodo
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm p-5 mb-4 border-l-4 transition-all ${todo.completed ? 'border-green-500 bg-green-50' : 'border-indigo-500'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <button 
            onClick={() => toggleComplete(todo.id)}
            className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              todo.completed 
                ? 'bg-green-500 border-green-500 text-white' 
                : 'border-gray-300 hover:border-indigo-500'
            }`}
          >
            {todo.completed && <Check size={14} />}
          </button>
          
          <div className="flex-1">
            <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {todo.title}
            </h3>
            
            {todo.description && (
              <p className={`mt-1 text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                {todo.description}
              </p>
            )}
            
            <div className="mt-3 flex flex-wrap items-center text-xs text-gray-500 space-x-4">
              <span className="flex items-center">
                Created: {formatDate(todo.createdAt)}
              </span>
              
              {todo.targetDate && (
                <span className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  Due: {todo.targetDate}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2 ml-4">
          <button 
            onClick={() => editTodo(todo.id)}
            className="text-gray-400 hover:text-indigo-600 transition-colors p-1"
            aria-label="Edit task"
          >
            <Edit size={18} />
          </button>
          <button 
            onClick={() => deleteTodo(todo.id)}
            className="text-gray-400 hover:text-red-600 transition-colors p-1"
            aria-label="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
