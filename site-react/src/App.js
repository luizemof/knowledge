import React from 'react';
import { connect } from 'react-redux'
import './App.css';
import Header from './components/templates/header/Header'
import Menu from './components/templates/menu/Menu'
import Content from './components/templates/content/Content'
import Footer from './components/templates/footer/Footer'

function App(props) {
  const menu = props.menuToggle ? null : <Menu />
  return (
    <div className={`App${props.menuToggle ? " hide-menu" : ""}`}>
      <Header />
      {menu}
      <Content />
      <Footer />
    </div>
  );
}

const mapStateToProps = state => {
  return { ...state.menuToggle }
}

export default connect(mapStateToProps)(App);
