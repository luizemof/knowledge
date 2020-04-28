import React, { Component } from 'react'
import { connect } from 'react-redux'
import { menuToggle } from '../../../redux/actions'
import UserDropdown from './userDropdown/UserDropdown'

import './Header.css'
import { Link } from 'react-router-dom'

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = { menuToggle: true }
    }

    render() {
        return (
            <header className="header">
                <div className="toggle" onClick={e => this.handleToggleClick()}>
                    <i className={this.state.menuToggle ? "fa fa-lg fa-angle-left" : "fa fa-lg fa-angle-down"} />
                </div>
                <h1 className="title">
                    <Link to="/">Cod3r - Base de Conhecimento</Link>
                </h1>
                <UserDropdown />
            </header>
        )
    }

    handleToggleClick() {
        this.setState({ menuToggle: !this.state.menuToggle })
        this.props.menuToggle(this.state.menuToggle)
    }
}

export default connect(null, { menuToggle })(Header)