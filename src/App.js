import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';

import Board from './Board';
import Scoreboard from './Scoreboard';
import Sandbox from './Sandbox';


const boardColCount = 10;
const boardRowCount = 10;
const sandboxColCount = 6;
const sandboxRowCount = 3;

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

const emptyGrid = (colCount, rowCount) => (
  _.times(colCount, () => (
    _.times(rowCount, () => 'grey')
  ))
)

const gridWithShape = (grid, left, top, shape, color) => (
  grid.map((col, x) => (
    shape[x - left] ? col.map((square, y) => (
      shape[x - left][y - top] ? color : square
    )) : col
  ))
)

function gridWithoutLines (grid) {
  const xs = grid.reduce((xs, col, x) => (
    col.every(square => square !== 'grey') ? [...xs, x] : xs
  ), [])

  const rowCount = grid[0].length
  const ys = _.range(rowCount).reduce((ys, y) => (
    grid.every(col => col[y] !== 'grey') ? [...ys, y] : ys
  ), [])

  return xs.length || ys.length ? grid.map((col, x) => (
    xs.includes(x) ? col.map(() => 'grey') : ys.length ? col.map((square, y) => (
      ys.includes(y) ? 'grey' : square
    )) : col
  )) : grid
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: emptyGrid(boardColCount, boardRowCount),
      shape: _.sample(SHAPES),
      color: _.sample(COLORS)
    }
  }

  hover(x, y) {
    this.setState({
      mouse: { x, y }
    })
  }

  placeShape(x, y) {
    this.setState({
      board: gridWithoutLines(gridWithShape(this.state.board, x, y,
                                            this.state.shape, this.state.color)),
      shape: _.sample(SHAPES),
      color: _.sample(COLORS)
    })
  }

  render() {
    const { board, shape, color, mouse } = this.state
    const sandboxGrid = gridWithShape(emptyGrid(sandboxColCount, sandboxRowCount),
                                      0, 0, shape, color)
    const boardGrid = mouse ? gridWithShape(board, mouse.x, mouse.y, shape, color) : board
    return (
      <div className="row">
        <div className="col-md-6">
          <Scoreboard score={0}/>
          <Sandbox
            grid={sandboxGrid}
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
