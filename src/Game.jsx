import React from 'react';

var Board = require('./Board.jsx');
var Scoreboard = require('./Scoreboard.jsx');
var Sandbox = require('./Sandbox.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-md-6">
          <Scoreboard score={0}/>
          <Sandbox colCount={this.props.sandboxColCount} rowCount={this.props.sandboxRowCount}/>
        </div>
        <Board colCount={this.props.boardColCount} rowCount={this.props.boardRowCount}/>
      </div>
    );
  }
});
