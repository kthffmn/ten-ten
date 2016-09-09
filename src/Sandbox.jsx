import React from 'react';
import _ from 'lodash';

var Column = require('./Column.jsx');

module.exports = React.createClass({
  render: function(){
    var columns = _.times(this.props.colCount, function(index) {
      return (
        <Column
          xPosition={index}
          rowCount={this.props.rowCount}
          key={index}
          grid={this.props.grid}
        />
      );
    }.bind(this));

    return (
      <div className="board noselect no-gutter">
        { columns }
      </div>
    );
  }
});
