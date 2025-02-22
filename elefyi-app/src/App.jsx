import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase"; // Import Firebase auth
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import VisitorNav from "./components/VisitorNav";
import VisitorPage from "./pages/VisitorPage";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutPage";
import ArticlesPage from "./pages/ArticlesPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TaskManagePage from "./pages/TaskManagePage";
import UserProfilePage from "./pages/UserProfilePage";
import TasksDetails from "./pages/TaskDetailsPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      {user ? (
          <div className="min-h-screen flex">
          <Sidebar />
          <div className="main-content">
            <Navbar />
            <div>
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/articles" element={<ArticlesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/task-manage" element={<TaskManagePage />} />
                <Route path="/user-profile" element={<UserProfilePage />} />
                <Route path="/task/:taskId" element={<TasksDetails />} />
              </Routes>
            </main>
            </div>
            </div>
          </div>
      ) : (
        <>
          <VisitorNav />
          <Routes>
            <Route path="/" element={<VisitorPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/article" element={<ArticlesPage/>}/>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
