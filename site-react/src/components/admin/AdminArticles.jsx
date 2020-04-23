import React, { Component } from 'react'

export default class AdminArticles extends Component {
    render() {
        return (
            <div>
                {this.renderForm()}
            </div>
        )
    }

    renderForm() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input
                        id="name"
                        className="form-control"
                        type="text"
                        placeholder="Informe o Nome do Artigo..." />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descrição:</label>
                    <input
                        id="description"
                        type="text"
                        className="form-control" 
                        placeholder="Informe a Descrição do Artigo..." />
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Image (URL)</label>
                    <input 
                        id="imageUrl" 
                        className="form-control"
                        type="text" 
                        placeholder="Informe a URL da Imagem do Artigo..."/>
                </div>

                <div className="form-group">
                    <label htmlFor="categoryId">Categoria:</label>
                    <select id="categoryId" className="form-control"></select>
                </div>

                <div className="form-group">
                    <label htmlFor="userId">Usuário</label>
                    <select className="form-control" id="userId"></select>
                </div>
            </form>
        )
    }
}