import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.section`
    font-size: 2rem;
    text-align: left;
    padding: 1.5rem 0 1.5rem 5rem;
    color: greenyellow;
`;

export default class AccountBalance extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }
//there's a problem with toggling the state
  state = {
    showBalance: true
  };

  handleClick(event) {
    event.preventDefault();
    this.props.handleToggleBalance();
  }

    render() {
        // if balance is shown, present a button to 'hide balance'.
        // otherwise, present a button to 'show balance'
        const buttonText = this.props.showBalance ? 'Hide Balance' : 'Show Balance';
        const toggleBalance = this.props.showBalance ?
        <><strong> Balance: </strong> ${this.props.amount}</>
        : null;
        return (
            <Section>
                {toggleBalance}
                <button onClick={this.handleClick}>{buttonText} </button>
            </Section>
        );
    }
}


AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired
}