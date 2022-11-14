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

import Text from 'antd/lib/typography/Text';
import styled from 'styled-components';
import { DivWrapper } from '../../models/models';
import { NeuNavButton } from '../button/NeuNavButton';
import { NeuButton } from '../button/NeuButton';
import classNames from 'classnames';

interface NavProps {
  isOpen: boolean | (() => void);
  toggleIsOpen: boolean | (() => void);
}

const Nav: FC<NavProps> = ({ toggleIsOpen, isOpen }: NavProps) => {
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

  const hamburgLine =
    'h-0.5 w-6 my-1 rounded-full bg-white transition ease transform duration-200';

  return (
    <header>
      <NeuButton
        onClick={toggleIsOpen}
        className="fixed top-2 left-1 z-10 flex flex-col h-12 w-12 justify-center items-center group"
      >
        <div
          className={classNames(
            hamburgLine,
            isOpen
              ? 'rotate-45 translate-y-[10px] opacity-50 group-hover:opacity-100'
              : 'opacity-50 group-hover:opacity-100'
          )}
        ></div>
        <div
          className={classNames(
            hamburgLine,
            isOpen ? 'opacity-0' : 'opacity-50 group-hover:opacity-100'
          )}
        ></div>
        <div
          className={classNames(
            hamburgLine,
            isOpen
              ? '-rotate-45 -translate-y-[10px] opacity-50 group-hover:opacity-100'
              : 'opacity-50 group-hover:opacity-100'
          )}
        ></div>
      </NeuButton>
      <NavWrapper
        className={classNames(
          'flex h-screen flex-col flex-wrap transition-all duration-150 ease-out fixed w-[220px]',
          isOpen ? 'ml-0' : '-ml-[250px]'
        )}
      >
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

const NavWrapper = styled.div``;

export default Nav;
