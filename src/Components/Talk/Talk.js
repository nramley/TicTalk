import React, { Component } from 'react';
import ReactScribe from "./ReactScribe";
// import {printResponse} from "./api/dialogflow";
import https from 'https';
// import spellChecker from "./api/azure"
import './Talk.css';
import Results from "./results";
import axios from 'axios';

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
    this.setState({showstate: true});
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
  }

  spellChecker(query, callback){
    let host = 'api.cognitive.microsoft.com';
    let path = '/bing/v7.0/spellcheck';    

    let mkt = "en-US";
    let mode = "proof";
    let text = query;
    let query_string = "?mkt=" + mkt + "&mode=" + mode;
    
    let request_params = {
        method : 'POST',
        hostname : host,
        path : path + query_string,
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Content-Length' : text.length + 5,
            'Ocp-Apim-Subscription-Key' : 'a9771b586c5b4c879da8723a21dcafc6',
    //        'X-Search-Location' : CLIENT_LOCATION,
    //        'X-MSEdge-ClientID' : CLIENT_ID,
    //        'X-MSEdge-ClientIP' : CLIENT_ID,
        }
    };
    
    let response_handler = function (response) {
        let body = '';
        response.on ('data', function (d) {
            body += d;
        });
        response.on ('end', function () {
            // console.log (body);
            callback(body);
        });
        response.on ('error', function (e) {
            console.log ('Error: ' + e.message);
        });
    };
    
    let req = https.request (request_params, response_handler);
    req.write ("text=" + text);
    req.end ();
  }

  render() {
    return (
      <div className="talk-container">

        <ReactScribe loadmessage={this.loadmessage}/>
        <div className="chatbox">
          {this.loadchat()}
        </div>
        {this.state.showstat == true ? <Results closestats={this.closestats.bind(this)}/> : null}
        <button className="reply-buttons">Finish</button>
        </div>
    )
  }
}

export default Talk;
