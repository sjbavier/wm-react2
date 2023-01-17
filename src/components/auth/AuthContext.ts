import React from 'react';
import { IAuthContext } from './useAuth';

export const AuthContext = React.createContext<IAuthContext>(
  {} as IAuthContext
);
