import React, { FC, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Layout, Menu } from "antd";
import {
  UserOutlined,
  ApartmentOutlined,
  UserAddOutlined,
  HomeOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../auth/AuthContext";
import webmaneLogo from "../../img/LionHeadLOGO.svg";

import styles from "./Nav.module.scss";
import Text from "antd/lib/typography/Text";

const Nav: FC = () => {
  const { Sider } = Layout;
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setToken, user, setUser } =
    useContext(AuthContext);
  const [loginOpacity, setLoginOpacity] = useState<number>(0);
  const [loginDisplay, setLoginDisplay] = useState<string>("none");

  const logout = (ev: React.MouseEvent<HTMLDivElement>) => {
    setToken("");
    setIsLoggedIn(false);
    setUser(undefined);
    navigate("");
  };

  const userMenu = {
    opacity: loginOpacity,
    display: loginDisplay,
  };

  const handleAvatarClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (loginOpacity) {
      setLoginOpacity(0);
      setLoginDisplay("none");
      return;
    }
    setLoginOpacity(100);
    setLoginDisplay("inline-grid");
  };

  return (
    <header>
      <Sider className={styles.nav_wrapper} breakpoint="md" collapsedWidth="0">
        <div className={styles.column_wrapper}>
          <div className={styles.logo_wrapper} onClick={() => navigate("")}>
            <img className={styles.logo} src={webmaneLogo} alt="Webmane logo" />
          </div>
          <h1 className={styles.logo_text}>webmane</h1>
          <Menu theme="dark" mode="inline" className={styles.flex_grow_1}>
            <Menu.Item icon={<HomeOutlined />} key="1">
              <div onClick={() => navigate("")}>Home</div>
            </Menu.Item>
            {isLoggedIn && (
              <>
                <Menu.Item icon={<ApartmentOutlined />} key="3">
                  <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>
              </>
            )}
          </Menu>

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
                    onClick={() => navigate("/dashboard")}
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
                    onClick={() => navigate("/login")}
                  >
                    <div>
                      <UserOutlined />
                    </div>
                    <div>Login</div>
                  </div>
                  <div
                    className={styles.user_item}
                    onClick={() => navigate("/Signup")}
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
              {user ? user : "unknown"}
            </Text>
            <Button
              className={styles.user_button}
              icon={<UpOutlined />}
            ></Button>
          </div>
        </div>
      </Sider>
    </header>
  );
};

export default Nav;
