import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Select, MenuItem, ButtonGroup, FormGroup, InputLabel, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import CircularProgress from '@material-ui/core/CircularProgress';
import Add from '@material-ui/icons/Add';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

import Hidden from '../Utils/Hidden';

import { Context } from '../../store/Store';

import { useGetApiData } from '../../hooks/useGetApiData';
import { budgetModel } from '../../config';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function AddItem({ addedProductsList, add }) {
  const classes = useStyles();
  const firstUpper = (l) => (`${l.charAt(0).toUpperCase()}${l.slice(1)}`);
  const [, dispatch] = React.useContext(Context);
  const getData = useGetApiData({ type: 'get', endPoint: '/product/automation', dispatch });
  const [runningApi, setRunningApi] = React.useState('stopped');
  const [productsList, setProductsList] = React.useState([]);
  const [selectedFloor, setSelectedFloor] = React.useState('off');
  const [selectedProductCode, setSelectedProductCode] = React.useState('');
  const [homeLocationName, setHomeLocationName] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const { handleSubmit, register, control, errors } = useForm();

  React.useEffect(() => {
    if (runningApi === 'stopped') {
      getData({ params: {}, getResponse: setProductsList, handleStatus: setRunningApi });
    }
  }, [runningApi, getData]);

  function getProductsList() {
    if (runningApi !== 'done') {
      return <><CircularProgress disableShrink /><p> Configurando Lista de Itens...</p></>;
    }
    return productsList;
  }
  function execAdd(data) {
    let product = productsList.find(prod => prod.code === selectedProductCode);
    add([...addedProductsList, {
      productCode: product.code,
      _id: product._id,
      name: product.name,
      description: product.description,
      materials: product.materials,
      category: product.category,
      group: product.group,
      [budgetModel.productsList.floorKey]: selectedFloor,
      [budgetModel.productsList.homeLocationName]: homeLocationName,
      [budgetModel.productsList.amount]: parseInt(amount, 10),
    }]);
  }
  function handleSelectedFloor(e) {
    setHomeLocationName('');
    setAmount('');
    if (selectedFloor === e.currentTarget.value) {
      setSelectedFloor('off');
      return;
    }
    setSelectedFloor(e.currentTarget.value);
  }
  function SelectProductCodeOfList(event) {
    let { value } = event.currentTarget.dataset;

    setSelectedProductCode(value);
  }

  return (
    <>
      <ButtonGroup fullWidth size="small" color="secondary" aria-label="outlined primary button group">
        {budgetModel.productsList.floors.values.map(floor => (
          <Button
            key={floor}
            variant={selectedFloor === floor ? 'outlined' : 'text'}
            endIcon={selectedFloor === floor ? <NotInterestedIcon /> : <Add />}
            value={floor} onClick={handleSelectedFloor}
          >
            {floor}
          </Button>
        ))}
      </ButtonGroup>
      <Hidden status={(selectedFloor === 'off')}>
        <form onSubmit={handleSubmit(execAdd)} className={classes.root}>
          <FormControl error={!!errors.SelectProductCodeOfList} fullWidth>
            <InputLabel id='SelectProductCodeOfList'>Escolha um produto *</InputLabel>
            <Controller control={control}
              defaultValue=''
              rules={{ required: true }}
              name='SelectProductCodeOfList'
              as={
                <Select
                  fullWidth defaultValue="" type='hidden' labelId='SelectProductCodeOfList'>
                  {
                    (Array.isArray(getProductsList()))
                      ? getProductsList().map((prod, index) => (
                        <MenuItem key={index} value={prod.code} onClick={SelectProductCodeOfList}>{prod.name}</MenuItem>
                      ))
                      : <MenuItem>{getProductsList()}</MenuItem>
                  }
                </Select>
              }
            />
          </FormControl>

          <FormGroup row>
            <TextField
              fullWidth
              name='homeLocationName'
              inputRef={register({ required: true, minLength: 3 })}
              error={!!errors.homeLocationName}
              value={homeLocationName}
              onChange={(e) => setHomeLocationName(firstUpper(e.currentTarget.value))}
              label='Local da casa *'
              placeholder='exemplo: Cozinha'
              helperText={!!errors.homeLocationName && 'No mínimo 3 letras'}
            />
            <TextField
              value={amount}
              name='amount'
              inputRef={register({ required: true, pattern: /^\d\d?$/ })}
              label='Quantidade'
              onChange={(e) => setAmount(e.currentTarget.value)}
              error={!!errors.amount}
              helperText={!!errors.amount && 'Deve ser um número até 99'}
            />
            <Button startIcon={<DoneIcon />} type='submit'><strong><u>Adicionar</u></strong></Button>
          </FormGroup>
        </form>
      </Hidden>
      <br />
    </>
  );
}
