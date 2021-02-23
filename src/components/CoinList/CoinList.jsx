import React from 'react'
import Coin from '../Coin/Coin';
import styled from 'styled-components';

const CoinTable = styled.table`
    font-size: 1rem;
`;

// const renderCoins = () => {
//   if(isLoading) {
//     return <div>Loading...</div>
//   }

//   return {
//     <ul className="coinlist list-group mt-2">
//       {coins.map(coin => {
//         <Coin key={coin.key} coin={coin} />
//       })}
//   }
// }

export default function CoinList(props) {

      return (
          <CoinTable className="table table-primary table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Ticker</th>
              <th>Balance</th>
              <th>Price</th>
              <th>Market Cap</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              props.coinData.map( ({key, ...values}) =>
                <Coin id={key}
                      key={key}
                      tickerId={key}
                      handleRefresh={props.handleRefresh}
                      handleTransaction={props.handleTransaction}
                      {...values}
                      showBalance={props.showBalance}
                />
              )
            }
          </tbody>
        </CoinTable>
      )
}
