import React, { Component } from 'react'
import Gravatar from 'react-gravatar'
import './UserDropdown.css'

export default class UserDropdown extends Component {
    render() {
        return (<div className="user-dropdown">
            <div className="user-dropdown-button">
                <span className="name">Luiz</span>
                <div className="user-dropdown-img">
                    <Gravatar email="luiz.emof@gmail.com" size={37} />
                </div>
                <i className="fa fa-angle-down"></i>
            </div>
            <div className="user-dropdown-content">
                <a href="/admin">
                    <i className="fa fa-cogs">Administração</i>
                </a>
                <button onClick={e => this.logout(e)}>
                    <i className="fa fa-sign-out">Sair</i>
                </button>
            </div>
        </div>
        )
    }

    logout(e) {
        console.log('Logout')
    }
}