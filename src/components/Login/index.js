import React from 'react';
import { Button } from '@material-ui/core';
import { Context } from '../../store/Store';

import Endpoints from '../../services/endpoints';
const endpoints = new Endpoints();

export default function Login() {
  const [, dispatch] = React.useContext(Context);

  const singIn = () => {
    endpoints.singIn().then(payload => {
      dispatch({ type: 'SINGIN', payload });
    });
  }
  return (
    <Button size='large' onClick={singIn} margin='normal' variant='contained' color='primary'>Login</Button>
  );
}