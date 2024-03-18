import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import bag from "../files/bag.png";

const Header = () => {
//  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {name, isLoggedOn, login, token, logout} = useContext(UserContext);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const navbarRef = useRef(null);
  

  const handleNavCollapse = () => {
    console.log("handleNavCollapse called");
    setIsNavCollapsed(!isNavCollapsed);
  }
 
  const handleOutsideClick = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsNavCollapsed(true);
    }
  };

  useEffect(() => {      
    window.addEventListener('click', handleOutsideClick);
    return () => {
     window.removeEventListener("click", handleOutsideClick);
    };
  }, [isNavCollapsed]);

  useEffect(() => {
    // Function to retrieve user information from local storage
    const getUserFromLocalStorage = () => {
      const storedUserInformation = localStorage.getItem("userDetails");
      if (storedUserInformation) {
        const userDetails = JSON.parse(storedUserInformation);
        //console.log(userDetails.name);
        login(userDetails.isLoggedOn, userDetails.name, userDetails.token)
        console.log("wfkedhfsdhf " + name);
      }
    };
    // Call the function when the component mounts
    getUserFromLocalStorage();
  }, [name, isLoggedOn, token]);


  const handleLogout = () => {

    fetch("http://localhost:8080/api/v1/auth/logout", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"), // Append the token to the Authorization header
        "Content-Type": "application/json" // Set content type if needed
      }
    })
    .then((response)=> 
    {
      if (response.status == 200){
        localStorage.removeItem("user");
        localStorage.clear();
        logout();
      }
      else
        console.error("logout error " + response.status);
    }).catch((error) => {console.error("logout error caught");})
  }

  return (
    <header className="header bg-dark py-2 fixed-top">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid" ref={navbarRef}>
            <Link to="/" className="navbar-brand mb-0 h1">
                    Mithun Nirmal
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded={!isNavCollapsed ? true : false}
              aria-label="Toggle navigation"
              onClick={handleNavCollapse}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`} id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item" >
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item" >
                  <Link to="/discography" className="nav-link" >
                    Discography
                  </Link>
                </li>
                <li className="nav-item" >
                  <Link to="/merch" className="nav-link">
                    Merchandise
                  </Link>
                </li>
                {isLoggedOn ? (
                  <li className="nav-item dropdown fw-bolder">
                    <button
                      className="nav-link btn btn-dark dropdown-toggle"
                      id="navbarDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {name}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li >
                        <Link to="/profile" className="dropdown-item" >
                          Profile 
                        </Link>
                      </li>
                      <li  onClick={handleLogout} >
                        <Link className="dropdown-item" >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item dropdown">
                    <button
                      className="nav-link btn btn-dark dropdown-toggle"
                      id="navbarDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Membership <small className="text-warning">free</small>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li >
                        <Link to="/login" className="dropdown-item">
                          Login
                        </Link>
                      </li>
                      <li >
                        <Link to="/signup" className="dropdown-item">
                          Sign Up
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
                <li className="nav-item">
                  <Link to="/cart" className="nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bag" viewBox="0 0 20 20">
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
