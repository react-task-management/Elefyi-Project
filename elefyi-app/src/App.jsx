
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Sidebar from './components/Sidebar';
import AboutPage from "./pages/AboutPage";
import ArticlesPage from "./pages/ArticlesPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import TaskManagePage from "./pages/TaskManagePage";
import UserProfilePage from "./pages/UserProfilePage";
import VisitorPage from "./pages/VisitorPage";
import "./styles/MainStyle.css"; // Import your custom CSS file

function App() {

  return (
    <Router>
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div>
          <Routes>
          <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/articles" element={<ArticlesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/task-details" element={<TaskDetailsPage />} />
              <Route path="/task-manage" element={<TaskManagePage />} />
              <Route path="/user-profile" element={<UserProfilePage />} />
              <Route path="/visitor" element={<VisitorPage />} />
          </Routes>
        </div>
      </div>
    </div>
  </Router>
  )
}

export default App
