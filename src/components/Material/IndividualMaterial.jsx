import React from 'react';
import { useParams } from 'react-router-dom';
import MaterialPage from './MaterialPage';
import Loader from '../Utils/Loader';

import { Context } from '../../store/Store';
import Services from '../../services/services';

export default function MaterialItem() {
  const [state, dispatch] = React.useContext(Context);
  let { materialId } = useParams();
  const [runningApi, setRunningApi] = React.useState('stopped');
  const [response, setResponse] = React.useState({});

  const services = React.useMemo(() => new Services(state.authData), [state.authData]);
  React.useEffect(() => {
    if (runningApi === 'stopped') {
      services.getMaterialByCode({ code: materialId }).then(reqId => {
        const apiRequest = services.getApiRequest(reqId);
        setRunningApi(apiRequest.step);
        if(Services.errorResolver({ dispatch, apiRequest })) {
          return;
        }
        setResponse(apiRequest.data);
      });
    }
  }, [runningApi, response, services, dispatch, materialId]);
  return (
    (runningApi === 'done') ? <MaterialPage response={response} setResponse={setResponse} /> : <Loader />
  );
}