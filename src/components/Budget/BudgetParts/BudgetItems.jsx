import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

// Componente exibe a lista dos item do orçamento
export default function BudgetItems({ productsList, budgetFloors }) {
  return (
    budgetFloors.map(floorName => {
       const homeLoctions = Object.keys(productsList[floorName]);
      return (
        <Fragment key={floorName}>
          <Typography variant="overline" component={'h4'}><strong>{floorName}</strong></Typography>
          {
            homeLoctions.map(locationName => {
              const config = productsList[floorName][locationName].config
              const namesConfig = { I2CKeyPad: 'I2C Key Pad', pulser: 'Pulsador(es)', point: 'Ponto(s)', multiplexedKeyPad: 'Key Pad Multilexado' };
              const isANumberAndBiggestThatZero = n => n > 0 && !isNaN(n);
              const returnValidData = property => (isANumberAndBiggestThatZero(parseInt(config[property], 10))) ? `- ${namesConfig[property]}: ${config[property]}` : '';

              return (
                <React.Fragment key={locationName}>
                
                  <Typography color="textSecondary" variant="body1" display="inline"><strong>{locationName} </strong></Typography>
                  <Typography component='span' color="textSecondary" variant='caption' display="inline">{returnValidData('I2CKeyPad')} {returnValidData('multiplexedKeyPad')} {returnValidData('point')} {returnValidData('pulser')}</Typography>

                  {productsList[floorName][locationName].products.map(product => 
                    <Fragment key={product._id}>
                      <Box marginTop={2} display='flex' flexDirection='row' justifyContent='space-between'>
                        <div>
                          <Typography gutterBottom variant="body1" display="inline">{product.name}</Typography>
                        </div>
                        <div>
                          <Chip variant="outlined" size="small" label={`Local: ${locationName}`} />
                          <Chip variant="outlined" size="small" label={`Quantidade: ${product.amount}`} />
                        </div>
                      </Box>
                      <Typography color="textSecondary" variant="body2">
                        {product.description}
                      </Typography>
                      <Divider component="li" />
                    </Fragment>
                  )}
                </React.Fragment>
              )
            })
          }
        </Fragment>
      );
    })
  );
}
