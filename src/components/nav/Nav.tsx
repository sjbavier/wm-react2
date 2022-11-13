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
  BookOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { AuthContext } from '../auth/AuthContext';
import webmaneLogo from '../../img/LionHeadLOGO.svg';

import Text from 'antd/lib/typography/Text';
import styled from 'styled-components';
import { DivWrapper } from '../../models/models';
import { NeuNavButton } from '../button/NeuNavButton';
import { NeuButton } from '../button/NeuButton';
import classNames from 'classnames';

const Nav: FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setToken, user, setUser } =
    useContext(AuthContext);
  const [popUp, setPopUp] = useState<boolean>(false);

  const logout = (ev: React.MouseEvent<HTMLDivElement>) => {
    setToken('');
    setIsLoggedIn(false);
    setUser(undefined);
    navigate('');
  };

  const handleAvatarClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setPopUp(!popUp);
  };

  return (
    <header>
      <NavWrapper className="flex h-screen flex-col flex-wrap w-[200px]">
        <div className="flex flex-col h-full">
          <div
            className="flex justify-center items-center cursor-pointer"
            onClick={() => navigate('')}
          >
            <img
              className="w-full pt-6 pb-3"
              src={webmaneLogo}
              alt="Webmane logo"
              style={{ maxWidth: 'calc(200px / 4)' }}
            />
          </div>
          <h1 className="text-zinc-50 text-center tracking-widest text-xs">
            webmane
          </h1>
          <div className="grow ">
            <NeuButton icon={<MenuOutlined />}>Menu</NeuButton>
            <NeuNavButton
              type="primary"
              icon={<HomeOutlined />}
              onClick={() => navigate('')}
              className="mt-5 w-full flex items-center "
            >
              home
            </NeuNavButton>
            {isLoggedIn && (
              <>
                <NeuNavButton
                  type="primary"
                  icon={<DashboardOutlined />}
                  onClick={() => navigate('/dashboard/page/1/page_size/10')}
                  className="w-full flex items-center "
                >
                  dashboard
                </NeuNavButton>{' '}
                <NeuNavButton
                  type="primary"
                  icon={<BookOutlined />}
                  onClick={() => navigate('/reference')}
                  className="w-full flex items-center "
                >
                  reference
                </NeuNavButton>
              </>
            )}
          </div>

          <UserBox onClick={handleAvatarClick}>
            <UserPopUpWrapper
              className={classNames(
                'w-[200px]',
                popUp ? '' : 'invisible collapsed'
              )}
            >
              {isLoggedIn && user && (
                <>
                  <UserItem onClick={logout}>
                    <div>
                      <UserOutlined />
                    </div>
                    <div>Logout</div>
                  </UserItem>
                  <UserItem
                    onClick={() => navigate('/dashboard/page/1/page_size/10')}
                  >
                    <div>
                      <ApartmentOutlined />
                    </div>
                    <div>Dashboard</div>
                  </UserItem>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <UserItem onClick={() => navigate('/login')}>
                    <div>
                      <UserOutlined />
                    </div>
                    <div>Login</div>
                  </UserItem>
                  <UserItem onClick={() => navigate('/Signup')}>
                    <div>
                      <UserAddOutlined />
                    </div>
                    <div>Signup</div>
                  </UserItem>
                </>
              )}
            </UserPopUpWrapper>
            <UserAvatar icon={<UserOutlined />} />
            <UserText ellipsis={true}>{user ? user : 'unknown'}</UserText>
            <UserButton icon={<UpOutlined />}></UserButton>
          </UserBox>
        </div>
      </NavWrapper>
    </header>
  );
};

const UserAvatar = styled(Avatar)`
  margin: 10px 10px 10px 20px;
  align-self: center;
`;

const UserText = styled(Text)`
  vertical-align: middle;
  color: #fff;
  align-self: center;
`;

const UserButton = styled(Button)`
  background: none;
  color: #fff;
  border: none;
  align-self: center;
`;

const UserItem = styled.div`
  min-width: 50%;
  align-self: center;
  justify-self: stretch;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.2s ease-in;
  height: 3.31rem;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
  > div {
    align-self: center;
    align-items: center;
    font-size: 0.9em;
    color: #fff;
  }
`;

const UserBox = styled.div`
  display: inline-flex;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.09);
  user-select: none;
  border-radius: 0px;
  border: transparent;
  background: linear-gradient(145deg, #1d202e, #181b27);
  box-shadow: 3px 3px 7px #0b0c11, -3px -3px 9px #2b3045;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;

const UserPopUp: FC<DivWrapper> = ({ callback, children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};
const UserPopUpWrapper = styled(UserPopUp)`
  position: absolute;
  bottom: 53px;
  color: #fff;
  border-top: 1px solid rgba(255, 255, 255, 0.09);
  display: inline-flex;
  align-items: center;
  transition: opacity 0.2s ease-in;

  &.collapsed {
    opacity: 0;
  }
  &:nth-child(odd) .user_item {
    border-right: 1px solid rgba(255, 255, 255, 0.09);
  }
`;

const NavWrapper = styled.div`
  // border-radius: 0px;
  // background: linear-gradient(145deg, #181b27, #1d202e);
  // box-shadow: 5px 5px 10px #151721, -5px -5px 10px #212535;
`;

export default Nav;
