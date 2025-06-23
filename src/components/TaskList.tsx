import React from 'react';
import TaskItem from './TaskItem';
import type { TaskResponse } from 'types/task';

interface TaskListProps {
  tasks: TaskResponse[];
  onUpdate: (updatedTask: TaskResponse) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void; // 👈 thêm dòng này
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate, onDelete, onToggleStatus }) => {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
};

export default TaskList;
