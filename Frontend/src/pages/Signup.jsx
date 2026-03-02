import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "namval");
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  // console.log("loginInfo -> ", signupInfo);

  const handleSingup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name, email, and password are required.");
    }
    try {
      const url = "https://implementedlsback.vercel.app/auth/signUp";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }

      console.log(result, "result");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div>
      <h1>signup</h1>
      <form onSubmit={handleSingup}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            value={signupInfo.name}
            autoFocus
            placeholder="Entery your name."
            onChange={handleOnChange}
          />
        </div>
        <br />

        <div>
          <label htmlFor="name">Email: </label>
          <input
            type="email"
            name="email"
            value={signupInfo.email}
            placeholder="Entery your email."
            onChange={handleOnChange}
          />
        </div>
        <br />

        <div>
          <label htmlFor="name">Password: </label>
          <input
            type="password"
            name="password"
            value={signupInfo.password}
            placeholder="Entery your password."
            onChange={handleOnChange}
          />
        </div>
        <br />
        <button type="submit">Signup</button>
        <span>
          Already have an account? Login
          <Link to="/login" />
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
