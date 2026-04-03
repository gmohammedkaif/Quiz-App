import React, { useState } from "react";
import {app} from '../services/firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth =getAuth(app)

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpasword] = useState("");

  const createUser =()=>{
    createUserWithEmailAndPassword(auth, email , password).then(value => alert('Success'))
  }
  return (
    <div className="signup">
      <h1>Signup Page</h1>
      <label htmlFor="">Email :</label>
      <input
        type="email"
        required
        placeholder="Enter Your email here"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label htmlFor="">Password :</label>
      <input
        type="password"
        required
        placeholder="Enter Your Password here"
        value={password}
        onChange={(e) => {
          setpasword(e.target.value);
        }}
      />
      <button onClick={createUser}>SignUp</button>
    </div>
  );
};

export default Login;
