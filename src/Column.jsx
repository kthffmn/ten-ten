import React from 'react';
import Square from './Square';

export default ({ x, squares, hover, placeShape }) => (
  <div className="column col-md-1 col-sm-1 col-xs-1">
    {squares.map((square, y) => (
       <Square
         key={y}
         x={x}
         y={y}
         color={square}
         hover={hover}
         placeShape={placeShape}
       />
     ))}
  </div>
)
