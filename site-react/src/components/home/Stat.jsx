import React from 'react'
import './Stat.css'

export default function Stats({ title, total, icon, iconStyle }) {
    return (
        <div className="stat">
            <div className="stat-icon">
                <i className={icon} style={iconStyle}></i>
            </div>
            <div className="stat-info">
                <span className="stat-title">{title}</span>
                <span className="stat-total">{total}</span>
            </div>
        </div>
    )
}
