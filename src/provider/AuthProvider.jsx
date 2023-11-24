import { createContext, useEffect } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import axios from 'axios';
import app from '../firebase/firebase-config';

export const AuthContext = createContext(null);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    // for user state
    const [user, setUser] = useState(null);

    // for loading state
    const [loading, setLoading] = useState(true);

    // create user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // update user
    const handleUpdateProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    // login with email and password
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    //google login
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

    // log out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // Observe user login or not
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, loggedUser => {
            setUser(loggedUser);
            setLoading(false)

            // create jwt
            const userEmail = loggedUser?.email || user?.email;
            if (loggedUser?.email) {
                axios.post(`${import.meta.env.VITE_BASE_API_URL}/jwt`, { email: userEmail }, { withCredentials: true })
                    .then(res => {
                        console.log(res.data);
                    })
            } else {
                axios.post(`${import.meta.env.VITE_BASE_API_URL}/logout`, userEmail, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data);
                    })
            }

        })
        return () => {
            unsubscribe();
        }
    }, [])


    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        login,
        googleLogin,
        logOut,
        handleUpdateProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;