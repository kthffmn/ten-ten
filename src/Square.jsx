import React from 'react';

export default ({ x, y, color, placeShape }) => (
  <div
    className={`square droppable ui-droppable ${color}`}
    onClick={() => placeShape(x, y)}
  >
  </div>
)
