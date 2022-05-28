import { FC, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import LoginForm from "./components/login/LoginForm";
import SignupForm from "./components/signup/SignupForm";
import PrivateRoute from "./components/login/PrivateRoute";
import Bookmarks from "./components/bookmarks/Bookmarks";
import { Alert, Layout, Spin } from "antd";

import { AuthContext } from "./components/auth/AuthContext";
import { IAuth } from "./components/auth/useAuth";
import "./antd.less";
import "./global.scss";
import styles from "./index.module.scss";

const App: FC = () => {
  const { err, loading, user = "" } = useContext<IAuth>(AuthContext);

  return (
    <div id="app_wrapper" className={styles.maxHeight}>
      <Layout>
        <Nav></Nav>
        <div className={styles.wrapper}>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute user={user}>
                  <div className={styles.card_wrapper}>
                    <Bookmarks />
                  </div>
                </PrivateRoute>
              }
            />
            <Route path="*" element={<div>404 nothing here</div>} />
          </Routes>
          {loading && <Spin />}
          {!!err && <Alert message={err} type="error" />}
        </div>
      </Layout>
    </div>
  );
};

export default App;
