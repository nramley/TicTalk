import React, { Component } from 'react';
import './Graphs.css';
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)



class Graphs extends Component {

  render() {
    const{v1} = this.props.match.params
    const{v2} = this.props.match.params
    const{v3} = this.props.match.params
    const{v4} = this.props.match.params
    const{v5} = this.props.match.params
    const{v6} = this.props.match.params
    const{v7} = this.props.match.params
    const{v8} = this.props.match.params
    const{v9} = this.props.match.params
    const{v10} = this.props.match.params
    const{v11} = this.props.match.params
    const{v12} = this.props.match.params
    const{name} = this.props.match.params

  return (
    <div className="graphs-container">
      <div className="chart">
      
      <h1 className="title"> {name} </h1>
      <LineChart data={{"2019-01-27": v1, "2019-01-26": v2, "2019-01-25": v3,
                        "2019-01-24": v4, "2019-01-23": v5, "2019-01-22": v6,
                        "2019-01-21": v7, "2019-01-20": v8, "2019-01-19": v9,
                        "2019-01-18": v10, "2019-01-17": v11, "2019-01-16": v12}} />
      </div>
    </div>

    );
  }
}

export default Graphs;
