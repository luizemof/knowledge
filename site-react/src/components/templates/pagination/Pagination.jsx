import React, { Component } from 'react'
import { preventDefaultAndStopPropagation } from '../../utils'

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
                    <li className="page-item"><a className="page-link" href="/">Previous</a></li>
                    {this.renderItems(totalPages)}
                    <li className="page-item"><a className="page-link" href="/">Next</a></li>
                </ul>
            </nav>
        )
    }

    renderItems(totalPages) {
        const pageArrayCount = Array.from(Array(totalPages), (_, index) => index + 1)
        return pageArrayCount.map(count => <li key={count} className={`page-item ${(this.state.currentPage || 1) === count ? 'active' : ''}`}><a className="page-link" href="/">{count}</a></li>)
    }

    handlePageChange(e, next) {
        preventDefaultAndStopPropagation(e)
        this.setState({ currentPage: next })
    }
}
