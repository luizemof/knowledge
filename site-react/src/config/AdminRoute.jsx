import React from 'react'
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'

function AdminRoute(props) {
    const isAdmin = false
    console.log(props)
    return (
        <div>
            {isAdmin ? <Route {...props} /> : <Redirect to="/" />}
        </div>
    )
}

const mapStateToProps = state => {
    return { user: state.userLogged.user }
}

export default connect(mapStateToProps)(AdminRoute)
