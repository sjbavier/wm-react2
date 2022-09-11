import { useEffect, useState, useCallback, useRef } from 'react';
import useClient from '../../hooks/useClient';
import useNotifications from '../../hooks/useNotifications';
import { VERBOSITY } from '../../lib/constants';
import { PERMISSION } from '../../lib/Permissions';
import { TRequest } from '../../models/models';

export type TAuthResponse = {
  userId: number;
  user: string;
  role: string;
  message: string;
  msg?: string;
};

export interface IAuth {
  err?: string;
  loading: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: any;
  userId?: number;
  setUserId: any;
  user?: string;
  setUser: any;
  scopes?: string[];
  setScopes: any;
  token?: string;
  setToken: any;
  fetchUser: any;
  isComplete: string;
}

export enum TOKEN_STATE {
  IDLE = 'idle',
  PENDING = 'pending',
  COMPLETE = 'complete'
}

export const useToken = (lToken: string) => {
  const [token, _setToken] = useState<string>(lToken);
  const [isComplete, setIsComplete] = useState<TOKEN_STATE>(TOKEN_STATE.IDLE);

  useEffect(() => {
    if (isComplete === 'pending' && token) {
      console.log('pending with token', token);
      setIsComplete(TOKEN_STATE.COMPLETE);
    }
    if (isComplete === 'complete' && token) {
      setIsComplete(TOKEN_STATE.IDLE);
    }
  }, [token, isComplete]);

  const setToken = useCallback((Atoken: string) => {
    setIsComplete(TOKEN_STATE.PENDING);
    localStorage.setItem('token', Atoken);
    _setToken(Atoken);
  }, []);

  return [token, setToken, isComplete, setIsComplete] as const; // freeze array to a tuple
};

export const useAuth = () => {
  const [token, setToken, isComplete] = useToken(
    localStorage.getItem('token') || ''
  );
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [user, setUser] = useState<string | undefined>(undefined);
  const [scopes, setScopes] = useState<string[] | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [err, setErr] = useState<TAuthResponse | any>('');
  const setNotification = useNotifications();
  const { fetchMe, loading } = useClient(VERBOSITY.NORMAL);

  const fetchUser = useCallback(async () => {
    if (!!token) {
      console.log('fetch user:', token);
      const request: TRequest = {
        method: 'GET',
        path: '/auth/authorize',
        token
      };
      fetchMe<TAuthResponse>(request)
        .then((response: TAuthResponse) => {
          if (response.user) {
            setUserId(response.userId);
            setUser(response.user);
            setScopes(PERMISSION[response.role.toUpperCase()]);
            setIsLoggedIn(true);
          } else {
            setUserId(undefined);
            setUser(undefined);
            setScopes(undefined);
            setIsLoggedIn(false);

            setToken('');
            setErr(response.msg);
            setNotification({
              message: 'Error',
              description: `${response.msg}`
            });
          }
        })
        .catch((err) => {
          setNotification({
            message: 'Error',
            description: `${err}`
          });
        });
    }
  }, [token, setToken, setNotification, fetchMe]);

  const hasFetched = useRef(false);
  useEffect(() => {
    let mounted = true;
    if (mounted && !hasFetched.current && !!token) {
      hasFetched.current = true;
      fetchUser();
      return () => {
        mounted = false;
      };
    }
  }, [token, fetchUser]);

  const auth: IAuth = {
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
  };

  return auth;
};
