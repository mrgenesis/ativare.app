import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

import TopSubMenu from '../components/Menus/TopSubMenu'
import UserList from '../components/User/UserList';

import IndividualUser from '../components/User/IndividualUser';
import New from '../components/User/New';

export default function User() {
  let { path } = useRouteMatch();

  return (
    <>
      <TopSubMenu firstPath='user' />
      <Switch>
        <Route exact path={path}>
          <UserList />
        </Route>
        <Route exact path={`${path}/novo`} component={New} />
        <Route exact path={`${path}/:userCode`} component={IndividualUser} />
      </Switch>
    </>
  );
}

