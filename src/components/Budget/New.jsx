import React from "react";

import GetBudgetProductsList from './GetBudgetProductsList';
import MessageStatus from '../Utils/MessageStatus';

import { useGetApiData } from '../../hooks/useGetApiData';
import { Context } from '../../store/Store';

import GetCustomerData from '../Customer/GetCustomerData';

export default function New() {
  const [state, dispatch] = React.useContext(Context);
  const getApiData = useGetApiData({ type: 'post', endPoint: '/budget/create', dispatch });
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
      getApiData({ params: collectedData, getResponse: setResponse, handleStatus: setRunningApi });
    }
  }, [collectedData, stage, runningApi, response, dataLink, getApiData]);

  function getData(data) {
    setCollectedData({ ...collectedData, ...data });
    next();
  }

  // >> adicionar etapas
  return componentes[stage];
}
