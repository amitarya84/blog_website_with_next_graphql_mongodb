import React, { useState } from 'react';

export const GloabalCtx = React.createContext();

export const GloabalCtxProvider = ({ children }) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');

    return (
        <GloabalCtx.Provider value={{
            userId,
            setUserId,
            loggedIn,
            setLoggedIn
        }}>
            {children}
        </GloabalCtx.Provider>
    )
}