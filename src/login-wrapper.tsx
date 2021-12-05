import React, { Component } from 'react'

class LoginWrapper extends Component {
    
    fetchCredentials = () => {
        const token = localStorage.getItem("token")
        if (token !== 'undefined'){
            return fetch('/api/token', {
                method: 'post',
                body: JSON.stringify(token),
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
            }).then();
        }
        return false
    }   
    loginValid = () => {
        let credentials = this.fetchCredentials()
        if ( credentials ) {

        }
    }

    render() {
        const loggedIn = this.loginValid()
        return (
            <div>

            </div>
        )
    }
}

export default LoginWrapper