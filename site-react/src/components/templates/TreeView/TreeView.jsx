import React, { useState } from 'react'

import './TreeView.css'

export default function TreeView(props) {
    const [expandedOrCollapsed, setExpandedOrCollapsed] = useState({})
    return (
        <div className="tree-view">
            <ul className="tree-root">
                {renderTreeItems(props.data, expandedOrCollapsed, setExpandedOrCollapsed)}
            </ul>
        </div>
    )
}

const renderTreeItems = function (items, expandedOrCollapsed, setExpandedOrCollapsed) {
    return items.map(item => {
        const { children } = item
        const expanded = expandedOrCollapsed ? expandedOrCollapsed[item.id] : false
        let childrenComponents
        if (children && expanded) {
            childrenComponents = renderTreeItems(children, expandedOrCollapsed, setExpandedOrCollapsed)
        }
        
        const hasChildren = children.length > 0
        return (
            <li className="tree-node" key={item.id}>
                <div className={`tree-content`} onClick={() => expandOrCollapseItem(item, expandedOrCollapsed, setExpandedOrCollapsed)}>
                    {renderTreeIcon(hasChildren, expanded ? 'expanded' : '')}
                    <span>{item.name}</span>
                </div>
                {expanded ? renderChildren(hasChildren, childrenComponents) : null}
            </li>
        )
    })
}

const renderTreeIcon = function (hasChildren, expanded) {
    return (
        <div className="tree-arrow">
            {hasChildren ? (<i className={`tree-arrow-icon ${expanded}`}> </i>) : null}
        </div>
    )
}

function renderChildren(hasChildren, childrenComponents) {
    return (
        <ul className={`tree-node-children ${hasChildren ? 'has-children' : ''}`}>
            {childrenComponents}
        </ul>
    )
}

const expandOrCollapseItem = function (item, expandedOrCollapsed, setExpandedOrCollapsed) {
    expandedOrCollapsed[item.id] = !expandedOrCollapsed[item.id]
    setExpandedOrCollapsed({...expandedOrCollapsed})
}