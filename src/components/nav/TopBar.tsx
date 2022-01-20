import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { client } from '../../lib/Client'

import styles from "./TopBar.module.scss"

class TopBar extends Component {

    logout = ( ev: React.MouseEvent<HTMLButtonElement> ) => {
        ev.preventDefault()
        client.logout()
        this.forceUpdate()
    }

    render(): React.ReactNode {
        return (
            <header>
                <div className={ styles.menu }>
                    {
                        client.isLoggedIn() ? (
                            <button onClick={ this.logout }>Logout</button>
                        ) : (
                            <Link to='/login'>Login</Link>
                        )
                    }
                </div>
    
            </header>
        )
    }
}

export default TopBar