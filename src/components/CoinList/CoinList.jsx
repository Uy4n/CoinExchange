import React from 'react'
import Coin from '../Coin/Coin';
import styled from 'styled-components';

const CoinTable = styled.table`
    margin: 50px auto 50px auto;
    display: inline-block;
    font-size: 1.4rem;
`;

export default function CoinList(props) {
      const toggleBalance = props.showBalance ?
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
              props.coinData.map( ({key, ...values}) =>
                <Coin id={key}
                      key={key}
                      handleRefresh={props.handleRefresh}
                      {...values}
                      showBalance={props.showBalance}
                />
              )
            }
          </tbody>
        </CoinTable>
      )
}
