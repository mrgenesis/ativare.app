import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Select, MenuItem, ButtonGroup, FormGroup, FormControl, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Add from '@material-ui/icons/Add';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

import Hidden from '../Utils/Hidden';
import HomeLocationForm from './HomeLocationForm';
import EnvironmentItems from './EnvironmentItems';
import CustomSelect from './CustomSelect';


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
  const [, dispatch] = React.useContext(Context);
  const getData = useGetApiData({ type: 'get', endPoint: '/product/automation', dispatch });
  const [runningApi, setRunningApi] = React.useState('stopped');
  const [productsList, setProductsList] = React.useState([]);
  const [selectedFloor, setSelectedFloor] = React.useState('off');
  const [selectedProductCode, setSelectedProductCode] = React.useState('');
  const [homeLocationName, setHomeLocationName] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const { handleSubmit, register, errors } = useForm();

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

  function execAdd() {
    let product = productsList.find(prod => prod.code === selectedProductCode);
    console.log('addedProductsList', addedProductsList)
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
      configLocation: { ...locations[`${selectedFloor} - ${homeLocationName}`] }
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
  
  const [locations, setLocations] = React.useState({});
  function handleLocations(location) {
    console.log(location)
    setLocations( {...locations, ...location });
  }

  const handleDeleteLocation = name => {
    const copyLocations = locations;    
    delete copyLocations[name];
    setLocations({ ...copyLocations });
    // if (window.confirm('Isso vai remover os produtos adicionados neste ambiente. Deseja continuar?')) {
    // }
    // TODO: implementar isso depois.
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
          <HomeLocationForm addLocation={handleLocations} selectedFloor={selectedFloor} locations={locations} handleDeleteLocation={handleDeleteLocation} />
          <EnvironmentItems locations={locations} handleDeleteLocation={handleDeleteLocation} />
        <form onSubmit={handleSubmit(execAdd)} className={classes.root}>
            <Typography color="textSecondary"  variant='body1'>
              Adicione produtos aos ambientes
            </Typography>
          <div>
      <FormControl fullWidth>
        <Select displayEmpty value={selectedProductCode} onChange={SelectProductCodeOfList}>
          <MenuItem disabled value="">
            <em>Lista de produtos</em>
          </MenuItem>
          {
            (Array.isArray(getProductsList()))
              ? getProductsList().map(prod => 
                  (
                    <MenuItem key={prod.code} value={prod.code}>{prod.name}</MenuItem>
                  ))
              : <MenuItem>{getProductsList()}</MenuItem>
          }
        </Select>
      </FormControl>
    </div>
                <CustomSelect 
                  locations={locations} 
                  selectedFloor={selectedFloor} 
                  selectedLocation={homeLocationName} 
                  setLocation={setHomeLocationName}
                  placeholder={`Lista de ambientes no ${selectedFloor}`}
                />

          <FormGroup row>
            <TextField
              value={amount}
              name='amount'
              inputRef={register({ required: true, pattern: /^\d\d?$/ })}
              label='Quantidade'
              onChange={(e) => setAmount(e.currentTarget.value)}
              error={!!errors.amount}
              helperText={!!errors.amount && 'Deve ser um número até 99'}
            />
            <Button type='submit' fullWidth><strong>Adicionar Produto</strong></Button>
          </FormGroup>
        </form>
      </Hidden>
      <br />
    </>
  );
}
