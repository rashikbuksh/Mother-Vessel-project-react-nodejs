import { useState, useEffect } from "react";
import { getUser } from "../../pages/Login/Login";
import AuthContext from "./AuthContext";
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const currentUser = getUser();
        setUser(currentUser);
    }, []);
    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};
