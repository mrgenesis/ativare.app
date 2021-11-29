import React from 'react';
import { Link } from 'react-router-dom';
import { useGetApiData } from '../../hooks/useGetApiData';
import Loader from '../Utils/Loader';
import UtilsList from '../Utils/List';
import MessageStatus from '../Utils/MessageStatus';
import { routesConfig } from '../../constants/routesConfig';

import { Context } from '../../store/Store';

export default function MaterialList() {
  const [state, dispatch] = React.useContext(Context);
  const getMaterialsList = useGetApiData({ type: 'get', endPoint: routesConfig.material.home.api, dispatch });
  const [runningApi, setRunningApi] = React.useState('stopped');
  const [response, setResponse] = React.useState([]);

  React.useEffect(() => {
    if (runningApi === 'stopped') {
      getMaterialsList({ params: {}, handleStatus: setRunningApi, getResponse: setResponse })
    }
  }, [runningApi, getMaterialsList]);
  const columns = [
    {
      field: 'id', headerName: 'Cód', width: 90, renderCell: (params) => (
        <strong>
          <Link to={`${routesConfig.material.home.front}/${params.value}`}>{params.value}</Link>
        </strong>
      ),
    },
    { field: 'name', headerName: 'Nome', width: 300 },
    {
      field: 'unitPrice', headerName: 'Preço', width: 150,
      valueFormatter: (params) => `R$${params.value},00`
    }
  ];
  const rows = Array.isArray(response)
    ? response.map(item => ({
      id: item.code,
      name: item.name,
      unitPrice: item.unitPrice
    }))
    : [];

  return (
    <>
      <MessageStatus
        status={!state.error}
        loading={(runningApi === 'running')}
        severity='error'
        message={state.message}
      />
      <div style={{ height: 400, width: '100%' }}>
        {(runningApi === 'done') ? <UtilsList rows={rows} columns={columns} pageSize={5} /> : <Loader />}
      </div>
    </>
  );
}
