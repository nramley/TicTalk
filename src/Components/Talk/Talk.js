import React, { Component } from 'react';
import ReactScribe from "./ReactScribe";
// import printResponse from "./api/dialogflow";
// import spellChecker from "./api/azure"
import './Talk.css';


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
  //   var latestmessage = this.state.history[this.state.history.length-1];
  //   // spellChecker(latestmessage, (res) => {
  //   //   console.log(res);
  //   // })
  //
  //   printResponse(latestmessage, (res) => {
  //     console.log(res);
  //     this.setState((prevState) => {
  //       history: prevState.history.push({person: "bot", text: res});
  //     });
  //     this.forceUpdate();
  //   });
  // }

  loadmessage(message){
    this.setState((prevState) => {
      history: prevState.history.push({person: "self", text: message});
    });
    this.forceUpdate();
  }

  render() {
    return (
      <div className="talk-container">

        <ReactScribe loadmessage={this.loadmessage}/>
        <div className="chatbox">
          {this.loadchat()}
        </div>
        </div>
    )
  }
}

export default Talk;
