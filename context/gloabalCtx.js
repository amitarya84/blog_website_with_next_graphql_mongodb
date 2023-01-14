import React, { useState } from 'react';

export const GloabalCtx = React.createContext();

export const GloabalCtxProvider = ({ children }) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <GloabalCtx.Provider value={{
            userId,
            setUserId,
            loggedIn,
            setLoggedIn,
            loading,
            setLoading
        }}>
            {children}
        </GloabalCtx.Provider>
    )
}