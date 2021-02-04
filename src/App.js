import React from 'react';
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

class App extends React.Component {
  state = {
    balance: 10000,
    showBalance: true,
    coinData: [],
  }

  handleRefresh = async (tickerKey) => {
    const promise = await axios.get(`https://api.coinpaprika.com/v1/tickers/${tickerKey}`);
    const newCoinData = this.state.coinData.map( ( values  ) => {
        let newValues = {...values};
        if ( tickerKey === newValues.key ) {
          newValues.price = parseFloat(
            Number(promise.data.quotes.USD.price).toFixed(4)
          );
        };
        return newValues;
      }
    );
    this.setState({ coinData: newCoinData })
  }

/*   handleRefresh = async (tickerKey) => {
    const promise = await axios.get(`https://api.coinpaprika.com/v1/tickers/${tickerKey}`);
    const newCoinData = this.state.coinData.map( function( 
      { key, name, ticker, balance, price } )  {
        let newPrice = price;
        if ( tickerKey === key ) {
          newPrice = parseFloat(
            Number(promise.data.quotes.USD.price).toFixed(4)
          );
        };
        return {
          key,
          name,
          ticker,
          balance,
          price:  newPrice,
        };
      }
    );
    this.setState({ coinData: newCoinData })
  } */

  handleToggleBalance = () => {
    this.setState({ showBalance: !this.state.showBalance });
  }

  getCoinId = async () => {
    const response = await axios.get('https://api.coinpaprika.com/v1/coins');
    return response.data.slice(0, COIN_COUNT).map(coin => coin.id);
  }

  getCoinUrl = async (coinIdList) => {
    const coinUrl = 'https://api.coinpaprika.com/v1/tickers/';
    const coinPromises = coinIdList.map(key => axios.get(coinUrl + key));
    return await Promise.all(coinPromises);
  }

  getCoinData = (coinData) => {
    return coinData.map(function(response) {
      const coin = response.data;
      return {
        key:      coin.id,
        name:     coin.name,
        ticker:   coin.symbol,
        balance:  0,
        price:    parseFloat(Number(coin.quotes.USD.price).toFixed(4)),
      };
    });
  }

  loadCoinData = async () => {
    const coinIdList = await this.getCoinId();
    const coinData = await this.getCoinUrl(coinIdList);
    const coinPriceData = this.getCoinData(coinData);
    this.setState({ coinData: coinPriceData });
  }

  componentDidMount = async () => {
    this.loadCoinData();
  }

  render() {
    return (
      <AppDiv>
        <Header />
        <AccountBalance amount={this.state.balance} handleToggleBalance={this.handleToggleBalance} showBalance={this.state.showBalance} />
        <CoinList coinData={this.state.coinData} handleRefresh={this.handleRefresh} showBalance={this.state.showBalance} />
      </AppDiv>
    );
  }
  
}

export default App;
