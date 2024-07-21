import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../backend/verificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [session, setSession] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const storedSession = await AsyncStorage.getItem('session');
                if (storedSession) {
                    const sessionData = JSON.parse(storedSession);
                    console.log('Fetched Session Data:', sessionData);
                    setSession(sessionData);
                    setIsLoggedIn(true);
                    setUser(sessionData);
                } else {
                    const currentUser = await getCurrentUser();
                    if (currentUser) {
                        setIsLoggedIn(true);
                        setUser(currentUser);
                        setSession(currentUser);
                        await AsyncStorage.setItem('session', JSON.stringify(currentUser));
                        console.log('Fetched Current User:', currentUser);
                    } else {
                        setIsLoggedIn(false);
                        setUser(null);
                        setSession(null);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch session:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSession();
    }, []);

    return (
        <UserContext.Provider value={{ userId, setUserId, session, setSession, isLoading, setIsLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const getUser = () => useContext(UserContext);
