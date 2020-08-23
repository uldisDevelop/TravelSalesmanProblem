import React from 'react';
import { observer } from 'mobx-react';
import app from '../../../mobxStore';

function HoverLines() {
  const rowEvery = 100;
  const rows = app.mod.svgHeight / rowEvery + 1;

  const colEvery = 100;
  const columns = app.mod.svgWidth / colEvery + 1;
  return (
    <g id='grid'>

      {new Array(rows).fill(1).map((item, rowIndex) => (
        <path
          key={rowIndex}
          d={`M0 ${rowIndex * rowEvery}, H${app.mod.svgWidth} 0`}
          stroke='silver'
          strokeWidth='1px'
        />
      ))}

      {new Array(columns).fill(1).map((item, colIndex) => (
        <path
          key={colIndex}
          d={`M${colIndex * colEvery} 0, V0 ${app.mod.svgHeight}`}
          stroke='silver'
          strokeWidth='1px'
        />
      ))}
      
    </g>
  );
}

export default observer(HoverLines);
