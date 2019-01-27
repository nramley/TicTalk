import React, { Component } from 'react';
import './NavBar.css';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Talk from '../Talk/Talk.js';
import Home from '../Home/Home.js';


class NavBar extends Component {

render() {

  return (
  <Router>
        <div className="outer-container">

        <nav className="nav-bar">

        <img className="logo" src={this.props.logo} />

        <ul className="menu-list">
          <li className="menu-list-item">
           Profile
            <ul className="dropdown">
                <li>
                    <NavLink to="/FizzExecs" className="dropdown-item" activeClassName="dropdown-item">
                    Executives
                    </NavLink>
                </li>
              </ul>
          </li>
          </ul>
        </nav>

        <div className="route-container">

        <Route path="/Talk" exact strict render={
          () => {
            return ( <Talk/>);
          }
        }/>

        <Route path="/" exact strict render={
          () => {
            return ( <Home/>);
          }
        }/>

        </div>
        </div>
      </Router>
);
}
}

export default NavBar;
