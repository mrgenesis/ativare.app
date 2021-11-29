import React from 'react';
import { useParams } from 'react-router-dom';
import IndividualItem from '../Utils/IndividualItem';
import Loader from '../Utils/Loader';

import instance from '../../services/api';


export default function MaterialItem() {
  let { productId } = useParams();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [finished, setFinished] = React.useState(false);
  const [response, setResponse] = React.useState({});

  React.useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
      instance.get(`/product/${productId}`)
        .then(res => {
          setResponse(res.data);
          setFinished(true);
        });
    }
  }, [isLoaded, productId]);
  return (
    finished ? <IndividualItem response={response} type='product' /> : <Loader />
  );
}