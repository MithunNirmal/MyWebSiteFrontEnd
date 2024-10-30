import React, { createContext, useState } from "react";

const UrlContext = React.createContext(null);
    // domain : "http://192.168.1.101:8080",
    // albumsGDrive: "",        
    //}



const UrlProvider = ({ children }) => {
    const [server, setServer ]= useState(`http://192.168.1.8:8080`);

    return (
        <UrlContext.Provider value={{ server, setServer }}>
            {children}
        </UrlContext.Provider>
    );
};

export  { UrlContext, UrlProvider };