import React, { Component } from 'react';
import './Talk.css';
import { ReactMic } from 'react-mic';


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
  }

  componentDidMount(){
  }

  startRecording = () => {
    this.setState({
      record: true
    });
  }
 
  stopRecording = () => {
    this.setState({
      record: false
    });
  }
 
  onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }
 
  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
  }

  loadchat(){
    return this.state.history.map((e)=>
        <div className={`chat ${e.person}`}>
        <div className="user-photo"><img alt="profile" src={e.person === "self" ? this.userImage : this.botImage}/></div>
        <p className="chat-message">{e.text}</p>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="chatbox">
          {this.loadchat()}
        </div>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#000000"
          backgroundColor="#FF4081" />
        <button onTouchTap={this.startRecording} type="button">Start</button>
        <button onTouchTap={this.stopRecording} type="button">Stop</button>
      </div>

    )
  }
}

export default Talk;
