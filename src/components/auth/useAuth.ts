import { useEffect, useState, useRef } from 'react';
import { fetchMe, TRequest } from '../../lib/Client';
import { PERMISSION } from '../../lib/Permissions'

type TAuthResponse = {
    role: string
    userId: number
}

export interface IAuth {
    err?: string
    loading: boolean
    isLoggedIn: boolean
    setIsLoggedIn: any
    userId?: number
    scopes?: string[]
    token?: string
    setToken: any
}

export const useToken = (lToken: string) => {
    const [token, _setToken] = useState<string>(lToken);
    const setToken = (Atoken: string) => {
        localStorage.setItem('token', Atoken);
        _setToken(Atoken);
    }

    return [token, setToken] as const // freeze array to a tuple
}


export const useAuth = () => {
    const [token, setToken] = useToken(localStorage.getItem('token') || '');
    const [userId, setUserId] = useState<number | undefined>(undefined);
    const [scopes, setScopes] = useState<string[] | undefined>(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [err, setErr] = useState<string | any>('');
    const [loading, setLoading] = useState<boolean>(false);

    const hasFetched = useRef(false);
    useEffect(() => {
        let mounted = true;
        setLoading(true);
        const request: TRequest = {
            method: 'GET',
            path: '/auth/authorize',
            token
        }
        if ( mounted && !hasFetched.current ) {
            hasFetched.current = true;
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
                    console.log({err});
                })
                .finally(() => setLoading(false))

            return () => {
                mounted = false;
            }
        }
    }, [token, scopes, isLoggedIn, err])

    const auth: IAuth = { err, loading, isLoggedIn, setIsLoggedIn, userId, scopes, token, setToken };

    return auth;

}
