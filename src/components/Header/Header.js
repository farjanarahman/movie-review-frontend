import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";
import { handleSignOut } from "../Account/loginManager/loginManager";

const Header = ({ getSearchResult }) => {
  const [term, setTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const admin = sessionStorage.getItem("admin");

  const checkAdmin = (data) => {
    setIsAdmin(data);
    sessionStorage.setItem("admin", JSON.stringify({ admin: data }));
  };

  useEffect(() => {
    fetch(
      `http://localhost:5000/checkAdmin/${
        loggedInUser.isSignedIn ? loggedInUser.email : userInfo.email
      }`
    )
      .then((res) => res.json())
      .then((data) => checkAdmin(data));
  }, [admin]);

  const setSearchData = (term) => {
    getSearchResult(term);
  };

  const signOut = () => {
    handleSignOut()
    const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
    }
    setLoggedInUser(signedOutUser)
    sessionStorage.removeItem('userInfo')
}

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand " href="#">
          <strong>Movie Review</strong>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <form className="d-flex me-auto my-5">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setTerm(e.target.value)}
            />
            <Link
              className="btn btn-outline-success ms-1 p-3"
              onClick={() => setSearchData(term)}
            >
              Search
            </Link>
          </form>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/">
                <a className="nav-link">
                  <strong>Home</strong>
                </a>
              </Link>
            </li>
            {
              (isAdmin || admin.admin) &&  <li className="nav-item">
              <Link to="admin">
                <a className="nav-link">
                  <strong>Admin Panel</strong>
                </a>
              </Link>
            </li>
            }
            <li className="nav-item">
              {userInfo || loggedInUser.email ? (
                <Link className="nav-link" onClick={signOut}>Logout</Link>
              ) : (
                <Link to="/login">
                  <a className="nav-link">
                    <strong>Login</strong>
                  </a>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
