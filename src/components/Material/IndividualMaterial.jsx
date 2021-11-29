import React from 'react';
import { useParams } from 'react-router-dom';
import IndividualItem from '../Utils/IndividualItem';
import { useGetApiData } from '../../hooks/useGetApiData';
import Loader from '../Utils/Loader';

import { Context } from '../../store/Store';

export default function MaterialItem() {
  const [, dispatch] = React.useContext(Context);
  let { materialId } = useParams();
  const getMaterial = useGetApiData({ type: 'get', endPoint: `/material/${materialId}`, dispatch });
  const [runningApi, setRunningApi] = React.useState('stopped');
  const [response, setResponse] = React.useState({});
  React.useEffect(() => {
    if (runningApi === 'stopped')
      getMaterial({ params: {}, handleStatus: setRunningApi, getResponse: setResponse });
  }, [runningApi, response, getMaterial]);
  return (
    (runningApi === 'done') ? <IndividualItem response={response} type='material' /> : <Loader />
  );
}