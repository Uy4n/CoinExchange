import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableData = styled.td`
    border: 1px solid #cccccc;
    width: 14vw;
`;

const TdControls = styled(TableData)`
    width: 34vw;
`;

const TdName = styled(TableData)`
    width: 24vw;
`;

const Button = styled.button`
    font-size: 11px;
    width: 64px;
    margin: 3px 5px 0;
`;

export default function Coin(props) {
    
    const handleRefresh = (event) => {
        // We want to prevent the default action of
        // re-submitting the form upon clicking 'refresh'
        event.preventDefault();
        props.handleRefresh(props.id);
    }

    const handleBuy = (event) => {
        // We want to prevent the default action of
        // re-submitting the form upon clicking 'refresh'
        event.preventDefault();
        props.handleTransaction(true, props.tickerId);
    }

    const handleSell = (event) => {
        // We want to prevent the default action of
        // re-submitting the form upon clicking 'refresh'
        event.preventDefault();
        props.handleTransaction(false, props.tickerId);
    }

        const toggleBalance = props.showBalance ?
        <TableData>{props.balance}</TableData> :
        '-';

    return (
        <tr>
            <TdName>{props.name}</TdName>
            <TableData>{props.ticker}</TableData>
            <TableData>{props.showBalance ? props.balance : '-'}</TableData>
            <TableData>${props.price}</TableData>
            <TableData>${props.marketCap}</TableData>
            <TdControls>
                <form action="#" method="POST">
                    <Button className="btn btn-info"
                        onClick={handleRefresh}>
                        Refresh
                    </Button>
                    <Button className="btn btn-warning"
                        onClick={handleBuy}>
                        Buy
                    </Button>
                    <Button className="btn btn-danger"
                        onClick={handleSell}>
                        Sell
                    </Button>
                </form>
            </TdControls>
        </tr>
    );
}

Coin.propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
}