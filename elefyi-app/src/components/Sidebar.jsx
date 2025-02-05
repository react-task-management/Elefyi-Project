import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate for redirecting
import { signOut } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'; // Import Firebase signOut method
import { auth } from "../firebase"; // Import your Firebase auth
import "../styles/MainStyle.css"; // Import your custom CSS file
import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import logo from "../Images/logo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/signup");
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-2 z-50 rounded-md bg-white shadow-md mr-10"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static
        inset-y-0 left-0
        w-64 
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        transition-transform duration-300 ease-in-out
        flex flex-col
        bg-white
        z-40
        h-full
      `}>
        {/* Logo Section */}
        <div className="p-4 flex items-center justify-center space-x-2">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
          <NavLink to="/home" className="text-xl font-bold text-gray-800">
            Elefyi
          </NavLink>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-4 space-y-2">
          <NavLink
            to="/home"
            className={({ isActive }) => `
              flex items-center space-x-3 px-4 py-3 rounded-lg
              transition-colors duration-200
              ${isActive ? 'bg-[#05b0d6] text-white' : 'text-gray-700 hover:bg-gray-100'}
            `}
          >
            <i className="bx bx-home text-xl" />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/task-manage"
            className={({ isActive }) => `
              flex items-center space-x-3 px-4 py-3 rounded-lg
              transition-colors duration-200
              ${isActive ? 'bg-[#05b0d6] text-white' : 'text-gray-700 hover:bg-gray-100'}
            `}
          >
            <i className="bx bx-task text-xl" />
            <span>Task Management</span>
          </NavLink>

          <NavLink
            to="/articles"
            className={({ isActive }) => `
              flex items-center space-x-3 px-4 py-3 rounded-lg
              transition-colors duration-200
              ${isActive ? 'bg-[#05b0d6] text-white' : 'text-gray-700 hover:bg-gray-100'}
            `}
          >
            <i className="bx bx-news text-xl" />
            <span>Articles</span>
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => `
              flex items-center space-x-3 px-4 py-3 rounded-lg
              transition-colors duration-200
              ${isActive ? 'bg-[#05b0d6] text-white' : 'text-gray-700 hover:bg-gray-100'}
            `}
          >
            <i className="bx bx-envelope text-xl" />
            <span>Contact</span>
          </NavLink>
        </nav>

        {/* Logout Button */}
        <div id="logout-div">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg
              text-gray-700 hover:bg-red-500 hover:text-white
              transition-colors duration-200"
              id="logout-btn"
          >
            <i className="bx bx-log-out text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-gray-200 bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;

