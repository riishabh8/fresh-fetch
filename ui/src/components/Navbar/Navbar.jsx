import React, { useState } from "react";
import "./navbar.css";
import NavData from "./NavData";
import { adminData, normalData, userData } from "./adminData";
import { Link } from "react-router-dom";

export default function Navbar({isAdmin,isUser,name}) {
 
  // isAdmin = localStorage.isAdmin;
  console.log("isAdmin",isAdmin);
  console.log("isUser",isUser);
  console.log("name",name);
  if(isUser === "true"){
    userData[0].name = name
  }
  else{
      adminData[0].name = name
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary customNavbar">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Fresh Fetch
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {isAdmin === "true" && <NavData items={adminData} flag = {true} />}
            {isUser === "true" && <NavData items={userData} flag = {true} />}
            { isAdmin === undefined && isUser === undefined && <NavData items={normalData} flag = {false} />}
          </div>
        </div>
      </nav>
    </div>
  );
}
