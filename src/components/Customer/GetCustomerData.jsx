import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box } from '@material-ui/core';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';

export default function ClienteCadastro({ submit }) {

  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const helperFields = {
    phone: {
      "required": "O campo telefone é obrigatório",
      "pattern": "Deve ser um telefone válido",
    },
    name: {
      "required": "O campo nome é obrigatório",
      "minLength": "Mínimo 3 letras",
      "maxLength": "Máximo 30 letras. Contei " + name.length + " letras."
    },
    email: {
      "pattern": "Deve ser um email válido",
    }
  }

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = () => {
    submit({ customer: { phone, name, email } });
  }

  return (
    <>
      <Box display='flex' flexDirection='row' justifyContent='center'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            value={phone}
            error={!!errors.phone}
            inputRef={register({ required: true, pattern: /\d{2}9?\d{8}/ })}
            helperText={!!errors.phone && helperFields.phone[errors.phone?.type]}
            inputProps={{ maxLength: 11 }}
            id='phone' name='phone' label='Telefone de Contato *'
            type='text' margin='normal'
            onChange={(event) => setPhone(event.target.value)}
          />


          <TextField
            fullWidth
            value={name}
            name='name'
            error={!!errors.name}
            inputRef={register({ required: true, minLength: 3 })}
            helperText={!!errors.name && helperFields.name[errors.name?.type]}
            id='name' label='Nome do cliente *'
            type='text' margin='normal'
            inputProps={{ maxLength: 30 }}
            onChange={(event) => setName(event.target.value)}
          />

          <TextField fullWidth
            name='email'
            id='email' label='Email'
            error={!!errors.email}
            inputRef={register({ pattern: /^\S+@\S+$/ })}
            helperText={!!errors.email && helperFields.email[errors.email?.type]}
            type='text' margin='normal' value={email}
            onChange={(event) => setEmail(event.target.value)}
          />


          <Button endIcon={<SaveOutlinedIcon />} type='submit' fullWidth>Salvar Cadastro</Button>
        </form>
      </Box>

    </>
  )
}
