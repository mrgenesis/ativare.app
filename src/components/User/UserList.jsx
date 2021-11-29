import React from 'react';
import { Link } from 'react-router-dom';
import instance from '../../services/api';
import Loader from '../Utils/Loader';
import UtilsList from '../Utils/List';
import { frontRoutes as userFrontRoutes } from '../../constants/users';
import { apiRoutes as userApiroutes } from '../../constants/users';
import { Context } from '../../store/Store';
import { responseApiGetData } from '../../exec/responseApi';
import MessageStatus from '../Utils/MessageStatus';

export default function UserList() {
  const [state, dispatch] = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [statusErrorMessage, setStatusErrorMessage] = React.useState(true);
  const [severity, setSeverity] = React.useState('warning');
  const [response, setResponse] = React.useState([]);
  React.useEffect(() => {
    let isMounted = false;
    if (!isLoaded) {
      setLoading(true)
      instance.get(userApiroutes.home)
        .then(res => {
          setStatusErrorMessage(true);
          if (res.status >= 200) {
            console.log(res.data)
            setResponse(res.data);
          }
        })
        .catch(res => {
          setStatusErrorMessage(false)
          setSeverity('error');
          if (res.response?.status === 401) {
            if (!isMounted) {
              responseApiGetData('STATUS_CODE_401')(dispatch);
            }
          } else {
            if (!isMounted) {
              responseApiGetData('UNKNOWLEDGE')(dispatch);
            }
          }

        })
        .finally(() => {
          setLoading(false);
          setIsLoaded(true);
        });
    }
    return () => isMounted = true;

  }, [isLoaded, response, state, dispatch]);
  const columns = [
    {
      field: 'id', headerName: 'Cód.', width: 90,
      renderCell: params =>
        <strong><Link to={`${userFrontRoutes.home}/${params.value}`}>{params.value}</Link></strong>
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
        status={statusErrorMessage}
        loading={loading}
        severity={severity}
        message={state.error}
      />
      <div style={{ height: 400, width: '100%' }}>
        {isLoaded ? <UtilsList rows={rows} columns={columns} pageSize={5} /> : <Loader />}
      </div>
    </>
  );
}
