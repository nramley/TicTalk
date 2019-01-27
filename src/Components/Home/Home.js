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
      <img id="circle" src={globe}/>

    <div className="center">
      <h1> Select a Language </h1>
    </div>

    <div className="left">
      <h2><br/></h2>
      <h2><br/></h2>
      <h2> English </h2>
      <h2><br/></h2>
      <h2> French Français </h2>
      <h2><br/></h2>
      <h2> Chinese 中文 </h2>
      <h2><br/></h2>
      <h2> Korean 한국어</h2>
      <h2><br/></h2>
      <h2> Japanese 日本語 </h2>
    </div>

    <div className="right">
        <h2> Russian русский </h2>
        <h2><br/></h2>
        <h2> Spanish Español </h2>
        <h2><br/></h2>
        <h2> Portuguese português </h2>
        <h2><br/></h2>
        <h2> Italian italiano </h2>
        <h2><br/></h2>
        <h2> Arabic العَرَبِيَّة </h2>
    </div>

    </div>
    );
  }
}

export default Home;
