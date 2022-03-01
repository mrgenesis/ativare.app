import React from 'react';
import { useParams } from 'react-router-dom';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { Context } from '../../store/Store';
import { useGetApiData } from '../../hooks/useGetApiData';

import BudgetItems from './BudgetParts/BudgetItems';
import BudgetTotal from './BudgetParts/BudgetTotal';
import MessageStatus from '../Utils/MessageStatus';

import BudgetPartsHeader from './BudgetParts/Header';
import BudgetPartsPrivateDetail from './BudgetParts/PrivateDetail';
import Hidden from '../Utils/Hidden';
import Loader from '../Utils/Loader';

// Componente exibe a lista dos item do orçamento
export default function IndivialBudget() {
  let { budgetId } = useParams();
  const [state, dispatch] = React.useContext(Context);
  const [runningApi, setRunningApi] = React.useState('stopped');
  const [budget, setBudget] = React.useState({});
  const [displayDetail, setDisplayDetail] = React.useState(false);

  const getData = useGetApiData({ type: 'get', endPoint: `/budget/${budgetId}`, dispatch });
  
  React.useEffect(() => {
    if (runningApi === 'stopped') {
      getData({ params: {}, getResponse: setBudget, handleStatus: setRunningApi });
    }
  }, [runningApi, getData, budgetId]);

  function LoadingLast() {
    if (runningApi === 'done' && !state.error) {
      return (
        <>
          <BudgetPartsHeader createAt={budget.createAt} code={budget.code} customer={budget.customer} />
          <BudgetItems productsList={budget?.productsList} budgetFloors={budget.budgetFloors} />
          <BudgetTotal total={budget?.total} />
          <Hidden status={(!budget.privateDetails)}>
            {displayDetail
              ? <BudgetPartsPrivateDetail hiddenFunc={setDisplayDetail} own={budget.own} privateDetails={budget.privateDetails} budgetFloors={budget.budgetFloors} materials={budget.privateDetail?.materials} />
              : <Button size='small' onClick={() => setDisplayDetail(true)}>Ver detalhes &nbsp;<VisibilityOutlinedIcon fontSize='small' /></Button>}
          </Hidden>
        </>
      )
    } else {
      return <Loader text='Aguarde... configurando lista' />;
    }
  }
  return (
    <List>
      <MessageStatus
        status={(!state.error && runningApi === 'done')}
        loading={runningApi !== 'done'}
        severity='error'
        message={state.message}
      />
      <LoadingLast />
    </List>
  );

}