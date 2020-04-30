import React from 'react'

import './Login.css'

export default function Login() {
    return (
        <div className="auth-login">
            <span>Login</span>
            <div className="auth-login-content">
                <input type="text" className="form-control" placeholder="E-mail" autoComplete="off" />
                <input type="password" className="form-control" placeholder="Senha" autoComplete="off"/>
                <button className="btn btn-primary">Entrar</button>
            </div>
        </div>
    )
}
