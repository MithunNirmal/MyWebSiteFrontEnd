import React, { useContext, useEffect, useState } from "react";
import "./UserProfile.css"; // Import your CSS file for styling
import { UrlContext } from "../contexts/UrlContext";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {

  const navigate = useNavigate();
  const  { server } = useContext(UrlContext);
  const {userName, userId, token, logout} = useContext(UserContext);

  // Mock user data
  const [userData, setUserData ] = useState({
    name: "",
    email: "",
    status: "" // or "enabled"
  });

  useEffect(() => {
    fetch(server + `/api/v1/user/${JSON.parse(localStorage.getItem("userDetails")).userId}`, {
      method:"GET",
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("userDetails")).token,
        "Content-Type": "application/json"
      },
        // mode:"no-cors",
      //  credentials:"include"
    })
    .then((response) => {
      if(response.status === 200) {
        return response.json();
      }
      else {
        setUserData({
          name : userName,
          email : "",
          status : ""
        });
      }
    })
    .then((data) => {
      setUserData({
        name : data.firstName,
        email : data.email,
        status : data.enabled? "enabled" : "disabled"
      });
    })
    .catch((error) => {
      console.error("Unable to fetch user details " + error);
    })
    
    
  }, [])

  // Function to handle actions like resetting password, sending verification, or deleting account
  const handleAction = (action) => {
    switch (action) {
      case 'resetPassword':
        // Handle reset password action
        break;
      case 'sendVerification':
        // Handle send verification action
        break;
      case 'deleteAccount':
        if(window.confirm("Are you sure? Deleting will remove you purchase history?")) {
          var id = JSON.stringify(localStorage.getItem("userDetails").userId)
          console.log("Confirm Pannitan");
          fetch( `${server}/api/v1/user/delete/${id? id: userId}`, {
            method:'DELETE',
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json"
            },
            // mode: 'cors',
            // credentials: 'include'
          })
          .then((response) => {
            if(response.status === 200){
              localStorage.removeItem("userDetails");
              localStorage.clear();
              logout();
              alert("Your account is deleted");
              navigate("/");
            }
            else{
              alert("Account not deleted due to error " + response.status);
            }
          })
          .catch((error) => {
            console.log(error);
          })
        }
        else{
          console.log("Andha bayam irukatum");
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="content-wrapper container">
      <div className="user-profile">
        <div className="left-panel">
          <h2 style={{textAlign:"right"}}>Actions</h2>
          <div style={{paddingTop:"25px"}}>
            <ul className="profile-actions">
              <li onClick={() => handleAction("resetPassword")}>Reset Password</li>
              <li onClick={() => handleAction("sendVerification")}>Send Verification</li>
              <li onClick={() => handleAction("deleteAccount")}>Delete Account</li>
            </ul>
          </div>
        </div>
        <div className="right-panel">
          <h2 style={{textAlign:"center"}}>User Details</h2>
          <div className="user-info">
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <div >
            <p><strong>Status: </strong> 
              <span className={`status ${userData.status}`}>
                {userData.status}
              </span>
              {userData.status === "dilabled" || 
                    <p title="Click the verification link sent to your email id" style={{cursor:"help"}}>
                      (Please verify your email id to enable!)
                    </p>}
            </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
