import React from 'react';
import './App.css';
import _ from 'lodash';
import R from 'ramda';

const boardColCount = 10;
const boardRowCount = 10;
const sandboxColCount = 6;
const sandboxRowCount = 3;

const Board = require('./Board.jsx');
const Scoreboard = require('./Scoreboard.jsx');
const Sandbox = require('./Sandbox.jsx');

const SHAPES = {
  'caterpillar': ['0,0', '1,0', '2,0','3,0', '4,0', '5,0', '6,0'],
  'square': ['2,1', '1,2', '2,2'],
  'l-shape': ['0,0', '1,0', '2,0', '2,1'],
  'v-shape': ['0,0', '1,0', '1,1']
}

const COLORS = ['teal', 'green', 'pink', 'purple', 'blue', 'red', 'yellow', 'orange']

function random(arr) {
  const randomIndex = _.random(0, (arr.length - 1));
  return arr[randomIndex];
}

function emptyGrid(columnCount, rowCount) {
  const board = {}
  _.times(columnCount, (x) => {
    _.times(rowCount, (y) => {
      board[x + ',' + y] = 'grey'
    });
  });
  return board;
}

function gridWithRandomShape() {
  const color = random(COLORS)
  const cordColors = {}
  SHAPES[random(Object.keys(SHAPES))].forEach(function (v) {
    cordColors[v] = color
  })
  var grid = emptyGrid(sandboxRowCount, sandboxColCount)
  grid = {...grid, cordColors}
}

class App extends React.Component {

  onToggleSquare(x, y) {
    const position = x + ',' + y
    const board = {...this.state.board}
    board[position] = board[position] === 'grey' ? 'blue' : 'grey'
    // for porting over to nested arrays:
    // newCol = R.update(row, newColor, board[col])
    // newBoard = R.update(col, newCol, board)
    this.setState({ board })
  }

  constructor(props) {
    super(props);
    this.state = {
      board: emptyGrid(boardColCount, boardRowCount),
      sandbox: gridWithRandomShape(sandboxColCount, sandboxRowCount)
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <Scoreboard score={0}/>
          <Sandbox
            colCount={sandboxColCount}
            rowCount={sandboxRowCount}
            grid={this.state.sandbox}
          />
        </div>
        <Board
          colCount={boardColCount}
          rowCount={boardRowCount}
          onToggleSquare={this.onToggleSquare.bind(this)}
          grid={this.state.board}
        />
      </div>
    );
  }
}

export default App;
