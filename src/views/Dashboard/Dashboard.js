import React, { Component } from 'react';
import classes from "./Dashboard.module.css";
import PriceChart from "../../components/PriceChart/PriceChart.js";
//import chartIcon from "../../assets/chart-icon.svg";
import { managerData, yearLabels } from "../../mockData";

export default class Dashboard extends Component {
    state = {
        data: managerData,
        labels: yearLabels
    }

    render() {
        const { data, labels } = this.state;
        return (
            <div className={classes.container}>
                <header>
                    <img alt="bar chart icon" />
                    <h1>Sales Dashboard</h1>
                </header>

                <PriceChart
                    data={data}
                    labels={labels} />

            </div>
        )
    }
}