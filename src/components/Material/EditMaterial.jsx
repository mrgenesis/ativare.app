import React from 'react';
import { TextField, Button, Box } from '@material-ui/core';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { useForm } from 'react-hook-form';

import MessageStatus from '../Utils/MessageStatus';

import { useGetApiData } from '../../hooks/useGetApiData';
import { materialModel } from '../../config';
import { Context } from '../../store/Store';



export default function MaterialNew({ item, setItem }) {
  const [state, dispatch] = React.useContext(Context);
  const getApiData = useGetApiData({ type: 'post', endPoint: '/material/edit', dispatch });
  // Ferramente de validação
  const { register, handleSubmit, errors } = useForm();

  // Dados que serão salvos no Banco de dados
  const [name, setName] = React.useState(item['name']);
  const [unitPrice, setUnitPrice] = React.useState(item['unitPrice']);
  const [limit, setLimit] = React.useState(item['limit']);
  const [ms, setMs] = React.useState(item['ms']);
  //possibles values: stopped, running, done
  const [runningApi, setRunningApi] = React.useState('stopped');

  async function onSubmit(event) {
    getApiData({
      getResponse: setItem,
      handleStatus: setRunningApi,
      params: {
        name, limit, unitPrice: parseInt(unitPrice, 10), ms, code: item['code']
      }
    });
  }

  return (
    <>
      <MessageStatus
        status={!(runningApi === 'running' || runningApi === 'done')}
        loading={runningApi === 'running'}
        message={state.message}
        severity={state.error ? 'error' : 'succes'}
      />
      <Box display='flex' flexDirection='column' justifyContent='center' alignItems="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField fullWidth disabled={(runningApi === 'running' || runningApi === 'done')}
            id={materialModel.name.key}
            name={materialModel.name.key}
            label={materialModel.name.label}
            type='text' margin='normal' value={name}
            onChange={(event) => setName(event.target.value)}
            inputRef={register({ required: true })}
            error={!!errors[materialModel.name.key]}
            helperText={!!errors[materialModel.name.key] && 'Defina um nome'} />

          <TextField fullWidth disabled={(runningApi === 'running' || runningApi === 'done')}
            id={materialModel.unitPrice.key}
            name={materialModel.unitPrice.key}
            label={materialModel.unitPrice.label}
            type='number' margin='normal' value={unitPrice}
            onChange={(event) => setUnitPrice(event.target.value)}
            inputRef={register({ required: true })}
            error={!!errors[materialModel.unitPrice.key]}
            helperText={!!errors[materialModel.unitPrice.key] && 'Defina um preço.'}
          />

          <TextField fullWidth disabled={(runningApi === 'running' || runningApi === 'done')}
            id='limit'
            name='limit'
            label='Limite do Item/equipamento'
            type='number' margin='normal' value={limit}
            onChange={(event) => setLimit(event.target.value)}
            inputRef={register({ required: true })}
            error={!!errors.limit}
            helperText={!!errors.limit && 'Defina um preço.'}
          />

          <TextField fullWidth disabled={(runningApi === 'running' || runningApi === 'done')}
            id='ms'
            name='ms'
            label='ms do Item/equipamento'
            type='number' margin='normal' value={ms}
            onChange={(event) => setMs(event.target.value)}
            inputRef={register({ required: true })}
            error={!!errors.ms}
            helperText={!!errors.ms && 'Defina um preço.'}
          />

          <Button disabled={(runningApi === 'running' || runningApi === 'done')} endIcon={<SaveOutlinedIcon />} type='submit' fullWidth>Salvar Alteração</Button>
          <TextField fullWidth disabled={true}
            label='Código'
            type='text' margin='normal' value={item['code']}
            helperText='Não pode ser modificado'
          />

        </form>
      </Box>

    </>
  )
}
