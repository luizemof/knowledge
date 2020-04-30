import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

import TreeView from '../TreeView/TreeView'
import { categoryUrl } from '../../../global'

import './Menu.css'

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = { tree: [] }
    }
    
    componentDidMount() {
        axios
            .get(`${categoryUrl}/tree`)
            .then(res => this.setState({ tree: res.data }))
    }

    render() {
        return (
            <div className="menu">
                <div className="menu-search">
                    <i className="fa fa-search fa-lg"></i>
                    <input type="text" placeholder="Digite para filtrar..." />
                </div>
                <TreeView data={this.state.tree} onNodeSelected={node => this.handleNodeSelected(node)} />
            </div>
        )
    }

    handleNodeSelected(node) {
        this.props.history.push({
            pathname: `/categories/${node.id}/articles`,
            state: { item: node }
        })
    }
}

export default withRouter(Menu)