import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import Home from '../components/home/Home'
import AdminPage from '../components/admin/AdminPage'
import CategoryArticles from '../components/categories/CategoryArticles'

export default props =>
    <Switch >
        <Route exact path='/' component={Home} />
        <Route exact path='/admin' component={AdminPage} />
        <Route exact path='/categories/:id/articles' component={CategoryArticles} />
        <Redirect from='*' to='/' />
    </Switch>