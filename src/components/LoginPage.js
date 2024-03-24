import React, { useState, useContext, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import backgroundImage from "../files/bgm.jpg";
import UrlContext from "../contexts/UrlContext";

const LoginPage = () => {
  const {login, token, userName, isLoggedOn}  = useContext(UserContext);
  const url = useContext(UrlContext);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(userName);
    isLoggedOn ? navigate("/") : console.log(userName);
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
      fetch(url.domain+"/api/v1/auth/authenticate", {
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
        console.log(data.access_token);
        login(true, data.user_name, data.access_token, data.user_id);
        localStorage.setItem("userDetails", JSON.stringify({
          isLoggedOn: true,
          userName: data.user_name,
          token: data.access_token,
          userId: data.user_id,
        }));
        localStorage.setItem("jwt", data.access_token);
        console.log("Login successful!");
        navigate("/");
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
          <div className="card" style={{backgroundColor : "rgba(255,255,255,0.8)", borderRadius:"30px"}}>
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
                    className="btn btn-dark btn-block btn-lg"
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="text-center mt-4">
                <p>
                  Don't have an account?{" "}
                  <Link to="/signup" className="btn btn-link">
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
