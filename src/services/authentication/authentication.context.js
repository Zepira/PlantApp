
import React, { useState, useContext, createContext, useEffect } from "react";
import { Login } from "./authentication.service";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs, doc, query, setDoc } from "firebase/firestore";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ auth, db, children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();


    useEffect(() => {
        const docRef = query(collection(db, "users"));
        getDocs(docRef)
            .then((something) => something.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data())
            }));
        //onLogOut();

    }, [db]);


    onAuthStateChanged(auth, (usr) => {
        if (usr) {
            setUser(usr);

            if (isLoading) setIsLoading(false);
        }
    });

    const onLogin = (email, password) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((u) => {
                setUser(u.user);
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
                setDoc(doc(db, "users", u.user.uid), {
                    email: email,
                    password: password
                })
                    .then(
                        setIsLoading(false)
                    )

            })
            .catch((e) => {
                // setIsLoading(false);
                // if (e.code.contains("auth/")) {
                //     setError(e.code.replace("auth/", "").replace("-", " "));
                // }
                // setError(e);
                console.log(e);
            });
    }

    const onLogOut = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            setUser(null);
            setError(null);
        })
            .catch((e) => console.log(e))




    }

    return (
        <AuthenticationContext.Provider
            value={{
                isAuthenticated: true,//!!user,
                user,
                isLoading,
                error,
                onLogin,
                onSignUp,
                onLogOut,
                db
            }}>
            {children}
        </AuthenticationContext.Provider>
    );
};
