import React from "react";
import TaskBoard from "../Components/Task/TaskBoard";
import Navbar from "../Components/Navbar";
import { useAuth } from "../Context/AuthContext"; // Import the AuthContext

const HomePage = () => {
  const { user } = useAuth(); // Access authentication state

  return (
    <div className="container mx-auto mt-10">
      <Navbar />
      {user ? (
        <TaskBoard /> // Display TaskBoard if user is authenticated
      ) : (
        <div className="text-center mt-20">
          <h1 className="text-2xl font-bold">
            Welcome to the Task Management System
          </h1>
          <p className="mt-4 text-lg">Please log in to view your tasks.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
