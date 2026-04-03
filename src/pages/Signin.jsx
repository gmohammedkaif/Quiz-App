import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../services/firebase";

const auth = getAuth(app);

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setpasword] = useState("");

  const signinUser = () => {
    signInWithEmailAndPassword(auth, email, password).then((value) =>
      console.log("signin success"),
    ).catch((err) => console.log(err))
  };
  return (
    <div>
      <h1>Signin Page</h1>
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
      <button onClick={signinUser}>SignIn</button>
    </div>
  );
};

export default Signin;
