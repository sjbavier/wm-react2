import React, { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button } from 'antd';
import {
  UserOutlined,
  ApartmentOutlined,
  UserAddOutlined,
  HomeOutlined,
  UpOutlined,
  DashboardOutlined,
  BookOutlined
} from '@ant-design/icons';
import { AuthContext } from '../auth/AuthContext';
import webmaneLogo from '../../img/LionHeadLOGO.svg';

import styles from './Nav.module.scss';
import Text from 'antd/lib/typography/Text';
import styled from 'styled-components';

const Nav: FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setToken, user, setUser } =
    useContext(AuthContext);
  const [loginOpacity, setLoginOpacity] = useState<number>(0);
  const [loginDisplay, setLoginDisplay] = useState<string>('none');

  const logout = (ev: React.MouseEvent<HTMLDivElement>) => {
    setToken('');
    setIsLoggedIn(false);
    setUser(undefined);
    navigate('');
  };

  const userMenu = {
    opacity: loginOpacity,
    display: loginDisplay
  };

  const handleAvatarClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (loginOpacity) {
      setLoginOpacity(0);
      setLoginDisplay('none');
      return;
    }
    setLoginOpacity(100);
    setLoginDisplay('inline-grid');
  };

  return (
    <header>
      <NavWrapper className="flex h-screen flex-col flex-wrap ">
        <div className={styles.column_wrapper}>
          <div className={styles.logo_wrapper} onClick={() => navigate('')}>
            <img className={styles.logo} src={webmaneLogo} alt="Webmane logo" />
          </div>
          <h1 className={styles.logo_text}>webmane</h1>
          <div className="grow ">
            <Button
              type="primary"
              icon={<HomeOutlined />}
              onClick={() => navigate('')}
              className="mt-5 w-full flex items-center "
            >
              home
            </Button>
            {isLoggedIn && (
              <>
                <Button
                  type="primary"
                  icon={<DashboardOutlined />}
                  onClick={() => navigate('/dashboard/page/1/page_size/10')}
                  className="w-full flex items-center "
                >
                  dashboard
                </Button>{' '}
                <Button
                  type="primary"
                  icon={<BookOutlined />}
                  onClick={() => navigate('/reference')}
                  className="w-full flex items-center "
                >
                  reference
                </Button>
              </>
            )}
          </div>

          <div className={styles.user_box} onClick={handleAvatarClick}>
            <div className={styles.user_pop_up_wrapper} style={userMenu}>
              {isLoggedIn && user && (
                <>
                  <div className={styles.user_item} onClick={logout}>
                    <div>
                      <UserOutlined />
                    </div>
                    <div>Logout</div>
                  </div>
                  <div
                    className={styles.user_item}
                    onClick={() => navigate('/dashboard')}
                  >
                    <div>
                      <ApartmentOutlined />
                    </div>
                    <div>Dashboard</div>
                  </div>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <div
                    className={styles.user_item}
                    onClick={() => navigate('/login')}
                  >
                    <div>
                      <UserOutlined />
                    </div>
                    <div>Login</div>
                  </div>
                  <div
                    className={styles.user_item}
                    onClick={() => navigate('/Signup')}
                  >
                    <div>
                      <UserAddOutlined />
                    </div>
                    <div>Signup</div>
                  </div>
                </>
              )}
            </div>
            <Avatar icon={<UserOutlined />} className={styles.user_avatar} />
            <Text ellipsis={true} className={styles.user_text}>
              {user ? user : 'unknown'}
            </Text>
            <Button
              className={styles.user_button}
              icon={<UpOutlined />}
            ></Button>
          </div>
        </div>
      </NavWrapper>
    </header>
  );
};

const NavWrapper = styled.div`
  // border-radius: 0px;
  // background: linear-gradient(145deg, #181b27, #1d202e);
  // box-shadow: 5px 5px 10px #151721, -5px -5px 10px #212535;
`;

export default Nav;
