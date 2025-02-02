import "../styles/MainStyle.css";
import { useState, useEffect, useMemo } from "react";
import TaskList from "../components/TaskList";
import { listenToTasks } from "../firebase"; // ✅ Import real-time task listener

function HomeTasks() {
  const [tasks, setTasks] = useState([]); // ✅ Store tasks from Firebase

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
          <h2 className="text-lg font-semibold">High-Priority Tasks</h2>
          {highPriorityTasks.length > 0 ? (
            <TaskList tasks={highPriorityTasks} setTasks={setTasks} />
          ) : (
            <p className="text-gray-600 mt-3">No high-priority tasks available.</p>
          )}
        </div>
      </div>

  );
}

export default HomeTasks;