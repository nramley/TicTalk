import React, { Component } from 'react';
import './Home.css';
import globe from '../../Images/planet.png';


class Home extends Component {

  state = {

  show_check: false,
}

clickLanguage() {
  this.setState({
  show_check: true,
  });
 }

 constructor() {
   super();
   this.state={
       foo: 'bar'
   }
}

 render() {
 return (
   <div className="big">


     <img id="circle" src={globe}/>

     <div className="center-top">
       <h1> Select a Language </h1>
     </div>

     <div className="left">
       <h2 onClick={(e) =>
                {this.clickLanguage()}} className="language"> English </h2>
       <h2><br/></h2>
       <h2 className="language"> French Français </h2>
       <h2><br/></h2>
       <h2 className="language"> Chinese 中文 </h2>
       <h2><br/></h2>
       <h2 className="language"> Korean 한국어</h2>
       <h2><br/></h2>
       <h2 className="language"> Japanese 日本語 </h2>
     </div>

     <div className="right">
         <h2 className="language"> Russian русский </h2>
         <h2><br/></h2>
         <h2 className="language"> Spanish Español </h2>
         <h2><br/></h2>
         <h2 className="language"> Portuguese português </h2>
         <h2><br/></h2>
         <h2 className="language"> Italian italiano </h2>
         <h2><br/></h2>
         <h2 className="language"> Arabic العَرَبِيَّة </h2>
     </div>

     <span className="spanTalk center-bot"><div className="btnTalk">Begin talking</div></span>



   </div>
   );
 }
}

export default Home;
