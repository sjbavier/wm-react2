import React, { FC, useEffect, useState } from 'react'
import { client } from '../../lib/Client'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Alert } from 'antd'

import webmaneLogo from '../../img/LionHeadLOGO.svg'

import styles from './Signup.module.scss'

const SignupForm: FC = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [msg, setMsg] = useState('')
    const [err, setErr] = useState('')
    const [fetching, setFetching] = useState(false)
    const navigate = useNavigate()

    function onEmailChange(ev: any): void {
        setEmail(ev.target.value)
    }

    function onPasswordChange(ev: any): void {
        setPassword(ev.target.value)
    }

    function onConfirmPasswordChange(ev: any): void {
        setConfirmPassword(ev.target.value)
    }

    useEffect(() => {
        clearMessages()
        if ( !(confirmPassword === password) ) {
            setErr('Passwords do not match')
        }
        else { 
            setMsg('passwords match!')
        }
    }, [confirmPassword, password])


    function clearMessages(): void {
        setMsg('')
        setErr('')
    }

    function formSubmit(ev: any): void {
        ev.preventDefault()
        setErr('')
        setMsg('')
        let formdata = {
            email: email,
            password: password,
            confirm_password: confirmPassword
        }
        if (!fetching) {
            setFetching(true)
            setMsg('Submitting')
            client.fetchMe<{ message: string, access_token?: string }>
                ('POST', '/auth/register', formdata)
                .then((response) => {
                    setErr('')
                    setMsg(response.message)
                    let access_token = response.access_token || ''
                    localStorage.setItem('token', access_token)
                    // navigate("/dashboard", {replace: true})
                })
                .catch((err) => {
                    setMsg('')
                    setErr(client.prettyError(err))
                })
                .finally(() => setFetching(false))
        }
    }

    return (
        <div className={styles.flex}>
            <div className={styles.signup_form}>
                <div className={styles.logo_wrapper} >
                    <div className={styles.logo_item}>
                        <img className={styles.logo} src={webmaneLogo} alt="webmane logo" />
                    </div>
                    <div className={styles.logo_item}>
                        <h1>Webmane Signup</h1>
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
                    <Form.Item label="confirm password" rules={[{ required: true }]}>
                        <Input
                            placeholder="password"
                            type="password"
                            value={confirmPassword}
                            onChange={onConfirmPasswordChange}
                        />
                    </Form.Item>

                    <Form.Item label="" wrapperCol={{ offset: 6 }}>
                        <Button type="primary" htmlType="submit" onClick={formSubmit} >
                            Signup
                        </Button>
                    </Form.Item>
                </Form>
                {msg && (<Alert message={msg} type="success" />)}
                {err && (<Alert message={err} type="error" />)}
            </div>
        </div>
    )
}

export default SignupForm