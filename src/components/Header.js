import logo from "../images/katspace-logo.jpg";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <nav>
        <img id="logo" src={logo} alt="Logo" />
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
          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};
