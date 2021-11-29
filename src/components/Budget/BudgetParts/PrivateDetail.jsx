import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

// Componente exibe a lista dos item do orçamento
export default function PrivateDetail({ hiddenFunc, budgetFloors, materials }) {

  return (
    <>
      <Box marginTop={5}>
        <Button onClick={() => hiddenFunc(false)} display="inline"><VisibilityOffOutlinedIcon fontSize='small' /></Button>
      </Box>

      {budgetFloors.map((floorName, index) => (
        <Fragment key={index}>
          <Typography variant="overline" display="inline"><strong>{floorName}</strong></Typography>
          {materials.map((material, idx) => {
            return (
              (floorName === material.floor)
                ? (
                  <Fragment key={idx}>
                    <Box marginTop={1}>
                      <div>
                        <Typography variant="body1" display="inline">{material.name}</Typography>
                      </div>
                      <div>
                        <Chip variant="outlined" size="small" label={`Qdade: ${material.roundedAmount}`} />
                        <Chip variant="outlined" size="small" label={`Unit: R$${material.unitPrice}`} />
                        <Chip variant="outlined" size="small" label={`Sub Total: R$${material.subTotal}`} />
                      </div>
                      <div>
                        <Typography color="textSecondary" variant="caption">
                          Total nos produtos: {material.totalAmountInProducts}, Calc: {material.amountCalc.toLocaleString('pt-BR')}
                      , Limite/capacidade deste material: {material.limit}
                        </Typography>
                      </div>
                    </Box>
                    <br />
                    <Divider component="li" />
                  </Fragment>
                )
                : ''
            )
          }
          )}
        </Fragment>
      ))}
    </>
  );
}