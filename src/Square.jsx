import React from 'react';

export default ({ x, y, color, onToggleSquare }) => (
  <div
    className={`square droppable ui-droppable ${color}`}
    onClick={() => onToggleSquare(x, y)}
  >
  </div>
)
