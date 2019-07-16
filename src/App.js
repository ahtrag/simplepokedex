import React from 'react'
import Card from './components/cards'
import Navbar from './components/navbar'
// import logo from './logo.svg';
// import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Card />
      </div>
    )
  }
}

export default App