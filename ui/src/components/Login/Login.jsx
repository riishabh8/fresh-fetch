import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
export default function Login({ handleAdmin, handleUser, handleName }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [err, setErr] = useState();
  const navigate = useNavigate();

  async function HandleClick() {
    try {
      const finalData = {
        email: username,
        password: password,
      };
      const data = await axios.post(
        `https://localhost:7046/api/Users/login`,
        finalData
      );
      console.log(data);
      if (data.status === 200) {
        // console.log(response.existingUser.fullName)
        localStorage.setItem("token", data.data.token);
        localStorage.setItem(
          "name",
          data.data.existingUser.fullName.split(" ")[0]
        );
        localStorage.setItem("isAdmin", data.data.existingUser.isAdmin);
        localStorage.setItem(
          "isUser",
          localStorage.isAdmin === "true" ? false : true
        );
        localStorage.setItem("userId", data.data.existingUser.id);
        handleAdmin(localStorage.isAdmin);
        handleUser(localStorage.isUser);
        handleName(localStorage.name);
        console.log(localStorage.isUser);
        navigate("/");
      }
    } catch (err) {
      setErr(err);
    }
  }
  return (
    <form className="form-signin w-100 m-auto login--form">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          // id="floatingInput"
          placeholder="name@example.com"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          // id="floatingPassword"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label for="floatingPassword lastPassword">Password</label>
        {err && <p style={{ color: "red" }}>Something Went Wrong</p>}
      </div>
      <button
        class="btn btn-primary w-100 py-2 btn--login"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          HandleClick();
        }}
      >
        Sign in
      </button>
      <p class="mt-5 mb-3 text-body-secondary">&copy; Rishabh Dubey - 2023</p>
    </form>
  );
}
