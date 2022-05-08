import { useEffect, useState, useRef } from 'react';
import { fetchMe, TRequest } from '../../lib/Client';
import { PERMISSION } from '../../lib/Permissions'

type TAuthResponse = {
    role: string
    userId: number
}

export interface IAuth {
    err?: string
    isLoggedIn: boolean
    setIsLoggedIn: any
    userId?: number
    scopes?: string[]
    token?: string
    setToken: any
}

export const useToken = () => {
    const [token, setToken] = useState<string>(() => {
        return localStorage.getItem('token') || '';
    });

    useEffect(() => {
        const setToken = (Atoken: string) => localStorage.setItem('token', Atoken);
    }, [setToken]);

    return [token, setToken] as const // freeze array to a tuple
}


export const useAuth = () => {
    const [token, setToken] = useToken();
    const [userId, setUserId] = useState<number | undefined>(undefined);
    const [scopes, setScopes] = useState<string[] | undefined>(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [err, setErr] = useState<string | any>('');
    debugger;
    const hasFetched = useRef(false);
    useEffect(() => {
        let mounted = true;
        const request: TRequest = {
            method: 'GET',
            path: '/auth/authorize',
            token
        }
        if ( mounted && !hasFetched.current ) {
            fetchMe<TAuthResponse>(request)
                .then((response: TAuthResponse) => {
                    setUserId(response.userId);
                    setScopes(PERMISSION[response.role]);
                    setIsLoggedIn(true);
                })
                .catch((err: any) => {
                    setIsLoggedIn(false);
                    setToken('');
                    setErr(err);
                })
                .finally(() => {
                    mounted = false;
                    hasFetched.current = true;
                })
        }
    }, [token, scopes, isLoggedIn, err])

    const auth: IAuth = { err, isLoggedIn, setIsLoggedIn, userId, scopes, token, setToken };

    return auth;

}
