import React, { useState } from 'react'
import { Edit2, Trash2 } from "lucide-react"
import type { Task } from 'types/task';
import { formatDateTime } from '@utils/formatDateTime';

interface TaskItemProps {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete, onToggleStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editedName.trim() !== '' && editedName !== task.name) {
      onUpdate({ ...task, name: editedName });
    } else {
      setEditedName(task.name);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div className="bg-purple-600 rounded-xl p-4 flex items-center justify-between group">
      <div className="flex items-center flex-1 gap-2">
        <input
          type="checkbox"
          checked={task.is_completed}
          onChange={() => onToggleStatus(task.id)}
          className="form-checkbox h-5 w-5 text-purple-300 rounded focus:ring-2 focus:ring-purple-300"
        />
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-purple-500 border border-purple-400 text-white placeholder:text-purple-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-300"
            autoFocus
          />
        ) : (
          <span className={`text-white font-medium flex-1 ${task.is_completed ? 'line-through opacity-70' : ''}`}>
            {task.name}
            <br />
            <small className="text-sm text-slate-300"> Thời gian tạo: {formatDateTime(task.create_at)}</small>
          </span>
        )}
      </div>

      <div className="flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleEdit}
          className="h-8 w-8 text-white hover:bg-purple-500 rounded flex items-center justify-center transition-colors"
        >
          <Edit2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="h-8 w-8 text-white hover:bg-purple-500 rounded flex items-center justify-center transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
