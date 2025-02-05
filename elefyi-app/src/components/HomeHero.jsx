import { useState, useEffect } from "react";
import { auth, database } from "../firebase"; // Ensure Firebase is imported
import { ref, get } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
import "../styles/MainStyle.css";
import { Link } from "react-router-dom";





export default function HomeHero() {
    const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const currentUser = auth.currentUser; // Get the currently logged-in user
      if (currentUser) {
        const userRef = ref(database, `users/${currentUser.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserName(snapshot.val().firstName); // Get only the first name
        }
      }
    };

    fetchUserName();
  }, []);


  return (
    <>
<section className="bg-white dark:bg-gray-900 py-10 bg-gradient-to-r from-[#05b0d6] to-[#0e7991] sm:py-16 rounded-[20px]">
    <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-0 lg:px-6">
        <div className="max-w-screen-md">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 text-white">Welcome, {userName}! Let’s stay productive today!</h2>
            <p className="text-[14px] mt-2 font-bold text-white mb-6">Easily create, assign, and track tasks. Stay on top of deadlines and progress!</p>
            <Link to="/task-manage" title="" className="inline-flex items-center justify-center flex-shrink-0 px-4 py-4 mt-8 text-base font-semibold text-gray-900 transition-all duration-200 bg-yellow-300 rounded-md sm:mt-0 sm:ml-8 lg:ml-16 hover:bg-yellow-400 focus:bg-yellow-400" role="button">
                Catch your tasks
            </Link>
        </div>
    </div>
</section>
</>
  )
}
