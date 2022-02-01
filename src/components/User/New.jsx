import React from 'react';
import { TextField, Button, Box } from '@material-ui/core';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { useForm } from 'react-hook-form';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
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
  const [password, setPassword] = React.useState('');
  const [roles, setRoles] = React.useState([]);

  // Configuração do funcionamento da página
  const [basic, setBasic] = React.useState(false);
  const [admin, setAdmin] = React.useState(false);
  const [runningApi, setRunningApi] = React.useState('stopped');

  const handleBasic = (event) => {
    setBasic(!basic);
    updateRole('basic', (basic ? 'remove' : 'add'));
  };
  const handleAdmin = (event) => {
    setAdmin(!admin);
    updateRole('admin', (admin ? 'remove' : 'add'));
  };
  const updateRole = (role, action) => {
    let copyRoles = roles;
    if (action === 'add' && roles.indexOf(role) === -1) {
      setRoles([...roles, role]);
    }
    else if (action === 'remove') {
      //debugger;
      if (copyRoles.indexOf(role) !== -1) {
        copyRoles.splice(copyRoles.indexOf(role), 1);
      }
      setRoles(copyRoles);
    }
  }
  // Configuração da página
  function onSubmit(event) {
    saveUser({
      params: {
        name, email, password, roles
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

            <TextField fullWidth disabled={(runningApi !== 'stopped')}
              name={'password'}
              label='Senha'
              type='text' margin='normal' value={password}
              onChange={(event) => setPassword(event.target.value)}
              inputRef={register({ required: true })}
              error={!!errors['password']}
              helperText={!!errors['password'] && 'Defina uma senha'} />


            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>

                <FormControlLabel checked={basic}
                  value="basic"
                  disabled={(runningApi !== 'stopped')}
                  onChange={handleBasic}
                  control={<Checkbox color="primary" />}
                  label="Básico"
                  labelPlacement="end"
                />
                <FormControlLabel checked={admin}
                  disabled={(runningApi !== 'stopped')}
                  value="admin"
                  onChange={handleAdmin}
                  control={<Checkbox color="primary" />}
                  label="Administrador"
                  labelPlacement="end"
                />
              </FormGroup>
            </FormControl>

            <Button disabled={(runningApi !== 'stopped')} endIcon={<SaveOutlinedIcon />} type='submit' fullWidth>Salvar Material</Button>
          </Box>
        </form>
      </Box>

    </>
  )
}
