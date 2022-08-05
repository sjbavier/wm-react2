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
}

export const useToken = (lToken: string) => {
  const [token, _setToken] = useState<string>(lToken);
  const setToken = (Atoken: string) => {
    localStorage.setItem('token', Atoken);
    _setToken(Atoken);
  };

  return [token, setToken] as const; // freeze array to a tuple
};

export const useAuth = () => {
  const [token, setToken] = useToken(localStorage.getItem('token') || '');
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [user, setUser] = useState<string | undefined>(undefined);
  const [scopes, setScopes] = useState<string[] | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [err, setErr] = useState<TAuthResponse | any>('');
  const setNotification = useNotifications();
  const { fetchMe, loading } = useClient(VERBOSITY.NORMAL);

  const fetchUser = useCallback(async () => {
    const request: TRequest = {
      method: 'GET',
      path: '/auth/authorize',
      token
    };

    fetchMe<TAuthResponse>(request)
      .then((response: TAuthResponse) => {
        setUserId(response.userId);
        setUser(response.user);
        setScopes(PERMISSION[response.role.toUpperCase()]);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setUserId(undefined);
        setUser(undefined);
        setScopes(undefined);
        setIsLoggedIn(false);

        setToken('');
        setErr(err.msg);
        setNotification({
          message: 'Error',
          description: `${err.msg}`
        });
      });

    // const response: TAuthResponse = await fetchMe(request);

    // if (response?.user) {
    //   setUserId(response.userId);
    //   setUser(response.user);
    //   setScopes(PERMISSION[response.role.toUpperCase()]);
    //   setIsLoggedIn(true);
    // } else {
    //   setIsLoggedIn(false);
    //   setToken('');
    //   setErr(response?.msg || response?.message);
    //   setNotification({
    //     message: 'Error',
    //     description: `${response}`
    //   });
    // }
  }, [token, setToken, setNotification, fetchMe]);

  const hasFetched = useRef(false);
  useEffect(() => {
    let mounted = true;
    if (mounted && !hasFetched.current && token) {
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
    fetchUser
  };

  return auth;
};
