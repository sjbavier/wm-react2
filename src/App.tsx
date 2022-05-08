import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/nav/Nav'
import LoginForm from './components/login/LoginForm'
import SignupForm from './components/signup/SignupForm'
import PrivateRoute from './components/login/PrivateRoute'
import Bookmarks from './components/bookmarks/Bookmarks'
import { Layout } from 'antd'

import './global.scss'
import styles from './index.module.scss'
import { AuthProvider } from './components/auth/AuthProvider'

const App: FC = () => {

  return (
    <div id="app_wrapper" className={styles.maxHeight}>
      <Layout>
        <AuthProvider>
          <Nav></Nav>
          <div className={styles.wrapper}>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <div className={styles.card_wrapper}>
                    <Bookmarks />
                  </div>
                </PrivateRoute>
              }
              />
              <Route path="*" element={<div>404 nothing here</div>} />
            </Routes>
          </div>
        </AuthProvider>
      </Layout>
    </div>
  );
}

export default App;
