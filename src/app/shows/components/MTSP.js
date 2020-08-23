import React from 'react';
import { observer } from 'mobx-react';
import styles from './MTSP.module.scss';
import App from '../../../mobxStore';
import app from '../../../mobxStore';
//import HoverLines from './HoverLines'
import GridLines from './GridLines'
import InfoPanel from './InfoPanel'
import GenerationCount from './GenerationCount'
import helper from '../helper';


class MTSP extends React.Component {
  constructor(props) {
    super(props);

  
    const base = { x: 1200, y: 700 };

    const sequence = [
      base,
      ...app.mod.cities,
      base,
    ];

    this.state = {
    //  points:app.mod.cities,
      base,
      sequence
    };
  }

 


   

    render() {
     //return false;
      // const sequence = [
      //   base,
      //   ...app.mod.,
      //   base,
      // ];
      const {  base, sequence } = this.state;

      const width = 2000;
      const height = 1000;
      
//      console.log('Render page');

      return (
        <div style={{
          position: 'fixed', top: '0px', left: '0px', right: '0px', bottom: '0px', backgroundColor: 'whitesmoke', zIndex: 9999999999
        }}
        >

<InfoPanel/>
          <svg width={app.mod.svgWidth} height={height} onMouseMove={(e)=>{
            app.mod.x = e.clientX;
            app.mod.y = e.clientY;            
            }} 
            onMouseLeave={(e)=>{
              app.mod.x = 0;
            app.mod.y = 0;  
            }}>

            <text x={50} y={50} style={{ fontSize: '34px' }}>
              {/* {this.getTotalDistance()}  */}
             
              <GenerationCount/>
            </text>          
            {app.mod.bestRoute&&app.mod.bestRoute.sequence.map((item, index) => {
              if (index > 0) {
                const prevItem = app.mod.bestRoute.sequence[index - 1];
                return [                  
                  <path id={`path${index}`} key='4' d={`M${prevItem.x} ${prevItem.y}, L${item.x} ${item.y}`} stroke='purple' strokeWidth='4px' />,                  
                  <text key='3'>
                    <textPath startOffset='50%' href={`${'#' + 'path'}${index}`} style={{ fontSize: '34px' }}>
                      {helper.getDistanceBetweenTwoPoints({x:prevItem.x,y:prevItem.y},{x: item.x, y:item.y}).toFixed(0)}
                    </textPath>
                  </text>
                ];
              }
            })}          

           
             <GridLines/>         

         
            {app.mod.cities.map((point, pointIndex) => [
              <circle key='1' cx={point.x} cy={point.y} r='25' stroke='black' strokeWidth='3' fill='green' />,
              <text key='2' x={point.x} y={point.y} textAnchor='middle' stroke='white' strokeWidth='1px' dy='.3em' style={{ fontSize: '25px' }}>{pointIndex}</text>
            ])}

            <circle cx={base.x} cy={base.y} r='10' stroke='black' strokeWidth='3' fill='blue' />
          </svg>
          <svg width={app.mod.svgWidth} height={height} onMouseMove={(e)=>{
            app.mod.x = e.clientX;
            app.mod.y = e.clientY;            
            }} 
            onMouseLeave={(e)=>{
              app.mod.x = 0;
            app.mod.y = 0;  
            }}>

            <text onClick={() => { this.optimize(); }} x={50} y={50} style={{ fontSize: '34px' }}>
              {/* {this.getTotalDistance()}  */}
             
              <GenerationCount/>
            </text>

          
         
            {app.mod.bestRouteInGeneration && app.mod.bestRouteInGeneration.sequence.map((item, index) => {
              if (index > 0) {
                const prevItem = app.mod.bestRouteInGeneration.sequence[index - 1];
                return [                  
                  <path id={`path${index}`} key='4' d={`M${prevItem.x} ${prevItem.y}, L${item.x} ${item.y}`} stroke='silver' strokeWidth='2px' />,                  
                  <text key='3'>
                    <textPath startOffset='50%' href={`${'#' + 'path'}${index}`} style={{ fontSize: '34px' }}>
                      {/* {helper.getDistanceBetweenTwoPoints({x:prevItem.x,y:prevItem.y},{x: item.x, y:item.y}).toFixed(0)} */}
                    </textPath>
                  </text>
                ];
              }
            })}          

          
            <GridLines/>           

         
            {app.mod.cities.map((point, pointIndex) => [
              <circle key='1' cx={point.x} cy={point.y} r='25' stroke='black' strokeWidth='3' fill='green' />,
              <text key='2' x={point.x} y={point.y} textAnchor='middle' stroke='white' strokeWidth='1px' dy='.3em' style={{ fontSize: '25px' }}>{pointIndex}</text>
            ])}

            <circle cx={base.x} cy={base.y} r='10' stroke='black' strokeWidth='3' fill='blue' />
          </svg>
          <div>
         <h1> {`${app.mod.bestRouteDistance.toFixed(0)}`}</h1>
          </div>
        </div>
      );
    }
}

export default observer(MTSP);
