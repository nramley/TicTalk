import React, { Component } from 'react';
import './Talk.css';
import ReactScribe from "./ReactScribe";

class Talk extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      // { person: "self", text: "Test"} { person: "friend", text: "Test"}
      history: [
        {person: "self", text: "Hi, my name is Lynx"},
        {person: "friend", text: "Hi, I am Bot, nice to meet you lynx"},
        {person: "self", text: "Nice to meet you too Bot!"}
      ],
      record: false
    };
    this.botImage = "https://pngimage.net/wp-content/uploads/2018/05/bot-icon-png.png";
    this.userImage = "http://profilepicturesdp.com/wp-content/uploads/2018/06/cartoon-profile-picture-png-2.png";
    this.loadchat = this.loadchat.bind(this);
    this.loadmessage = this.loadmessage.bind(this);
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
      history: prevState.history.push({person: "self", text: message});
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
