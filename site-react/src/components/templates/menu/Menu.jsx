import React, { Component } from 'react'

import './Menu.css'

export default class Menu extends Component {
    render() {
        return (
            <div className="menu">
                <div className="menu-search">
                    <i className="fa fa-search fa-lg"></i>
                    <input type="text" placeholder="Digite para filtrar..."/>
                </div>
            </div>
        )
    }
}
