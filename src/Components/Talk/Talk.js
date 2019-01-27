import React, { Component } from 'react';
import ReactScribe from "./ReactScribe";
//import { printResponse } from "./api/dialogflow";
// import spellChecker from "./api/azure"
import './Talk.css';
import https from 'https';
import Results from "./results";
import axios from 'axios';

const conversation = [
  {person: "self", text: "Hello."},
  {person: "friend", text: "Hi, I am TicTalk, nice to meet you."},
  {person: "self", text: "Nice to meet you too TicTalk!"},
  {person: "friend", text: "What did you do today."},
  {person: "self", text: "I eat a apple."},
  {person: "friend", text: "That's nice!"},
  {person: "self", text: "Bye Tiktalk."},
  {person: "friend", text: "Talk to you next time."},
];



const Apiai = require('apiai');

const app =  new Apiai("7d84fd1d0c27411daec92fde07c8417b");

// returns a request object
function getRequest(requestText) {
    console.log("HELLLOOOOOOreq")
    return app.textRequest(
        requestText,
        {sessionId: '123456'}
    )
}

// returns a response text
function printResponse(request, callback) {
    request.on('response', (response) => {
        // console.log(response.result.fulfillment.speech);
        callback(response.result.fulfillment.speech);
    });

    request.on('error', (error) => {
        callback(error);
        // console.log(error);
    });
}

function endRequest(request) {
    request.end();
}
// import {printResponse} from "./api/dialogflow";

class Talk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // { person: "self", text: "Test"} { person: "friend", text: "Test"}
      history: [
        // {person: "self", text: "Hi, my name is Lynx"},
        // {person: "friend", text: "Hi, I am Bot, nice to meet you lynx"},
        // {person: "self", text: "Nice to meet you too Bot!"}
      ],
      record: false,
      showstat: false,

      // const app = apiai("7d84fd1d0c27411daec92fde07c8417b");
    };
    this.botImage = "https://pngimage.net/wp-content/uploads/2018/05/bot-icon-png.png";
    this.userImage = "http://profilepicturesdp.com/wp-content/uploads/2018/06/cartoon-profile-picture-png-2.png";
    this.loadchat = this.loadchat.bind(this);
    this.loadmessage = this.loadmessage.bind(this);
    this.closestats = this.closestats.bind(this);
    this.openstats = this.openstats.bind(this);
    this.totalchars = 0;
    //this.loadbotmessage = this.loadbotmessage.bind(this);
  }

  closestats(){
    console.log("close stats");
    this.setState({showstat: false}, ()=>{
      console.log(this.state)
    });
  }

  openstats(){
    this.setState({showstat: true}, ()=>{
      console.log(this.state);
    });
  }

  componentDidMount(){

  }

  loadchat(){
    return this.state.history.map((e)=>
        <div className={`chat ${e.person}`}>
        <div className="user-photo"><img alt="profile" src={e.person === "self" ? this.userImage : this.botImage}/></div>
        <p className="chat-message">{e.text}</p>
      </div>
    )
  }


  loadmessage(message){
    this.setState((prevState) => {
      // console.log(conversation);
      // var message = conversation.shift().text;
      // console.log(message);
      history: prevState.history.push({person: "self", text: conversation.shift().text});
      // history: prevState.history.push({person: "self", text: message});
    }, () => {
      console.log("triggered")
      this.forceUpdate();
      setTimeout(() => {
        this.setState((prevState) => {
          // console.log(conversation);
          // var message = conversation.shift().text;
          // console.log(message);
          history: prevState.history.push({person:"friend", text: conversation.shift().text});
        }, () => {
          this.forceUpdate();
          console.log(this.state.history);
          var latestmessage = this.state.history[this.state.history.length-1].text + ".";
          axios.get(`https://api.textgears.com/check.php?text=${latestmessage.split(' ').join('+')}&key=YL6X0nTxp4uEwa6h`)
              .then((res) => {
                console.log(res);
                var resultjson = JSON.parse(res);
                var wrongchars = resultjson.errors[0].length;
                var correctchars = totallength - wrongchars;
                var totallength = latestmessage.length;

                this.totalchars += totallength;
                this.correctchars += correctchars;
              })
              .catch(function (error) {
                  if (error.response) {
                  }
              });
        })
      }, 2000);
    })};


  render() {
    return (
      <div className="talk-container">

        <ReactScribe loadmessage={this.loadmessage}/>
        <div><button id="stop_convo" className="completion" onClick={() => {this.openstats()}}><h2>Stop Conversation</h2></button></div>

        <div className="chatbox">
          {this.loadchat()}
        </div>
        {this.state.showstat == true ? <Results closestats={this.closestats.bind(this)}/> : null}
        </div>
    )
  }
}

export default Talk;
