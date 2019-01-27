import React, { Component } from 'react';
import './NavBar.css';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Talk from '../Talk/Talk.js';



class NavBar extends Component {

render() {

  return (
  <Router>
        <div className="outer-container">

        <nav className="nav-bar">

        <img src={this.props.logo} />

        <ul className="menu-list">
          <li className="menu-list-item">
           <NavLink to="/Talk" className="menu-link" exact activeStyle={
              {
              color: '#ffcc14',
               }
            }>Talk</NavLink>
          </li>
          </ul>
        </nav>

        <div className="route-container">

        <Route path="/Talk" exact strict render={
          () => {
            return ( <Talk/>);
          }
        }/>

        </div>
        </div>
      </Router>
);
}

}

export default NavBar;
