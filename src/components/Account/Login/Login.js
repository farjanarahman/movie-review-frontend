import React, { useContext, useState } from "react";
import {useHistory, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../../../App";
import {
  handleGoogleSignIn,
  initializeLoginFramework,
  signInWithEmailAndPassword,
  storeAuthToken,
} from "../loginManager/loginManager";
const Login = () => {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
    error: "",
    success: false,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);

  
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      signInWithEmailAndPassword(email, password).then((res) => {
        handleResponse(res, true);
      });
    }
  };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };




  const handleResponse = (res, redirect) => {
    if (res.success) {
      setUser(res);
    }
    setLoggedInUser(res);

    if (redirect) {
      storeAuthToken(res);
      setTimeout( () => {
          history.replace(from)
      },2000);
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="column column-50 column-offset-25">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor="emailField" className="">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                id="emailField"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="passwordField" className="mt-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                id="passwordField"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="button-primary mt-3"
                type="submit"
                value="Sign In"
              />
            </fieldset>
          </form>
          <Link to="/register">
            <p>
              {" "}
              <a href="" className="text-primary pe-auto">
                Don't have an account? Register here
              </a>{" "}
            </p>
          </Link>
          <hr />
          <button className="button button-outline" onClick={googleSignIn}>
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
