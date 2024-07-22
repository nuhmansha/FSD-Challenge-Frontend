import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../Instance/axiosInstance";
import EditTaskForm from "./EditTaskForm";

const TaskCard = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/taskdelete/${task._id}`);
      onTaskDeleted(task._id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = () => {
    setShowEditForm(true);
  };

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
      <p className="text-gray-600 mb-2">{task.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        Created at: {new Date(task.createdAt).toLocaleString()}
      </p>
      <div className="flex flex-wrap justify-end gap-2">
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          onClick={handleEdit}
        >
          Edit
        </button>
        <Link
          to={`/tasks/${task._id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          View Details
        </Link>
      </div>
      {showEditForm && (
        <EditTaskForm
          task={task}
          onClose={() => setShowEditForm(false)}
          onTaskUpdated={onTaskUpdated}
        />
      )}
    </div>
  );
};

export default TaskCard;
