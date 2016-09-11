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


const random = arr => arr[_.random(arr.length - 1)];

const emptyGrid = (colCount, rowCount) => (
  _.times(colCount, () => (
    _.times(rowCount, () => 'grey')
  ))
)

const sandboxGrid = (shape, color) => (
  emptyGrid(sandboxColCount, sandboxRowCount).map((col, x) => (
    x in shape ? col.map((empty, y) => (
      shape[x][y] ? color : empty
    )) : col
  ))
)


class App extends Component {

  onToggleSquare(x, y) {
    this.setState({ board: this.state.board.map((col, x_) => (
      x_ === x ? col.map((color, y_) => (
        y_ === y ? (color === 'grey' ? 'blue' : 'grey') : color
      )) : col
    ))})
  }

  constructor(props) {
    super(props);
    this.state = {
      board: emptyGrid(boardColCount, boardRowCount),
      sandbox: sandboxGrid(SHAPES.vShape, random(COLORS))
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <Scoreboard score={0}/>
          <Sandbox
            grid={this.state.sandbox}
          />
        </div>
        <Board
          onToggleSquare={this.onToggleSquare.bind(this)}
          grid={this.state.board}
        />
      </div>
    );
  }
}

export default App;
