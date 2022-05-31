import { FC, useEffect, useState } from "react";
import { fetchMe, prettyError, TRequest } from "../../lib/Client";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Alert } from "antd";

import webmaneLogo from "../../img/LionHeadLOGO.svg";

import styles from "./Signup.module.scss";

type TValues = {
  email: string;
  confirmPassword: string;
  password: string;
};

const SignupForm: FC = () => {
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();

  function clearMessages(): void {
    setMsg("");
    setErr("");
  }

  function formSubmit(values: TValues): void {
    setErr("");
    setMsg("");
    let formData = {
      email: values.email,
      password: values.password,
      confirm_password: values.confirmPassword,
    };
    if (!fetching) {
      setFetching(true);
      setMsg("Submitting");
      const request: TRequest = {
        method: "POST",
        path: "/auth/register",
        data: formData,
      };
      fetchMe<{ message: string; access_token?: string }>(request)
        .then((response) => {
          setErr("");
          setMsg(response.message);
          let access_token = response.access_token || "";
          localStorage.setItem("token", access_token);
          navigate("/login");
        })
        .catch((err) => {
          setMsg("");
          setErr(prettyError(err));
        })
        .finally(() => setFetching(false));
    }
  }

  return (
    <div className={styles.flex}>
      <div className={styles.signup_form}>
        <div className={styles.logo_wrapper}>
          <div className={styles.logo_item}>
            <img className={styles.logo} src={webmaneLogo} alt="webmane logo" />
          </div>
          <div className={styles.logo_item}>
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
            label="email"
            rules={[
              { required: true },
              { whitespace: true },
              { type: "email", message: "Valid email required" },
            ]}
            hasFeedback
          >
            <Input placeholder="email" type="text" autoFocus={true} />
          </Form.Item>
          <Form.Item
            name="password"
            label="password"
            dependencies={["confirmPassword"]}
            rules={[
              { required: true, message: "Password required" },
              {
                type: "string",
                min: 8,
                max: 30,
                message: "Must be at least 8 characters",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("confirmPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("The two passwords must match");
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password placeholder="password" type="password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="confirm password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Password required" },
              {
                type: "string",
                min: 8,
                max: 30,
                message: "Must be at least 8 characters",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("The two passwords must match");
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password placeholder="confirm password" type="password" />
          </Form.Item>

          <Form.Item label="" wrapperCol={{ offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Signup
            </Button>
          </Form.Item>
        </Form>
        {msg && <Alert message={msg} type="success" />}
        {err && <Alert message={err} type="error" />}
      </div>
    </div>
  );
};

export default SignupForm;
