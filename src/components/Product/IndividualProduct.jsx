import React from 'react';
import { useParams } from 'react-router-dom';
import ProductPage from './ProductPage';
import Loader from '../Utils/Loader';

import { Context } from '../../store/Store';
import Services from '../../services/services';


export default function MaterialItem() {
  let { productId } = useParams();
  const [state, dispatch] = React.useContext(Context);
  const [response, setResponse] = React.useState({});
  const [runningApi, setRunningApi] = React.useState('stopped');
  const services = React.useMemo(() => new Services(state.authData), [state.authData]);

  React.useEffect(() => {
    // let isMounted = false;
    if (runningApi === 'stopped') {
      services.getProductByCode({ code: productId }).then(reqId => {
        const apiRequest = services.getApiRequest(reqId);
        setRunningApi(apiRequest.step);
        if(Services.errorResolver({ apiRequest, dispatch })) return; // break if has error
        setResponse(apiRequest.data);
      });
    }
  }, [runningApi, services, setRunningApi, dispatch, productId]);
  
  return (
    runningApi === 'done' ? <ProductPage response={response} setResponse={setResponse} /> : <Loader />
  );
}