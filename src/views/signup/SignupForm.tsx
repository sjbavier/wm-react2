import { FC, useState } from 'react';
import { fetchMe, prettyError, TRequest } from '../../lib/Client';
import { useNavigate } from 'react-router-dom';
import { Form, Alert } from 'antd';

import webmaneLogo from '../../img/LionHeadLOGO.svg';

import styled from 'styled-components';
import { NeuButton } from '../../components/button/NeuButton';
import { NeuInput } from '../../components/form/input/NeuInput';

type TValues = {
  email: string;
  confirmPassword: string;
  password: string;
};

const SignupForm: FC = () => {
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();

  const clearAll = (): void => {
    setMsg('');
    setErr('');
    setFetching(false);
  };

  const formSubmit = (values: TValues): void => {
    setErr('');
    setMsg('');
    let formData = {
      email: values.email,
      password: values.password,
      confirm_password: values.confirmPassword
    };
    if (!fetching) {
      setFetching(true);
      setMsg('Submitting');
      const request: TRequest = {
        method: 'POST',
        path: '/auth/register',
        data: formData
      };
      fetchMe<{ message: string; access_token?: string }>(request)
        .then((response) => {
          setErr('');
          setMsg(response.message);
          let access_token = response.access_token || '';
          localStorage.setItem('token', access_token);
          navigate('/login');
        })
        .catch((err) => {
          setMsg('');
          setErr(prettyError(err));
        })
        .finally(() => clearAll());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoginContainer>
        <div className="flex justify-center items-center flex-col select-none min-w-[15.625rem]">
          <div>
            <img
              className="max-w-[100px] w-full pb-8"
              src={webmaneLogo}
              alt="webmane logo"
            />
          </div>
          <div className="pb-8">
            <h1>Webmane Signup</h1>
          </div>
        </div>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 30 }}
          onFinish={(values: TValues) => formSubmit(values)}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true },
              { whitespace: true },
              { type: 'email', message: 'Valid email required' }
            ]}
            hasFeedback
          >
            <NeuInput placeholder="email" type="text" autoFocus={true} />
          </Form.Item>
          <Form.Item
            name="password"
            dependencies={['confirmPassword']}
            rules={[
              { required: true, message: 'Password required' },
              {
                type: 'string',
                min: 8,
                max: 30,
                message: 'Must be at least 8 characters'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('confirmPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords must match');
                }
              })
            ]}
            hasFeedback
          >
            <NeuInput placeholder="password" type="password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Password required' },
              {
                type: 'string',
                min: 8,
                max: 30,
                message: 'Must be at least 8 characters'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords must match');
                }
              })
            ]}
            hasFeedback
          >
            <NeuInput placeholder="confirm password" type="password" />
          </Form.Item>

          <Form.Item>
            <NeuButton type="primary" htmlType="submit" className="w-full">
              Signup
            </NeuButton>
          </Form.Item>
        </Form>
        {msg && <Alert message={msg} type="success" />}
        {err && <Alert message={err} type="error" />}
      </LoginContainer>
    </div>
  );
};

const LoginContainer = styled.div`
  border-radius: 30px;
  background: #1b1e2b;
  box-shadow: inset 12px 12px 20px #0f1118, inset -12px -12px 20px #272c3e;
  padding: 2.5rem;
`;

export default SignupForm;
