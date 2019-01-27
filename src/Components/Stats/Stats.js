import React, { Component } from 'react';
import './Stats.css';
import Paper from '@material-ui/core/Paper';
import StackGrid, { transitions } from "react-stack-grid";
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import Graphs from '../Graphs/Graphs.js';


// Const used in the grid system
const { scaleDown } = transitions;


class Stats extends Component {


  render() {




  return (
    <div className="stats-container">

    <h1 className="stats-header">My Scores</h1>


    <div className="date">
    <h2 className="date-header">January 27, 2019</h2>
        <StackGrid
              appear={scaleDown.appear}
              appeared={scaleDown.appeared}
              enter={scaleDown.enter}
              leaved={scaleDown.leaved}
              columnWidth={300}>

        <Paper className="card">
        <h3 className="card-header">Pronunciation</h3>
        <div className="card-description">
        <p className="green">87%</p>

        <NavLink to={`graphs/${"Pronunciation"}/${87}/${74}/${77}/${67}/${66}/${60}/${62}/${61}/${60}/${55}/${54}/${50}`} 
          style={{ textDecoration: 'none' }}>
        <span className="spanViewRec"><div className="btnViewRec">View</div></span>
        </NavLink>
        </div>
        </Paper>

        <Paper className="card">

        <h3 className="card-header">Grammar</h3>
        <div className="card-description">
        <p className="orange">78%</p>

        <NavLink to={`graphs/${"Grammar"}/${78}/${82}/${68}/${60}/${58}/${56}/${52}/${49}/${44}/${50}/${57}/${50}`} 
          style={{ textDecoration: 'none' }}>
        <span className="spanViewRec"><div className="btnViewRec">View</div></span>
        </NavLink>
        </div>

        </Paper>

        <Paper className="card">

        <h3 className="card-header">Hesitation</h3>
        <div className="card-description">
        <p className="orange">80%</p>

        <NavLink to={`graphs/${"Hesitation"}/${80}/${88}/${84}/${79}/${78}/${74}/${75}/${73}/${76}/${70}/${66}/${68}`} 
         style={{ textDecoration: 'none' }}>
        <span className="spanViewRec"><div className="btnViewRec">View</div></span>
        </NavLink>
        </div>

        </Paper>

        <Paper className="card">

        <h3 className="card-header">Vocabulary</h3>
        <div className="card-description">
        <p className="yellow">70%</p>

        <NavLink to={`graphs/${"Vocabulary"}/${70}/${90}/${77}/${84}/${85}/${89}/${92}/${83}/${80}/${77}/${84}/${82}`} 
          style={{ textDecoration: 'none' }}>
        <span className="spanViewRec"><div className="btnViewRec">View</div></span>
        </NavLink>
        </div>

        </Paper>

        </StackGrid>
        </div>

    <div className="date">
    <h2 className="date-header">January 26, 2019</h2>
        <StackGrid
              appear={scaleDown.appear}
              appeared={scaleDown.appeared}
              enter={scaleDown.enter}
              leaved={scaleDown.leaved}
              columnWidth={300}>

        <Paper className="card">
        <h3 className="card-header">Pronunciation</h3>
        <div className="card-description">
        <p className="yellow">74%</p>

        <NavLink to={`graphs/${"Pronunciation"}/${87}/${74}/${77}/${67}/${66}/${60}/${62}/${61}/${60}/${55}/${54}/${50}`} 
          style={{ textDecoration: 'none' }}>
        <span className="spanViewRec"><div className="btnViewRec">View</div></span>
        </NavLink>
        </div>
        </Paper>

        <Paper className="card">

        <h3 className="card-header">Grammar</h3>
        <div className="card-description">
        <p className="orange">82%</p>

        <NavLink to={`graphs/${"Grammar"}/${78}/${82}/${68}/${60}/${58}/${56}/${52}/${49}/${44}/${50}/${57}/${50}`} 
          style={{ textDecoration: 'none' }}>
        <span className="spanViewRec"><div className="btnViewRec">View</div></span>
        </NavLink>
        </div>

        </Paper>

        <Paper className="card">

        <h3 className="card-header">Hesitation</h3>
        <div className="card-description">
        <p className="green">88%</p>

        <NavLink to={`graphs/${"Hesitation"}/${80}/${88}/${84}/${79}/${78}/${74}/${75}/${73}/${76}/${70}/${66}/${68}`} 
          style={{ textDecoration: 'none' }}>
        <span className="spanViewRec"><div className="btnViewRec">View</div></span>
        </NavLink>
        </div>
        </Paper>

        <Paper className="card">

        <h3 className="card-header">Vocabulary</h3>
        <div className="card-description">
        <p className="green">90%</p>

        <NavLink to={`graphs/${"Vocabulary"}/${70}/${90}/${77}/${84}/${85}/${89}/${92}/${83}/${80}/${77}/${84}/${82}`} 
          style={{ textDecoration: 'none' }}>
        <span className="spanViewRec"><div className="btnViewRec">View</div></span>
        </NavLink>
        </div>

        </Paper>

        </StackGrid>
        </div>



    </div>


    );
  }
}

export default Stats;
