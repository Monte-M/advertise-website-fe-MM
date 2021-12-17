import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthCtx } from "../../store/AuthContext";
import AdButton from "../UI/Buttons/AdButton";
import Icon from "../UI/Icons/Icon";
import css from "./Navbar.module.css";

function Navbar() {
  const authCtx = useAuthCtx();
  const loggedIn = authCtx.isLoggedIn;
  const logout = authCtx.logout;

  return (
    <div className={css.navContainer}>
      <div className={css.imageContainer}>
        <Link to='/'>
          <img
            src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.freelogovectors.net%2Fwp-content%2Fuploads%2F2020%2F11%2Fworkato-logo.png&f=1&nofb=1'
            alt=''
          />
        </Link>
      </div>

      <input
        className={css.checkbox}
        id='burger-check'
        type='checkbox'
        defaultChecked={true}
      />
      <label htmlFor='burger-check' className={css.burger}>
        <Icon icon='fa-bars' />
      </label>

      <nav className={css.links}>
        <NavLink activeClassName='active' exact to='/'>
          Home
        </NavLink>
        {!loggedIn && (
          <NavLink activeClassName='active' to='/register'>
            Register
          </NavLink>
        )}
        {loggedIn && (
          <NavLink activeClassName='active' to='/myAds'>
            My Ads
          </NavLink>
        )}
        {loggedIn && (
          <NavLink activeClassName='active' to='/favorites'>
            Favorites
          </NavLink>
        )}
        {loggedIn ? (
          <NavLink activeClassName='inActive' to='/' onClick={logout}>
            Logout
          </NavLink>
        ) : (
          <NavLink activeClassName='active' to='/login'>
            Login
          </NavLink>
        )}
        {loggedIn && (
          <Link to='/addItem'>
            <AdButton>Post New Ad</AdButton>
          </Link>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
