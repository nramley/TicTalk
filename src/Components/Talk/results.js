import React, { Component } from 'react';
import ReactScribe from "./ReactScribe";
// import {printResponse} from "./api/dialogflow";
import https from 'https';
// import spellChecker from "./api/azure"
import './results.css';
import axios from 'axios';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      // const app = apiai("7d84fd1d0c27411daec92fde07c8417b");
    };
  }

  componentDidMount(){

  }

  render() {
    return (
        <div className="results">>
             <input id="trigger" type="button" value="Click Here To pop up window"/>
    <div id="match-details-curtain">
        <div id="match-details-container">
            <h1 id="statresults">Conversation Results</h1>
            <h3 id="percentresult">Grammar 98% Correct</h3>
            <h3 id="duration">Total Duration 3:15</h3>
            <hr id="bottom-divider" />
            <div id="close-details" onClick={()=>{this.props.closestats()}}></div>
        </div>
    </div>
        </div>
    )
  }
}

export default Results;
