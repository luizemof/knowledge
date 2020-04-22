import React, { Component } from 'react'
import TableData from './TableData'

class Table extends Component {
    renderHeader() {
        const headRows = this.props.headers.map(header => <th key={header.key} scope="col">{header.label || header.key}</th>)
        return (
            <thead>
                <tr>
                    {headRows}
                </tr>
            </thead>
        )
    }

    createBody() {
        const rows = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, { ...child.props, headers: this.props.headers })
        })
        
        return (
            <tbody>
                {rows}
            </tbody>
        )
    }

    render() {
        return (
            <table className="table table-striped" >
                {this.renderHeader()}
                {this.createBody()}
            </table >
        )
    }
}

Table.Data = TableData

export default Table