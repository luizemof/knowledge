import React, { Component } from 'react'

import './TreeView.css'

export default class TreeView extends Component {
    constructor(props) {
        super(props)
        this.state = { expandedOrCollapsed: {} }
    }

    render() {
        return (
            <div className="tree-view">
                <ul className="tree-root">
                    {this.renderTreeItems(this.props.data)}
                </ul>
            </div>
        )
    }

    renderTreeItems(items) {
        return items.map(item => {
            const { children } = item
            const expanded = this.state.expandedOrCollapsed ? this.state.expandedOrCollapsed[item.id] : false
            let childrenComponents
            if (children && expanded) {
                childrenComponents = this.renderTreeItems(children)
            }

            const hasChildren = children.length > 0
            return (
                <li className="tree-node" key={item.id}>
                    <div className={`tree-content`} onClick={() => this.onNodeSelected(item)}>
                        {this.renderTreeIcon(hasChildren, expanded ? 'expanded' : '')}
                        <span>{item.name}</span>
                    </div>
                    {expanded ? this.renderChildren(hasChildren, childrenComponents) : null}
                </li>
            )
        })
    }

    renderTreeIcon(hasChildren, expanded) {
        return (
            <div className="tree-arrow">
                {hasChildren ? (<i className={`tree-arrow-icon ${expanded}`}> </i>) : null}
            </div>
        )
    }

    renderChildren(hasChildren, childrenComponents) {
        return (
            <ul className={`tree-node-children ${hasChildren ? 'has-children' : ''}`}>
                {childrenComponents}
            </ul>
        )
    }

    onNodeSelected(item) {
        let expandedOrCollapsed = { ...this.state.expandedOrCollapsed }
        expandedOrCollapsed[item.id] = !expandedOrCollapsed[item.id]
        this.setState({ expandedOrCollapsed })
        this.props.onNodeSelected(item)
    }
}