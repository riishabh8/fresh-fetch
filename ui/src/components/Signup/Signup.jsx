import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cnfPassword, setCnfPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [error, setError] = useState();
  const [key, setKey] = useState();
  const navigate = useNavigate();

  async function HandleClick() {
    if (validateForm()) {
      try {
        const finalData = {
          fullName,
          email,
          password,
          phoneNumber,
          key,
        };
        const data = await axios.post(
          `https://localhost:7046/api/Users/register`,
          finalData
        );
        if (data.status === 200) {
          navigate("/login");
        }
      } catch (err) {
        setError("Email Id Already exists in the system Try a new one");
      }
    }
  }

  function validateForm() {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=])(?!.*\s).{8,}$/;
    const fullNameRegex = /^[A-Za-z\s]{1,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNumberRegex = /^\d{10}$/;

    if (!fullNameRegex.test(fullName)) {
      setError("Max 50-character alphabets only");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Must be unique in the system and valid as per standard format");
      return false;
    }
    if (!phoneNumberRegex.test(phoneNumber)) {
      setError("Valid as per the standard 10 digits format");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "Minimum length is 8 and it must have at-least 1 special character, 1 number and 1 alphabet"
      );
      return false;
    }
    if (password !== cnfPassword) {
      setError("Password Mismatch");
      return false;
    }
    return true;
  }

  return (
    <form className="form-signin w-100 m-auto">
      <h1 class="h3 mb-3 fw-normal">Create new Account </h1>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          // id="floatingInput"
          placeholder="John Doe"
          pattern="^[A-Za-z]{1,50}$"
          onChange={(e) => {
            setFullName(e.target.value);
          }}
          required
        />
        <label for="floatingInput">Full Name</label>
      </div>

      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          // id="floatingInput"
          placeholder="name@example.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input
          type="number"
          class="form-control"
          // id="floatingInput"
          pattern="^\d{10}$"
          placeholder="0123456789"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          required
        />
        <label for="floatingInput">Phone Number</label>
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
          required
        />
        <label for="floatingPassword">Password</label>
      </div>

      <div class="form-floating lastPassword">
        <input
          type="password"
          class="form-control"
          // id="floatingPassword"
          pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=])(?!.*\s).{8,}$"
          placeholder="Confirm Password"
          onChange={(e) => {
            setCnfPassword(e.target.value);
          }}
          required
        />
        <label for="floatingPassword">Confirm Password</label>
        {error && <div style={{ color: "#DC3545" }}>{error}</div>}
      </div>

      <button
        class="btn btn-primary w-100 py-2 btn--login"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          HandleClick();
        }}
      >
        Register
      </button>
      <p class="mt-5 mb-3 text-body-secondary">&copy; Rishabh Dubey - 2023</p>
    </form>
  );
}

// <div>
//   <input
//     type="text"
//     onChange={(e) => {
//       setName(e.target.value);
//     }}
//   />
//   <input
//     type="email"
//     onChange={(e) => {
//       setUsername(e.target.value);
//     }}
//   />
//   <input
//     type="password"
//     onChange={(e) => {
//       setPassword(e.target.value);
//     }}
//   />
//   <button onClick={handleClick}>Login</button>

// </div>
