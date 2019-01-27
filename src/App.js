import React, { Component } from 'react';
import NavBar from './Components/Navigation/NavBar';
import TicTalk from './Images/TicTalk.png';


class App extends Component {
  render() {

    return (


      <div className="app-container">
        <NavBar logo={TicTalk}/>
      </div>



    );
  }
}

export default App;
