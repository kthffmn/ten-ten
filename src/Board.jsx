import React from 'react';
import Column from './Column';

export default ({ grid, hover, placeShape }) => (
  <div className="board col-md-6 noselect no-gutter">
    {grid.map((col, x) => (
       <Column
         key={x}
         x={x}
         squares={col}
         hover={hover}
         placeShape={placeShape}
       />
     ))}
  </div>
)
