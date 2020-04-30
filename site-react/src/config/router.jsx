import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import AdminPage from '../components/admin/AdminPage'
import CategoryArticles from '../components/categories/CategoryArticles'
import Article from '../components/categories/Article'
import Auth from '../components/auth/Auth'

export default props =>
    <Switch >
        <Route exact path='/' component={Home} />
        <Route exact path='/admin' component={AdminPage} />
        <Route exact path='/categories/:id/articles' component={CategoryArticles} />
        <Route exact path='/article/:id' component={Article} />
        <Route exact path='/login' component={Auth} />
        <Redirect from='*' to='/' />
    </Switch>