import React, { Component } from 'react';
import Chart from "chart.js";

class LineGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      map: null
    }    
  }

  createLineGraph() {
    let data = this.props.data;
    let label = this.props.label;
    var chartElement = document.getElementById('myChart');
    new Chart(chartElement,
        {
            //Bring in data
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [
                {
                    label: label,
                    data: data,
                    fill: false
                }
            ],
            options: {
                //Customize chart options
            }
        }
    );
  }

  componentDidUpdate() {
    this.createLineGraph();

  }

  componentDidMount() {
    this.createLineGraph();

  }
  
  render() {
    console.log('rendering');
    return (
        <canvas id="myChart" />
      );
  }
  

  
}

export default LineGraph;
