import React from "react";
import "./UserProfile.css"; // Import your CSS file for styling

const UserProfile = () => {
  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    status: "enabled" // or "disabled"
  };

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
          console.log("Confirm Pnnitan");
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
