import "../styles/MainStyle.css";
import { useState, useEffect, useMemo } from "react";
import TaskList from "../components/TaskList";
import { listenToTasks } from "../firebase"; // ✅ Import real-time task listener
import { useNavigate } from "react-router-dom";

function HomeTasks() {
  const [tasks, setTasks] = useState([]); // ✅ Store tasks from Firebase
  const navigate = useNavigate();

  useEffect(() => {
    listenToTasks(setTasks); // ✅ Fetch tasks in real-time
  }, []);

  // ✅ Filter only high-priority tasks
  const highPriorityTasks = useMemo(() => {
    return tasks.filter((task) => task.priority === "High");
  }, [tasks]);

  return (
      <div className="flex flex-col items-start">
        <div className="p-5 w-full max-w-4xl">
          <h2 className="text-lg font-semibold text-black mt-[20px]">High Priority Tasks</h2>
          {highPriorityTasks.length > 0 ? (
            <TaskList tasks={highPriorityTasks} setTasks={setTasks} />
          ) : (
            <p className="text-gray-600 mt-3">No high-priority tasks available.</p>
          )}
        </div>
        <div className="flex justify-center py-6">
          <button id="blue-btn"
            onClick={() => navigate("/task-manage")}
            className="bg-[#05b0d6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0490b5] transition duration-300"
          >
            View More
          </button>
        </div>
      </div>

  );
}

export default HomeTasks;