import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { client } from '../../lib/Client'
import { Layout, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import index from '../../index.module.scss'
import styles from "./Nav.module.scss"

class Nav extends Component {

    logout = (ev: React.MouseEvent<HTMLDivElement>) => {
        ev.preventDefault()
        client.logout()
        this.forceUpdate()
    }

    render(): React.ReactNode {
        const { Sider} = Layout
        return (
            <header>
                <Sider breakpoint='lg' collapsedWidth="0" className={ index.maxHeight }>
                    <Menu theme="dark" mode="inline">
                        {
                            client.isLoggedIn() ? (
                                <Menu.Item icon={ <UserOutlined /> } key="1">
                                    <div onClick={this.logout}>Logout</div>
                                </Menu.Item>
                            ) : (
                                <Menu.Item icon={ <UserOutlined /> } key="2">
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