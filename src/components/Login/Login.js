import { Link } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const doUserLogIn = async function (e) {
    e.preventDefault();
    const usernameValue = username;
    const passwordValue = password;
    try {
      await Parse.User.logIn(usernameValue, passwordValue);
      // Update state variable holding current user
      getCurrentUser();
      navigate("/", { replace: true });
      return true;
    } catch (error) {
      // Error can be caused by wrong parameters or lack of Internet connection
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    setCurrentUser(currentUser);
    return currentUser;
  };

  return (
    <form className="login-form" action="submit">
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        minLength="2"
        maxLength="30"
        name="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <label htmlFor="password">Password: </label>
      <input
        type="password"
        minLength="5"
        maxLength="30"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <button id="login-btn" onClick={(e) => doUserLogIn(e)}>
        LOGIN
      </button>
      <span id="register-link">
        <p>Don't have an account ?</p>
        <Link to="/register">REGISTER</Link>
      </span>
    </form>
  );
};
