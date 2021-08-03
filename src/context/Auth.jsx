import React, { useEffect, useState } from "react";
import firebase from "../config/config";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};