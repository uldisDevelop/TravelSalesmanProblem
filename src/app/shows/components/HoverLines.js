import React from 'react';
import { observer } from 'mobx-react';
import app from '../../../mobxStore';





    function HoverLines() {      
      return (
        <> 
            <path key={'hovX'} d={`M0 ${app.mod.y}, H${app.mod.svgWidth} ${app.mod.svgWidth}`} stroke='darkred' strokeDasharray="1,1"  strokeWidth='2px' />
            <path key={'hovY'} d={`M${app.mod.x} 0, V0 ${app.mod.svgHeight}`} stroke='darkred' strokeDasharray="1,1" strokeWidth='2px'  />
          </>
          )
    }


export default observer(HoverLines);
