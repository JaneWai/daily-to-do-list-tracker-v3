import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo';
import { ClipboardList } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  toggleComplete, 
  deleteTodo,
  editTodo
}) => {
  if (todos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <ClipboardList size={48} className="mx-auto text-gray-300 mb-3" />
        <h3 className="text-xl font-medium text-gray-600 mb-2">No tasks yet</h3>
        <p className="text-gray-500">Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
