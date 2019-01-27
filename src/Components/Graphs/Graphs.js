import React, { Component } from 'react';
import './Graphs.css';
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)



class Graphs extends Component {


  render() {




  return (
    <div className="graphs-container">
<h1>Graphs route</h1>


    </div>


    );
  }
}

export default Graphs;
