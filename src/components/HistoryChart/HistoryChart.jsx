import React, { useRef, useEffect, useState } from 'react';
import Chart from "chart.js"
import { historyOptions } from './HistoryOptions';

const HistoryChart = ({data}) => {
    const chartRef = useRef();
    const {day, week, year, detail} = data;
    const [timeFormat, setTimeFormat] = useState("24h");

    const determineTimeFormat = () => {
        switch (timeFormat) {
            case "24h":
                return day;
            case "7d":
                return week;
            case "1y":
                return year;
            default:
                return day;
        }
    };

    useEffect(() => {
        if (chartRef && chartRef.current && detail) {
            const chartInstance = new Chart(chartRef.current, {
                type: "line",
                data: {
                    datasets: [{
                        label: `${detail.name} price`,
                        data: determineTimeFormat(),
                        backgroundColor: "rgba(54, 162, 235, 0.5)",
                        borderColor: "rgba(255, 159, 64, 1)",
                        pointRadius: 0,
                    }]
                },
                options: {
                    ...historyOptions
                },
            });
        }
    });

    const renderPrice = () => {
        if (detail) {
            return (
                <>
                    <p className="my-0">${data.detail.quotes.USD.price.toFixed(2)}</p>
                    <p className={
                        data.detail.quotes.USD.percent_change_24h < 0 ?
                        "text-danger my-0" :
                        "text-success my-0"
                    }>{data.detail.quotes.USD.percent_change_24h}%</p>
                </>
            )
        }
    }

    return (
        <div className="bg-white border mt-2 rounded p-3">
            <div>{renderPrice()}</div>
            <div>
                <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
            </div>

            <div className="chart-button mt-1">
                <button onClick={() => setTimeFormat("24h")}
                        className="button.btn.btn-outline-secondary.btn-sm">24h</button>
                <button onClick={() => setTimeFormat("7d")}
                        className="button.btn.btn-outline-secondary.btn-sm mx-1">7d</button>
                <button onClick={() => setTimeFormat("1y")}
                        className="button.btn.btn-outline-secondary.btn-sm">1y</button>
            </div>
        </div>

    )
}

export default HistoryChart;