import React from 'react';
import _ from 'lodash';

var Square = require('./Square.jsx');

module.exports = React.createClass({
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
