import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { handleInputChange } from '../utils'
import { setUser } from '../../redux/actions'

import './Login.css'

function Login(props) {
    const [user, setUser] = useState({ email: '', password: '' })
    const handleLogin = () => {
        axios
            .post('http://localhost:3000/signin', user)
            .then(res => {
                props.setUser(res.data)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="auth-login">
            <span>Login</span>
            <div className="auth-login-content">
                <input id="email" type="text" className="form-control" placeholder="E-mail" autoComplete="off" onChange={e => handleInputChange(e, { ...user }, setUser)} />
                <input id="password" type="password" className="form-control" placeholder="Senha" autoComplete="off" onChange={e => handleInputChange(e, { ...user }, setUser)} />
                <button className="btn btn-primary" onClick={() => handleLogin()}>Entrar</button>
            </div>
        </div>
    )
}

export default connect(null, { setUser })(Login)