import React, { Component } from 'react'
import { userUrl } from '../../global'
import axios from 'axios'
import Table from '../templates/table/Table'

const initialState = {
    user: {},
    users: [],
    isRemoving: false
}

const headers = [{
    key: 'id',
    label: 'Código'
}, {
    key: 'name',
    label: 'Nome'
}, {
    key: 'email',
    label: 'Email'
}, {
    key: 'admin',
    label: 'Administrador',
    formatter: (data) => data ? 'Sim' : 'Não'
}, {
    key: 'actions',
    label: 'Ações'
}]

export default class AdminUsers extends Component {

    constructor(props) {
        super(props)
        this.state = initialState;
    }

    componentDidMount() {
        this.loadUsers()
    }

    loadUsers() {
        axios.get(userUrl).then(res => {
            this.setState({ users: res.data })
        })
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
                this.loadUsers()
            })
            .catch(err => console.log(err))
    }

    handleReset(e) {
        this.preventDefaultAndStopPropagation(e)
        this.setState({ user: {}, isRemoving: false })
    }

    handleTableDataAction(user, isRemoving = false) {
        this.setState({ user, isRemoving })
    }

    handleRemove(e) {
        this.preventDefaultAndStopPropagation(e)
        const { user } = this.state
        if (user) {
            axios
                .delete(`${userUrl}/${user.id}`)
                .then(() => {
                    this.handleReset()
                    this.loadUsers()
                })
                .catch(err => console.log(err))
        }
    }

    renderForm() {
        const saveButton = !this.state.isRemoving ? <button type="submit" className="btn btn-primary">Salvar</button> : null
        const removeButton = this.state.isRemoving ? <button className="btn btn-danger" onClick={e => this.handleRemove(e)}>Excluir</button> : null
        return (
            <form onSubmit={e => this.handleSubmit(e)} onReset={e => this.handleReset(e)}>
                <div className="form-row">
                    <div className="form-group col-6">
                        <label htmlFor="name">Nome:</label>
                        <input
                            id="name"
                            className="form-control"
                            placeholder="Informe o Nome do Usuário..."
                            type="text"
                            readOnly={this.state.isRemoving}
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
                            readOnly={this.state.isRemoving}
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
                                disabled={this.state.isRemoving}
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
                            type="password"
                            value={this.state.user.password || ''}
                            readOnly={this.state.isRemoving}
                            onChange={e => this.handleInputChange(e)} />
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="passwordConfirm">Confirmação de senha:</label>
                        <input
                            id="passwordConfirm"
                            className="form-control"
                            placeholder="Confirme a Senha do Usuário"
                            type="password"
                            readOnly={this.state.isRemoving}
                            value={this.state.user.passwordConfirm || ''}
                            onChange={e => this.handleInputChange(e)} />
                    </div>
                </div>
                {saveButton}
                {removeButton}
                <button type="reset" className="btn btn-secondary ml-2">Cancelar</button>
            </form>
        )
    }

    renderTable() {
        const tableDatas = this.state.users.map(user => {
            return (
                <Table.Data key={`TABLE_DATA_${user.id}`} data={user}>
                    <div cell-template="actions">
                        <button className="btn btn-warning mr-2" onClick={() => this.handleTableDataAction(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger" onClick={e => this.handleTableDataAction(user, true)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </Table.Data>
            )
        })

        return (
            <Table headers={headers} data={this.state.users}>
                {tableDatas}
            </Table>)
    }

    render() {
        return (
            <div>
                {this.renderForm()}
                <hr />
                {this.renderTable()}
            </div>
        )
    }
}