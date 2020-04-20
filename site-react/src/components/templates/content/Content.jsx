import React from 'react'
import Routes from '../../../config/router'
import { BrowserRouter } from 'react-router-dom'

import './Content.css'

export default props => (
    <BrowserRouter>
        <div className="content">
            <Routes />
        </div>
    </BrowserRouter>
)