
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "namval");
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  // console.log("loginInfo -> ", signupInfo);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if ( !email || !password) {
      return handleError(" email, and password are required.");
    }
    try {
      const url = "http://localhost:8000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
        const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
              handleSuccess(message);
              localStorage.setItem('token', jwtToken); 
              localStorage.setItem('loggedInUser', name); 
              setTimeout(() => {
                navigate("/home");
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
    <>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="name">Email: </label>
            <input
              type="email"
              name="email"
              placeholder="Entery your email."
              onChange={handleOnChange}
              value={loginInfo.email}
            />
          </div>
          <br />

          <div>
            <label htmlFor="name">Password: </label>
            <input
              type="password"
              name="password"
              placeholder="Entery your password."
              onChange={handleOnChange}
              value={loginInfo.password}
            />
          </div>
          <br />
          <button type="submit">Login</button>
          <span>
            Doesn't have account?
            <Link to="/signup">Signup</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
