import React, { Component } from 'react'
import axios from 'axios'
import { handleInputChange, preventDefaultAndStopPropagation } from '../utils'
import { categoryUrl } from '../../global'
import Table from '../templates/table/Table'

const headers = [{
    key: 'id',
    label: 'Código'
}, {
    key: 'name',
    label: 'Nome'
}, {
    key: 'path',
    label: 'Caminho'
}, {
    key: 'actions',
    label: 'Ações'
}]

export default class AdminCategories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            category: {
                id: 2,
                name: 'Categoria 1'
            }
        }
    }

    componentDidMount() {
        this.loadCategories()
    }

    loadCategories() {
        axios
            .get(categoryUrl)
            .then(res => {
                this.setState({ categories: res.data })
            }).catch(err => console.log(err))
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

    renderForm() {
        const defaultCategoryOpt = (<option value=''></option>)
        const categories = [defaultCategoryOpt, ...this.state.categories]
        return (
            <form onSubmit={e => this.handleSubmit(e)} onReset={e => this.handleReset(e)}>
                <div className="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input
                        className="form-control"
                        id="name"
                        type="text"
                        placeholder="Informe o Nome da Categoria..."
                        value={this.state.category.name || ''}
                        onChange={e => handleInputChange(e, this.state.category, (category) => this.setState({ category }))} />
                </div>

                <div className="form-group">
                    <label htmlFor="categoyId">Categoria Pai:</label>
                    <select
                        id="parentId"
                        className="form-control"
                        value={this.state.category.parentId || ''}
                        onChange={e => handleInputChange(e, this.state.category, (category) => this.setState({ category }))}
                    >
                        {categories.map(category => <option key={`cat_opt_${category.id}`} value={category.id}>{category.path}</option>)}
                    </select>
                </div>
                <button className="btn btn-primary" type="submit">Salvar</button>
                <button className="btn btn-secondary ml-2" type="reset">Cancelar</button>
            </form>
        )
    }

    renderTable() {
        const tableDatas = this.state.categories.map(category => {
            return (
                <Table.Data key={`TABLE_DATA_${category.id}`} data={category}>
                    <div cell-template="actions">
                        <button className="btn btn-warning mr-2" onClick={() => this.handleTableDataAction(category)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger" onClick={e => this.handleTableDataAction(category, true)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </Table.Data>
            )
        })

        return (
            <Table headers={headers} data={this.state.categories}>
                {tableDatas}
            </Table>)
    }

    handleSubmit(e) {
        preventDefaultAndStopPropagation(e)
        console.log(this.state.category)
    }

    handleReset(e) {
        preventDefaultAndStopPropagation(e)
        this.setState({ category: {} })
    }

    handleTableDataAction(category, isRemoving = false) {
        this.setState({ category, isRemoving })
    }
}
