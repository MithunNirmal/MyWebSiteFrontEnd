import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../files/bgm.jpg";
import UrlContext from "../contexts/UrlContext";
import { UserContext } from "../contexts/UserContext";

const Signup = () => {
  const url = useContext(UrlContext);
  const navigate = useNavigate();
  const {login}  = useContext(UserContext);
 
  const [formData, setFormData] = useState({
    firstName:"",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const isValidEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!formData.firstName.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: "firstName is required",
      }));
      valid = false;
    }
    if (!formData.email.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      valid = false;
    }else if(!isValidEmail(formData.email.trim())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid Email",
      }));
      valid = false;
    }
    if (!formData.password.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      valid = false;
    }else if(!(formData.password.trim().length > 7)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password should have 8 chaaracters minimum",
      }));
      valid = false;
    }
    if (!formData.confirmPassword.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Confirm password is required",
      }));
      valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      valid = false;
    }

    if (valid) {
      // Perform signup action
      fetch(url.domain+"/api/v1/auth/register", {
        method : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })
      .then((response) => {
        if(response.status == 200){
          alert("Sign up successful! Please verify email id and login");
          console.log("Signup successful!");
          return response.json();
        }
        else {
          console.error("response status " +response.status);
        }
      })
      .then((data) => {
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
        console.error(error);
      }); 
    }
  };

  return (
    <>
    <div style={{
      backgroundImage: `url(${backgroundImage})`, // Use local image file
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity here (0.5 is 50% opacity)
      minHeight: "100vh",
    }}>
      <div className="container mt-5 content-wrapper">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card" style={{backgroundColor : "rgba(255,255,255,0.8)", borderRadius:"30px"}}>
              <div className="card-body">
                <h2 className="text-center mb-4">Sign Up</h2>
                <form onSubmit={handleSignupSubmit}>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      firstName
                    </label>
                    <input
                      type="firstName"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter firstName"
                    />
                    <div className="invalid-feedback">{errors.firstName}</div>
                  </div>

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
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        errors.confirmPassword ? "is-invalid" : ""
                      }`}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm Password"
                    />
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-dark" style={{maxWidth:"200px", margin:"auto"}}>
                      Sign Up
                    </button>
                  </div>
                </form>
                <div className="text-center mt-3">
                  <p>
                    Already have an account?{" "}
                    <Link to="/login" className="btn btn-link">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Signup;
