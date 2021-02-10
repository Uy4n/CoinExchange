import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.section`
    font-size: 2rem;
    text-align: left;
    padding: 1.5rem 0 1.5rem 5rem;
    color: greenyellow;
`;

export default function AccountBalance(props) {

    const buttonText = props.showBalance ?
    'Hide Balance' :
    'Show Balance';

    const toggleBalance = props.showBalance ?
    <><strong> Balance: </strong> ${props.amount}</> :
    null;

    const carePackageText = 'Claim Care Package';

    return (
        <Section>
            {toggleBalance}
            <button onClick={props.handleToggleBalance}>{buttonText} </button>
            <button onClick={props.handleCarePackage}>{carePackageText} </button>
        </Section>
    );

}


AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired
}