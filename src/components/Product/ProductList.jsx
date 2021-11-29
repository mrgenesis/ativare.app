import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Utils/Loader';
import UtilsList from '../Utils/List';
import { routesConfig } from '../../constants/routesConfig';
import { Context } from '../../store/Store';
import { useGetApiData } from '../../hooks/useGetApiData';
import MessageStatus from '../Utils/MessageStatus';
export default function MaterialList() {
  const [state, dispatch] = React.useContext(Context);
  const getProductList = useGetApiData({ type: 'get', endPoint: routesConfig.product.home.api, dispatch });
  const [runningApi, setRunningApi] = React.useState('stopped');
  const [response, setResponse] = React.useState([]);
  React.useEffect(() => {
    let isMounted = false;
    if (runningApi === 'stopped') {
      getProductList({ params: {}, handleStatus: setRunningApi, getResponse: setResponse });
    }
    return () => {
      // eslint-disable-next-line
      isMounted = true;
    }

  }, [runningApi, getProductList]);
  const columns = [
    {
      field: 'id', headerName: 'Cód', width: 90,
      renderCell: params =>
        <strong><Link to={`${routesConfig.product.home.front}/${params.value}`}>{params.value}</Link></strong>
    },
    { field: 'name', headerName: 'Nome', width: 300 },
  ];
  const rows = response.map(item => ({
    id: item.code,
    name: item.name
  }));
  return (
    <>
      <MessageStatus
        status={!state.error}
        loading={false}
        severity='error'
        message={state.message}
      />
      <div style={{ height: 400, width: '100%' }}>
        {(runningApi === 'done') ? <UtilsList rows={rows} columns={columns} pageSize={5} /> : <Loader />}
      </div>
    </>
  );
}
