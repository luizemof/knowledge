import React, { Component } from 'react'
import TabItem from './TabItem'

import './Tab.css'

class Tab extends Component {

    constructor(props) {
        super(props)
        const activeTabItem = props.children.find(child => child.props.active)
        const activeTabId = activeTabItem ? activeTabItem.props.id : props.children[0]
        this.state = { activeTabId }
    }

    handleNavLinkButtonClick(e) {
        const buttonClickId = e.currentTarget.id
        if (buttonClickId !== this.state.activeTabId) {
            this.setState({ activeTabId: buttonClickId })
        }
    }

    createTabHeaderItems() {
        let count = 0
        const tabItems = this.props.children.map(child => {
            if (child.type.name === 'TabItem') {
                const id = child.props.id
                const title = child.props.title
                const activeClass = id === this.state.activeTabId ? 'active' : ''

                return (
                    <li key={id} className={`nav-item ${count++ === 0 ? 'ml-2' : ''}`}>
                        <button id={id} type="button" className={`tab-button nav-link ${activeClass}`} onClick={e => this.handleNavLinkButtonClick(e)}>{title}</button>
                    </li>)
            }
            return null
        })

        return (
            <ul className="nav nav-tabs">
                {tabItems}
            </ul>
        )
    }
    createTabContentItems() {
        const activeTabItem = this.props.children.find(child => child.props.id === this.state.activeTabId)
        return activeTabItem.props.children
    }
    render() {
        return (
            <div className="tab">
                <div className="tab-header">
                    {this.createTabHeaderItems()}
                </div>
                <div className="tab-content">
                    {this.createTabContentItems()}
                </div>
            </div>
        )
    }
}

Tab.Item = TabItem

export default Tab