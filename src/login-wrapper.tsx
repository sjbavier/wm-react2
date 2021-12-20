import React, { Component } from 'react'
import LoginForm from './components/login/login'
class LoginWrapper extends Component {

    

    render() {
        const token = localStorage.getItem('token')
        return ( 
            <div>
            { token && (<div>Bookmarks</div> )}
            { !token && (<LoginForm />)  }
            </div>
        )
    }
}

export default LoginWrapper