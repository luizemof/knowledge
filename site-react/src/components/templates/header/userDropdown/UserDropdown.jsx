import React from 'react'
import Gravatar from 'react-gravatar'
import './UserDropdown.css'
import { Link } from 'react-router-dom'
import { setUser } from '../../../../redux/actions'
import { connect } from 'react-redux'

function UserDropdown({ user, setUser }) {
    const adminTemplate = (<Link to="/admin"><i className="fa fa-cogs">Administração</i></Link>)
    return (
        <div className="user-dropdown">
            <div className="user-dropdown-button">
                <span className="name">{user ? user.name : ''}</span>
                <div className="user-dropdown-img">
                    <Gravatar email={user ? user.email : ''} size={37} />
                </div>
                <i className="fa fa-angle-down"></i>
            </div>
            <div className="user-dropdown-content">
                {user && user.admin ? adminTemplate : null}
                <a href='/' onClick={e => { e.preventDefault(); setUser(null)}}>
                    <i className="fa fa-sign-out">Sair</i>
                </a>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return { user: state.userLogged.user }
}

export default connect(mapStateToProps, { setUser })(UserDropdown)