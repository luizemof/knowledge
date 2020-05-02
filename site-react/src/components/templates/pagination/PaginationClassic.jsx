import React from 'react'
import { useState } from 'react'

import { preventDefaultAndStopPropagation } from '../../utils'

import './Pagination.css'

export default function PaginationClassic({ totalPages, initialPage, onPaginationChange }) {
    const [currentPage, setCurrentPage] = useState(initialPage)
    const pageArray = Array.from(Array(totalPages), (_, index) => index + 1)
    function handlePageChange(event, next) {
        preventDefaultAndStopPropagation(event)
        let nextPage = 1
        if (next > 0 && next <= totalPages) {
            nextPage = next
        } else if (next > totalPages) {
            nextPage = totalPages
        }
        if (nextPage !== currentPage) {
            setCurrentPage(nextPage)
            if (onPaginationChange) {
                onPaginationChange({ nextPage })
            }
        }
    }

    return (
        <nav>
            <ul className="pagination">
                <PaginationClassicItem icon="fa fa-angle-double-left" onClick={e => handlePageChange(e, 1)} />
                <PaginationClassicItem icon="fa fa-angle-left" onClick={e => handlePageChange(e, currentPage - 1)} />

                {
                    pageArray.map(pageIndex =>
                        <PaginationClassicItem
                            active={currentPage === pageIndex ? 'active' : null}
                            key={pageIndex}
                            page={pageIndex}
                            onClick={e => handlePageChange(e, pageIndex)}
                        />)
                }

                <PaginationClassicItem icon="fa fa-angle-right" onClick={e => handlePageChange(e, currentPage + 1)} />
                <PaginationClassicItem icon="fa fa-angle-double-right" onClick={e => handlePageChange(e, totalPages)} />
            </ul>
        </nav>
    )
}

const PaginationClassicItem = ({ icon, active, page, onClick }) => (
    <li className={`page-item ${active}`}>
        <a className="page-link" href="/" onClick={onClick}>
            {icon ? <i className={icon}></i> : null}
            {page}
        </a>
    </li>
)