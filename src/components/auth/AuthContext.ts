import React from 'react';
import { IAuth } from './useAuth';

export const AuthContext = React.createContext<IAuth>({} as IAuth)
