import React, { Component } from "react";
import "./App.css";
import mic from "./mic.gif";
import micAnimate from "./mic-animate.gif";
import micSlash from "./mic-slash.gif";

class ReactScribe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      final_transcript: "",
      interim_transcript: "",
      recognizing: false,
      ignore_onend: false,
      all_lines_spoken: []
    };
    this.start_timestamp = "";
    this.startButton = this.startButton.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onError = this.onError.bind(this);
    this.onResult = this.onResult.bind(this);
  }

  componentDidMount() {
    var langs = [
      ["Hindi", ["hi-IN"]],
      ["Afrikaans", ["af-ZA"]],
      ["Bahasa Indonesia", ["id-ID"]],
      ["Bahasa Melayu", ["ms-MY"]],
      ["Català", ["ca-ES"]],
      ["Čeština", ["cs-CZ"]],
      ["Deutsch", ["de-DE"]],
      [
        "English",
        ["en-AU", "Australia"],
        ["en-CA", "Canada"],
        ["en-IN", "India"],
        ["en-NZ", "New Zealand"],
        ["en-ZA", "South Africa"],
        ["en-GB", "United Kingdom"],
        ["en-US", "United States"]
      ],
      [
        "Español",
        ["es-AR", "Argentina"],
        ["es-BO", "Bolivia"],
        ["es-CL", "Chile"],
        ["es-CO", "Colombia"],
        ["es-CR", "Costa Rica"],
        ["es-EC", "Ecuador"],
        ["es-SV", "El Salvador"],
        ["es-ES", "España"],
        ["es-US", "Estados Unidos"],
        ["es-GT", "Guatemala"],
        ["es-HN", "Honduras"],
        ["es-MX", "México"],
        ["es-NI", "Nicaragua"],
        ["es-PA", "Panamá"],
        ["es-PY", "Paraguay"],
        ["es-PE", "Perú"],
        ["es-PR", "Puerto Rico"],
        ["es-DO", "República Dominicana"],
        ["es-UY", "Uruguay"],
        ["es-VE", "Venezuela"]
      ],
      ["Euskara", ["eu-ES"]],
      ["Français", ["fr-FR"]],
      ["Galego", ["gl-ES"]],
      ["Hrvatski", ["hr_HR"]],
      ["IsiZulu", ["zu-ZA"]],
      ["Íslenska", ["is-IS"]],
      ["Italiano", ["it-IT", "Italia"], ["it-CH", "Svizzera"]],
      ["Magyar", ["hu-HU"]],
      ["Nederlands", ["nl-NL"]],
      ["Norsk bokmål", ["nb-NO"]],
      ["Polski", ["pl-PL"]],
      ["Português", ["pt-BR", "Brasil"], ["pt-PT", "Portugal"]],
      ["Română", ["ro-RO"]],
      ["Slovenčina", ["sk-SK"]],
      ["Suomi", ["fi-FI"]],
      ["Svenska", ["sv-SE"]],
      ["Türkçe", ["tr-TR"]],
      ["български", ["bg-BG"]],
      ["Pусский", ["ru-RU"]],
      ["Српски", ["sr-RS"]],
      ["한국어", ["ko-KR"]],
      [
        "中文",
        ["cmn-Hans-CN", "普通话 (中国大陆)"],
        ["cmn-Hans-HK", "普通话 (香港)"],
        ["cmn-Hant-TW", "中文 (台灣)"],
        ["yue-Hant-HK", "粵語 (香港)"]
      ],
      ["日本語", ["ja-JP"]],
      ["Lingua latīna", ["la"]]
    ];

    this.showInfo("info_start");

    var start_button = document.getElementById("start_button");

    if (!("webkitSpeechRecognition" in window)) {
      this.upgrade(start_button);
    } else {
      start_button.style.display = "inline-block";

      this.recognition = new window.webkitSpeechRecognition();

      this.recognition.continuous = true;

      this.recognition.interimResults = true;

      this.recognition.onstart = this.onStart;

      this.recognition.onerror = this.onError;

      this.recognition.onend = this.onEnd;

      this.recognition.onresult = this.onResult;
    }
  }

  onStart(event) {
    this.setState(Object.assign(this.state, { recognizing: true }));
    this.showInfo("info_speak_now");
    var start_img = document.getElementById("start_img");
    start_img.src = micAnimate;
  }

  onError(event) {
    var start_img = document.getElementById("start_img");

    if (event.error == "no-speech") {
      start_img.src = mic;
      this.showInfo("info_no_speech");
      this.setState(Object.assign(this.state, { ignore_onend: true }));
    }
    if (event.error == "audio-capture") {
      start_img.src = mic;
      this.showInfo("info_no_microphone");
      this.setState(Object.assign(this.state, { ignore_onend: true }));
    }
    if (event.error == "not-allowed") {
      if (event.timeStamp - this.start_timestamp < 100) {
        this.showInfo("info_blocked");
      } else {
        this.showInfo("info_denied");
      }
      this.setState(Object.assign(this.state, { ignore_onend: true }));
    }
  }

  onEnd(event) {
    var start_img = document.getElementById("start_img");

    this.state.recognizing = false;
    if (this.state.ignore_onend) {
      return;
    }
    start_img.src = mic;
    if (!this.state.final_transcript) {
      this.showInfo("info_start");
      return;
    }

    this.showInfo("");

    if (window.getSelection) {
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById("final_span"));
      window.getSelection().addRange(range);
    }
  }

  onResult(event) {
    var interim_transcript_temp = "";
    var final_transcript_temp = "";

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript_temp += event.results[i][0].transcript;
      } else {
        interim_transcript_temp += event.results[i][0].transcript;
      }
    }
    final_transcript_temp = this.capitalize(final_transcript_temp);
    final_transcript_temp = this.linebreak(final_transcript_temp);
    interim_transcript_temp = this.linebreak(interim_transcript_temp);
    this.setState(
      Object.assign(this.state, {
        all_lines_spoken: this.state.all_lines_spoken.concat([
          final_transcript_temp
        ]),
        final_transcript: final_transcript_temp,
        interim_transcript: interim_transcript_temp
      })
    );
  }

  startButton(event) {
    if (this.state.recognizing) {
      this.recognition.stop();
      return;
    }
    Object.assign(this.state, { final_transcript: "", interim_transcript: "" });
    var select_dialect = document.getElementById("select_dialect");
    var start_img = document.getElementById("start_img");
    this.recognition.lang = "en-US";
    this.recognition.start();
    Object.assign(this.state, { ignore_onend: false });
    start_img.src = micSlash;
    this.showInfo("info_allow");
    this.start_timestamp = event.timeStamp;
  }

  linebreak(s) {
    var two_line = /\n\n/g;
    var one_line = /\n/g;
    return s.replace(two_line, "<p></p>").replace(one_line, "<br>");
  }

  capitalize(s) {
    var first_char = /\S/;
    return s.replace(first_char, function(m) {
      return m.toUpperCase();
    });
  }

  upgrade(start_button) {
    start_button.style.visibility = "hidden";
    this.showInfo("info_upgrade");
  }

  showInfo(s) {
    var info = document.getElementById("info");
    if (s) {
      for (var child = info.firstChild; child; child = child.nextSibling) {
        if (child.style) {
          child.style.display = child.id == s ? "inline" : "none";
        }
      }
      info.style.visibility = "visible";
    } else {
      info.style.visibility = "hidden";
    }
  }

  render() {
    return (
      <div className="App" id="MyApp">
      <button onClick={() => {console.log(this.props); this.props.loadmessage(this.state.final_transcript)}}>Send audio</button>
        <h3 className="center" id="headline">
          <a href="http://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html">
            Webby
          </a>{" "}
        </h3>
        <div id="info">
          <p id="info_start">
            Click on the microphone icon and begin speaking.
          </p>
          <p id="info_speak_now">Speak now.</p>
          <p id="info_no_speech">
            No speech was detected. You may need to adjust your
            <a href="//support.google.com/chrome/bin/answer.py?hl=en&answer=1407892">
              microphone settings
            </a>.
          </p>
          <p id="info_no_microphone" style={{ display: "none" }}>
            No microphone was found. Ensure that a microphone is installed and
            that
            <a href="//support.google.com/chrome/bin/answer.py?hl=en&answer=1407892">
              microphone settings
            </a>{" "}
            are configured correctly.
          </p>
          <p id="info_allow">
            Click the "Allow" button above to enable your microphone.
          </p>
          <p id="info_denied">Permission to use microphone was denied.</p>
          <p id="info_blocked">
            Permission to use microphone is blocked. To change, go to
            chrome://settings/contentExceptions#media-stream
          </p>
          <p id="info_upgrade">
            Web Speech API is not supported by this browser. Upgrade to{" "}
            <a href="//www.google.com/chrome">Chrome</a>
            version 25 or later.
          </p>
        </div>
        <div className="right">
          <button id="start_button" onClick={this.startButton}>
            <img id="start_img" src={mic} alt="Start" />
          </button>
        </div>
        <div id="results">
          <span id="final_span" className="final">
            {this.state.final_transcript}
          </span>
          <span id="interim_span" className="interim">
            {this.state.interim_transcript}
          </span>
          <p />
          <p>{this.state.all_lines_spoken}</p>
        </div>
        <dialog id="notesPod" open={false}>
          This could be a note pod. :)
        </dialog>
      </div>
    );
  }
}

export default ReactScribe;
