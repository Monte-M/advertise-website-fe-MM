import React from "react";
import { Link } from "react-router-dom";
import AdButton from "../UI/Buttons/AdButton";
import css from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={css.container}>
      <Link to='/'>
        <img
          src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.freelogovectors.net%2Fwp-content%2Fuploads%2F2020%2F11%2Fworkato-logo.png&f=1&nofb=1'
          alt=''
        />
      </Link>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
        <Link to='/addItem'>
          <AdButton>Post Your Ad</AdButton>
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
