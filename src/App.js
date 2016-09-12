import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';

import Board from './Board';
import Scoreboard from './Scoreboard';
import Sandbox from './Sandbox';


const boardColCount = 10;
const boardRowCount = 10;
const sandboxColCount = 6;
const sandboxRowCount = 6;

const SHAPES = _.mapValues({
  caterpillar: ['xxxxxx'],
  square: ['xx',
           'xx'],
  lShape: ['xxx',
           '  x'],
  vShape: ['xx',
           ' x']
}, shape => _.unzip(shape.map( str => str.split('').map( x => x !== ' '))))

const COLORS = ['teal', 'green', 'pink', 'purple', 'blue', 'red', 'yellow', 'orange']


const rotated = shape => _.unzip(shape.map(col => [...col].reverse()))

const emptyGrid = (colCount, rowCount) => (
  _.times(colCount, () => (
    _.times(rowCount, () => 'grey')
  ))
)

const emptySandboxGrid = emptyGrid(sandboxColCount, sandboxRowCount)

const gridWithShape = (grid, left, top, shape, color) => (
  grid.map((col, x) => (
    shape[x - left] ? col.map((square, y) => (
      shape[x - left][y - top] ? square === 'grey' ? color : 'invalid' : square
    )) : col
  ))
)

const filledColIndices = grid => (
  grid.reduce((xs, col, x) => (
    col.every(square => square !== 'grey') ? [...xs, x] : xs
  ), [])
)

const filledRowIndices = grid => (
  grid[0].reduce((ys, _, y) => (
    grid.every(col => col[y] !== 'grey') ? [...ys, y] : ys
  ), [])
)

const gridWithoutLines = (grid, xs, ys) => (
  xs.length || ys.length ? grid.map((col, x) => (
    xs.includes(x) ? col.map(() => 'grey') : ys.length ? col.map((square, y) => (
      ys.includes(y) ? 'grey' : square
    )) : col
  )) : grid
)


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      board: emptyGrid(boardColCount, boardRowCount),
      shape: _.sample(SHAPES),
      color: _.sample(COLORS)
    }
  }

  rotate() {
    this.setState({
      shape: rotated(this.state.shape)
    })
  }

  hover(x, y) {
    const { board, shape } = this.state
    this.setState({
      mouse: {
        x: _.clamp(x, board.length - shape.length),
        y: _.clamp(y, board[0].length - shape[0].length)
      }
    })
  }

  placeShape() {
    const { score, board, shape, color, mouse } = this.state
    const hoverBoard = gridWithShape(board, mouse.x, mouse.y, shape, color)

    if (hoverBoard.every(col => col.every(color => color !== 'invalid'))) {
      const xs = filledColIndices(hoverBoard)
      const ys = filledRowIndices(hoverBoard)

      this.setState({
        score: score + xs.length + ys.length,
        board: gridWithoutLines(hoverBoard, xs, ys),
        shape: _.sample(SHAPES),
        color: _.sample(COLORS)
      })
    }
  }

  render() {
    const { score, board, shape, color, mouse } = this.state
    const sandboxGrid = gridWithShape(emptySandboxGrid, 0, 0, shape, color)
    const boardGrid = mouse ? gridWithShape(board, mouse.x, mouse.y, shape, color) : board
    return (
      <div className="row">
        <div className="col-md-6">
          <Scoreboard score={score}/>
          <Sandbox
            grid={sandboxGrid}
            rotate={this.rotate.bind(this)}
          />
        </div>
        <Board
          grid={boardGrid}
          hover={this.hover.bind(this)}
          placeShape={this.placeShape.bind(this)}
        />
      </div>
    );
  }
}

export default App;
