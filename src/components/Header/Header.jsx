import React, { Component } from 'react'
import logo from '../../logo.svg';
import styled from 'styled-components';

export default class Header extends Component {
    render() {
        return (
            <header className="App-header">
            <img src={logo} alt="React logo" className="App-logo"/>
            <h1 className="App-title">
              Coin Exchange
            </h1>
          </header>
        )
    }
}