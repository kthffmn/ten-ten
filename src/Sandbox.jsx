import React from 'react';
import Column from './Column';

export default ({ grid, rotate }) => (
  <div className="board noselect no-gutter">
    {grid.map((col, x) => (
       <Column
         key={x}
         x={x}
         squares={col}
         placeShape={rotate}
       />
     ))}
  </div>
)
