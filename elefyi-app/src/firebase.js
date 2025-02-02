import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js';
import { getDatabase, ref, push, onValue, update  } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXkTKNDPnb7A5pXMvigxo4YgLNyEaUln8",
  authDomain: "react-project-f71d3.firebaseapp.com",
  projectId: "react-project-f71d3",
  storageBucket: "react-project-f71d3.firebasestorage.app",
  messagingSenderId: "832780613815",
  appId: "1:832780613815:web:a59c52e87c95d72b673532",
  measurementId: "G-R17ERB7ZNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);


const addTask = (task) => {
  push(ref(database, "tasks"), task);
};

// ✅ Function to Listen to Tasks in Real-Time
const listenToTasks = (callback) => {
  onValue(ref(database, "tasks"), (snapshot) => {
    const data = snapshot.val();
    callback(
      data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : []
    );
  });
};

// ✅ Function to Fetch Users from Firebase
const listenToUsers = (callback) => {
  onValue(ref(database, "users"), (snapshot) => {
    const data = snapshot.val();
    callback(
      data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : []
    );
  });
};

// ✅ Function to Update Task Status
const updateTaskStatus = (taskId, newStatus) => {
  update(ref(database, `tasks/${taskId}`), { status: newStatus });
};

// ✅ Function to Update Task Priority
const updateTaskPriority = (taskId, newPriority) => {
  update(ref(database, `tasks/${taskId}`), { priority: newPriority });
};

// ✅ Function to Update Task (Title & Description)
const updateTask = (taskId, updatedTask) => {
  update(ref(database, `tasks/${taskId}`), updatedTask);
};

// ✅ Function to "Soft Delete" Task (Sets isDeleted to "true" instead of removing)
const deleteTask = (taskId) => {
  update(ref(database, `tasks/${taskId}`), { isDeleted: "true" });
};


export { auth, database,addTask,
  listenToTasks,
  listenToUsers,
  updateTaskStatus,
  updateTaskPriority,
  updateTask,
  deleteTask, };