import React, { Component } from 'react'

const initialState = {
    user: {}
}

export default class AdminUsers extends Component {

    constructor(props) {
        super(props)
        this.state = initialState;
    }

    handleInputChange(e) {
        const user = { ...this.state.user }
        user[e.currentTarget.id] = e.currentTarget.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value
        this.setState({ user })
    }

    handleSubmit(e) {
        e.preventDefault()
        e.stopPropagation()
        console.log(this.state.user)
    }

    handleReset(e) {
        e.preventDefault()
        e.stopPropagation()
        this.setState(initialState)
    }

    render() {
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)} onReset={e => this.handleReset(e)}>
                    <div className="form-row">
                        <div className="form-group col-6">
                            <label htmlFor="name">Nome:</label>
                            <input
                                id="name"
                                className="form-control"
                                placeholder="Informe o Nome do Usuário..."
                                type="text"
                                value={this.state.user.name || ''}
                                onChange={e => this.handleInputChange(e)} />
                        </div>

                        <div className="form-group col-6">
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                className="form-control"
                                placeholder="Informe o Email do Usuário..."
                                type="email"
                                value={this.state.user.email || ''}
                                onChange={e => this.handleInputChange(e)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <div className="form-check mt-3 mb-3">
                                <input
                                    id="admin"
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={this.state.user.admin || false}
                                    onChange={e => this.handleInputChange(e)} />
                                <label className="form-check-label" htmlFor="admin">Administrador?</label>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-6">
                            <label htmlFor="password">Senha:</label>
                            <input
                                id="password"
                                className="form-control"
                                placeholder="Informe a Senha do Usuário..."
                                type="password" value={this.state.user.password || ''}
                                onChange={e => this.handleInputChange(e)} />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="passwordConfirm">Confirmação de senha:</label>
                            <input
                                id="passwordConfirm"
                                className="form-control"
                                placeholder="Confirme a Senha do Usuário"
                                type="password"
                                value={this.state.user.passwordConfirm || ''}
                                onChange={e => this.handleInputChange(e)} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Salvar</button>
                    <button type="reset" className="btn btn-secondary ml-2">Cancelar</button>
                </form>
                <hr />
            </div>
        )
    }
}