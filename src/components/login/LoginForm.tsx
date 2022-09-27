import { FC, useState, useContext } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Form, Alert } from 'antd';
import { AuthContext } from '../auth/AuthContext';
import { IAuth } from '../auth/useAuth';

import webmaneLogo from '../../img/LionHeadLOGO.svg';

import styles from './Login.module.scss';
import { PERMISSION } from '../../lib/Permissions';
import useClient from '../../hooks/useClient';
import { TRequest } from '../../models/models';
import styled from 'styled-components';
import { NeuInput } from '../form/input/NeuInput';
import { NeuButton } from '../button/NeuButton';

type TLoginResponse = {
  userId: number;
  user: string;
  role: string;
  access_token?: string;
  message: string;
};

type TFValues = {
  email: string;
  password: string;
};

const LoginForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const { setToken, setIsLoggedIn, setScopes, setUser, setUserId, token } =
    useContext<IAuth>(AuthContext);
  const [redirectTo] = useSearchParams();
  const { fetchMe, loading } = useClient();

  const onEmailChange = (ev: any): void => {
    setEmail(ev.target.value);
  };

  const onPasswordChange = (ev: any): void => {
    setPassword(ev.target.value);
  };

  const formSubmit = async (values: TFValues) => {
    setErr('');
    setMsg('');
    let formData = {
      email: values.email,
      password: values.password
    };
    const request: TRequest = {
      method: 'POST',
      path: '/auth/login',
      data: formData
    };
    if (!loading) {
      setMsg('Submitting');

      const response: TLoginResponse = await fetchMe(request);
      if (response?.access_token) {
        setToken(response.access_token);
        setScopes(PERMISSION[response?.role.toUpperCase()]);
        setUser(response.user);
        setUserId(response.userId);
        setIsLoggedIn(true);
      }

      setMsg('');
    }
  };

  if (token && !loading) {
    let redirect: string | null = redirectTo.get('redirectTo');
    return redirect ? (
      <Navigate to={redirect} />
    ) : (
      <Navigate to="/dashboard/page/1/page_size/10" />
    );
  } else {
    return (
      <div className={styles.flex}>
        <LoginContainer>
          <div className={styles.logo_wrapper}>
            <div className={styles.logo_item}>
              <img
                className={styles.logo}
                src={webmaneLogo}
                alt="webmane logo"
              />
            </div>
            <div className={styles.logo_item}>
              <h1>Login</h1>
            </div>
          </div>
          <Form onFinish={(values: TFValues) => formSubmit(values)}>
            <Form.Item
              name="email"
              rules={[
                { required: true },
                { whitespace: true },
                { type: 'email', message: 'Valid email required' }
              ]}
              hasFeedback
            >
              <NeuInput
                placeholder="email"
                type="text"
                value={email}
                onChange={onEmailChange}
                autoFocus={true}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Password required' },
                {
                  type: 'string',
                  min: 8,
                  max: 30,
                  message: 'Must be at least 8 characters'
                }
              ]}
              hasFeedback
            >
              <NeuInput
                placeholder="password"
                type="password"
                value={password}
                onChange={onPasswordChange}
              />
            </Form.Item>
            <Form.Item label="">
              <NeuButton
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}
                className="w-full"
              >
                Login
              </NeuButton>
            </Form.Item>
          </Form>
          {msg && <Alert message={msg} type="success" />}
          {err && <Alert message={err} type="error" />}
        </LoginContainer>
      </div>
    );
  }
};

const LoginContainer = styled.div`
  border-radius: 30px;
  background: #1b1e2b;
  box-shadow: inset 12px 12px 20px #0f1118, inset -12px -12px 20px #272c3e;
  padding: 2.5rem;
`;

export default LoginForm;
