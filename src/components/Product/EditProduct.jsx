import React from 'react';
import { TextField, Button, Box } from '@material-ui/core';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { useForm } from 'react-hook-form';

import MessageStatus from '../Utils/MessageStatus';
import { productModel } from '../../config';
import { Context } from '../../store/Store';
import materialsListFormatter from './materials-list-formatter';
import Services from '../../services/services';

export default function MaterialNew({ item, setItem }) {
  const [state, dispatch] = React.useContext(Context);
  // Ferramente de validação
  const { register, handleSubmit, errors } = useForm();

  // Dados que serão salvos no Banco de dados
  const [name, setName] = React.useState(item['name']);
  const [description, setDescription] = React.useState(item['description']);

  //possibles values: stopped, running, done
  const [runningApi, setRunningApi] = React.useState('stopped');
  const services = new Services(state.authData);
  async function onSubmit(event) {
    services.updateProduct({ updatedProduct: { name, description, code: item['code'] } }).then(reqId => {
      const apiRequest = services.getApiRequest(reqId);
      setRunningApi(apiRequest.step);
      if(Services.errorResolver({ apiRequest, dispatch })) return; // break if has error
      setItem(apiRequest.data);
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
            id={productModel.name.key}
            name={productModel.name.key}
            label={productModel.name.label}
            type='text' margin='normal' value={name}
            onChange={(event) => setName(event.target.value)}
            inputRef={register({ required: true })}
            error={!!errors[productModel.name.key]}
            helperText={!!errors[productModel.name.key] && 'Defina um nome'}
          />

          <TextField
            disabled={(runningApi === 'running' || runningApi === 'done')}
            fullWidth multiline error={!!errors[productModel.description.key]}
            rows={3}
            inputRef={register({ required: true })}
            id={productModel.description.key}
            name={productModel.description.key}
            label={productModel.description.label}
            type='text' margin='normal' value={description}
            onChange={(event) => setDescription(event.target.value)}
            helperText={!!errors[productModel.description.key] && 'Campo obrigatório'}
          />
          <Button disabled={(runningApi === 'running' || runningApi === 'done')} endIcon={<SaveOutlinedIcon />} type='submit' fullWidth>Salvar Alteração</Button>

          <TextField fullWidth disabled={true}
            label='Código'
            type='text' margin='normal' value={item['code']}
            helperText='Não pode ser modificado'
          />
          <TextField fullWidth disabled={true}
            label='Categoria'
            type='text' margin='normal' value={item['category']}
            helperText='Não pode ser modificado'
          />
          <TextField fullWidth disabled={true}
            label='Grupo'
            type='text' margin='normal' value={item['group']}
            helperText='Não pode ser modificado'
          />
          <TextField fullWidth disabled={true}
            multiline
            rows={item.materials.length + 1}
            label='Materiais adicionados'
            type='text' margin='normal' value={materialsListFormatter(item.materials)}
            helperText='Não pode ser modificado'
          />

        </form>
      </Box>

    </>
  )
}
