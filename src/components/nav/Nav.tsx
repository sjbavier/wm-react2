import { FC, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { UserOutlined, ApartmentOutlined, UserAddOutlined, HomeOutlined } from '@ant-design/icons'
import { AuthContext } from '../auth/AuthContext'
import webmaneLogo from '../../img/LionHeadLOGO.svg'

import index from '../../index.module.scss'
import styles from "./Nav.module.scss"


const Nav: FC = () => {

    const { Sider } = Layout
    const navigate = useNavigate()
    const { isLoggedIn, setIsLoggedIn, setToken } = useContext(AuthContext)

    function logout(ev: React.MouseEvent<HTMLDivElement>) {
        setToken('');
        setIsLoggedIn(false);
        navigate('');
    }

    return (
        <header>
            <Sider breakpoint='md' collapsedWidth="0" className={index.maxHeight}>
                <div className={styles.logo_wrapper} onClick={() => navigate('')} >
                    <img className={styles.logo} src={webmaneLogo} alt="Webmane logo" />
                </div>
                <h1 className={styles.logo_text}>webmane</h1>
                <Menu theme="dark" mode="inline">
                    <Menu.Item icon={<HomeOutlined />} key="1">
                        <div onClick={() => navigate('')}>Home</div>
                    </Menu.Item>
                    {
                        isLoggedIn && (
                            <>
                                <Menu.Item icon={<UserOutlined />} key="2">
                                    <div onClick={logout}>Logout</div>
                                </Menu.Item>
                                <Menu.Item icon={<ApartmentOutlined />} key="3">
                                    <Link to="/dashboard">Dashboard</Link>
                                </Menu.Item>
                            </>
                        ) } 
                        { !isLoggedIn && (
                            <>
                                <Menu.Item icon={<UserOutlined />} key="4">
                                    <Link to='/login'>Login</Link>
                                </Menu.Item>
                                <Menu.Item icon={<UserAddOutlined />} key="5">
                                    <Link to='/signup'>Signup</Link>
                                </Menu.Item>
                            </>
                        )
                    }
                </Menu>
            </Sider>
        </header>
    )
}

export default Nav