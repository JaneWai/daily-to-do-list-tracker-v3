import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoFormProps {
  addTodo: (todo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      description,
      targetDate,
      completed: false,
      createdAt: new Date(),
    };
    
    addTodo(newTodo);
    
    // Reset form
    setTitle('');
    setDescription('');
    setTargetDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Task</h2>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Task Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="What needs to be done?"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Add details about this task..."
          rows={3}
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700 mb-1">
          Target Completion Date
        </label>
        <input
          type="date"
          id="targetDate"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      
      <button
        type="submit"
        className="flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out"
      >
        <PlusCircle size={18} className="mr-2" />
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
