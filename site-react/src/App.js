import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';

import Header from './components/templates/header/Header'
import Menu from './components/templates/menu/Menu'
import Content from './components/templates/content/Content'
import Footer from './components/templates/footer/Footer'
import Auth from './components/auth/Auth';

import { user_key, baseUrl } from './global';

import './App.css';

function App(props) {
  const [hasValidToken, setHasValidToken] = useState(false)
  const hasMenu = !props.menuToggle && hasValidToken
  const menu = hasMenu ? <Menu /> : null
  const content = hasValidToken ? <Content /> : null
  const auth = !hasValidToken ? <Auth /> : null

  validateToken(props)
    .then(hasValidToken => {
      setHasValidToken(hasValidToken)
    })
    .catch(() => { setHasValidToken(false) })

  return (
    <div className={`App${!hasMenu ? " hide-menu" : ""}${!hasValidToken ? " app-auth" : ""}`}>
      <Header hideButtons={!hasValidToken} />
      {menu}
      {content}
      {auth}
      <Footer />
    </div>
  );
}

async function validateToken(props) {
  let user = props.user || { token: null }
  if (!user.token) {
    user = JSON.parse(localStorage.getItem(user_key))
  }
  const isValid = (await axios.post(`${baseUrl}/validateToken`, user)).data
  return typeof isValid === 'boolean' && isValid
}

const mapStateToProps = state => {
  return { ...state.menuToggle, user: { ...state.userLogged.user } }
}

export default withRouter(connect(mapStateToProps)(App));
