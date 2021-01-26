import React, { Component } from 'react'
import logo from '../../logo.svg';
import styled, { keyframes } from 'styled-components';

const AppHeader = styled.div`
    background-color: #282c34;
    min-height: 20vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    font-size: 36px;
    color: white;
`;

const AppTitle = styled.div`
    font-size: 4rem;
`;

const AppLogo = styled.img`
    height: 8rem;
    pointer-events: none;
`;

const rotateLogo = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`;

const RotateLogo = styled.div`
    display: inline-block;
    animation: ${rotateLogo} 3s linear infinite;
`;

export default class Header extends Component {
    render() {
        return (
          <AppHeader>
            <RotateLogo>
              <AppLogo src={logo} alt="React logo"/>
            </RotateLogo>
            <AppTitle>
              <strong> Coin Exchange </strong>
            </AppTitle>
          </AppHeader>
        )
    }
}
