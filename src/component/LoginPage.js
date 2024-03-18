import React, { useState, useContext, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import backgroundImage from "../files/bgm.jpg";

const LoginPage = () => {
  const [jwToken, setJwToken] = useState(null);
  const {login, token, user}  = useContext(UserContext);

  const navigate = useNavigate();


  useEffect(() => {
    console.log(user);
    user ? navigate("/") : console.log(user);
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    // Validation logic...

    if (valid) {
      console.log("Calling authenticate fetch now");
      fetch("http://192.168.1.100:8080/api/v1/auth/authenticate", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      .then((response) => {
        if (response.status != 200) {
          setErrors({ ...errors, password: "Incorrect password" });
        } else if (response.status == 200) {
          setErrors({
            ...errors,
            password: "",
          });
        } else {
          setErrors({
            ...errors,
            password: "Some error!",
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setJwToken(data);
        console.log(jwToken);
        console.log(jwToken.access_token);
        login(true, "Mithun", jwToken.access_token);
        localStorage.setItem("userDetails", JSON.stringify({
          isLoggedOn: true,
          name: "Mithun",
          token: jwToken.access_token
        }));
        localStorage.setItem("jwt", jwToken.access_token);
        console.log("Login successful!");
        navigate("/");
        console.log("token -> " +token);
      })
      .catch((error) => {
        // setErrors({
        //   ...errors,
        //   email: "Error",
        //   password: "error",
        // });
        console.log("Login failed :( ");
        console.error("Error logging in :", error);
      });
    }
  };

  return (
    <div  style={{
      backgroundImage: `url(${backgroundImage})`, // Use local image file
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity here (0.5 is 50% opacity)
      minHeight: "100vh",
    }}>
    <div className="container mt-5 content-wrapper" 
   // style={{position:"absolute", top:"40%", left:"50%", transform: "translate(-50%, -50%)", overflow: "auto" }}
    >
      <div className="row justify-content-center" >
        <div className="col-lg-6">
          <div className="card bg-dark text-light">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                  />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                  />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>
                <div className="text-center mt-5">
                  <button
                    type="submit"
                    className="btn btn-light btn-block btn-lg"
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="text-center mt-4">
                <p>
                  Don't have an account?{" "}
                  <Link to="/signup" className="btn btn-link text-light">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
