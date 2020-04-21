import React from 'react'

export default function TabItem(props) {
    return (
        <li className="nav-item ml-2">
            <button type="button" className="tab-button nav-link active">{props.title}</button>
        </li>
    )
}
