import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskColumn from "./TaskColumn";
import AddTaskForm from "./AddTaskForm";
import axiosInstance from "../../Instance/axiosInstance";

const TaskBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get("/tasks");
        const tasks = response.data;
        const taskGroups = {
          todo: tasks.filter((task) => task.status === "todo"),
          inProgress: tasks.filter((task) => task.status === "inProgress"),
          done: tasks.filter((task) => task.status === "done"),
        };
        setTasks(taskGroups);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskUpdate = (updatedTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      for (const key in updatedTasks) {
        updatedTasks[key] = updatedTasks[key].map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
      }
      return updatedTasks;
    });
  };

  const handleTaskDelete = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      for (const key in updatedTasks) {
        updatedTasks[key] = updatedTasks[key].filter(
          (task) => task._id !== taskId
        );
      }
      return updatedTasks;
    });
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const startColumn = source.droppableId;
    const endColumn = destination.droppableId;

    const startTasks = Array.from(tasks[startColumn]);
    const [movedTask] = startTasks.splice(source.index, 1);

    if (startColumn === endColumn) {
      startTasks.splice(destination.index, 0, movedTask);
      setTasks({
        ...tasks,
        [startColumn]: startTasks,
      });
    } else {
      const endTasks = Array.from(tasks[endColumn]);
      endTasks.splice(destination.index, 0, movedTask);

      setTasks({
        ...tasks,
        [startColumn]: startTasks,
        [endColumn]: endTasks,
      });

      // Update task status in backend
      axiosInstance.put(`/tasks/${movedTask._id}`, { status: endColumn });
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => setShowAddTaskForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </button>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <div className="w-2/3">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-1/3 flex justify-end">
          <select
            value={sortBy}
            onChange={handleSort}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="recent">Sort By: Recent</option>
            <option value="oldest">Sort By: Oldest</option>
          </select>
        </div>
      </div>

      {showAddTaskForm && (
        <AddTaskForm
          onClose={() => setShowAddTaskForm(false)}
          onTaskAdded={(newTask) =>
            setTasks((prevTasks) => ({
              ...prevTasks,
              todo: [...prevTasks.todo, newTask],
            }))
          }
        />
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {["todo", "inProgress", "done"].map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-full md:w-1/3 p-2 bg-gray-100 rounded-md"
                >
                  <TaskColumn
                    title={status.toUpperCase()}
                    tasks={tasks[status]}
                    onTaskUpdated={handleTaskUpdate}
                    onTaskDeleted={handleTaskDelete}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
