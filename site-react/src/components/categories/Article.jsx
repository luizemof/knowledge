import React, { useState, useEffect } from 'react'
import axios from 'axios'

import PageTitle from '../templates/pageTitle/PageTitle'
import { articleUrl } from '../../global'

import './Article.css'

export default function Article(props) {
    const articleId = props.match.params.id
    const [article, setArticle] = useState(null)
    useEffect(() => {
        if (!article) {
            loadArticle(articleId)
                .then(res => setArticle({ ...res.data }))
        }
    })

    const articleContent = article ? article.content : ''
    return (
        <div>
            <PageTitle
                icon="fa fa-file-o"
                title={article ? article.name : ''}
                subTitle={article ? article.description : ''}
            />
            <div className="article" dangerouslySetInnerHTML={{ __html: articleContent }}>
            </div>
        </div >
    )
}

function loadArticle(id) {
    return axios.get(`${articleUrl}/${id}`)
}