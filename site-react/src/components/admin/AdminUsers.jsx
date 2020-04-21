import React, { Component } from 'react'
import { userUrl } from '../../global'
import axios from 'axios'

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

    preventDefaultAndStopPropagation(e) {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
    }

    handleSubmit(e) {
        this.preventDefaultAndStopPropagation(e)

        const method = this.state.user.id ? "put" : "post";
        const id = this.state.user.id ? `${this.state.user.id}` : ``;
        axios[method](`${userUrl}/${id}`, this.state.user)
            .then(() => {
                this.handleReset()
                alert('well done')
            })
            .catch(err => console.log(err))
    }

    handleReset(e) {
        this.preventDefaultAndStopPropagation(e)
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
                                type="text"
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