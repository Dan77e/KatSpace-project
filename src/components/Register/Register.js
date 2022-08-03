import { Link } from "react-router-dom";
import Parse from 'parse/dist/parse.min.js';
import { useState } from "react";


export const Register = () => {

    // State variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const doRegister = async function () {
      // Note that these values come from state variables that we've declared before
      const usernameValue = username;
      const passwordValue = password;
      try {
        // Since the signUp method returns a Promise, we need to call it using await
        const createdUser = await Parse.User.signUp(usernameValue, passwordValue);
        alert(
          `Success! User ${createdUser.getUsername()} was successfully created!`
        );
        return true;
      } catch (error) {
        // signUp can fail if any parameter is blank or failed an uniqueness check on the server
        alert(`Error! ${error}`);
        return false;
      }
    };


  return (
    <form class="register-form" action="submit">
      <label for="username">Username: </label>
      <input type="text" minlength="2" maxlength="30" name="username" value={username}
              onChange={(event) => setUsername(event.target.value)}/>

      <label for="password">Password: </label>
      <input type="password" minlength="5" maxlength="30" name="password" 
      value={password}
      onChange={(event) => setPassword(event.target.value)}/>

      <label for="repass">Repeat password: </label>
      <input type="password" minlength="5" maxlength="30" name="repass" />

      <button id="register-btn" onClick={doRegister()} >REGISTER</button>
      <span id="login-link">
        <p>Already have an account ?</p>
        <Link to="/register">SIGN IN</Link>
      </span>
    </form>
  );
}
