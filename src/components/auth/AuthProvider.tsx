import { FC } from 'react';
import { useAuth } from './useAuth';
import { AuthContext } from './AuthContext';

export const AuthProvider: FC = ({ children, ...props }): JSX.Element => {
  const {
    err,
    loading,
    isLoggedIn,
    setIsLoggedIn,
    userId,
    setUserId,
    user,
    setUser,
    scopes,
    setScopes,
    token,
    setToken,
    fetchUser,
    isComplete
  } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        err,
        loading,
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId,
        user,
        setUser,
        scopes,
        setScopes,
        token,
        setToken,
        fetchUser,
        isComplete
      }}
      {...props}
    >
      {children}
    </AuthContext.Provider>
  );
};
