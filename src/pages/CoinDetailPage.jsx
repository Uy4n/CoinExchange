import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CoinApiData from '../components/CoinApiData/CoinApiData';
import HistoryChart from '../components/HistoryChart/HistoryChart';
import axios from 'axios';

const CoinDetailPage = () => {
    const { id } = useParams();
    const [coinData, setCoinData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const timestamp = Math.floor(Date.now() / 1000);
    const dayUnix = 86400;

    const formatData = data => {
        return data.map(element => {
            return {
                /* data[0] = time_open,
                data[1] = time_close,
                data[2] = open,
                data[3] = high,
                data[4] = low,
                data[5] = close,
                data[6] = volume,
                data[7] = market_cap,
                */
                t: element.time_close,
                y: element.close.toFixed(2),
            };
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const [day, week, year, detail, ohlcv] = await Promise.all([
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
                day: formatData(day.data),
                week: formatData(week.data),
                year: formatData(year.data),
                detail: detail.data,
                ohlcv: day.data,
            });
            setIsLoading(false);
        };

        fetchData();
    },[]);

    const renderData = () => {
        if (isLoading) {
            return <div>Loading...</div>
        }
        return (
            <div className="coinlist">
                <HistoryChart data={coinData} />
                <CoinApiData data={coinData}/>
            </div>
        );
    };

    return renderData();
}

export default CoinDetailPage;