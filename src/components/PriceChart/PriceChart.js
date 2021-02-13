import React, { PureComponent } from 'react'
import Chart from "chart.js";
import classes from "./PriceChart.module.css";
let PriceGraph;

// Chart Style Options
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = false;
Chart.defaults.global.elements.line.tension = 0;

// Chart Style Options go above our class ^
export default class PriceChart extends PureComponent {
    chartRef = React.createRef();
    
    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");
        const { data, average, labels } = this.props;

        if (typeof PriceGraph !== "undefined") PriceGraph.destroy();
        
        PriceGraph = new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: labels,
                datasets: [
                    {
                        label: "Sales",
                        data: data,
                        fill: false,
                        borderColor: "#98B9AB"
                    },
                    {
                        label: "National Average",
                        data: average,
                        fill: false,
                        borderColor: "#E0E0E0"
                    },
                ]
            },
            options: {
                //Customize chart options
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 5,
                        left: 15,
                        right: 15,
                        bottom: 15
                    }
                },
                  ///Other configurable options
                tooltips: {
                    backgroundColor: "rgba(0,0,0,0.8)",
                    bodyAlign: "left",
                    bodyFontColor: "#fff",
                    bodySpacing: 2,
                    borderColor: "rgba(0,0,0,0)",
                    borderWidth: 0,
                    callbacks: {
                        //beforeTitle: ƒ, title: ƒ, afterTitle: ƒ, beforeBody: ƒ, beforeLabel: ƒ, …
                        label: (tooltipItem, data) => {
                            return `$ ${tooltipItem.value}`
                        }
                    },
                    caretPadding: 2,
                    caretSize: 5,
                    cornerRadius: 6,
                    custom: null,
                    displayColors: true,
                    enabled: true,
                    footerAlign: "left",
                    footerFontColor: "#fff",
                    footerFontStyle: "bold",
                    footerMarginTop: 6,
                    footerSpacing: 2,
                    intersect: true,
                    mode: "nearest",
                    multiKeyBackground: "#fff",
                    position: "average",
                    titleAlign: "left",
                    titleFontColor: "#fff",
                    titleFontStyle: "bold",
                    titleMarginBottom: 6,
                    titleSpacing: 2,
                    xPadding: 6,
                    yPadding: 6,
                }
            }
        });
    }

    render() {
        return (
            <div className={classes.graphContainer}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}