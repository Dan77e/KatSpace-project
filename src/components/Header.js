import { NavLink } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    console.log(currentUser);
    return currentUser;
  };

  const doUserLogout = async function (e) {
    e.preventDefault();
    try {
      await Parse.User.logOut();
      // Update state variable holding current user
      getCurrentUser();
      navigate("/", { replace: true });
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  return (
    <header>
      <nav>
        <img id="logo" src="./images/katspace-logo.jpg" alt="Logo" />
        <ul className="nav">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link" to="/cats">
            The Cats
          </NavLink>
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
          {(window.localStorage.length == 1 && (
            <>
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>{" "}
            </>
          )) || (
            <>
              <p className="welcome">
                Welcome &nbsp; <NavLink className="nav-link" to="/profile">{Parse.User.current().get('username')}</NavLink>
              </p>
              <button className="nav-link" id="logout-btn" onClick={(e) => doUserLogout(e)}>
                Logout
              </button>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
