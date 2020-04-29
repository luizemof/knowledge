import React from 'react'
import { withRouter } from 'react-router-dom'

import ArticleImg from '../../assets/img/article.png'
import './ArticlesItem.css'

function ArticlesItem({ item, history }) {
    return (
        <div className="article-item" onClick={e => history.push(`/article/${item.id}`)}>
            <div className="article-item-img">
                <img src={item.imageUrl || ArticleImg} width="150" height="150" alt="Article"></img>
            </div>
            <div className="article-item-info">
                <h1>{item.name}</h1>
                <p>{item.description}</p>
                <span><strong>Autor:</strong> {item.author}</span>
            </div>
        </div>
    )
}

export default withRouter(ArticlesItem)