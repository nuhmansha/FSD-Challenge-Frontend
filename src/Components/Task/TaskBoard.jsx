import React from 'react';
import { useSelector } from 'react-redux';
import TaskColumn from './TaskColumn';

const TaskBoard = () => {
  const tasks = useSelector((state) => state.tasks);

  return (
    <div className="flex space-x-4 p-4">
      {['To Do', 'In Progress', 'Done'].map((status) => (
        <TaskColumn key={status} status={status} tasks={tasks.filter(task => task.status === status)} />
      ))}
    </div>
  );
};

export default TaskBoard;
