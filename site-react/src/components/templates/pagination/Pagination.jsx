import React, { Component } from 'react'
import { preventDefaultAndStopPropagation } from '../../utils'

import './Pagination.css'

export default class Pagination extends Component {

    constructor(props) {
        super(props)
        this.state = { currentPage: this.props.currentPage }
    }

    render() {
        const totalPages = this.props.limit > 0 && this.props.totalItems > 0 ? (Math.ceil(this.props.totalItems / this.props.limit)) : 1

        return (
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="/" onClick={e => this.handlePageChange(e, 1)}>
                            <i className="fa fa-angle-double-left"></i>
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="/" onClick={e => this.handlePageChange(e, this.state.currentPage - 1)}>
                            <i className="fa fa-angle-left"></i>
                        </a>
                    </li>
                    {this.renderItems(totalPages)}
                    <li className="page-item">
                        <a className="page-link" href="/" onClick={e => this.handlePageChange(e, this.state.currentPage + 1)}>
                            <i className="fa fa-angle-right"></i>
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="/" onClick={e => this.handlePageChange(e, this.getTotalPages())}>
                            <i className="fa fa-angle-double-right"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }

    renderItems(totalPages) {
        const pageArrayCount = Array.from(Array(totalPages), (_, index) => index + 1)
        return pageArrayCount.map(count => (
            <li key={count} className={`page-item ${(this.state.currentPage || 1) === count ? 'active' : ''}`}>
                <a className="page-link" href="/" onClick={e => this.handlePageChange(e, parseInt(e.currentTarget.innerHTML))}>{count}
                </a>
            </li>
        ))
    }

    handlePageChange(e, next) {
        preventDefaultAndStopPropagation(e)
        let nextPage = 1
        const totalPages = this.getTotalPages()
        if (next > 0 && next <= totalPages) {
            nextPage = next
        } else if (next > totalPages) {
            nextPage = totalPages
        }

        if (nextPage !== this.state.currentPage) {
            this.setState({ currentPage: nextPage })
            if (this.props.onPaginationChange) {
                this.props.onPaginationChange({ nextPage })
            }
        }
    }

    getTotalPages() {
        return this.props.limit > 0 && this.props.totalItems > 0 ? (Math.ceil(this.props.totalItems / this.props.limit)) : 1
    }
}
