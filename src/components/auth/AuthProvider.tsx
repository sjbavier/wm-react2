import { FC } from 'react';
import { useAuth } from './useAuth';
import { AuthContext } from './AuthContext';

export const AuthProvider: FC = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const { ...auth } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        ...auth
      }}
      {...props}
    >
      {children}
    </AuthContext.Provider>
  );
};
