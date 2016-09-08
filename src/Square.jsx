import React from 'react';

module.exports = React.createClass({
  render: function(){
    return (
      <div
        className="square droppable ui-droppable"
        data-x-axis={this.props.xPosition}
        data-y-axis={this.props.yPosition}
        key={this.props.index}>
      </div>
    );
  }
});
