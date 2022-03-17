import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Utils/Loader';
import UtilsList from '../Utils/List';
import { routesConfig } from '../../constants/routesConfig';

import { Context } from '../../store/Store';
import { useGetApiData } from '../../hooks/useGetApiData';
import MessageStatus from '../Utils/MessageStatus';


export default function BudgetList() {
  const [response, setResponse] = React.useState([]);
  const [state, dispatch] = React.useContext(Context);
  const getData = useGetApiData({ type: 'get', endPoint: routesConfig.budget.home.api, dispatch });
  const [runningApi, setRunningApi] = React.useState('stopped');
  React.useEffect(() => {
    if (runningApi === 'stopped') {
      getData({ params: {}, getResponse: setResponse, handleStatus: setRunningApi });
    }
  }, [runningApi, getData]);

  const columns = [
    {
      field: 'id', headerName: 'Cód', width: 90, renderCell: (params) => (
        <strong>
          <Link to={`${routesConfig.budget.home.front}/${params.value}`}>{params.value}</Link>
        </strong>
      ),
    },
    { field: 'name', headerName: 'Nome', width: 300 }
  ];
  const rows = Array.isArray(response)
    ? response.map(item => ({
      id: item.code,
      name: item.customer.name
    }))
    : [];

  return (
    <>
      <MessageStatus
        status={!state.error}
        loading={false}
        severity={'error'}
        message={state.message}
      />
      <div style={{ height: 400, width: '100%' }}>
        {(runningApi === 'done') ? <UtilsList rows={rows} columns={columns} pageSize={5} /> : <Loader />}
      </div>      
    </>
  );
}
