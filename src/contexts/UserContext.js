import React, { createContext, useEffect, useState } from "react";

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
		const [isLoggedOn, setIsLoggedIn] = useState(false);
		const [userName, setUserName] = useState(null);
		const [token, setToken] = useState(null);
		const [userId, setUserId] = useState(null);

		useEffect(() => {
			const getUserFromLocalStorage = () => {
				const storedUserInformation = localStorage.getItem("userDetails");
				if (storedUserInformation) {
				  const userDetails = JSON.parse(storedUserInformation);
				  login(userDetails.isLoggedOn, userDetails.userName, userDetails.token, userDetails.userId);
				}
			  };
			  // Call the function when the component mounts
			  getUserFromLocalStorage();
		}, [userName, isLoggedOn, token]);

		const login = (isLoggenOnData, userName, tokenData, userId) => {
			setIsLoggedIn(isLoggenOnData)  
			setUserName(userName);
			setToken(tokenData);
			setUserId(userId);
		};

		const logout = () => {
			setIsLoggedIn(false) ; 
			setUserName(null);
			setToken(null);
			setUserId(null);
		};

		return (
			<UserContext.Provider value={{ userName, isLoggedOn, token, userId, login, logout }}>
				{children}
			</UserContext.Provider>
		)
};
  
export { UserContext, UserProvider };

