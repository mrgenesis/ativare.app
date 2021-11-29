import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Typography, TextField, Button } from '@material-ui/core';
import instance from '../../services/api';
import { Context } from '../../store/Store';
import MessageStatus from '../Utils/MessageStatus';

export default function Login() {
  const [state, dispatch] = React.useContext(Context);
  const [runningApi, setRunningApi] = React.useState('stopped');
  const [dataMessage, setDataMessage] = React.useState({
    hiddenStatus: !state.error,
    severity: 'error',
    message: state.message
  });
  const { register, handleSubmit, errors } = useForm()
    , onSubmit = async (data) => {
      setRunningApi('running');
      try {
        //let login = await instance.post('/auth/authenticate', data)
        instance.post('/auth/authenticate', data)
          .then(response => {
            if (response.status === 200) {
              const { authorization, user } = response.data;
              dispatch({ type: 'LOGON', payload: { authorization, user } });
            }
          })
          .catch((res) => {
            if (res.response?.status === 401) {
              dispatch({ type: 'STATUS_CODE_401', payload: { message: 'Usuário/senha inválidos' } });

            } else {
              dispatch({ type: 'UNKNOWLEDGE', payload: { message: 'Error: Contate o suporte técnico.' } });
            }
            setDataMessage({
              hiddenStatus: false,
              severity: 'error',
              message: state.error,
            });
          })
          .finally(() => {
            setRunningApi('done');
          })
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <Box id='Box' container={1} display='flex' flexDirection='column' justifyContent='center' alignItems="center">
      <Typography variant='h5' component='h1'>Login</Typography>
      <Typography variant='subtitle2' color='textSecondary' component='p'>Digite seu e-mail e senha para entrar</Typography>
      {/* Mensagem do sistema */}
      <MessageStatus
        status={!(runningApi === 'running' || runningApi === 'done')}
        loading={(runningApi === 'running')}
        severity={dataMessage.severity}
        message={state.message}
      />
      <form onSubmit={handleSubmit(onSubmit)} className='LoginForm'>
        <TextField id="email" disabled={(runningApi === 'running')} name='email' error={!!errors.email} helperText={errors.email && "Por favor, digite seu email"} margin='normal' inputRef={register({ required: true })} label="Email" fullWidth />

        <TextField id="password" disabled={(runningApi === 'running')} name='password' type='password' error={!!errors.email} helperText={errors.email && "Por favor, digite sua senha"} margin='normal' inputRef={register({ required: true })} label="Senha" fullWidth />

        <Button disabled={(runningApi === 'running')} size='large' type='submit' margin='normal' variant='contained' color='primary'>Entrar</Button>
      </form>
    </Box>
  );
}