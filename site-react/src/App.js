import React from 'react';
import './App.css';
import Header from './components/templates/header/Header'
import Menu from './components/templates/menu/Menu'
import Content from './components/templates/content/Content'
import Footer from './components/templates/footer/Footer'

function App() {
  return (
    <div className="App">
      <Header />
      <Menu />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
