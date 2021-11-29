import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';


//import ListaOrcamentos from '../components/Budget/ListaOrcamentos';
import New from '../components/Budget/New';
import IndivialBudget from '../components/Budget/IndivialBudget';
import TopSubMenu from '../components/Menus/TopSubMenu';
import BudgetList from '../components/Budget/BudgetList';


export default function Budget() {
  let { path } = useRouteMatch();

  return (
    <>
      <TopSubMenu firstPath='budget' />
      <Switch>
        <Route exact path={path}>
          <BudgetList />
        </Route>
        <Route exact path={`${path}/novo`} component={New} />
        <Route path={`${path}/:budgetId`} component={IndivialBudget} />
      </Switch>
    </>
  );
}
