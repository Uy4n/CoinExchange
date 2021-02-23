import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Header from './components/Header/Header.jsx';
import CoinList from './components/CoinList/CoinList';
import AccountBalance from './components/AccountBalance/AccountBalance'
import Dashboard from "./views/Dashboard/Dashboard.js";
import axios from 'axios';

import CoinDetailPage from "./pages/CoinDetailPage"
import CoinSummaryPage from "./pages/CoinSummaryPage"
import {BrowserRouter, Route} from "react-router-dom"

import 'bootswatch/dist/flatly/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all';

const AppDiv = styled.div`
    text-align: center;
    background-color: darkblue;
    color: #cccccc
`;

const COIN_COUNT = 5;
const formatPrice = price => parseFloat(Number(price).toFixed(4));
const formatMarketCap = marketCap => Number(marketCap).toLocaleString();

function App(props) {
  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(false);
  const [coinData, setCoinData] = useState([]);

  const componentDidMount = async () => {
    const response = await axios.get('https://api.coinpaprika.com/v1/coins');
    const coinIdList = response.data.slice(0, COIN_COUNT).map(coin => coin.id);
    const coinUrl = 'https://api.coinpaprika.com/v1/tickers/';
    const coinPromises = coinIdList.map(key => axios.get(coinUrl + key));
    const coinData = await Promise.all(coinPromises);
    const coinPriceData = coinData.map(function(response) {
      const coin = response.data;
      return {
        key:        coin.id,
        name:       coin.name,
        ticker:     coin.symbol,
        balance:    0,
        price:      formatPrice(coin.quotes.USD.price),
        marketCap:  formatMarketCap(coin.quotes.USD.market_cap),
      };
    });
    setCoinData(coinPriceData);
  }

  useEffect(function() {
    if (coinData.length === 0 ) {
      componentDidMount();
    }
  });

  const handleRefresh = async (tickerKey) => {
    const promise = await axios.get(`https://api.coinpaprika.com/v1/tickers/${tickerKey}`);
    const newCoinData = coinData.map( ( values  ) => {
        let newValues = {...values};
        if ( tickerKey === newValues.key ) {
          newValues.price = formatPrice(promise.data.quotes.USD.price);
          newValues.marketCap = formatMarketCap(promise.data.quotes.USD.market_cap);
        };
        return newValues;
      }
    );
    setCoinData(newCoinData);
  }

  const handleToggleBalance = () => {
    setShowBalance(oldValue => !oldValue);
  }

  const handleTransaction = (isBuy, valueChangeId) => {
    var balanceChange = isBuy ? 1 : -1;
    const newCoinData = coinData.map( function (values) {
      let newValues = {...values};
      if ( valueChangeId == values.key) {
        newValues.balance += balanceChange;
        setBalance( oldBalance => oldBalance - balanceChange * newValues.price );
      }
      return newValues;
    });
    setCoinData(newCoinData);
  }

  const handleCarePackage = () => {
    setBalance(value => value + 1200);
  }

  return (
    <AppDiv>
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={CoinSummaryPage}/>
        <Route path="/coins/:id" component={CoinDetailPage}/>
        <AccountBalance
          amount={balance}
          handleToggleBalance={handleToggleBalance}
          showBalance={showBalance}
          handleCarePackage={handleCarePackage}
        />
        <CoinList
          coinData={coinData}
          handleRefresh={handleRefresh}
          handleTransaction={handleTransaction}
          showBalance={showBalance}
        />
        <Dashboard />
      </BrowserRouter>
    </AppDiv>
  );
  
}

export default App;
