import React from 'react';
import './App.css';
import _ from 'lodash';

const boardColCount = 10;
const boardRowCount = 10;
const sandboxColCount = 6;
const sandboxRowCount = 3;

const Board = require('./Board.jsx');
const Scoreboard = require('./Scoreboard.jsx');
const Sandbox = require('./Sandbox.jsx');

class App extends React.Component {
  onToggleSquare(x, y) {
    const position = x + ',' + y
    const board = {...this.state.board}
    board[position] = board[position] === 'grey' ? 'blue' : 'grey'
    this.setState({ board })
  }

  constructor(props) {
    super(props);
    const board = {}
    _.times(boardRowCount, (y) => {
      return _.times(boardColCount, (x) => {
        board[x + ',' + y] = 'grey'
      });
    });
    this.state = { board }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <Scoreboard score={0}/>
          <Sandbox
            colCount={sandboxColCount}
            rowCount={sandboxRowCount}
            board={this.state.board}
          />
        </div>
        <Board
          colCount={boardColCount}
          rowCount={boardRowCount}
          onToggleSquare={this.onToggleSquare.bind(this)}
          board={this.state.board}
        />
      </div>
    );
  }
}

export default App;
