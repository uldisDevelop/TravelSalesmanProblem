import React from 'react';
import { observer } from 'mobx-react';
import app from '../../../mobxStore';

function GenerationCount() {
  return <>{` (${app.mod.generationCount})`}</>;
}

export default observer(GenerationCount);
