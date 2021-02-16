import React, {useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CoinApiData from '../components/CoinApiData/CoinApiData';
import HistoryChart from '../components/HistoryChart/HistoryChart';
import axios from 'axios';

const CoinDetailPage = () => {
    //fetching data for detailpage
    const { id } = useParams();
    const [coinData, setCoinData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const timestamp = Math.floor(Date.now() / 1000);
    const dayUnix = 86400;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const [day, week, year, detail] = await Promise.all([
                axios.get(`https://api.coinpaprika.com/v1/coins/${id}/ohlcv/historical`, {
                    params: {
                        start: timestamp-dayUnix,
                        end: timestamp,
                        limit: 1,
                        quote: "usd",
                    },
                }),
                axios.get(`https://api.coinpaprika.com/v1/coins/${id}/ohlcv/historical`, {
                    params: {
                        start: timestamp-dayUnix * 7,
                        end: timestamp,
                        limit: 7,
                        quote: "usd",
                    },
                }),
                axios.get(`https://api.coinpaprika.com/v1/coins/${id}/ohlcv/historical`, {
                    params: {
                        start: timestamp-dayUnix * 365,
                        end: timestamp,
                        limit: 365,
                        quote: "usd",
                    },
                }),
                axios.get(`https://api.coinpaprika.com/v1/tickers/${id}`, {
                    params: {
                        quote: "usd",
                    },
                }),
            ]);

            setCoinData({
                day: day.data.prices,
                week: week.data.prices,
                year: year.data.prices,
                detail: detail.data.quotes.usd,
            });
            setIsLoading(false);
            console.log(week);
            console.log(detail);
        };

        fetchData();
    },[]);

    const renderData = () => {
        if (isLoading) {
            return <div>Loading...</div>
        }
        return (
            <div className="coinlist">
                <HistoryChart/>
                <CoinApiData/>
            </div>
        );
    };

    return renderData();
}

export default CoinDetailPage;