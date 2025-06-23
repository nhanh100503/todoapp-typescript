import React, { useState } from 'react';

interface TaskInputProps {
  onCreate: (name: string) => Promise<void>;
}

const TaskInput: React.FC<TaskInputProps> = ({ onCreate }) => {
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    setLoading(true);
    try {
      await onCreate(newTask);
      setNewTask('');
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="What is the task today?"
        value={newTask}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleAddTask();
        }}
        onChange={(e) => setNewTask(e.target.value)}
        className="flex-1 bg-slate-700 border border-slate-600 text-white placeholder:text-slate-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        onClick={handleAddTask}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </div>
  );
};

export default TaskInput;
