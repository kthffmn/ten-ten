import React from 'react';

module.exports = React.createClass({
  render: function(){
    return (
      <div>Score: {this.props.score}</div>
    );
  }
});
