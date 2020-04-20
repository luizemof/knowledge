import React from 'react'

import './PageTitle.css'

export default props => (
    <div className="page-title">
        <h1>
            <i className={props.icon}></i>
            {props.title}
        </h1>
        <h2>{props.subTitle}</h2>
        <hr/>
    </div>
)