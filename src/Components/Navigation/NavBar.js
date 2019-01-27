import React, { Component } from 'react';
import './NavBar.css';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Talk from '../Talk/Talk.js';
import Stats from '../Stats/Stats.js';
import Home from '../Home/Home.js';
import Graphs from '../Graphs/Graphs.js';

class NavBar extends Component {
  render() {
    return (
    <Router>
          <div className="outer-container">
          <nav className="nav-bar">
          <NavLink to="/"><img className="logo" src={this.props.logo} /></NavLink>
          <ul className="menu-list">
            
            <li className="menu-list-item">
              Profile
              <ul className="dropdown">
                  <li>
                    <NavLink to="/Stats" className="dropdown-item" activeClassName="dropdown-item">
                    My Stats
                    </NavLink>
                  </li>
                </ul>
            </li>
            </ul>
          </nav>
          <div className="route-container">
          <Route path="/Talk" exact strict render={
            () => {
              return ( <Talk/> );
            }
          }/>
          </div>
          <div className="route-container">
          <Route path="/" exact strict render={
            () => {
              return ( <Home/>);
            }
          }/>
          <Route path="/Stats" exact strict render={
            () => {
              return ( <Stats/>);
            }
          }/>
           <Route path="/Graphs/:name/:v1/:v2/:v3/:v4/:v5/:v6/:v7/:v8/:v9/:v10/:v11/:v12"
           component={Graphs} name="graphs" exact strict render={
            () => {
              return ( <Graphs/>);
            }
          }/>

          </div>
          </div>
        </Router>
    );
  }
}

export default NavBar;
