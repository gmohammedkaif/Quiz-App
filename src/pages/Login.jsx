import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../services/firebase";
import { signOut } from "firebase/auth";
// import {  PiEyeThin,  PiEyeSlashThin  } from "react-icons/pi";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import bgImage from "../assets/right-bg.png";


const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  /* google login */
  const handleGoogleLogin = async () => {
    try {
     const result= await signInWithPopup(auth, googleProvider);
      const user = result.user;
       dispatch(setUser(user.email));
       localStorage.setItem("userEmail", user.email);

      navigate("/dashboard");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Email already exists. Please login.");
      } else {
        alert("Something went wrong!");
      }
    }
  };

  /* signup */
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signupEmail || !signupPassword) {
      alert("Please fill all fields");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      await signOut(auth);
      alert("Signup successful! Please login now.");

      setSignupEmail("");
      setSignupPassword("");
    } catch (err) {
      alert(err.message);
    }
  };

  /* signin */
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      alert("Please fill all fields");
      return;
    }
    try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        const user = userCredential.user;
       dispatch(setUser(user.email));
       localStorage.setItem("userEmail", user.email);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
       
        <div className="login-left">
          <div className="login-brand">Quiz Master</div>

          <h1>Welcome Back</h1>
          <p>Ready to challenge your intellect today?</p>

          <button onClick={handleGoogleLogin} className="login-google-btn">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
            />
            Continue with Google
          </button>

          <div className="login-divider">
            <span>OR EMAIL LOGIN</span>
          </div>

          <form
            className="login-form"
            onSubmit={handleLogin}
            autoComplete="off"
          >
            <input type="text" name="fakeuser" style={{ display: "none" }} />
            <input
              type="password"
              name="fakepass"
              style={{ display: "none" }}
            />
            <div className="login-input-group">
              <label>Email Address</label>
              <input
                autoComplete="username"
                type="email"
                placeholder="gmohammedkai@gmail.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>

            <div className="login-input-group password-field">
              <label>Password</label>

              <div className="password-wrapper">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />

                <span
                  className="eye-icon"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                >
                  {showLoginPassword ? <GoEyeClosed /> : <GoEye />}
                </span>
              </div>
            </div>

            <button type="submit" className="login-login-btn">
              Log In to Dashboard
            </button>
          </form>
        </div>

      
        <div className="login-right" style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}>
          <div className="login-overlay">
            <h2>Create Account</h2>
            <p>Join our community of intellectuals and track your progress.</p>

            <form
              className="login-form"
              onSubmit={handleSignup}
              autoComplete="off"
            >
              <input type="text" name="fakeuser" style={{ display: "none" }} />
              <input
                type="password"
                name="fakepass"
                style={{ display: "none" }}
              />
              <input
                autoComplete="new-email"
                type="email"
                placeholder="Email Address"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
              <div className="password-wrapper">
                <input
                autoComplete="new-password"
                  type={showSignupPassword ? "text" : "password"}
                  placeholder="Create Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />

                <span
                  className="eye-icon"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                >
                  {showSignupPassword ? <GoEyeClosed /> : <GoEye />}
                </span>
              </div>

              <button className="login-signup-btn">Get Started</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
