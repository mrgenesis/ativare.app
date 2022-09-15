import React from 'react';
import { TextField, Button, Box } from '@material-ui/core';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { useForm } from 'react-hook-form';

import { Context } from '../../store/Store';
import MessageStatus from '../Utils/MessageStatus';
import { materialModel } from '../../config';
import Services from '../../services/services';

export default function MaterialNew() {
  const [state, dispatch] = React.useContext(Context);
  const { register, handleSubmit, errors } = useForm();

  const services = new Services(state.authData);

  // Dados que serão salvos no Banco de dados
  const [name, setName] = React.useState('');
  const [unitPrice, setUnitPrice] = React.useState('');
  const [ms, setMs] = React.useState(0);
  const [limit, setLimit] = React.useState();

  const [runningApi, setRunningApi] = React.useState('stopped');

  function onSubmit() {
    services.addNewMaterial({ material: { name, unitPrice: parseInt(unitPrice, 10), ms, limit } })
    .then(reqId => {
      const apiRequest = services.getApiRequest(reqId);
      setRunningApi(apiRequest.step);
      if(Services.errorResolver({ dispatch, apiRequest })) {
        return;
      }      
    });
  }

  return (
    <>
      <MessageStatus
        status={(runningApi === 'stopped')}
        loading={(runningApi === 'running')}
        severity={state.error ? 'error' : 'sucees'}
        message={state.message}
        dataLink={(state.error) ? null : { to: '/material /novo', text: <Button onClick={() => window.location.reload()}>Cadastre um novo material</Button> }}
      />
      <Box display='flex' flexDirection='column' justifyContent='center'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display='flex' flexDirection='column' justifyContent='center' alignItems="center">
            <TextField fullWidth disabled={(runningApi !== 'stopped')}
              id={materialModel.name.key}
              name={materialModel.name.key}
              label={materialModel.name.label}
              type='text' margin='normal' value={name}
              onChange={(event) => setName(event.target.value)}
              inputRef={register({ required: true })}
              error={!!errors[materialModel.name.key]}
              helperText={!!errors[materialModel.name.key] && 'Defina um nome'} />

            <TextField fullWidth disabled={(runningApi !== 'stopped')}
              id={materialModel.unitPrice.key}
              name={materialModel.unitPrice.key}
              label={materialModel.unitPrice.label}
              type='number' margin='normal' value={unitPrice}
              onChange={(event) => setUnitPrice(event.target.value)}
              inputRef={register({ required: true })}
              error={!!errors[materialModel.unitPrice.key]}
              helperText={!!errors[materialModel.unitPrice.key] && 'Defina um preço.'}
            />
            <TextField fullWidth disabled={(runningApi !== 'stopped')}
              name='limit'
              label='Qual é o limite deste item/equipamento?'
              type='number' margin='normal' value={limit}
              onChange={(event) => setLimit(Math.abs(event.target.value))}
              inputRef={register({ required: true })}
              error={!!errors.limit}
              helperText={!!errors.limit && 'Defina um Limite. '}
            />
            <TextField fullWidth disabled={(runningApi !== 'stopped')}
              name='ms'
              label='MS'
              type='number' margin='normal' value={ms}
              onChange={(event) => setMs(Math.abs(event.target.value))}
              inputRef={register({ required: true })}
              error={!!errors.ms}
              helperText={!!errors.ms && 'Defina um ms.'}
            />
            <Button disabled={(runningApi !== 'stopped')} endIcon={<SaveOutlinedIcon />} type='submit' fullWidth>Salvar Material</Button>
          </Box>
        </form>
      </Box>

    </>
  )
}
