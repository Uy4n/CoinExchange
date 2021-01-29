import React from 'react';
import styled from 'styled-components';
import Header from './components/Header/Header.jsx';
import CoinList from './components/CoinList/CoinList';
import AccountBalance from './components/AccountBalance/AccountBalance'

const AppDiv = styled.div`
    text-align: center;
    background-color: darkblue;
    color: #cccccc
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 10000,
      coinData: [
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
      ],
      showBalance: true
    }
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleToggleBalance = this.handleToggleBalance.bind(this);
  }
  handleRefresh(valueChangeTicker) {
    const newCoinData = this.state.coinData.map( function( {ticker, name, balance, price} ) {
      let newPrice = price;
      if ( valueChangeTicker === ticker ) {
        const randomPercentage = 0.995 + Math.random() * 0.01;
        newPrice = newPrice * randomPercentage
      };
      return {
        // ticker = ticker, name = name
        ticker,
        name,
        balance: balance,
        price: newPrice
      }
    });
    
    this.setState({ coinData: newCoinData })
  }

  handleToggleBalance() {
    this.setState({ showBalance: !this.state.showBalance });
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
