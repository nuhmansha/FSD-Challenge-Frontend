import React from 'react';

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskCard;
