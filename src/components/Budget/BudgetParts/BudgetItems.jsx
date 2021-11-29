import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

// Componente exibe a lista dos item do orçamento
export default function BudgetItems({ productsList, budgetFloors }) {
  return (
    budgetFloors.map((floorName, idx) => (
      <Fragment key={idx}>
        <Typography variant="overline" display="inline"><strong>{floorName}</strong></Typography>
        {productsList.map((individualProduct, idx) => {
          return (
            (individualProduct.floor === floorName)
              ? (
                <Fragment key={idx}>
                  <Box marginTop={2} display='flex' flexDirection='row' justifyContent='space-between'>
                    <div>
                      <Typography gutterBottom variant="body1" display="inline">{individualProduct.name}</Typography>
                    </div>
                    <div>
                      <Chip variant="outlined" size="small" label={`Andar: ${individualProduct.floor}`} />
                      <Chip variant="outlined" size="small" label={`Local: ${individualProduct.homeLocationName}`} />
                      <Chip variant="outlined" size="small" label={`Quantidade: ${individualProduct.amount}`} />
                    </div>
                  </Box>
                  <Typography color="textSecondary" variant="body2">
                    {individualProduct.description}
                  </Typography>
                  <Divider component="li" />
                </Fragment>
              )
              : ''
          );
        })}
      </Fragment>
    ))
  );
}