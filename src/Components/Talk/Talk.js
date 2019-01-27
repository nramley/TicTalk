import React, { Component } from 'react';
import ReactScribe from "./ReactScribe";
//import { printResponse } from "./api/dialogflow";
// import spellChecker from "./api/azure"
import './Talk.css';

const conversation = [
  {person: "self", text: "Hi, my name is Lynx"},
  {person: "friend", text: "Hi, I am TicTalk, nice to meet you Lynx"},
  {person: "self", text: "Nice to meet you too TicTalk!"},
  {person: "friend", text: "What did you do today."},
  {person: "self", text: "I eat a apple."},
  {person: "friend", text: "That's nice!"},
  {person: "self", text: "Bye Tiktalk."},
  {person: "friend", text: "Talk to you next"},
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

class Talk extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      // { person: "self", text: "Test"} { person: "friend", text: "Test"}
      history: [],//conversation,
      record: false

      // const app = apiai("7d84fd1d0c27411daec92fde07c8417b");
    };
    this.botImage = "https://pngimage.net/wp-content/uploads/2018/05/bot-icon-png.png";
    this.userImage = "http://profilepicturesdp.com/wp-content/uploads/2018/06/cartoon-profile-picture-png-2.png";
    this.loadchat = this.loadchat.bind(this);
    this.loadmessage = this.loadmessage.bind(this);
    //this.loadbotmessage = this.loadbotmessage.bind(this);
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

  // loadbotmessage(){

  //   console.log("GEKKKKKKhi jafhfiasudhfaisufailsueoiacu");
  //   var latestmessage = this.state.history[this.state.history.length-1];
  //   // spellChecker(latestmessage, (res) => {
  //   //   console.log(res);
  //   // })

  //   console.log(latestmessage);
  //   var request = getRequest(latestmessage);

  //   printResponse(request, (res) => {
  //     console.log(res);
  //     this.setState((prevState) => {
  //       history: prevState.history.push({person: "bot", text: res});
  //     });
  //     this.forceUpdate();
  //   });

  //   endRequest(request);
  // }

  loadmessage(message){
    this.setState((prevState) => {
      // console.log(conversation);
      // var message = conversation.shift().text;
      // console.log(message);
      history: prevState.history.push({person: "self", text: conversation.shift().text});
      // history: prevState.history.push({person: "self", text: message});
    }, () => {
      console.log("triggered")
      setTimeout(() => {
        this.setState((prevState) => {
          // console.log(conversation);
          // var message = conversation.shift().text;
          // console.log(message);
          history: prevState.history.push({person:"friend", text: conversation.shift().text});
        }, ()=>{
          this.forceUpdate();
        })
      }, 2000);

      // console.log("GEKKKKKKhi jafhfiasudhfaisufailsueoiacu");
      // var latestmessage = this.state.history[this.state.history.length-1].text;
      // var request = getRequest(latestmessage);

      // printResponse(request, (res) => {
      //   console.log(res);
      //   this.setState((prevState) => {
      //     history: prevState.history.push({person: "bot", text: res});
      //   });
      //   this.forceUpdate();
      // });

      // endRequest(request);
    });
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <div className="chatbox">
          {this.loadchat()}
        </div>
        <ReactScribe loadmessage={this.loadmessage}/>
        </div>
    )
  }
}

export default Talk;
