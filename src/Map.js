import React, { Component, Fragment } from 'react';
import Chart from "chart.js";
import { withRouter } from "react-router-dom";

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stats: {
        start: "",
        end: "",
        executionTime: "",
        generatedTime: "",
        source: ""
      }
    }    
  }

  componentWillUnmount() {
    console.log("ComponentWillUnmount()");
  }

  componentDidMount() {
    console.log("ComponentDidMount()");
    this.createGraph();
  }

  componentDidUpdate() {
    this.createGraph();
    console.log("componentDidUpdate()");
  }

  getSnapshotBeforeUpdate() {
    //this.createGraph();
    return true;
  }

  createGraph() {
    //let coordinates = document.location.pathname.replace("/","").split("&");
    let lat = document.location.pathname.replace("/","").split("&")[1];
    let long = document.location.pathname.replace("/","").split("&")[2];
    
    fetch("https://nodejs-295719.ew.r.appspot.com/stats?lat="+lat+"&long="+long)
    .then( response => response.json())
    .then( (response) => {

        //Remove the label from the chart
        Chart.defaults.global.legend.display = false;
        
        var averageTemperatureChartElement = document.getElementById('averageTemperatureChart');
        var maxTemperatureChartElement = document.getElementById('maxTemperatureChart');
        var minTemperatureChartElement = document.getElementById('minTemperatureChart');
        var precipitationChartElement = document.getElementById('precipitationChart');

        /*** Gradient ***/

        var ctxAvT = averageTemperatureChartElement.getContext("2d"); 
        var gradientAvT = ctxAvT.createLinearGradient(0, 0, 0, 150);
        gradientAvT.addColorStop(0, 'rgba(250,174,50,1)');   
        gradientAvT.addColorStop(1, 'rgba(250,174,50,0)');

        var ctxMaxT = maxTemperatureChartElement.getContext("2d"); 
        var gradientMaxT = ctxMaxT.createLinearGradient(0, 0, 0, 150);
        gradientMaxT.addColorStop(0, 'rgba(249,107,46,1)');   
        gradientMaxT.addColorStop(1, 'rgba(250,174,50,0.45)');

        var ctxMinT = minTemperatureChartElement.getContext("2d"); 
        var gradientMinT = ctxMinT.createLinearGradient(0, 0, 0, 300);
        gradientMinT.addColorStop(0, 'rgba(50,178,250,1)');   
        gradientMinT.addColorStop(1, 'rgba(185,46,249,0.1)');

        new Chart(averageTemperatureChartElement, {
            type: "line",
            data: {
                //Bring in data
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [
                    {
                      label: "Average Temperature",
                      fillColor : gradientAvT,
                      strokeColor : "#ff6c23",
                      pointColor : "#fff",
                      pointStrokeColor : "#ff6c23",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "#ff6c23",
                      backgroundColor: gradientAvT,
                      data: [
                          response.data[0].tavg, 
                          response.data[1].tavg, 
                          response.data[2].tavg, 
                          response.data[3].tavg,
                          response.data[4].tavg, 
                          response.data[5].tavg, 
                          response.data[6].tavg, 
                          response.data[7].tavg,
                          response.data[8].tavg, 
                          response.data[9].tavg, 
                          response.data[10].tavg, 
                          response.data[11].tavg
                      ],
                      fill: 'start'
                    }
                ]
            },
            options: {
              scales: {
                yAxes: [
                  {
                    ticks: {
                      display: true //this will remove only the label
                    },
                    gridLines: {
                      drawBorder: false
                    }
                  }
                ],
                xAxes: [
                  {
                    gridLines: {
                      drawBorder: false
                    }
                  }
                ]
              },
              layout: {
                padding: {
                    left: -5,
                }
              } 
            }
        });

        new Chart(maxTemperatureChartElement, {
          type: "line",
          data: {
              //Bring in data
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              datasets: [
                  {
                      label: "Average Max Temperature",
                      fillColor : gradientMaxT,
                      strokeColor : "#ff6c23",
                      pointColor : "#fff",
                      pointStrokeColor : "#ff6c23",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "#ff6c23",
                      backgroundColor: gradientMaxT,
                      borderColor: gradientMaxT,
                      data: [
                          response.data[0].tmax, 
                          response.data[1].tmax, 
                          response.data[2].tmax, 
                          response.data[3].tmax,
                          response.data[4].tmax, 
                          response.data[5].tmax, 
                          response.data[6].tmax, 
                          response.data[7].tmax,
                          response.data[8].tmax, 
                          response.data[9].tmax, 
                          response.data[10].tmax, 
                          response.data[11].tmax
                      ],
                      fill: false
                  }
              ]
          },
          options: {
            layout: {
              padding: {
                  left: -5,
              }
            }
          }
        });

        new Chart(minTemperatureChartElement, {
          type: "line",
          data: {
              //Bring in data
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              datasets: [
                  {
                    label: "Average Min Temperature",
                    fillColor : gradientMinT,
                    strokeColor : "#ff6c23",
                    pointColor : "#fff",
                    pointStrokeColor : "#ff6c23",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "#ff6c23",
                    backgroundColor: gradientMinT,
                    borderColor: gradientMinT,
                      data: [
                          response.data[0].tmin, 
                          response.data[1].tmin, 
                          response.data[2].tmin, 
                          response.data[3].tmin,
                          response.data[4].tmin, 
                          response.data[5].tmin, 
                          response.data[6].tmin, 
                          response.data[7].tmin,
                          response.data[8].tmin, 
                          response.data[9].tmin, 
                          response.data[10].tmin, 
                          response.data[11].tmin
                      ],
                      fill: false
                  }
              ],

          },
          options: {
            layout: {
              padding: {
                  left: -5,
              }
            }
          }
        });

        new Chart(precipitationChartElement, {
          type: "bar",
          data: {
              //Bring in data
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              datasets: [
                  {
                      label: "Average precipitation",
                      borderColor: 'rgba(75, 192, 192, 1)',
                      backgroundColor: 'rgba(75, 192, 192, 0.2)',
                      data: [
                          response.data[0].prcp, 
                          response.data[1].prcp, 
                          response.data[2].prcp, 
                          response.data[3].prcp,
                          response.data[4].prcp, 
                          response.data[5].prcp, 
                          response.data[6].prcp, 
                          response.data[7].prcp,
                          response.data[8].prcp, 
                          response.data[9].prcp, 
                          response.data[10].prcp, 
                          response.data[11].prcp
                      ]
                  }
              ]
          },
          options: {
            layout: {
              padding: {
                  left: -5,
              }
            }
          }
        });

    });
  }
  
  render() {
    console.log("Component is rendering\n");
    let cityName= decodeURIComponent(document.location.pathname.replace("/weather/","").split("&")[0]);
    let lat = document.location.pathname.replace("/","").split("&")[1];
    let long = document.location.pathname.replace("/","").split("&")[2];
    return (
          <Fragment>
            <div className="row align-items-center h-90" key={Date.now()}>
              <div className="col-9 mx-auto card border-0 chart-card">
                <div className="card-body p-2 pb-0">
                  <p className="display-3 align-self-end compensate-left">
                    {cityName}
                  </p>
                  <div className="d-flex justify-content-between">
                    <p className="align-self-end pb-2">{lat}° {long}°</p>
                  </div>
                </div>
                
                <div className="classic-tabs p-2">
                  <div className="tab-content rounded-bottom">
                    <p className="display-5 text-muted align-self-end">Average Temperature</p>
                    <div className="tab-pane fade in show active" id="panel1001" role="tabpanel">
                      <canvas id="averageTemperatureChart"/>
                    </div>
                    <p className="display-5 text-muted align-self-end mt-5">Max Temperature</p>
                    <div className="tab-pane fade in show active" id="panel1002" role="tabpanel">
                      <canvas id="maxTemperatureChart" />
                    </div>
                    <p className="display-5 text-muted align-self-end mt-5">Min Temperature</p>
                    <div className="tab-pane fade in show active" id="panel1003" role="tabpanel">
                      <canvas id="minTemperatureChart" />
                    </div>
                    <p className="display-5 text-muted align-self-end mt-5">Average Precipitations</p>
                    <div className="tab-pane fade in show active" id="panel1004" role="tabpanel">
                      <canvas id="precipitationChart" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
      );
  }
  

  
}

export default withRouter(Map);
