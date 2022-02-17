import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { client } from '../../lib/Client'
import { Layout, Menu } from 'antd'
import { UserOutlined, ApartmentOutlined } from '@ant-design/icons'

import webmaneLogo from '../../img/LionHeadLOGO.svg'

import index from '../../index.module.scss'
import styles from "./Nav.module.scss"

class Nav extends Component {

    logout = (ev: React.MouseEvent<HTMLDivElement>) => {
        client.logout()
        this.forceUpdate()
    }

    goHome = (ev: React.MouseEvent<HTMLDivElement>) => {
        console.log('div clicked')
        return <Navigate to="/" replace />
    }

    render(): React.ReactNode {
        const { Sider } = Layout
        return (
            <header>
                <Sider breakpoint='md' collapsedWidth="0" className={index.maxHeight}>
                    <div className={styles.logo_wrapper} onClick={this.goHome} >
                        <img className={styles.logo} src={webmaneLogo} alt="Webmane logo" />
                    </div>
                    <h1 className={styles.logo_text}>webmane</h1>
                    {/* <h2 className={ styles.logo_subtext }>net</h2> */}
                    <Menu theme="dark" mode="inline">
                        {
                            client.isLoggedIn() ? (
                                <>
                                    <Menu.Item icon={<UserOutlined />} key="1">
                                        <div onClick={this.logout}>Logout</div>
                                    </Menu.Item>
                                    <Menu.Item icon={<ApartmentOutlined />} key="2">
                                        <Link to="/dashboard">Dashboard</Link>
                                    </Menu.Item>
                                </>
                            ) : (
                                <Menu.Item icon={<UserOutlined />} key="2">
                                    <Link to='/login'>Login</Link>
                                </Menu.Item>
                            )
                        }
                    </Menu>
                </Sider>
            </header>
        )
    }
}

export default Nav