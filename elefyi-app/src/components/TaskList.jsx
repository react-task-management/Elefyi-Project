import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Import Framer Motion
import {
  listenToTasks,
  updateTaskStatus,
  updateTaskPriority,
  updateTask,
  deleteTask,
  listenToUsers,
} from "../firebase";

function TaskList({ tasks, setTasks }) {
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    listenToTasks(setTasks);
    listenToUsers(setUsers);
  }, [setTasks]);

  const openModal = (task, type) => {
    setSelectedTask(task);
    setModalType(type);
    setShowModal(true);
  };

  return (
    <motion.div
      className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6"
      layout // ✅ Ensures smooth filtering animation
    >
      <AnimatePresence>
        {tasks.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-500"
          >
            No tasks available.
          </motion.p>
        ) : (
          tasks
            .filter((task) => task.isDeleted !== "true")
            .map((task) => (
              <motion.div
                key={task.id}
                layout // ✅ Enables smooth filtering animation
                initial={{ opacity: 0, y: 50 }} // 👈 Bottom-to-top animation
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }} // 👈 Smooth exit going slightly up
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`p-5 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col justify-between ${
                  task.priority === "High"
                    ? "border-l-4 border-red-500"
                    : task.priority === "Medium"
                    ? "border-l-4 border-yellow-500"
                    : "border-l-4 border-green-500"
                }`}
              >
                {/* ✅ Clicking on the title navigates to details */}
                <h3
                  className="font-bold text-lg cursor-pointer hover:underline"
                  onClick={() => navigate(`/task/${task.id}`, { state: task })}
                >
                  {task.title}
                </h3>

                <p className="text-sm text-gray-600">{task.description}</p>

                {/* ✅ Display Due Date */}
                <p className="text-sm font-semibold mt-2">
                  📅 Due Date:{" "}
                  <span className="text-blue-600">
                    {task.dueDate || "No due date"}
                  </span>
                </p>

                {/* ✅ Assigned Users with Profile Images */}
                <div className="flex mt-2">
                  {task.assignedUsers && task.assignedUsers.length > 0 ? (
                    task.assignedUsers.map((userId) => {
                      const user = users.find((u) => u.id === userId);
                      return user ? (
                        <img
                          key={userId}
                          src={user.profileImage || "/default-avatar.png"}
                          alt={user.firstName}
                          className="w-8 h-8 rounded-full border-2 border-white -ml-2"
                        />
                      ) : null;
                    })
                  ) : (
                    <p className="text-gray-400 text-sm">No users assigned</p>
                  )}
                </div>

                {/* ✅ Buttons Section */}
                <div className="flex flex-wrap justify-between mt-3 gap-2">
                  <button
                    onClick={() => openModal(task, "status")}
                    className={`px-3 py-1 rounded shadow-md transition cursor-pointer ${
                      task.status === "To Do"
                        ? "bg-yellow-500 text-white hover:bg-yellow-600"
                        : task.status === "Doing"
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {task.status}
                  </button>

                  <button
                    onClick={() => openModal(task, "priority")}
                    className={`px-3 py-1 rounded shadow-md transition cursor-pointer ${
                      task.priority === "Low"
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : task.priority === "Medium"
                        ? "bg-yellow-500 text-white hover:bg-yellow-600"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    {task.priority}
                  </button>

                  <button
                    onClick={() => openModal(task, "edit")}
                    className="bg-gray-700 text-white px-3 py-1 rounded shadow-md transition cursor-pointer hover:bg-gray-800"
                  >
                    ✏ Edit
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded shadow-md transition cursor-pointer hover:bg-red-600"
                  >
                    🗑 Delete
                  </button>
                </div>
              </motion.div>
            ))
        )}
      </AnimatePresence>

      {/* ✅ Task Modal */}
      {showModal && selectedTask && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-md z-50 bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-3">
              {modalType === "edit"
                ? "Edit Task"
                : `Change ${modalType} for ${selectedTask.title}`}
            </h2>

            {modalType === "edit" ? (
              <>
                <input
                  type="text"
                  className="w-full p-2 border rounded mb-2"
                  value={selectedTask.title}
                  onChange={(e) =>
                    setSelectedTask((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Task Title"
                />
                <textarea
                  className="w-full p-2 border rounded"
                  value={selectedTask.description}
                  onChange={(e) =>
                    setSelectedTask((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Task Description"
                />
                <button
                  onClick={() => updateTask(selectedTask.id, selectedTask)}
                  className="mt-3 bg-blue-500 text-white px-4 py-1 rounded w-full cursor-pointer hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <select
                onChange={(e) => {
                  if (modalType === "status") {
                    updateTaskStatus(selectedTask.id, e.target.value);
                    setSelectedTask((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }));
                  } else {
                    updateTaskPriority(selectedTask.id, e.target.value);
                    setSelectedTask((prev) => ({
                      ...prev,
                      priority: e.target.value,
                    }));
                  }
                  setShowModal(false);
                }}
                className="w-full p-2 border rounded cursor-pointer"
              >
                <option value="" disabled selected>
                  Choose {modalType}...
                </option>
                <option value="To Do">To Do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="mt-3 bg-red-500 text-white px-4 py-1 rounded w-full cursor-pointer hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default TaskList;