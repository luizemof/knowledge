import React, { Component } from 'react'
import Gravatar from 'react-gravatar'
import './UserDropdown.css'
import { Link } from 'react-router-dom'
import { setUser } from '../../../../redux/actions'
import { connect } from 'react-redux'

class UserDropdown extends Component {
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
                <Link to="/admin">
                    <i className="fa fa-cogs">Administração</i>
                </Link>
                <button onClick={e => this.props.setUser(null)}>
                    <i className="fa fa-sign-out">Sair</i>
                </button>
            </div>
        </div>
        )
    }
}

export default connect(null, { setUser })(UserDropdown)