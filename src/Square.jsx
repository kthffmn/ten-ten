import React from 'react';

export default ({ x, y, color, hover, placeShape }) => (
  <div
    className={`square droppable ui-droppable ${color}`}
    onMouseEnter={() => hover(x, y)}
    onClick={() => placeShape(x, y)}
  >
  </div>
)
