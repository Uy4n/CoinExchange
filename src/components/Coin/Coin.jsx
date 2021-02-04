import React, { Component } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableData = styled.td`
    border: 1px solid #cccccc;
    width: 25vh;
`;

export default class Coin extends Component {
    
    handleClick = (event) => {
        // We want to prevent the default action of
        // re-submitting the form upon clicking 'refresh'
        event.preventDefault();
        this.props.handleRefresh(this.props.id);

    }

    render() {
        const toggleBalance = this.props.showBalance ?
        <TableData>{this.props.balance}</TableData> :
        null;

        return (
            <tr>
                <TableData>{this.props.name}</TableData>
                <TableData>{this.props.ticker}</TableData>
                {toggleBalance}
                <TableData>${this.props.price}</TableData>
                <TableData>
                    <form action="#" method="POST">
                        <button onClick={this.handleClick}>Refresh</button>
                    </form>
                </TableData>
            </tr>
        );
    }
}

Coin.propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
}