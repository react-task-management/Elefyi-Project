import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDatabase, ref, onValue, push } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
import {
  FaUser,
  FaCalendarAlt,
  FaTag,
  FaArrowLeft,
  FaComments,
} from "react-icons/fa";

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const db = getDatabase();

    // Fetch Task Details
    const taskRef = ref(db, `tasks/${taskId}`);
    onValue(taskRef, (snapshot) => {
      if (snapshot.exists()) {
        setTask(snapshot.val());
      }
    });

    // Fetch Users
    const usersRef = ref(db, "users");
    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const usersList = Object.keys(usersData).map((id) => ({
          id,
          ...usersData[id],
        }));
        setUsers(usersList);
      }
    });

    // Fetch Comments for the Task
    const commentsRef = ref(db, `tasks/${taskId}/comments`);
    onValue(commentsRef, (snapshot) => {
      if (snapshot.exists()) {
        setComments(Object.values(snapshot.val()));
      }
    });
  }, [taskId]);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const db = getDatabase();
    const commentData = {
      text: newComment,
      timestamp: new Date().toLocaleString(),
    };

    // Push the comment to Firebase
    push(ref(db, `tasks/${taskId}/comments`), commentData);
    setNewComment(""); // Clear input after posting
  };

  if (!task) {
    return <p className="text-center text-gray-500">Loading Task Details...</p>;
  }

  return (
    <div className="fixed inset-0  bg-opacity-10 backdrop-blur-md flex items-center justify-center z-50">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6 relative">
        {/* Return Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition"
        >
          <FaArrowLeft className="text-gray-700" />
          <span className="text-gray-700 font-medium">Back</span>
        </button>

        <h1 className="text-2xl font-bold mb-4 text-center">{task.title}</h1>

        <div className="mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" />
          <span className="text-gray-600">Due Date:</span>
          <span className="font-medium">{task.dueDate || "No Due Date"}</span>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <FaTag className="text-red-500" />
          <span className="text-gray-600">Priority:</span>
          <span
            className={`px-2 py-1 rounded-full text-white ${
              task.priority === "High"
                ? "bg-red-500"
                : task.priority === "Medium"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          >
            {task.priority}
          </span>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">Description:</p>
          <p className="text-gray-800">{task.description}</p>
        </div>

        {/* Assigned Users */}
        <div className="mb-4">
          <p className="text-gray-600 mb-2">Assigned Users:</p>
          <div className="flex space-x-2">
            {task.assignedUsers && task.assignedUsers.length > 0 ? (
              task.assignedUsers.map((userId) => {
                const user = users.find((u) => u.id === userId);
                return user ? (
                  <div
                    key={userId}
                    className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg"
                  >
                    <FaUser className="text-gray-500" />
                    <span>
                      {user.firstName} {user.LastName}
                    </span>
                  </div>
                ) : (
                  <p key={userId} className="text-gray-400 text-sm">
                    Unknown User
                  </p>
                );
              })
            ) : (
              <p className="text-gray-400 text-sm">No users assigned</p>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <FaComments className="text-gray-600 mr-2" /> Comments (
            {comments.length})
          </h2>

          {/* Comment Input */}
          <div className="mb-4">
            <textarea
              placeholder="Add a comment..."
              className="w-full border border-gray-300 rounded-lg p-2 mb-2"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600"
              onClick={handleAddComment}
            >
              Submit
            </button>
          </div>

          {/* Display Comments */}
          <div>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="mb-4 p-2 bg-gray-100 rounded-lg">
                  <p className="font-medium">{comment.text}</p>
                  <p className="text-gray-600 text-sm">{comment.timestamp}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;