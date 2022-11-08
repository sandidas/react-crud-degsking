import React, { createContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../Helpers/firebase.init';

export const AuthContext = createContext({}); // context
const auth = getAuth(app); // call google firebase auth

const UserContext = ({ children }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    const showAlert = (type, message) => {
        if (type == "success") {
            toast.success(message, {
                position: "bottom-left",
                autoClose: 8000,
                theme: "colored",
            });

        } else if (type == "danger") {
            toast.error(message, {
                position: "bottom-left",
                // bodyClassName: "bg-yellow-500",
                theme: "colored",
            });
        } else {
            toast.warn(message, {
                position: "bottom-left",
                autoClose: 15000,
                theme: "colored",
            });
        }
    }

    const googleProvider = new GoogleAuthProvider(); // google auth provider
    const gitHubProvider = new GithubAuthProvider(); // github auth provider

    // form login
    const logInbyEmailAndPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    // social logins
    const loginBySocailAccounts = (loginType) => {
        setLoading(true);
        if (loginType == 'google') {
            return signInWithPopup(auth, googleProvider);
        }
        if (loginType == 'github') {
            return signInWithPopup(auth, gitHubProvider);
        }
    }
    // create new user by g. firebase
    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    }
    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser);
    }
    // # create new user by g. firebase
    // forget Password
    const requestForgetPassword = (email) => {
        // setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }
    // sign out
    const userSignout = () => {
        // setLoading(true);
        return signOut(auth);
    }

    // check user signed in or not 
    useEffect(() => {
        console.log('triggerd');
        const unsSubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
            } else {
                setUser({});
                setLoading(false);
            }
        })
        // if user change/log out on any route
        return () => unsSubscribe();

    }, [auth])


    // pass data by context
    const authInfo = { showAlert, loading, setLoading, logInbyEmailAndPassword, loginBySocailAccounts, userSignout, createNewUser, updateUserProfile, verifyEmail, user }
    console.log(loading);
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            <ToastContainer />
        </AuthContext.Provider>
    );
};

export default UserContext;