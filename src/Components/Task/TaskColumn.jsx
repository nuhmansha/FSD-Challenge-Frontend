import React from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title, tasks, onTaskUpdated, onTaskDeleted }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {tasks.map((task, index) => (
        <Draggable key={task._id} draggableId={task._id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="mb-2"
            >
              <TaskCard
                task={task}
                onTaskUpdated={onTaskUpdated}
                onTaskDeleted={onTaskDeleted}
              />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default TaskColumn;
