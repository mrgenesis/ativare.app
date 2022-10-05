import React from 'react';
import { Button } from '@material-ui/core';
import { Context } from '../../store/Store';

import Services from '../../services/services';
const services = new Services();

export default function Login() {
  const [, dispatch] = React.useContext(Context);

  const singIn = () => {
    services.singIn().then(_ => {
      dispatch({ type: 'SINGIN', payload: services.authData });
    });
  }
  return (
    <Button size='large' fullWidth onClick={singIn} margin='normal' variant='contained' color='primary'>Entrar</Button>
  );
}