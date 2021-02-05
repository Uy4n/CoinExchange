import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Header from './components/Header/Header.jsx';
import CoinList from './components/CoinList/CoinList';
import AccountBalance from './components/AccountBalance/AccountBalance'
import axios from 'axios'

const AppDiv = styled.div`
    text-align: center;
    background-color: darkblue;
    color: #cccccc
`;

const COIN_COUNT = 5;
const formatPrice = price => parseFloat(Number(price).toFixed(4));

function App(props) {
  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(true);
  const [coinData, setCoinData] = useState([]);

  const componentDidMount = async () => {
    loadCoinData();
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
        };
        return newValues;
      }
    );
    setCoinData(newCoinData);
  }

  const handleToggleBalance = () => {
    setShowBalance(oldValue => !oldValue);
  }

  const getCoinId = async () => {
    const response = await axios.get('https://api.coinpaprika.com/v1/coins');
    return response.data.slice(0, COIN_COUNT).map(coin => coin.id);
  }

  const getCoinUrl = async (coinIdList) => {
    const coinUrl = 'https://api.coinpaprika.com/v1/tickers/';
    const coinPromises = coinIdList.map(key => axios.get(coinUrl + key));
    return await Promise.all(coinPromises);
  }

  const getCoinData = (coinData) => {
    return coinData.map(function(response) {
      const coin = response.data;
      return {
        key:      coin.id,
        name:     coin.name,
        ticker:   coin.symbol,
        balance:  0,
        price:    formatPrice(coin.quotes.USD.price),
      };
    });
  }

  const loadCoinData = async () => {
    const coinIdList = await this.getCoinId();
    const coinData = await this.getCoinUrl(coinIdList);
    const coinPriceData = this.getCoinData(coinData);
    setCoinData(coinPriceData);
  }  

  return (
    <AppDiv>
      <Header />
      <AccountBalance
        amount={balance}
        handleToggleBalance={handleToggleBalance}
        showBalance={showBalance}
      />
      <CoinList
        coinData={coinData}
        handleRefresh={handleRefresh}
        showBalance={showBalance}
      />
    </AppDiv>
  );
  
}

export default App;
