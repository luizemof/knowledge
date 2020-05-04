import React, { useState, useEffect } from 'react'
import axios from 'axios'

import PageTitle from '../templates/pageTitle/PageTitle'
import { categoryUrl } from '../../global'
import ArticlesItem from './ArticlesItem'

import './CategoryArticles.css'

const initialState = {
    isLoading: true,
    page: 1,
    categoryId: null,
    loadMore: true,
    articles: []
}

export default function CategoryArticles(props) {
    const { item } = props.location.state
    const [state, setState] = useState({ ...initialState, categoryId: item.id })
    useEffect(() => {
        if (state.isLoading) {
            axios.get(`${categoryUrl}/${item.id}/articles?page=${state.page}`)
                .then(res => {
                    state.categoryId = item.id
                    state.isLoading = false
                    state.articles = state.articles.concat(res.data)
                    state.loadMore = res.data.length > 0
                    state.page += 1
                    setState({ ...state })
                })
                .catch(err => console.log(err))
        } else if (item.id !== state.categoryId) {
            setState({ ...initialState, categoryId: item.id })
        }
    }, [state, item.id])
    return (
        <div className="category-articles">
            <PageTitle icon="fa fa-folder-o" title={item.name} subTitle="Categoria" />
            {renderArticleItems(state.articles)}
            {state.loadMore ? <button className="btn btn-outline-danger" onClick={e => setState({ ...state, isLoading: true })}>Carregar mais</button> : null}
        </div>
    )
}

const renderArticleItems = (articles) => articles.map(article => (<ArticlesItem key={article.id} item={article} />))
