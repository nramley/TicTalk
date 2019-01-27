
import  ReactMicRecord  from 'react-mic-record';
import React, { Component } from 'react';

import Recorder from 'recorder-js';
import fs  from 'fs';
export class Mic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false
    }
    this.onStop = this.onStop.bind(this);
  }

  startRecording = () => {
      console.log("button is clicked");
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

  downloadBlob(blob, filename) {
    console.log("saving blob...");
    const url = window.URL.createObjectURL(blob);
    const click = document.createEvent('Event');
    click.initEvent('click', true, true);

    const link = document.createElement('A');
    link.href = url;
    link.download = filename;
    link.dispatchEvent(click);
    link.click();
    return link;
  }

  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', recordedBlob.blobURL, true);
    xhr.responseType = 'blob';
    xhr.onload = (e)  => {
        if (xhr.status == 200) {
            console.log("Entered here");
            var myBlob = this.response;
            console.log(myBlob);
            this.downloadBlob(myBlob, "output.wav");
        }
    };
    xhr.send();
  }

  render() {
    return (
      <div>
        <ReactMicRecord
          record={this.state.record}
          className="sound-wave"
          onData={this.onData}
          onStop={this.onStop}
          strokeColor="#000000"
          backgroundColor="#FF4081" />
        <button onClick={this.startRecording} type="button">Start</button>
        <button onClick={this.stopRecording} type="button">Stop</button>
      </div>
    );
  }
}
