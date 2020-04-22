import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'

export default class Table extends Component {
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

    renderRowData(header, data) {
        return (
            <td key={uuid()}>{header.formatter ? header.formatter(data[header.key]) : data[header.key]}</td>
        )
    }

    randerRow(data) {
        return (
            <tr key={uuid()}>
                {this.props.headers.map(header => this.renderRowData(header, data))}
            </tr>
        )
    }

    createBody() {
        let rows = null
        if (this.props.data) {
            rows = this.props.data.map(d => this.randerRow(d))
        }


        return (
            <tbody>
                {rows}
            </tbody>
        )
    }

    render() {
        return (
            <table className="table table-striped">
                {this.renderHeader()}
                {this.createBody()}
            </table>
        )
    }
}
