import "../styles/MainStyle.css";
import { useState, useEffect, useMemo } from "react";
import StatusFilter from "../components/StatusFilter";
import TaskList from "../components/TaskList";
import AddTaskForm from "../components/AddTaskForm";
import { listenToTasks } from '../firebase' // ✅ Import real-time task listener

function TaskDetailsPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [showAddTask, setShowAddTask] = useState(false); // ✅ Toggle add task form
  const [tasks, setTasks] = useState([]); // ✅ Store tasks from Firebase

  useEffect(() => {
    listenToTasks(setTasks); // ✅ Fetch tasks in real-time
  }, []);

  // ✅ Use useMemo to Optimize Filtering (Performance Boost)
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatch =
        statusFilter === "All" || task.status === statusFilter;
      const priorityMatch =
        priorityFilter === "All" || task.priority === priorityFilter;
      return statusMatch && priorityMatch;
    });
  }, [tasks, statusFilter, priorityFilter]);
  
  return (
    <div className="pageContainer">
      <div className="flex flex-col items-center">
      {/* ✅ Updated StatusFilter to Include Priority Filtering */}
      <StatusFilter
        onFilterChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
      />

      <div className="p-5 w-full max-w-4xl">
        <h2 className="text-lg font-semibold">
          Showing: {statusFilter} Tasks | {priorityFilter} Priority
        </h2>

        {/* ✅ Toggle Add Task Form */}
        <button id="add-new-task-btn"
          onClick={() => setShowAddTask(!showAddTask)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-3 cursor-pointer"
        >
          {showAddTask ? "Close" : "Add New Task"}
        </button>

        {/* ✅ Show Add Task Form Only When Needed */}
        {showAddTask && <AddTaskForm />}

        {/* ✅ Pass Filtered Tasks to TaskList */}
        <TaskList tasks={filteredTasks} setTasks={setTasks} />
      </div>
    </div>
    </div>
  );
}

export default TaskDetailsPage;