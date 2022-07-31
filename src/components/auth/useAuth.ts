import { useEffect, useState, useCallback, useRef } from 'react';
import { fetchMe, prettyError, TRequest } from '../../lib/Client';
import { PERMISSION } from '../../lib/Permissions'

type TAuthResponse = {
    userId: number
    user: string
    role: string
    message: string
}

export interface IAuth {
    err?: string
    loading: boolean
    isLoggedIn: boolean
    setIsLoggedIn: any
    userId?: number
    setUserId: any
    user?: string
    setUser: any
    scopes?: string[]
    setScopes: any
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
    const [user, setUser] = useState<string | undefined>(undefined)
    const [scopes, setScopes] = useState<string[] | undefined>(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [err, setErr] = useState<string | any>('');
    const [loading, setLoading] = useState<boolean>(false);


    const fetchUser = useCallback(async () => {
        
        const request: TRequest = {
            method: 'GET',
            path: '/auth/authorize',
            token
        }

        fetchMe<TAuthResponse>(request)
            .then((response: TAuthResponse) => {
                setUserId(response.userId);
                setUser(response.user);
                setScopes(PERMISSION[response.role.toUpperCase()]);
                setIsLoggedIn(true);
            })
            .catch((err) => {
                setIsLoggedIn(false);
                setToken('');
                setErr(prettyError(err));
                console.log({err});
            })
            .finally(() => setLoading(false))
    
        }, [token, setToken])

    const hasFetched = useRef(false);
    useEffect(() => {
        let mounted = true;
        if ( mounted && 
            !hasFetched.current &&
             token ) {
            setLoading(true);
            hasFetched.current = true;
            fetchUser()
            return () => {
                mounted = false;
            }
        }
    }, [token, setLoading, fetchUser])

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
        setToken 
    };

    return auth;

}
