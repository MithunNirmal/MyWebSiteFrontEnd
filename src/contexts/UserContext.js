import React, { createContext, useState } from "react";

const UserContext = React.createContext(null);


const UserProvider = ({ children }) => {
		const [isLoggedOn, setIsLoggedIn] = useState(false);
		const [name, setUser] = useState(null);
		const [token, setToken] = useState(null);

		const login = (isLoggenOnData, userName, tokenData) => {
			setIsLoggedIn(isLoggenOnData)  
			setUser(userName);
			setToken(tokenData)
		};

		const logout = () => {
			setIsLoggedIn(false)  
			setUser(null);
			setToken()
		};

		return (
			<UserContext.Provider value={{ name, isLoggedOn, token, login, logout }}>
				{children}
			</UserContext.Provider>
		)
};
  
export { UserContext, UserProvider };

