import React, { Component } from 'react';
import './Talk.css';

class Talk extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      // { person: "self", text: "Test"} { person: "friend", text: "Test"}
      history: [
        {person: "self", text: "Hi, my name is Lynx"},
        {person: "friend", text: "Hi, I am Bot, nice to meet you lynx"},
        {person: "self", text: "Nice to meet you too Bot!"}
      ]
    };
    this.botimage = "https://pngimage.net/wp-content/uploads/2018/05/bot-icon-png.png";
    this.userimage = "http://profilepicturesdp.com/wp-content/uploads/2018/06/cartoon-profile-picture-png-2.png";
    this.loadchat = this.loadchat.bind(this);
  }

  componentDidMount(){
  }

  loadchat(){
    return this.state.history.map((e)=>
        <div class={`chat ${e.person}`}>
        <div class="user-photo"><img src={this.botimage}/></div>
        <p class="chat-message">{e.text}</p>
      </div>
    )
  }

  render() {
  return (
    <div class="chatbox">
      {this.loadchat()}
    </div>
  )
        
    
    
  }
}

export default Talk;
