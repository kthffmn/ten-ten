import React, { Component } from 'react';
import './App.css';

var boardColCount = 10,
    boardRowCount = 10,
    sandboxColCount = 6,
    sandboxRowCount = 3;

var Game = require('./Game.jsx');

class App extends Component {
  render() {
    return (
      <Game
        boardColCount={boardColCount}
        boardRowCount={boardRowCount}
        sandboxColCount={sandboxColCount}
        sandboxRowCount={sandboxRowCount}
      />
    );
  }
}

export default App;
