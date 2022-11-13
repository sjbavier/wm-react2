import { FC, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/nav/Nav';
import LoginForm from './views/login/LoginForm';
import SignupForm from './views/signup/SignupForm';
import PrivateRoute from './components/auth/PrivateRoute';
import Bookmarks from './views/bookmarks/Bookmarks';
import { Reference } from './views/reference/Reference';
import { Spin } from 'antd';

import { AuthContext } from './components/auth/AuthContext';
import { IAuth } from './components/auth/useAuth';
import './antd.less';
import './global.scss';
import './App.css';

import styled from 'styled-components';

const App: FC = () => {
  const { loading, user = '' } = useContext<IAuth>(AuthContext);

  return (
    <div id="app_wrapper" className="h-screen">
      <LayoutWrapper>
        <Nav />
        <div className="h-screen w-full overflow-y-scroll p-8">
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route
              path="/dashboard/page/:page/page_size/:pageSize"
              element={
                <PrivateRoute user={user}>
                  <div className="flex flex-wrap flex-row">
                    <Bookmarks />
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              path="/reference"
              element={
                <PrivateRoute user={user}>
                  <Reference />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<div>404 nothing here</div>} />
          </Routes>
          {loading && <Spin />}
        </div>
      </LayoutWrapper>
    </div>
  );
};

const LayoutWrapper = styled.div`
  display: flex;
  flex: auto;
  flex-direction: row;
  box-sizing: border-box;
  min-height: 0;
  background: #1b1e2b;
`;

export default App;
