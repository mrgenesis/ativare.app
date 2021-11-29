import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

import TopSubMenu from '../components/Menus/TopSubMenu'
import MaterialList from '../components/Material/MaterialList';

import IndividualMaterial from '../components/Material/IndividualMaterial';
import New from '../components/Material/New';

export default function Material() {
  let { path } = useRouteMatch();

  return (
    <>
      <TopSubMenu firstPath='material' />
      <Switch>
        <Route exact path={path}>
          <MaterialList />
        </Route>
        <Route exact path={`${path}/novo`} component={New} />
        <Route exact path={`${path}/:materialId`} component={IndividualMaterial} />
      </Switch>
    </>
  );
}

