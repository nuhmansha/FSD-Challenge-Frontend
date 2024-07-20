import React from 'react';
import TaskCard from './TaskCard';

const TaskColumn = ({ status, tasks }) => {
  return (
    <div className="w-1/3 bg-gray-200 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{status}</h2>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskColumn;
