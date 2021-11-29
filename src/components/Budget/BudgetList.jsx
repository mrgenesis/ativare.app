import React from 'react';
import { Link } from 'react-router-dom';
import instance from '../../services/api';
import Loader from '../Utils/Loader';
import UtilsList from '../Utils/List';
import { routesConfig } from '../../constants/routesConfig';

export default function BudgetList() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [response, setResponse] = React.useState([]);

  React.useEffect(() => {
    if (!isLoaded) {
      instance.get(routesConfig.budget.home.api)
        .then(res => {
          setIsLoaded(true);
          if (res.status === 200) {
            setResponse(res.data);
          }
        });
    }
  }, [isLoaded, response]);

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
    <div style={{ height: 400, width: '100%' }}>
      {isLoaded ? <UtilsList rows={rows} columns={columns} pageSize={5} /> : <Loader />}
    </div>
  );
}
