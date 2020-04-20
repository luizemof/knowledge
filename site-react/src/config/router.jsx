import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import Home from '../components/home/Home'
import AdminPage from '../components/admin/AdminPage'

export default props =>
    <Switch >
        <Route exact path='/' component={Home} />
        <Route exact path='/admin' component={AdminPage} />
        <Redirect from='*' to='/' />
    </Switch>