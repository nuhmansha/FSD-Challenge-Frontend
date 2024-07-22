import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../Instance/axiosInstance";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosInstance.get(`/tasks/${taskId}`);
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleClose = () => {
    setIsModalOpen(false);
    
    navigate(-1);
  };

  if (!task) return <div className="text-center p-4">Loading...</div>;

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Task Details</h2>
          <div className="mb-4">
            <p className="font-medium">Title: {task.title}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Description: {task.description}</p>
          </div>
          <div className="text-sm text-gray-500">
            Created at: {new Date(task.createdAt).toLocaleString()}
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-50 rounded-b-lg">
          <button 
            onClick={handleClose}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;