import React from 'react'

import './NewUser.css'

export default function NewUser() {
    return (
        <div className="auth-new-user">
            <span>Cadastro</span>
            <div className="auth-new-user-content">
                <input type="text" className="form-control" placeholder="Nome" />
                <input type="text" className="form-control" placeholder="E-mail" />
                <input type="password" className="form-control" placeholder="Senha" />
                <input type="password" className="form-control" placeholder="Confirme a senha" />
                <button className="btn btn-primary">Registrar</button>
            </div>
        </div>
    )
}
