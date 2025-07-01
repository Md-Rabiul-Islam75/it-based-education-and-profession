import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { createContext, useState } from 'react';
import { auth } from '../firebase/firebase.init';

export const DataContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

      const updateUser = (profile) => {
        return  updateProfile(auth.currentUser, profile);
    }

    const userInfo = {
          user,
          setUser,
          loading,
          createUser,
          signInUser,
          updateUser
    }

    return (
        <DataContext.Provider value={userInfo}>
            {children}
        </DataContext.Provider>
    );
};

export default AuthProvider;