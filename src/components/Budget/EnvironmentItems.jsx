import React from 'react';
import { Typography, Chip, Divider } from '@material-ui/core';


export default function EnvironmentItems({ locations, handleDeleteLocation }) {
  const locationsList = Object.keys(locations);
  return (
    <div>
      <Typography color="textSecondary"  variant='body1'>Ambientes adicionados:</Typography>
      {
        (locationsList.length === 0) 
        ? <Typography component='span' style={{color: 'red'}} variant='caption'>Nenhum ambiente encontrado</Typography> 
        : ''
      }
      <Typography color="textSecondary" component='span' variant='body2'>
        {
          locationsList.map(key =>
            <Chip 
              title={`Key Pad I2C: ${locations[key].I2CKeyPad}; Key Pad Multiplexado(s): ${locations[key].multiplexedKeyPad}; Ponto(s): ${locations[key].point}; Pulsador(es): ${locations[key].pulser}`}
              key={key} 
              margin='25px'
              disabled={(false)}
              variant="outlined"
              size="small"
              id={key}
              onDelete={() => handleDeleteLocation(key)}
              label={`${locations[key].floor} - ${locations[key].locationName}`}
            />
          )
        }
      </Typography>
      <br />
      <br />
      <Divider />
      <br />
      <br />
        </div>
    
  );
}
