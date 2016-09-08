import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';

var boardColCount = 10,
    boardRowCount = 10,
    sandboxColCount = 6,
    sandboxRowCount = 4;

class App extends Component {
  render() {
    return (
      <Game />
    );
  }
}

var Game = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-md-6">
          <Scoreboard score={0}/>
          <Sandbox/>
        </div>
        <Board/>
      </div>
    );
  }
});

var Board = React.createClass({
  render: function() {
    var columns = _.times(boardColCount, function(index) {
      return (<Column xPosition={index} rowCount={boardRowCount} key={index}/>);
    }, this);

    return (
      <div className="board col-md-6 noselect no-gutter">
        { columns }
      </div>
    );
  }
});

var Column = React.createClass({
  render: function() {
    var squares = _.times(this.props.rowCount, function(index){
      return (<Square xPosition={this.props.xPosition} yPosition={index} key={index} />)
    }.bind(this), this);

    return (
      <div className="column col-md-1 col-sm-1 col-xs-1" key={this.props.xPosition}>
        { squares }
      </div>
    );
  }
});

var Square = React.createClass({
  render: function(){
    return (
      <div className="square droppable ui-droppable" data-x-axis={this.props.xPosition} data-y-axis={this.props.yPosition} key={this.props.index}></div>
    );
  }
});

var Scoreboard = React.createClass({
  render: function(){
    return (
      <div>Score: {this.props.score}</div>
    );
  }
});

var Sandbox = React.createClass({
  render: function(){
    var columns = _.times(sandboxColCount, function(index) {
      return (<Column xPosition={index} rowCount={sandboxRowCount} key={index}/>);
    }, this);

    return (
      <div className="board noselect no-gutter">
        { columns }
      </div>
    );
  }
});

export default App;
