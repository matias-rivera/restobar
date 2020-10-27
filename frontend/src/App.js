import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Content from './components/Content';


function App() {
  return (
    <div>
      <Header />
      <Menu />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
