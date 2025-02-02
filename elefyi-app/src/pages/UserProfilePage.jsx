import { useEffect, useState } from "react";
import axios from "axios";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const firebaseUrl =
  "https://react-project-f71d3-default-rtdb.firebaseio.com/users"; // Replace with your Firebase Realtime Database URL

function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    firstName: "",
    LastName: "",
    email: "",
  });

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserData(currentUser.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const response = await axios.get(`${firebaseUrl}/${uid}.json`);
      if (response.data) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      await axios.put(`${firebaseUrl}/${user.uid}.json`, userData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="pageContainer">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 mb-1 text-sm text-gray-600">{userData.role}</p>

            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-900 "
                style={{ marginLeft: "0", marginBottom: "-5px" }}
              >
                Photo
              </label>
              <div
                className="mt-2 flex items-center gap-x-3 "
                style={{ marginLeft: "-7px" }}
              >
                <UserCircleIcon className="size-12 text-gray-300" />
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    value={userData.firstName}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    id="last-name"
                    name="LastName"
                    type="text"
                    value={userData.LastName}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    disabled
                    value={userData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>
              {/* <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={userData.password}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserProfilePage;