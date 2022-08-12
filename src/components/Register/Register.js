import { Link } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRepass] = useState("");
  let passValid = false;

  if (password === repass) {
    passValid = true;
  }

  const doRegister = async function (e) {
    e.preventDefault();
    const usernameValue = username;
    const passwordValue = password;

    if (usernameValue.length > 1 && passwordValue.length > 4) {
      try {
        // Since the signUp method returns a Promise, we need to call it using await
        await Parse.User.signUp(usernameValue, passwordValue);
        alert(`You have successfully created your acount`);
        navigate("/", { replace: true });
        return true;
      } catch (error) {
        // signUp can fail if any parameter is blank or failed an uniqueness check on the server
        alert(error);
        return false;
      }
    } else{
      alert("Username must contain at least 2 letters \n \n Password must be at least 5 characters long");
    }
  };

  return (
    <form className="register-form" action="submit">
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

      <label htmlFor="repass">Repeat password: </label>
      <input
        type="password"
        minLength="5"
        maxLength="30"
        name="repass"
        value={repass}
        onChange={(event) => setRepass(event.target.value)}
      />
      {(passValid && (
        <button id="register-btn" onClick={(e) => doRegister(e)}>
          REGISTER
        </button>
      )) || (
        <button disabled id="register-btn" onClick={() => doRegister()}>
          REGISTER
        </button>
      )}
      <span id="login-link">
        <p>Already have an account ?</p>
        <Link to="/login">SIGN IN</Link>
      </span>
    </form>
  );
};
