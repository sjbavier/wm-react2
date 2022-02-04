import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/nav/Nav'
import LoginForm from './components/login/LoginForm'
import PrivateRoute from './components/login/PrivateRoute'
import Bookmarks from './components/bookmarks/Bookmarks'
import { Layout } from 'antd'

import './global.scss'
import styles from './index.module.scss'


const App: FC = () => {
  return (
    <div className={ styles.maxHeight }>
      <Layout>
        <Nav></Nav>
        <div className={ styles.wrapper }>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <div>Dashboard <Bookmarks /></div>
              </PrivateRoute>
            }
            />
            <Route path="*" element={<div>404 nothing here</div>} />
          </Routes>
        </div>
      </Layout>
    </div>
  );
}

export default App;
