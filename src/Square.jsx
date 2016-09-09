import React from 'react';

module.exports = React.createClass({
  render: function(){
    return (
      <div
        className={"square droppable ui-droppable " + this.props.color}
        onClick={() => this.props.onToggleSquare(this.props.xPosition, this.props.yPosition)}
        >
      </div>
    );
  }
});
