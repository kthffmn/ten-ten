import React from 'react';
import _ from 'lodash';

var Square = require('./Square.jsx');

module.exports = React.createClass({
  render: function() {
    var squares = _.times(this.props.rowCount, function(index){
      const position = this.props.xPosition + ',' + index
      return (
        <Square
          xPosition={this.props.xPosition}
          yPosition={index}
          key={index}
          onToggleSquare={this.props.onToggleSquare}
          color={this.props.board[position]}
        />
      )
    }.bind(this));

    return (
      <div
        className="column col-md-1 col-sm-1 col-xs-1"
        key={this.props.xPosition}
        >
        { squares }
      </div>
    );
  }
});
