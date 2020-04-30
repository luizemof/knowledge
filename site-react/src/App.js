import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css';
import Header from './components/templates/header/Header'
import Menu from './components/templates/menu/Menu'
import Content from './components/templates/content/Content'
import Footer from './components/templates/footer/Footer'
import Auth from './components/auth/Auth';

function App(props) {
  const hasValidToken = validateToken()
  const hasMenu = !props.menuToggle && hasValidToken
  const menu = hasMenu ? <Menu /> : null
  const content = hasValidToken ? <Content /> : null
  const auth = !hasValidToken ? <Auth /> : null

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

function validateToken() {
  const userData = localStorage.getItem('knowledge_user')

  return !!userData
}

const mapStateToProps = state => {
  return { ...state.menuToggle, user: { ...state.user } }
}

export default withRouter(connect(mapStateToProps)(App));
