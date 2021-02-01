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

const COIN_COUNT = 10;

class App extends React.Component {
  state = {
    balance: 10000,
    showBalance: true,
    coinData: [
      /*
        {
          name: 'Bitcoin',
          ticker: 'BTC',
          balance: 1,
          price: 9999.99
        },
        {
          name: 'Ethereum',
          ticker: 'ETH',
          balance: 2,
          price: 299.99
        },
        {
          name: 'Tether',
          ticker: 'USDT',
          balance: 0.5,
          price: 1
        },
        {
          name: 'Ripple',
          ticker: 'XRP',
          balance: 1000,
          price: 0.2
        },
        {
          name: 'Bitcoin Cash',
          ticker: 'BCH',
          balance: 0,
          price: 298.99
        }
        */
    ],
  }
  handleRefresh = (valueChangeTicker) => {
    const newCoinData = this.state.coinData.map( function( values ) {
      let newValues = {...values};
      if ( valueChangeTicker === values.ticker ) {
        const randomPercentage = 0.995 + Math.random() * 0.01;
        newValues.price *= randomPercentage
      };
      return newValues;
    });
    
    this.setState({ coinData: newCoinData })
  }

  handleToggleBalance = () => {
    this.setState({ showBalance: !this.state.showBalance });
  }

  componentDidMount = async () => {
    let response = await axios.get('https://api.coinpaprika.com/v1/coins')
    let coinData = response.data.slice(0, COIN_COUNT).map(function(coin) {
      return {
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: 0,
      }
    });
    // retrieve the prices
    this.setState({ coinData });
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
