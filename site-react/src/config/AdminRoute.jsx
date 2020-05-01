import React from 'react'
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'

function AdminRoute(props) {
    const { user } = props
    return (user.admin ? <Route {...props} /> : <Redirect to="/" />)
}

const mapStateToProps = state => {
    return { user: state.userLogged.user }
}

export default connect(mapStateToProps)(AdminRoute)
