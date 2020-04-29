import React, { useState, useEffect } from 'react'
import axios from 'axios'

import PageTitle from '../templates/pageTitle/PageTitle'
import { categoryUrl } from '../../global'

export default function CategoryArticles(props) {
    const { item } = props.location.state
    const [loading, setLoading] = useState({ isLoading: true, articles: [] })
    useEffect(() => {
        if (loading.isLoading || item.id !== loading.id) {
            loadArticlesByCategory(item.id)
                .then(res => {
                    setLoading({ 
                        isLoading: false,
                        id: item.id,
                        articles: res.data 
                    })
                })
                .catch(err => console.log(err))
        }
    })
    return (
        <div>
            <PageTitle icon="fa fa-folder-o" title={item.name} subTitle="Categoria" />
            {renderArticleItems(loading.articles)}
        </div>
    )
}

const renderArticleItems = (articles) => articles.map(article => {
    return (
        <div key={article.id}>{article.name}</div>
    )
})

function loadArticlesByCategory(id) {
    return axios.get(`${categoryUrl}/${id}/articles`)
}
