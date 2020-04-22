import React, { Component } from 'react'
import axios from 'axios'
import { handleInputChange, preventDefaultAndStopPropagation } from '../utils'
import { categoryUrl } from '../../global'

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
                        {categories.map(category => <option key={`cat_opt_${category.id}`} value={category.id}>{category.name}</option>)}
                    </select>
                </div>
                <button className="btn btn-primary" type="submit">Salvar</button>
                <button className="btn btn-secondary ml-2" type="reset">Cancelar</button>
            </form>
        )
    }

    handleSubmit(e) {
        preventDefaultAndStopPropagation(e)
        console.log(this.state.category)
    }

    handleReset(e) {
        preventDefaultAndStopPropagation(e)
        this.setState({ category: {} })
    }
}
