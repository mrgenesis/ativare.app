import React from 'react';
import { makeStyles, TextField, Button, Box, Select, MenuItem, InputLabel, FormControl, Chip, Typography } from '@material-ui/core';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { useForm, Controller } from 'react-hook-form';
import { Context } from '../../store/Store';
import AddMAterials from './AddMaterials';

import { productModel } from '../../config';
import UtilsMessageStatus from '../Utils/MessageStatus';
import UtilsHidden from './../Utils/Hidden';
import Services from '../../services/services';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// TODO: Necessário melhorar o código desse compoente
export default function New({ submit }) {
  const classes = useStyles();
  const [state, dispatch] = React.useContext(Context);

  // Ferramenta de manipulação dos dados do form
  const { handleSubmit, control, register, errors } = useForm();

  // Dados que serão salvos no Banco de dados
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [materialsList, setMaterialsList] = React.useState([]);
  const [addedMaterials, setAddedMaterials] = React.useState([]);

  // Configuração do funcionamento da página
  const [runningApiGetMaterials, setRunningApiGetMaterials] = React.useState('stopped');
  const [runningApiSaveProduct, setRunningApiSaveProduct] = React.useState('stopped');
  const [colorMaterialText, setColorMaterialText] = React.useState('textPrimary');
  const [getNewMaterialAdded, setGetNewMaterialAdded] = React.useState({});
  const [, setResponse] = React.useState({});

  // Buscar uma lista de materiais
  const services = React.useMemo(() => new Services(state.authData), [state.authData]);
  React.useEffect(() => {
    if (runningApiGetMaterials === 'stopped') {
      services.getMaterials().then(reqId => {
        const apiRequest = services.getApiRequest(reqId);
        setRunningApiGetMaterials(apiRequest.step);
        if(Services.errorResolver({ apiRequest, dispatch })) return; // break if has error
        setMaterialsList(apiRequest.data);
      });
    }
  }, [runningApiGetMaterials, services, dispatch]);

  React.useEffect(() => {
    if (getNewMaterialAdded.code && getNewMaterialAdded._id && getNewMaterialAdded.name && getNewMaterialAdded.charge) {
      setAddedMaterials([...addedMaterials, getNewMaterialAdded]);
      setGetNewMaterialAdded({});
    }
  }, [getNewMaterialAdded, addedMaterials]);

  function onSubmit(data) {
    // TODO: integrar o campo "materials" ao react-hook-form
    data[productModel.materials.key] = addedMaterials;
    if (data[productModel.materials.key].length > 0) {
      services.addProduct({ product: data }).then(reqId => {
        const apiRequest = services.getApiRequest(reqId);
        setRunningApiSaveProduct(apiRequest.step);
        if(Services.errorResolver({ apiRequest, dispatch })) return; // break if has error
        setResponse(apiRequest.data);
      });
    }
    else {
      setColorMaterialText('error');
    }
  }
  const handleDelete = (idx) => {
    let copyAddedMaterials = [...addedMaterials];
    copyAddedMaterials.splice(idx, 1);
    setAddedMaterials([...copyAddedMaterials]);
    // addedMaterials, setAddedMaterials
  };
  return (
    <>
      {/* Mensagem do sistema */}
      <UtilsMessageStatus
        status={(runningApiSaveProduct === 'stopped')}
        loading={runningApiSaveProduct !== 'done'}
        severity={(state.error) ? 'error' : 'success'}
        message={state.message}
        textLoader='Salvando no banco de dados...'
        dataLink={{ to: '/produto/novo/#', text: <Button onClick={() => window.location.reload()}>Cadastrar novo</Button> }}
      />
      <Box display='flex' flexDirection='column' justifyContent='center' marginBottom={10}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display='flex' flexDirection='column' justifyContent='center' alignItems="center">
            <TextField
              name={productModel.name.key}
              id={productModel.name.key}
              label={productModel.name.label}
              fullWidth
              disabled={(runningApiSaveProduct !== 'stopped')}
              type='text' margin='normal' value={name}
              onChange={(event) => setName(event.target.value)}
              inputRef={register({ required: true })}
              helperText={errors[productModel.name.key] && 'Campo Obrigatório'}
              error={!!errors[productModel.name.key]}
            />

            <FormControl error={!!errors[productModel.category.key]} fullWidth className={classes.formControl}>
              <InputLabel id={productModel.category.key}>
                {productModel.category.label}
              </InputLabel>
              <Controller
                name={productModel.category.key}
                id={productModel.category.key}
                control={control}
                defaultValue=''
                rules={{ required: true }}
                as={
                  <Select
                    disabled={(runningApiSaveProduct !== 'stopped')}
                    defaultValue=""
                    type='hidden'
                    labelId={productModel.category.key}
                  >
                    {productModel.category.values.map((value, index) => (
                      <MenuItem
                        key={index}
                        value={value}
                      >
                        {value}
                      </MenuItem>
                    ))}</Select>}
              />
            </FormControl>

            <FormControl fullWidth error={!!errors[productModel.group.key]} className={classes.formControl}>
              <InputLabel id={productModel.group.key}>
                {productModel.group.label}
              </InputLabel>
              <Controller
                name={productModel.group.key}
                id={productModel.group.key}
                control={control}
                defaultValue=''
                rules={{ required: true }}
                as={
                  <Select
                    defaultValue=""
                    disabled={(runningApiSaveProduct !== 'stopped')}
                    type='hidden'
                    labelId={productModel.group.key}
                  >
                    {productModel.group.values.map((value, index) => (
                      <MenuItem
                        key={index}
                        value={value}
                      >
                        {value}
                      </MenuItem>
                    ))}</Select>
                }
              />
            </FormControl>
            <br />
            <Box container={1} display='flex' flexDirection='row'>
              <br />
              <UtilsHidden status={(runningApiSaveProduct !== 'stopped')}>
                <div style={{ float: 'left' }}>
                  <AddMAterials materialsList={materialsList} addMaterial={setGetNewMaterialAdded} addedMaterials={addedMaterials} handleDelete={handleDelete} />
                  <br />
                </div>
              </UtilsHidden>
              <div>
                <UtilsHidden status={(addedMaterials.length !== 0)}>
                  <Typography color={colorMaterialText}>Adicione pelo menos um item</Typography>
                </UtilsHidden>
                {addedMaterials.map((addedMaterial, idx) => (
                  <Chip key={idx}
                    disabled={(runningApiSaveProduct !== 'stopped')}
                    variant="outlined"
                    size="small"
                    id={idx}
                    value={idx}
                    onDelete={((runningApiSaveProduct === 'stopped') ? () => handleDelete(idx) : '')}
                    label={addedMaterial?.name} />
                ))}
              </div>
            </Box>
            <TextField disabled={(runningApiSaveProduct !== 'stopped')} fullWidth multiline error={!!errors[productModel.description.key]}
              rows={3}
              inputRef={register({ required: true })}
              id={productModel.description.key}
              name={productModel.description.key}
              label={productModel.description.label}
              type='text' margin='normal' value={description}
              onChange={(event) => setDescription(event.target.value)}
              helperText={!!errors[productModel.description.key] && 'Campo obrigatório'}
            />
            <Button disabled={(runningApiSaveProduct !== 'stopped')} endIcon={<SaveOutlinedIcon />} type='submit' fullWidth>Salvar Produto</Button>
          </Box>
        </form>
      </Box>
    </>
  )
}
