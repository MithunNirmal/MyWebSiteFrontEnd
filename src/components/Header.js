import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { UrlContext } from "../contexts/UrlContext";
import { NavDropdown, Navbar , Nav} from "react-bootstrap";

const Header = () => {
  const {userName, isLoggedOn, userId, login, token, logout} = useContext(UserContext);
  //const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const navbarRef = useRef(null);
  const { server } = useContext(UrlContext);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
 
  const handleOutsideClick = (event) => {
     if (navbarRef.current && !navbarRef.current.contains(event.target)) {
    //  setIsNavCollapsed(true);
      setExpanded(false);
    }
  };

  const handleNavCollapse = () => {
    setExpanded(!expanded);
  };

  const handleDropDownClick = (event) => {
    // Prevents the default action of the click event
    event.preventDefault();
    // Prevents the event from bubbling up the DOM tree
    event.stopPropagation();
    // Your custom logic here

  };

  useEffect(() => {      
    window.addEventListener('click', handleOutsideClick);
    return () => {
     window.removeEventListener("click", handleOutsideClick);
    };
  }, [expanded]);


  const handleLogout = () => {
    fetch(server + "/api/v1/auth/logout", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"), // Append the token to the Authorization header
        "Content-Type": "application/json" // Set content type if needed
      }
    })
    .then((response)=> 
    {
      if (response.status == 200){
        localStorage.removeItem("userDetails");
        localStorage.clear();
        logout();
        navigate("/");
      }
      else
        console.error("logout error " + response.status);
    }).catch((error) => {console.error("logout error caught");})
  }

  return (
    <header className="header bg-dark py-2 fixed-top">
      <div className="container">
        <Navbar expand="lg" variant="dark" expanded={expanded} onToggle={handleNavCollapse} ref={navbarRef}>
          <Navbar.Brand as={Link} to="/" style={{paddingLeft:"10px", width:"60px"}}>
            <img src="/icon.jpeg" width="35px" height="35px" style={{borderRadius:"50%"}} className="d-inline-block align-top img-fluid"/>
          </Navbar.Brand>
          <Navbar.Brand as={Link} to="/" style={{textAlign:"right"}}>
            Mithun Nirmal
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" onClick={handleNavCollapse}>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/discography">
                Discography
              </Nav.Link>
              <Nav.Link as={Link} to="/merch">
                Merchandise
              </Nav.Link>
              {isLoggedOn ? (
                <NavDropdown title={userName} id="navbar-dropdown" onClick={handleDropDownClick}>
                  <NavDropdown.Item as={Link} to={`/profile/${userId}`}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown title={<span>Membership <small className="text-warning">free</small></span>} id="navbar-dropdown" onClick={handleDropDownClick}>
                  <NavDropdown.Item as={Link} to="/login">
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/signup">
                    Sign Up
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <Nav.Link as={Link} to="/cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-bag"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                </svg>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
