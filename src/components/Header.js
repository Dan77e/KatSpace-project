import { NavLink } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const current = Parse.User.current();

  const getCurrentUser = async function () {
    const current = await Parse.User.current();
    if (current != null) {
      setCurrentUser(current);
      return currentUser;
    } else {
      return false;
    }
  };

  const doUserLogout = async function (e) {
    e.preventDefault();
    try {
      await Parse.User.logOut();
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
          {current === null && (
            <>
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>{" "}
            </>
          )}{" "}
          {current != null && (
            <>
              <p className="welcome">
                Welcome &nbsp;{" "}
                <NavLink className="nav-link" to="/profile">
                  {current.get("username")}
                </NavLink>
              </p>
              <button
                className="nav-link"
                id="logout-btn"
                onClick={(e) => doUserLogout(e)}
              >
                Logout
              </button>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
