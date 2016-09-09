import React from 'react';

module.exports = React.createClass({
  render: function(){
    return (
      <div
        className="square droppable ui-droppable"
        style={{backgroundColor: this.props.color}}
        key={this.props.index}
        onClick={() => this.props.onToggleSquare(this.props.xPosition, this.props.yPosition)}
        >
      </div>
    );
  }
});
