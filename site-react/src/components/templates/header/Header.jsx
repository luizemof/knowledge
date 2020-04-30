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
                {!this.props.hideButtons ? this.renderToogle() : null}
                <h1 className="title">
                    <Link to="/">Cod3r - Base de Conhecimento</Link>
                </h1>
                {!this.props.hideButtons ? <UserDropdown /> : null}
            </header>
        )
    }

    renderToogle() {
        return (
            <div className="toggle" onClick={e => this.handleToggleClick()}>
                <i className={this.state.menuToggle ? "fa fa-lg fa-angle-left" : "fa fa-lg fa-angle-down"} />
            </div>
        )
    }

    handleToggleClick() {
        this.setState({ menuToggle: !this.state.menuToggle })
        this.props.menuToggle(this.state.menuToggle)
    }
}

export default connect(null, { menuToggle })(Header)