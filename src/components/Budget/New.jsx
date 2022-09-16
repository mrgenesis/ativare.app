import React from "react";

import GetBudgetProductsList from './NewBudget/GetBudgetProductsList';
import MessageStatus from '../Utils/MessageStatus';

import { Context } from '../../store/Store';
import Services from '../../services/services';
import GetCustomerData from './NewBudget/GetCustomerData';

export default function New() {
  const [state, dispatch] = React.useContext(Context);
  const [runningApi, setRunningApi] = React.useState('stopped');
  const [response, setResponse] = React.useState('');
  const [dataLink, setDataLink] = React.useState(null);
  
  const [collectedData, setCollectedData] = React.useState({})
    , [stage, setStage] = React.useState(0)
    , next = () => setStage(stage + 1)
    , componentes = [
      <GetCustomerData submit={getData} />,
      <GetBudgetProductsList submit={getData} />,
      <MessageStatus
        status={false}
        loading={runningApi !== 'done'}
        severity={state.error ? 'error' : 'success'}
        message={state.message}
        dataLink={dataLink}
      />
    ];

  React.useEffect(() => {
    if (runningApi === 'done' && !dataLink) {
      setDataLink({
        to: `/orcamento/${response._id}`,
        text: 'Ver orçamento'
      });
    }
    if (stage === 2 && runningApi === 'stopped') {
      const services = new Services(state.authData);
      services.createBudget({ newBudget: collectedData }).then(reqId => {
        const apiRequest = services.getApiRequest(reqId);
        setRunningApi(apiRequest.step);
        if(Services.errorResolver({ apiRequest, dispatch })) return; // break if has error
        setResponse(apiRequest.data);
      });
    }
  }, [collectedData, stage, runningApi, response, dataLink, setResponse, dispatch, state.authData]);

  function getData(data) {
    setCollectedData({ ...collectedData, ...data });
    next();
  }

  // >> adicionar etapas
  return componentes[stage];
}
