import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, ButtonGroup, FormGroup, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Add from '@material-ui/icons/Add';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

import Hidden from '../../Utils/Hidden';
import HomeLocationForm from './HomeLocationForm';
import EnvironmentItems from './EnvironmentItems';
import ProductSelect from './ProductSelect';
import LocationSelect from './LocationSelect';


import { Context } from '../../../store/Store';

import Services from '../../../services/services';
import { budgetModel } from '../../../config';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function AddItem({ addedProductsList, add, budgetType }) {
  const classes = useStyles();
  const [state, dispatch] = React.useContext(Context);
  const [runningApi, setRunningApi] = React.useState('stopped');
  const [productsList, setProductsList] = React.useState([]);
  const [selectedFloor, setSelectedFloor] = React.useState('off');
  const [selectedProductCode, setSelectedProductCode] = React.useState('');
  const [homeLocationName, setHomeLocationName] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const { handleSubmit, register, errors } = useForm();
  const [statusErrorProductSelect, setStatusErrorProductSelect] = React.useState(false);
  const [statusErrorLocationSelect, setStatusErrorLocationSelect] = React.useState(false);

  React.useEffect(() => {
    if (runningApi === 'stopped') {
      const categories = { automation: "Automação", eletric: "Elétrica" }
      const services = new Services(state.authData);
      services.getProductsByCategory({ categoryName: categories[budgetType] }).then(reqId => {
        const apiRequest = services.getApiRequest(reqId);
        setRunningApi(apiRequest.step);
        if(Services.errorResolver({ apiRequest, dispatch })) return;
        setProductsList(apiRequest.data);
      });
    }
  }, [budgetType, runningApi, state.authData, dispatch, setRunningApi, setProductsList]);

  function getProductsList() {
    if (runningApi !== 'done') {
      return <><CircularProgress disableShrink /><p> Configurando Lista de Itens...</p></>;
    }
    return productsList;
  }
  function execAdd() {    
    (selectedProductCode === '') ? setStatusErrorProductSelect(true) : setStatusErrorProductSelect(false);
    (homeLocationName === '') ? setStatusErrorLocationSelect(true) : setStatusErrorLocationSelect(false);
    if((selectedProductCode === '') || (homeLocationName === '')) {
      return;
    }
    let product = productsList.find(prod => prod.code === selectedProductCode);
    const copyAddedProductsList = addedProductsList;
    let statusAdd = true;
    addedProductsList.forEach((item, i) => {
      const theSameFloor = (item.floor === selectedFloor);
      const theSameProductCode = (item.productCode === product.code);
      const theSameHomeLocation = (item.homeLocationName === homeLocationName);
      const messageConfirm = `Você já adicionou ${item.amount} "${product.name}" em "${selectedFloor} - ${homeLocationName}". Se clicar em "Ok" o produto será substituído. Tem certeza que quer continuar?`;
      if (theSameFloor && theSameProductCode && theSameHomeLocation) {
        if (window.confirm(messageConfirm)) {
          copyAddedProductsList.splice(i, 1);
          return;
        }
        statusAdd = false;
      }
    });
    if (statusAdd) {
      add([...copyAddedProductsList, {
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
      setSelectedProductCode('');
      setHomeLocationName('');
      setAmount('');
      
    }
  }
  function handleSelectedFloor(e) {
    setSelectedProductCode('');
    setHomeLocationName('');
    setAmount('');
    if (selectedFloor === e.currentTarget.value) {
      setSelectedFloor('off');
      return;
    }
    setSelectedFloor(e.currentTarget.value);
  }
  
  const [locations, setLocations] = React.useState({});
  function handleLocations(location) {
    setLocations( {...locations, ...location });
  }

  const handleDeleteLocation = name => {
    
    if (window.confirm('Isso vai remover todos os produtos adicionados neste ambiente. Deseja continuar?')) {
      const copyLocations = locations;    
      delete copyLocations[name];
      setLocations({ ...copyLocations });

      let idx = [];
      addedProductsList.forEach((product, i) => {
        if (`${product.floor} - ${product.homeLocationName}` === name) {
          idx.push(i);
        }
      });
      const removed = addedProductsList.filter((_, i) => idx.indexOf(i) === -1);
      add([ ...removed ]);
    }

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
        <HomeLocationForm budgetType={budgetType} addLocation={handleLocations} selectedFloor={selectedFloor} locations={locations} handleDeleteLocation={handleDeleteLocation} />
        <EnvironmentItems locations={locations} handleDeleteLocation={handleDeleteLocation} />
        <form onSubmit={handleSubmit(execAdd)} className={classes.root}>
          <Typography color="textSecondary"  variant='body1'>
            Adicione produtos aos ambientes
          </Typography>
            
          <ProductSelect 
            list={getProductsList()} 
            selectedValue={selectedProductCode} 
            placeholder='Lista de produtos' 
            setSelectedValue={setSelectedProductCode} 
            error={statusErrorProductSelect}
            errorMessage='Selecione um produto para adicionar.'
          />

          <LocationSelect 
            locations={locations} 
            selectedFloor={selectedFloor} 
            selectedValue={homeLocationName} 
            placeholder={`Lista de ambientes no ${selectedFloor}`} 
            setSelectedValue={setHomeLocationName} 
            error={statusErrorLocationSelect}
            errorMessage='Selecione um ambiente antes de adicionar produtos à lista'
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
