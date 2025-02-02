import { useState, useEffect } from "react";
import { addTask, listenToUsers } from "../firebase";

function AddTaskForm() {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "To Do",
    dueDate: "",
    assignedUsers: [],
  });

  const [users, setUsers] = useState([]);

  // ✅ Fetch Users from Firebase
  useEffect(() => {
    listenToUsers(setUsers);
  }, []);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleUserSelection = (userId) => {
    setTaskData((prev) => ({
      ...prev,
      assignedUsers: prev.assignedUsers.includes(userId)
        ? prev.assignedUsers.filter((id) => id !== userId)
        : [...prev.assignedUsers, userId],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !taskData.title.trim() ||
      !taskData.description.trim() ||
      !taskData.dueDate.trim()
    )
      return;

    addTask(taskData);

    // ✅ Reset Form After Submission
    setTaskData({
      title: "",
      description: "",
      priority: "Medium",
      status: "To Do",
      dueDate: "",
      assignedUsers: [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={taskData.title}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        name="description"
        placeholder="Task Description"
        value={taskData.description}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="date"
        name="dueDate"
        value={taskData.dueDate}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded mb-2"
      />
      <select
        name="priority"
        value={taskData.priority}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <select
        name="status"
        value={taskData.status}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="To Do">To Do</option>
        <option value="Doing">Doing</option>
        <option value="Done">Done</option>
      </select>

      {/* ✅ User Multi-Select */}
      <div className="mb-2">
        <h3 className="text-sm font-semibold mb-1">Assign Users:</h3>
        <div className="grid grid-cols-2 gap-2">
          {users.map((user) => (
            <label key={user.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={user.id}
                checked={taskData.assignedUsers.includes(user.id)}
                onChange={() => handleUserSelection(user.id)}
              />
              <img
                src={user.profileImage || "/default-avatar.png"}
                alt={user.firstName}
                className="w-8 h-8 rounded-full border"
              />
              <span>{user.firstName}</span>
            </label>
          ))}
        </div>
      </div>

      <button
      id="add-new-task-btn"
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Add Task
      </button>
    </form>
  );
}

export default AddTaskForm;
