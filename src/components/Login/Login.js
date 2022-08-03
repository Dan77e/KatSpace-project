import {Link} from 'react-router-dom';


export const Login = (props) => {


  return (
    <form className="login-form" action="submit">
      <label for="username">Username: </label>
      <input type="text" minlength="2" maxlength="30" name="username" />

      <label for="password">Password: </label>
      <input type="password" minlength="5" maxlength="30" name="password" />

      <button id="login-btn">LOGIN</button>
      <span id="register-link">
        <p>Don't have an account ?</p>
        <Link to="/register">REGISTER</Link>
      </span>
    </form>
  );
};
