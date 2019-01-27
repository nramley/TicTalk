import React, { Component } from 'react';
import './Home.css';
import globe from '../../Images/planet.png';


class Home extends Component {
  constructor() {
    super();
    this.state={
        foo: 'bar'
    }
 }

  render() {
  return (
    <div className="big">
      <div className="center">
        <h1> Select a Language </h1>
        <div className="circle">
          <img src={globe} height="300"/>
        </div>
        <p> TALK </p>
      </div>

      <div className="left">
        <h2> English </h2>
      </div>
    </div>
    );
  }
}

export default Home;
