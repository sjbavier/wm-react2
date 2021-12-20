import { METHODS } from 'http'
import React, { Component } from 'react'
import clientFetch from '../../lib/client'

class LoginForm extends Component {

    state = {
        email: '',
        password: '',
        formState: '',
        token: ''
    }

    onEmailChange = ( ev: any ) => {
        this.setState({ email: ev.target.value })
    }

    onPasswordChange = ( ev: any ) => {
        this.setState({ password: ev.target.value })
    }

    formUpdate = ( data: any ) => {
        this.setState({
            formState: data.message, 
            token: data.access_token
        })
        localStorage.setItem('token', data.access_token)
    }   

    formSubmit = ( ev: any ) => {
        ev.preventDefault()
        this.setState({formState: 'submitting'})

        var formdata = {
            email: this.state.email,
            password: this.state.password
        }

        const fetchOptions = {
            method:'POST',
            path:'/auth/login',
            data: JSON.stringify(formdata),
            cb: this.formUpdate
        }

        clientFetch( fetchOptions )
    }

    render(){
        return (
            <div>
                <form onSubmit={ this.formSubmit }>
                    <input 
                        placeholder="email"
                        type="text" 
                        value={this.state.email}
                        onChange={ this.onEmailChange }
                    />
                    <input 
                        placeholder="password"
                        type="password"
                        value={this.state.password}
                        onChange={ this.onPasswordChange }
                    />
                    <input
                        type="submit"
                    />
                </form>
                <p>{ this.state.formState }</p>
                <p>{ this.state.token }</p>
            </div>
        )
    }
}

export default LoginForm