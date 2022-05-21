import { FC, useState, useContext } from 'react'
import { fetchMe, TRequest, prettyError } from '../../lib/Client'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Form, Input, Button, Alert } from 'antd'
import { AuthContext } from '../auth/AuthContext'
import { IAuth } from '../auth/useAuth'

import webmaneLogo from '../../img/LionHeadLOGO.svg'

import styles from './Login.module.scss'
import { PERMISSION } from '../../lib/Permissions'

type TLoginResponse = {
    userId?: number
    user?: string
    role?: string
    access_token?: string
    message: string
}

const LoginForm: FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState('');
    const [fetching, setFetching] = useState(false);
    const navigate = useNavigate();
    const { setToken, setIsLoggedIn, setScopes, setUser, setUserId } = useContext<IAuth>(AuthContext);
    const [redirectTo] = useSearchParams();

    function onEmailChange(ev: any): void {
        setEmail(ev.target.value);
    }

    function onPasswordChange(ev: any): void {
        setPassword(ev.target.value);
    }

    function formSubmit(ev: any): void {
        ev.preventDefault();
        setErr('');
        setMsg('');
        let formData = {
            email: email,
            password: password
        };
        const request: TRequest = {
            method: 'POST',
            path: '/auth/login',
            data: formData
        };
        if (!fetching) {
            setFetching(true);
            setMsg('Submitting');
            fetchMe<TLoginResponse>
                (request)
                .then((response: TLoginResponse) => {
                    setErr('');
                    setMsg(response.message);
                    response.access_token ? setToken(response.access_token) : setErr(err.concat('Garbo access_token \n'));
                    response.role ? setScopes(PERMISSION[response.role.toUpperCase()]) : setErr(err.concat('Garbo role \n'));
                    response.user ? setUser(response.user) : setErr(err.concat('Garbo user \n'));
                    response.userId ? setUserId(response.userId) : setErr(err.concat('Garbo userId \n'));
                    setIsLoggedIn(true);
                })
                .catch((err) => {
                    setMsg('');
                    setErr(prettyError(err));
                })
                .finally(() => {
                    setFetching(false);
                    let redirect: string | null = redirectTo.get('redirectTo');
                    redirect ? navigate(redirect) : navigate("/dashboard");
                })
        }
    }

    return (
        <div className={styles.flex}>
            <div className={styles.login_form}>
                <div className={styles.logo_wrapper} >
                    <div className={styles.logo_item}>
                        <img className={styles.logo} src={webmaneLogo} alt="webmane logo" />
                    </div>
                    <div className={styles.logo_item}>
                        <h1>Webmane Login</h1>
                    </div>
                </div>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 30 }}
                >
                    <Form.Item label="email" rules={[{ required: true }]}>
                        <Input
                            placeholder="email"
                            type="text"
                            value={email}
                            onChange={onEmailChange}
                            autoFocus={true}
                        />
                    </Form.Item>
                    <Form.Item label="password" rules={[{ required: true }]}>
                        <Input
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={onPasswordChange}
                        />
                    </Form.Item>
                    <Form.Item label="" wrapperCol={{ offset: 6 }}>
                        <Button type="primary" htmlType="submit" onClick={formSubmit} >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                {msg && (<Alert message={msg} type="success" />)}
                {err && (<Alert message={err} type="error" />)}
            </div>
        </div>
    )
}

export default LoginForm