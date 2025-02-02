import "../styles/MainStyle.css";
import { useState, useEffect, useMemo } from "react";
import StatusFilter from "../components/StatusFilter";
import TaskList from "../components/TaskList";
import AddTaskForm from "../components/AddTaskForm";
import { listenToTasks, getUserRole } from "../firebase"; // ✅ Import real-time task listener
import { auth, database } from "../firebase"; // Ensure Firebase is imported
import { ref, get } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

function TaskManagePage() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [showAddTask, setShowAddTask] = useState(false);
  const [userRole, setUserRole] = useState("");

  // ✅ Fetch tasks
  useEffect(() => {
    listenToTasks(setTasks);
  }, []);

  // ✅ Fetch logged-in user's role dynamically from Firebase
  useEffect(() => {
    const fetchUserRole = async () => {
      const currentUser = auth.currentUser; // Get the currently logged-in user
      if (currentUser) {
        const userRef = ref(database, `users/${currentUser.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserRole(snapshot.val().role); // Get only the first name
        }
      }
    };

    fetchUserRole();
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        (statusFilter === "All" || task.status === statusFilter) &&
        (priorityFilter === "All" || task.priority === priorityFilter)
    );
  }, [tasks, statusFilter, priorityFilter]);
  
  return (
    <div className="pageContainer2">

      <div className="flex flex-col items-center mr-[100px]">
      <>
                <StatusFilter
                  onFilterChange={setStatusFilter}
                  onPriorityChange={setPriorityFilter}
                />
                <div className="p-5 w-full max-w-4xl">
                  <h2 className="text-lg font-semibold">
                    Showing: {statusFilter} Tasks | {priorityFilter} Priority
                  </h2>
                  <button id="blue-btn"
                    onClick={() => setShowAddTask(!showAddTask)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-3 cursor-pointer"
                  >
                    {showAddTask ? "Close" : "Add New Task"}
                  </button>
                  {showAddTask && <AddTaskForm userRole={userRole} />}
                  <TaskList tasks={filteredTasks} setTasks={setTasks} />
                </div>
              </>
        
      
      </div>
  
    </div>
  );
}

export default TaskManagePage;

