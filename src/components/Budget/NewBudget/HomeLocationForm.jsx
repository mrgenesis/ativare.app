import React from 'react';
import { Typography, TextField, Button, Box, Divider } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Hidden from '../../Utils/Hidden';
import NotInterestedIcon from '@material-ui/icons/NotInterested';


export default function HomeLocationForm({ addLocation, selectedFloor }) {
  const [addLocationStatusButton, setAddLocationStatusButton] = React.useState(true);
  const addLocationMessageButton = (addLocationStatusButton) ? 'Ocultar formulário' : 'Exibir formulário';
  
  const [homeLocation, setHomeLocation] = React.useState('');
  const handleHomelocation = (e) => setHomeLocation(e.target.value.toLowerCase());

  const [I2CKeyPad, setI2CKeyPad] = React.useState('');
  const handleI2CKeyPad = (e) => setI2CKeyPad(e.target.value);


  const [multiplexedKeyPad, setMultiplexedKeyPad] = React.useState('');
  const handleMultiplexedKeyPad = (e) => setMultiplexedKeyPad(e.target.value);


  const [point, setPoint] = React.useState('');
  const handlePoint = (e) => setPoint(e.target.value);


  const [pulser, setPulser] = React.useState('');
  const handlePulser = (e) => setPulser(e.target.value);

  const changeEmptyToZero = x => (x === '') ? 0 : x;
  const handleAdd = () => { 
    addLocation({ 
      [`${selectedFloor} - ${homeLocation}`]: { 
        I2CKeyPad: changeEmptyToZero(I2CKeyPad), 
        multiplexedKeyPad: changeEmptyToZero(multiplexedKeyPad), 
        point: changeEmptyToZero(point), 
        pulser: changeEmptyToZero(pulser), 
        floor: selectedFloor,
        locationName: homeLocation
      }});
      setHomeLocation('');
      setI2CKeyPad('');
      setMultiplexedKeyPad('');
      setPoint('');
      setPulser('');
  }

  return (
    <>
      <br />
      <br />
      <Typography color="textSecondary"  variant='h6'>
        Adicione ambientes 
        <Button 
          onClick={() => setAddLocationStatusButton(!addLocationStatusButton)} 
          color="secondary" 
          title={addLocationMessageButton}>{(addLocationStatusButton) ? <NotInterestedIcon /> : <Add /> }
        </Button>
      </Typography>

      <Hidden status={(!addLocationStatusButton)}>
        <Box sx={{ minWidth: 120 }}>
          <TextField onChange={handleHomelocation} value={homeLocation} id="standardd-basic" label="Local da casa" variant="standard" fullWidth />
          <TextField onChange={handleI2CKeyPad} value={I2CKeyPad} id="stasndasrd-basicx" type='number' placeholder='Informe um número' label="Key Pad I2C" variant="standard" />
          <TextField onChange={handleMultiplexedKeyPad} value={multiplexedKeyPad} id="standard-basicx" type='number' placeholder='Informe um número' label="Key Pad Multiplexado" variant="standard" />
          <TextField onChange={handlePoint} value={point} id="sstandard-bsasicx" type='number' placeholder='Informe um número' label="Ponto" variant="standard" />
          <TextField onChange={handlePulser} value={pulser} id="stsandard-basicx" type='number' placeholder='Informe um número' label="Pulsador" variant="standard" />
          <Button fullWidth value='fim' onClick={handleAdd} variant='text'><strong>Adicionar ambiente</strong></Button>
        </Box>
        <br />
        <Divider />
        <br />
        <br />
      </Hidden>


    </>
  );
}
