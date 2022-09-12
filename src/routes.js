import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import TopMainMenu from './components/Menus/TopMainMenu';
import Homepage from './pages/Homepage';
import Material from './pages/Material';
import Product from './pages/Product';
import Budget from './pages/Budget.js';
import Login from './components/Login/';
import User from './pages/User';

import { Context } from './store/Store';

export default function Routes() {
  const [state] = React.useContext(Context);
  return (
    <BrowserRouter>
      <TopMainMenu />
      {state.authData
        ? <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/material" component={Material} />
            <Route path="/produto" component={Product} />
            <Route path="/orcamento" component={Budget} />
            <Route path="/usuario" component={User} />
          </Switch>
        : <Login />}
    </BrowserRouter>
  );
}
