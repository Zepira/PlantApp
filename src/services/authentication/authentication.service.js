
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";







export const Login = (auth, email, password) => signInWithEmailAndPassword(auth, email, password);


