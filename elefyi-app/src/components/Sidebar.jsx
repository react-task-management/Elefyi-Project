
import { NavLink } from "react-router-dom";
import "../styles/MainStyle.css"; // Import your custom CSS file
import logo from "../Images/logo.png";


function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo Section */}
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
        <NavLink to="/" className="logo-text">
          Elefyi
        </NavLink>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="bx bx-home bx-xs"></i>
          Home
        </NavLink>
        <NavLink
          to="/task-manage"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="bx bx-task bx-xs"></i>
          Task Management
        </NavLink>
        <NavLink
          to="/articles"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="bx bx-news bx-xs"></i>
          Articles
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="bx bx-envelope bx-xs"></i>
          Contact
        </NavLink>
      </nav>

      {/* Logout Button */}
      <div className="sidebar-footer">
        <NavLink to="/login">
          <i className="bx bx-log-out bx-xs"></i>
          Logout
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
