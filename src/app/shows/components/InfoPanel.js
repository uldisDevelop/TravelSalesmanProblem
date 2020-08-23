import React from 'react';
import { observer } from 'mobx-react';
import app from '../../../mobxStore';

function InfoPanel() {  
  return (
    <div
      style={{
        position: 'fixed',
        right: '0px',
        top: '0px',
        bottom: '0px',
        width: '1500px',
        backgroundColor: 'azure',
      }}
    >
      {app.mod.infoPanel.map((item, index) => (
        <h1 key={index}>{item}</h1>
      ))}
    </div>
  );
}

export default observer(InfoPanel);
