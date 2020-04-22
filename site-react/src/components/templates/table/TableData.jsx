import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'

export default class TableData extends Component {

    renderChildren(header) {
        const children = this.props.children;
        if (children) {
            if(Array.isArray(children)) {
                return children.find(child => child.props['cell-template'] === header.key)
            }

            return children.props['cell-template'] === header.key ? children : null
        }
        return null
    }

    renderRowData(header, data) {
        return (
            <td key={uuid()}>
                {
                    this.renderChildren(header) || (header.formatter ? header.formatter(data[header.key]) : data[header.key])
                }
            </td>
        )
    }

    randerRow(data) {
        return (
            <tr key={uuid()}>
                {this.props.headers.map(header => this.renderRowData(header, data))}
            </tr>
        )
    }

    render() {
        let rows = null
        if (this.props.data) {
            rows = this.randerRow(this.props.data)
        }

        return (
            <React.Fragment>
                {rows}
            </React.Fragment>
        )
    }
}
