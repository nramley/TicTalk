import React, { Component } from 'react';
import NavBar from './Components/Navigation/NavBar';
import logo from './Images/logo.png';


class App extends Component {
  render() {

    return (


      <div className="app-container">
        <NavBar logo={logo}/>
      </div>



    );
  }
}

export default App;
