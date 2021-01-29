import React, { Component } from 'react'
import Coin from '../Coin/Coin';
import styled from 'styled-components';

const CoinTable = styled.table`
    margin: 50px auto 50px auto;
    display: inline-block;
    font-size: 1.4rem;
`;

export default class CoinList extends Component {
    render() {
      const toggleBalance = this.props.showBalance ?
      <th>Balance</th>
      : null;

        return (
            <CoinTable>
            <thead>
              <tr>
                <th>Name</th>
                <th>Ticker</th>
                {toggleBalance}
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                /* Abbreviating the following code:
                    ({name, ticker, price, balance}) =>
                    <Coin key-{value.ticker} name={name} ticker={ticker} price={price}
                    balance={balance} />
                */
                this.props.coinData.map( value =>
                   <Coin key={value.ticker}
                       handleRefresh={this.props.handleRefresh}
                       {...value}
                       showBalance={this.props.showBalance} />
                )
              }
            </tbody>
          </CoinTable>
        )
    }
}
