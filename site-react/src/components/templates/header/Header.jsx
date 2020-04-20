import React from 'react'
import UserDropdown from './userDropdown/UserDropdown'

import './Header.css'

export default props => (
    <header className="header">
        <div className="toggle" onClick={e => console.log('Toggle')}>
            <i className="fa fa-lg fa-angle-left" />
        </div>
        <h1 className="title">
            <a href="/">Cod3r - Base de Conhecimento</a>
        </h1>
        <UserDropdown />
    </header>
)