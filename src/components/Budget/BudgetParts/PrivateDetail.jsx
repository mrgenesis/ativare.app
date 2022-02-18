import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

// Componente exibe a lista dos item do orçamento
export default function PrivateDetail({ hiddenFunc, budgetFloors, privateDetails: { AURAServer, materials, adicionalsCalc, ...details } }) {
  return (
    <>
      <Box marginTop={5}>
        <Button onClick={() => hiddenFunc(false)} display="inline"><VisibilityOffOutlinedIcon fontSize='small' /></Button>
      </Box>
      <div>
        <Typography color="textSecondary" variant="caption">
          <Typography component='span' variant='inherit' title='Um por orçamento'>{AURAServer.name}: R${AURAServer.unitPrice}. </Typography>
        </Typography>
        <Divider component="li" />
      </div>

      {budgetFloors.map((floorName, index) => {
        const materials = details[floorName].materials;
        const materialCodesList = Object.keys(materials);
        return <Fragment key={index}>
          <Typography variant="overline" display="inline"><strong>{floorName} </strong></Typography>
            <Typography component='span' variant='caption' color="textSecondary" title='Total de ms no andar.'> - {details[floorName].amountMs}ms </Typography>
            <Typography component='span' variant='caption' color="textSecondary" title='Total de portas no andar.'> - {details[floorName].amountPorts} portas </Typography>
          <div>
          <Typography color="textSecondary" variant="caption">

            <Typography component='span' variant='inherit' title='Cálculo da contidade por andar.'>
            <strong>{details[floorName].uDX201.name}</strong> Qdade {details[floorName].uDX201.amount}, R${details[floorName].uDX201.unitPrice}/uni, subtotal R${details[floorName].uDX201.amountPrice}
            <Divider component="li" />
            </Typography>

            <Typography component='span' variant='inherit' title='Cálculo da contidade por andar.'>
            <strong>{details[floorName].ex214.name}</strong> Qdade {details[floorName].ex214.amount}, R${details[floorName].ex214.unitPrice}/uni, subtotal R${details[floorName].ex214.amountPrice}
            <Divider component="li" />
            </Typography>

            <Typography component='span' variant='inherit' title='Cálculo da contidade por andar.'>
            <strong>{details[floorName].totalConfigs.I2CKeyPad.name}</strong> Qdade {details[floorName].totalConfigs.I2CKeyPad.amount}, R${details[floorName].totalConfigs.I2CKeyPad.unitPrice}/uni, subtotal R${details[floorName].totalConfigs.I2CKeyPad.amountPrice}
            <Divider component="li" />
            </Typography>

            <Typography component='span' variant='inherit' title='Cálculo da contidade por andar.'>
            <strong>{details[floorName].totalConfigs.multiplexedKeyPad.name}</strong> Qdade {details[floorName].totalConfigs.multiplexedKeyPad.amount}, R${details[floorName].totalConfigs.multiplexedKeyPad.unitPrice}/uni, subtotal R${details[floorName].totalConfigs.multiplexedKeyPad.amountPrice}
            <Divider component="li" />
            </Typography>

            <Typography component='span' variant='inherit' title='Cálculo da contidade por andar.'>
            <strong>{details[floorName].totalConfigs.point.name}</strong> Qdade {details[floorName].totalConfigs.point.amount}, R${details[floorName].totalConfigs.point.unitPrice}/uni, subtotal R${details[floorName].totalConfigs.point.amountPrice}
            <Divider component="li" />
            </Typography>

            <Typography component='span' variant='inherit' title='Cálculo da contidade por andar.'>
            <strong>{details[floorName].totalConfigs.pulser.name}</strong> Qdade {details[floorName].totalConfigs.pulser.amount}, R${details[floorName].totalConfigs.pulser.unitPrice}/uni, subtotal R${details[floorName].totalConfigs.pulser.amountPrice}
            <Divider component="li" />
            </Typography>
            
            <Typography component='span' variant='inherit' title='Cálculo da contidade por andar.'>
            <strong>{details[floorName].panel.name}</strong> Qdade {details[floorName].panel.amount}, R${details[floorName].panel.unitPrice}/uni, subtotal R${details[floorName].panel.amountPrice}
            <Divider component="li" />
            </Typography>

           </Typography>
          </div>
            
          {materialCodesList.map(code => {
            return (
              
              <Fragment key={floorName + code}>
              <Box marginTop={1}>
                <div>
                  <Typography variant="body1" display="inline">{materials[code].name}</Typography>
                </div>
                <div>
                  <Chip variant="outlined" size="small" label={`Qdade: ${materials[code].amount}`} />
                  <Chip variant="outlined" size="small" label={`R$${materials[code].unitPrice}/un`} />
                  <Chip variant="outlined" size="small" label={`Sub Total: R$${materials[code].amountPrice}`} />
                </div>
                <div>
                  <Typography color="textSecondary" variant="caption">
                  <Typography component='span' variant='inherit' title='Total de carga gerada pelos produtos.'>Carga ocupada: {materials[code].amountCharge}. </Typography>
                  <Typography component='span' variant='inherit' title='Limite da carga de um item deste material'>Limite: {materials[code].limit}. </Typography>
                  <Typography component='span' variant='inherit' title={'Quantidade calculada com base na carga definifina nos produtos em relação ao seu limite. Valor aredondado para cima: ' + materials[code].amount}>Calc.: {materials[code].amountFloat.toLocaleString('pt-BR')} ({materials[code].amount}). </Typography>
                  <Typography component='span' variant='inherit' title='Quantidade de milisegundos gerada individualmente.'>{materials[code].ms.toLocaleString('pt-BR')}ms por unidade. </Typography>
                  </Typography>
                </div>
              </Box>
              <br />
              <Divider component="li" />
            </Fragment>
            )
            
          }
          )}
        </Fragment>
      })}
    </>
  );
}
