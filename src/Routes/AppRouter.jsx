import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from '../Components/Navbar';
import SignupPage from "../Pages/SignupPage";
import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import TaskDetailsPage from "../Components/Task/TaskDetailPage";
import { AuthProvider } from "../Context/AuthContext";
const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        {/* <Navbar /> Include Navbar here to show it on every page */}
        <Routes>
          <Route path="/" element={<HomePage />} />{" "}
          {/* HomePage handles its own protection */}
          <Route
            path="/tasks/:taskId"
            element={
              <ProtectedRoute>
                <TaskDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* Add other routes here as needed */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
