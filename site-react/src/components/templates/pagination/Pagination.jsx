import React from 'react'
import PaginationClassic from './PaginationClassic'

import './Pagination.css'

export default function Pagination({onPaginationChange, totalItems, limit}) {
    const totalPages = limit > 0 && totalItems > 0 ? (Math.ceil(totalItems / limit)) : 1
    return (
        <PaginationClassic totalPages={totalPages} initialPage={1} onPaginationChange={page => onPaginationChange(page)} />
    )

}
