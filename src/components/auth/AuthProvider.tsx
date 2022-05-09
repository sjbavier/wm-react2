import { useState, FC, Children } from 'react';
import { useAuth, IAuth } from './useAuth'
import { AuthContext } from './AuthContext';

export const AuthProvider: FC = ({ children, ...props }): JSX.Element => {
    const { err, loading, isLoggedIn, setIsLoggedIn, userId, scopes, token, setToken } = useAuth()

    return (
        <AuthContext.Provider value={{
            err,
            loading,
            isLoggedIn,
            setIsLoggedIn,
            userId,
            scopes,
            token,
            setToken
        }} {...props}>
            {children}
        </AuthContext.Provider>
    )
}

