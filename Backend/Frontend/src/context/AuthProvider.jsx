import React, { useContext, useState } from "react";
import Cookies from "js-cookie";
export const AuthContext = React.createContext();  
export const AuthProvider = ({ children }) => {
    const initialUserState = localStorage.getItem("messenger")
    const [authUser, setAuthUser] = useState(initialUserState ? JSON.parse(initialUserState) : undefined);
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);