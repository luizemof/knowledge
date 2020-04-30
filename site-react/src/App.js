import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css';
import Header from './components/templates/header/Header'
import Menu from './components/templates/menu/Menu'
import Content from './components/templates/content/Content'
import Footer from './components/templates/footer/Footer'
import Auth from './components/auth/Auth';
import { setUser } from './redux/actions';
import axios from 'axios';

function App(props) {
  const [hasValidToken, setHasValidToken] = useState(false)
  const hasMenu = !props.menuToggle && hasValidToken
  const menu = hasMenu ? <Menu /> : null
  const content = hasValidToken ? <Content /> : null
  const auth = !hasValidToken ? <Auth /> : null

  validateToken(props).then(hasValidToken => setHasValidToken(hasValidToken))

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

async function validateToken({ user, setUser }) {
  if (user.token) {
    const isValid = (await axios.post('http://localhost:3000/validateToken', user)).data
    return isValid
  }

  return false
}

const mapStateToProps = state => {
  return { ...state.menuToggle, user: { ...state.userLogged.user } }
}

export default withRouter(connect(mapStateToProps)(App));
