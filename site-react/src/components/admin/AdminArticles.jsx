import React, { Component } from 'react'
import axios from 'axios'
import CKEditor from 'ckeditor4-react';
import Table from '../templates/table/Table'
import Pagination from '../templates/pagination/Pagination'

import { categoryUrl, userUrl, articleUrl } from '../../global'
import { preventDefaultAndStopPropagation, handleInputChange } from '../utils'

const headers = [{
    key: 'id',
    label: 'Código'
}, {
    key: 'name',
    label: 'Nome'
}, {
    key: 'description',
    label: 'Descrição'
}, {
    key: 'actions',
    label: 'Ações'
}]

export default class AdminArticles extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            limit: null,
            count: 0,
            article: {},
            articles: [],
            categories: [],
            users: []
        }
    }

    componentDidMount() {
        this.loadCategories()
        this.loadUsers()
        this.loadArticles()
    }

    loadCategories() {
        axios
            .get(categoryUrl)
            .then(res => { this.setState({ categories: res.data }) })
            .catch(err => console.log(err))
    }

    loadUsers() {
        axios
            .get(userUrl)
            .then(res => { this.setState({ users: res.data }) })
            .catch(err => console.log(err))
    }

    loadArticles() {
        axios
            .get(articleUrl)
            .then(res => this.setState({ articles: res.data.data, limit: res.data.limit, count: res.data.count }))
            .catch(err => console.log(err))
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
        const saveButton = !this.state.isRemoving ? <button type="submit" className="btn btn-primary">Salvar</button> : null
        const removeButton = this.state.isRemoving ? <button type="button" className="btn btn-danger" onClick={e => this.handleRemove(e)}>Excluir</button> : null
        return (
            <form onSubmit={e => this.handleSubmit(e)} onReset={e => this.handleReset(e)}>
                <div className="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input
                        id="name"
                        className="form-control"
                        type="text"
                        placeholder="Informe o Nome do Artigo..."
                        readOnly={this.state.isRemoving}
                        value={this.state.article.name || ''}
                        onChange={e => handleInputChange(e, { ...this.state.article }, article => this.setState({ article }))} />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descrição:</label>
                    <input
                        id="description"
                        type="text"
                        className="form-control"
                        placeholder="Informe a Descrição do Artigo..."
                        readOnly={this.state.isRemoving}
                        value={this.state.article.description || ''}
                        onChange={e => handleInputChange(e, { ...this.state.article }, article => this.setState({ article }))} />
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Image (URL)</label>
                    <input
                        id="imageUrl"
                        className="form-control"
                        type="text"
                        placeholder="Informe a URL da Imagem do Artigo..."
                        readOnly={this.state.isRemoving}
                        value={this.state.article.imageUrl || ''}
                        onChange={e => handleInputChange(e, { ...this.state.article }, article => this.setState({ article }))} />
                </div>

                <div className="form-group">
                    <label htmlFor="categoryId">Categoria:</label>
                    <select
                        id="categoryId"
                        className="form-control"
                        disabled={this.state.isRemoving}
                        value={this.state.article.categoryId || ''}
                        onChange={e => handleInputChange(e, { ...this.state.article }, article => this.setState({ article }))}
                    >
                        {this.renderCategoriesOptions()}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="userId">Usuário</label>
                    <select
                        id="userId"
                        className="form-control"
                        disabled={this.state.isRemoving}
                        value={this.state.article.userId || ''}
                        onChange={e => handleInputChange(e, { ...this.state.article }, article => this.setState({ article }))}
                    >
                        {this.renderUserOptions()}
                    </select>
                </div>

                <div className="mb-3">
                    <CKEditor readOnly={this.state.isRemoving} data={this.state.article.content} onChange={e => this.handleCKEditorChange(e)} />
                </div>

                {saveButton}
                {removeButton}
                <button type="reset" className="btn btn-secondary ml-2">Cancelar</button>
            </form>
        )
    }

    renderTable() {
        const tableDatas = this.state.articles.map(article => {
            return (
                <Table.Data key={`TABLE_DATA_${article.id}`} data={article}>
                    <div cell-template="actions">
                        <button className="btn btn-warning mr-2" onClick={() => this.handleTableDataAction({ ...article })}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger" onClick={() => this.handleTableDataAction({ ...article }, true)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </Table.Data>
            )
        })

        return (
            <div>
                <Table headers={headers} data={this.state.categories}>
                    {tableDatas}
                </Table>
                <Pagination totalItems={this.state.count} currentPage={this.state.currentPage} limit={this.state.limit} />
            </div>
        )
    }

    renderCategoriesOptions() {
        const categories = this.state.categories ? this.state.categories.map(category => <option key={category.id} value={category.id}>{category.path}</option>) : null
        return [this.renderDefaultOptions('CAT_OPTS'), ...categories]
    }

    renderUserOptions() {
        const users = this.state.users ? this.state.users.map(user => <option key={user.id} value={user.id}>{user.name}</option>) : null
        return [this.renderDefaultOptions('USR_OPT'), ...users]
    }

    renderDefaultOptions(key) {
        return (
            <option key={key} value='' />
        )
    }

    handleSubmit(e) {
        preventDefaultAndStopPropagation(e)
        const method = this.state.article.id ? 'put' : 'post'
        const id = this.state.article.id ? `${this.state.article.id}` : ''

        axios[method](`${articleUrl}/${id}`, this.state.article)
            .then(() => {
                this.handleReset()
                this.loadArticles()
            }).catch(err => console.log(err))
    }

    handleReset(e) {
        preventDefaultAndStopPropagation(e)
        this.setState({ article: {}, isRemoving: false })
    }

    handleRemove(e) {
        preventDefaultAndStopPropagation(e)
        axios.delete(`${articleUrl}/${this.state.article.id}`)
            .then(() => {
                this.handleReset()
                this.loadArticles()
            })
            .catch(err => console.log(err))
    }

    handleCKEditorChange(e) {
        const article = { ...this.state.article }
        article.content = e.editor.getData()
        this.setState({ article })
    }

    handleTableDataAction(article, isRemoving = false) {
        axios
            .get(`${articleUrl}/${article.id}`)
            .then(res => {
                this.setState({ article: res.data, isRemoving })
            })
            .catch(err => console.log(err))
    }
}