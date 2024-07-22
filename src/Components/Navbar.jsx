import React from "react";
import { PiNotepadBold } from "react-icons/pi"; // Import the icon
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; // Import the AuthContext

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout: logoutAction } = useAuth(); // Access user and logout from AuthContext

  const handleLogout = () => {
    logoutAction(); // Call the logout function from AuthContext
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <PiNotepadBold className="text-white text-2xl" />{" "}
        {/* Icon with styling */}
      </div>
      {user ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      ) : (
        <a href="/login" className="text-white px-4 py-2 rounded">
          Login
        </a>
      )}
    </nav>
  );
};

export default Navbar;
