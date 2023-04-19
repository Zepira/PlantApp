
import React, { useState, useContext, createContext, useEffect } from "react";
import { Login } from "./authentication.service";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from "firebase/auth";



export const AuthenticationContext = createContext();



export const AuthenticationContextProvider = ({ auth, children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();


    onAuthStateChanged(auth, (usr) => {
        console.log('ALANA', auth);
        if (auth.currentUser) {
            setUser(auth.currentUser);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    });

    const onLogin = (email, password) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((u) => {
                setUser(u);
                setIsLoading(false);
            })
            .catch((e) => {
                setIsLoading(false);
                setError(e.code.replace("auth/", "").replace("-", " "));
            });
    }

    const onSignUp = (email, password) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((u) => {
                setUser(u.user);
                setIsLoading(false);
            })
            .catch((e) => {
                setIsLoading(false);
                setError(e.code.replace("auth/", "").replace("-", " "));
            });
    }

    const onLogOut = () => {
        setIsLoading(true);
        signOut()
            .then(() => {
                setUser(null);
                setError(null);
                setIsLoading();
            });
    }

    return (
        <AuthenticationContext.Provider
            value={{ isAuthenticated: !!user, user, isLoading, error, onLogin, onSignUp, onLogOut }}>
            {children}
        </AuthenticationContext.Provider>
    );
};
