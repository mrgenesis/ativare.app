import React from 'react';
import { TextField, Button, Box, RadioGroup, Radio } from '@material-ui/core';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { useForm } from 'react-hook-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormControl from '@material-ui/core/FormControl';
import { Context } from '../../store/Store';
import { useGetApiData } from '../../hooks/useGetApiData'

import UtilsMessageStatus from '../Utils/MessageStatus';


export default function UserNew() {
  const [state, dispatch] = React.useContext(Context);
  const saveUser = useGetApiData({ type: 'post', endPoint: '/user/register', dispatch })

  // Ferramente de validação
  const { register, handleSubmit, errors } = useForm();

  // Dados que serão salvos no Banco de dados
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [group, setGroup] = React.useState([]);
  const password = Math.random().toString(36).slice(2).toUpperCase().replace(/\w{3}/g, (c) => `${c}-`);

  // Configuração do funcionamento da página
  const [runningApi, setRunningApi] = React.useState('stopped');

  // Configuração da página
  function onSubmit(event) {
    saveUser({
      params: {
        name, email, password, group
      }, getResponse: () => { }, handleStatus: setRunningApi
    });
  }
  return (
    <>
      <UtilsMessageStatus
        status={(runningApi === 'stopped')}
        running={(runningApi === 'running')}
        textLoader='Aguarde. Salvando usuário...'
        severity={(state.error) ? 'error' : 'success'}
        message={state.message}
        dataLink={{ to: '/usuario/novo', text: <Button onClick={() => window.location.reload()}>Cadastre um novo usuário</Button> }}
      />
      <Box display='flex' flexDirection='column' justifyContent='center'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display='flex' flexDirection='column' justifyContent='center' alignItems="center">
            <TextField fullWidth disabled={(runningApi !== 'stopped')}
              name={'name'}
              label='Nome da pessoa'
              type='text' margin='normal' value={name}
              onChange={(event) => setName(event.target.value)}
              inputRef={register({ required: true })}
              error={!!errors['name']}
              helperText={!!errors['name'] && 'Defina um nome'} />

            <TextField fullWidth disabled={(runningApi !== 'stopped')}
              name='email'
              label='Email'
              type='email' margin='normal' value={email}
              onChange={(event) => setEmail(event.target.value)}
              inputRef={register({ required: true })}
              error={!!errors['email']}
              helperText={!!errors['email'] && 'Defina um e-mail.'}
            />

            <TextField fullWidth disabled={true}
              name={'password'}
              label='Senha'
              type='text' margin='normal' value={password}
              inputRef={register({ required: true })}
              error={!!errors['password']}
              helperText={!!errors['password'] && 'Defina uma senha'} />


            <FormControl component="fieldset">
              <RadioGroup aria-label="position" row>

                <FormControlLabel
                  value="arquiteto"
                  disabled={(runningApi !== 'stopped')}
                  onClick={(e) => setGroup(e.target.value)}
                  control={<Radio color="primary" />}
                  label="Básico"
                  labelPlacement="end"
                />
                <FormControlLabel
                  disabled={(runningApi !== 'stopped')}
                  value="admin"
                  onClick={(e) => setGroup(e.target.value)}
                  control={<Radio color="primary" />}
                  label="Administrador"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>

            <Button disabled={(runningApi !== 'stopped')} endIcon={<SaveOutlinedIcon />} type='submit' fullWidth>Salvar Material</Button>
          </Box>
        </form>
      </Box>

    </>
  )
}
