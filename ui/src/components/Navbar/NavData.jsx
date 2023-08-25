import React from "react";
import { Link } from "react-router-dom";

export default function NavData({items,flag}) {
  
  function handleSignOut(){
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <ul className="navbar-nav">
      {items.map((item,index) => (
        <li key={index} className="nav-item">
          <Link className="nav-link" to={item.link}>
            {item.name}
          </Link>
        </li>
      ))}
      {flag && (
        <li key={'0011'} className="nav-item nav-link"
          onClick={() => {
            handleSignOut();
          }}
          style={{color:"white", cursor:"pointer"}}
        >
          SignOut
        </li>
      )}
    </ul>
  );
}
