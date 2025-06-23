import Header from '@components/Header';
import TaskInput from '@components/TaskInput';
import TaskList from '@components/TaskList';
import { getAllTasks, updateTask, deleteTask, createTask, updateStatusTask } from '@services/task.service';
import { useEffect, useState } from 'react';
import type { TaskResponse, TaskUpdate } from 'types/task';

function App() {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);

  const fetchTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (name: string) => {
    try {
      const newTask = await createTask({ name });
      setTasks((prev) => [newTask, ...prev]);
      await fetchTasks(); 
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdate = async (updatedTask: TaskResponse) => {
    try {
      const updatedData: TaskUpdate = { name: updatedTask.name };
      const result = await updateTask(updatedTask.id, updatedData);
      setTasks((prev) =>
        prev.map((t) => (t.id === result.id ? result : t))
      );
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleToggleStatus = async (id: string) => {
  try {
    const updated = await updateStatusTask(id);
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  } catch (error) {
    console.error('Failed to update task status:', error);
  }
};


  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-slate-800 rounded-2xl p-6 shadow-2xl">
        <Header />
        <TaskInput onCreate={handleCreate} />
        <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} onToggleStatus={handleToggleStatus} />
      </div>
    </div>
  );
}

export default App;
