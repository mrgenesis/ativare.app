import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

import TopSubMenu from '../components/Menus/TopSubMenu';
import ProductList from '../components/Product/ProductList';
import New from '../components/Product/New';
import IndividualProduct from '../components/Product/IndividualProduct';

export default function Material() {
  let { path } = useRouteMatch();
  return (
    <>
      <TopSubMenu firstPath='product' />
      <Switch>
        <Route exact path={path}>
          <ProductList />
        </Route>
        <Route exact path={`${path}/novo`} component={New} />
        <Route exact path={`${path}/:productId`} component={IndividualProduct} />
      </Switch>
    </>
  );
}
