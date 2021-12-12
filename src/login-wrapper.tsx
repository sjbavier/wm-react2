import React, { Component } from 'react'

class LoginWrapper extends Component {

    

    render() {
        const token = localStorage.getItem('token')
        return ( 
            {!!token && (<div>Bookmarks</div> )
             !token && (<div>home</div>)   
            }
        )
    }
}

export default LoginWrapper