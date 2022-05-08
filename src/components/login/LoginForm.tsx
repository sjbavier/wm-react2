import { FC, useState, useContext } from 'react'
import { fetchMe, TRequest, prettyError } from '../../lib/Client'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Alert } from 'antd'
import { AuthContext } from '../auth/AuthContext'
import { IAuth } from '../auth/useAuth'

import webmaneLogo from '../../img/LionHeadLOGO.svg'

import styles from './Login.module.scss'

const LoginForm: FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState('');
    const [fetching, setFetching] = useState(false);
    const navigate = useNavigate();
    const { setToken, setIsLoggedIn } = useContext<IAuth>(AuthContext);

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
        }
        const request: TRequest = {
            method: 'POST',
            path: '/auth/login',
            data: formData
        }
        if (!fetching) {
            setFetching(true);
            setMsg('Submitting');
            fetchMe<{ message: string, access_token?: string }>
                (request)
                .then((response) => {
                    setErr('');
                    setMsg(response.message);
                    let access_token = response.access_token || '';
                    setToken(access_token);
                    setIsLoggedIn(true);
                     navigate("/dashboard");

                })
                .catch((err) => {
                    setMsg('');
                    setErr(prettyError(err));
                })
                .finally(() => {
                    setFetching(false);
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