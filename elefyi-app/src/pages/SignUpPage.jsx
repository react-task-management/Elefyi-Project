
import { useState } from "react";
import { auth, database } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
import { useNavigate } from "react-router-dom";

import "../styles/SignUpPage.css";
import { FcGoogle } from "react-icons/fc";

function SignUpPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [firstname, setFName] = useState("");
  const [lastname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("team member");
  const navigate = useNavigate();

  // 🔹 Handle Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user details in Firebase Realtime Database
      await set(ref(database, `users/${user.uid}`), {
        firstName: firstname,
        LastName: lastname,
        email: user.email,
        role: userType,
      });

      alert("Registration Successful!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  // 🔹 Handle Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful!");
      navigate("/home");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  // 🔹 Handle Google Sign In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user already exists in the database
      const userRef = ref(database, `users/${user.uid}`);
      set(userRef, {
        firstName: user.displayName,
        LastName: user.displayName,
        email: user.email,
        role: "team member", // Default role
      });
      
      alert(`Welcome, ${user.displayName}!`);
    } catch (error) {
      alert("Google Sign-In Failed: " + error.message);
    }
  };

  return (
    <>{console.log("signup is rendering...")};
    <div className="main-display">
    <div className="signupContainer">
    <div className="parent">
      <div className="left">
        <h2>{isLogin ? "Sign In" : "Create Account"}</h2>
        <div className="icons">
          {isLogin ? "Sign In with Google" : "Create Account with Google"}
          <FcGoogle size={30} style={{ marginRight: "10px", cursor: "pointer" }} onClick={handleGoogleSignIn} />
        </div>
        <p>{isLogin ? "or use your email and password to sign in." : "or use your email for registration"}</p>

        <form onSubmit={isLogin ? handleSignIn : handleSignUp}>
          {!isLogin && (
            <>
            <input type="text" placeholder="Enter Your First Name" value={firstname} onChange={(e) => setFName(e.target.value)} required />
            <input type="text" placeholder="Enter Your Last Name" value={lastname} onChange={(e) => setLName(e.target.value)} required />
            </>
          )}
          <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          {!isLogin && (
            <div className="check-user">
              <label>
                <input type="radio" name="userType" value="team member" checked={userType === "team member"} onChange={() => setUserType("team member")} />
                Team member
              </label>
              <label>
                <input type="radio" name="userType" value="manager" checked={userType === "manager"} onChange={() => setUserType("manager")} />
                Manager
              </label>
            </div>
          )}
          <button type="submit">{isLogin ? "Sign In" : "Sign Up"}</button>
        </form>
      </div>

      <div className="right">
        <h2>{isLogin ? "Hello, Friend!" : "Welcome Back!"}</h2>
        <p>{isLogin ? "Register with your personal details to use all site features" : "Enter your details to use all site features"}</p>
        <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Sign Up" : "Sign In"}</button>
      </div>
    </div>
    </div>
    </div>
    </>
  );
}

export default SignUpPage;
