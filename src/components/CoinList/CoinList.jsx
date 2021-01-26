import React, { Component } from 'react'
import Coin from '../Coin/Coin';

export default class CoinList extends Component {
    render() {
        return (
            <table className="coin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Ticker</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {
                /* Abbreviating the following code:
                    ({name, ticker, price}) =>
                    <Coin key-{value.ticker} name={name} ticker={ticker} price={price} />
                */
                this.props.coinData.map( value =>
                   <Coin key={value.ticker} {...value} />
                )
              }
            </tbody>
          </table>
        )
    }
}
