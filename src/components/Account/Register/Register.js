import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useLocation, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, handleGoogleSignIn, initializeLoginFramework, storeAuthToken } from '../loginManager/loginManager';
import { AuthContext } from '../../../App';
const Register = () => {
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
    });
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(AuthContext);

    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };
    const handleSubmit = e => {
        e.preventDefault();

        if(password === confirmPassword){
            createUserWithEmailAndPassword(username, email, password)
            .then(res => {
                console.log(res)
                handleResponse(res, false)
            })
        }else{
            toast.error("Your password and confirm password field didn't match please try again" )
        }
    }
    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true)
            })
    }
    const handleResponse = (res, redirect) => {
        if(res.success){
            setUser(res);
        }
        setLoggedInUser(res);

        if (redirect) {
            storeAuthToken(res);
            setTimeout( () => {
                history.replace(from)
            },2000);

        }
    }
    
    return (
        <div className="container my-5">
        <div className="row">
          <div className="column column-50 column-offset-25">
          <ToastContainer />  
            <form onSubmit={handleSubmit}>
              <fieldset>
                <label htmlFor="nameField" className="">
                  Name
                </label>
                <input type="text" placeholder="Name" id="nameField" value={username} onChange={ e => setUsername(e.target.value)} />
                <label htmlFor="emailField" className="mt-2">
                  Email
                </label>
                <input type="email" placeholder="Email" id="emailField" value={email} onChange={ e => setEmail(e.target.value)}/>
                <label htmlFor="passwordField" className="mt-2">
                  Password
                </label>
                <input type="password" placeholder="Password" id="passwordField" value={password} onChange={ e => setPassword(e.target.value)}/>
                <label htmlFor="confirmPasswordField" className="mt-2">
                 Confirm Password
                </label>
                <input type="password" placeholder="Confirm Password" id="confirmPasswordField" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                <input
                  className="button-primary mt-3"
                  type="submit"
                  value="Sign up"
                />
              </fieldset>
            </form>
            <Link to="/login">
              <p>
                {" "}
                <a href="" className="text-primary pe-auto">
                  Already have an account? Sign in here
                </a>{" "}
              </p>
            </Link>
            <hr />
            <button className="button button-outline" onClick={googleSignIn}>Sign up with Google</button>
          </div>
        </div>
      </div>
    );
};

export default Register;