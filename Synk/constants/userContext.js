import React, { createContext, useContext, useState,useEffect } from 'react';
import { getCurrentUser } from '../backend/verificationService';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [session, setSession] = useState(null);

    const [isLoggedIn, setIsLoggedIn] = useState(false)
        const [user, setUser] = useState(null)
        const [isLoading, setIsLoading] = useState(true)
        useEffect(()=>{
            getCurrentUser().then((res)=>{
                console.log(res)
                if(res){
                    setIsLoggedIn(true);
                    setUser(res)
                    setSession(res)
                }else{
                    setIsLoggedIn(true);
                    setUser(null)
                    setSession(null)
                }
            })
            .catch((error)=>{
                console.log(error)
            })
            .finally(()=>{
                setIsLoading(false)
            })
        },[])

    return (
        <UserContext.Provider value={{ userId, setUserId ,session,setSession}}>
            {children}
        </UserContext.Provider>
    );
};

export const getUser = () => useContext(UserContext);