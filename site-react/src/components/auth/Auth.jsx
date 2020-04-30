import React from 'react'
import Logo from '../../assets/img/logo.png'

import './Auth.css'
import Login from './Login'
import { useState } from 'react'
import NewUser from './NewUser'

export default function Auth() {
    const [isLogin, setLogin] = useState(true)
    const content = isLogin ? <Login /> : <NewUser />
    const linkContent = isLogin ? 'Não tem cadastro? Registre-se aqui!' : 'Já tem cadastro? Acesse o Login!'

    return (
        <div className="auth">
            <div className="auth-content">
                <img src={Logo} width="200" alt="Logo" />
                <hr />
                {content}
                <a href="/" onClick={e => { e.preventDefault(); setLogin(!isLogin) }}>{linkContent}</a>
            </div>
        </div>
    )
}
