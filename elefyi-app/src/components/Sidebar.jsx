import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate for redirecting
import { signOut } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'; // Import Firebase signOut method
import { auth } from "../firebase"; // Import your Firebase auth
import "../styles/MainStyle.css"; // Import your custom CSS file
import logo from "../Images/logo.png";

function Sidebar() {
  const navigate = useNavigate(); // Hook to redirect after logout

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate("/signup"); // Redirect to the login page after logout
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  return (
    <aside className="sidebar">
      {/* Logo Section */}
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
        <NavLink to="/home" className="logo-text">
          Elefyi
        </NavLink>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <NavLink
          to="/home"
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
        <button onClick={handleLogout} className="logout-button">
          <i className="bx bx-log-out bx-xs"></i>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
