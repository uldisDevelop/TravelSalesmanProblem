import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import styles from './_Page.module.scss';
import MTSP from './MTSP.js';


export default function Page() {
  const match = useRouteMatch();

  return (
    <div className={styles.pageContainer}>
        <Switch>
          <Route path={match.path} exact>
            <MTSP />
          </Route>        
        </Switch>
    </div>
  );
}
