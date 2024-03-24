import React, { createContext, useState } from "react";

const UrlContext = React.createContext({
    domain : "http://192.168.1.101:8080",
    albumsGDrive: "",
});

export default UrlContext;