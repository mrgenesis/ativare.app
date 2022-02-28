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
        const locationConfigsNames = Object.keys(details[floorName].totalConfigs);
        const panelConfigsNames = ['panel', 'uDX201', 'ex214'];
        const materials = details[floorName].materials;
        const materialCodesList = Object.keys(materials);

        const Calcs = ({ material }) => (
          <div>
            <Typography color="textSecondary" variant="caption">
            <Typography component='span' variant='inherit' title='Total de carga gerada pelos produtos.'>Carga ocupada: {material.amountCharge}. </Typography>
            <Typography component='span' variant='inherit' title='Limite da carga de um item deste material'>Limite: {material.limit}. </Typography>
            <Typography component='span' variant='inherit' title={'Quantidade calculada com base na carga definifina nos produtos em relação ao seu limite. Valor aredondado para cima: ' + material.amount}>Calc.: {material.amountFloat.toLocaleString('pt-BR')} ({material.amount}). </Typography>
            <Typography component='span' variant='inherit' title='Quantidade de milisegundos gerada individualmente.'>{material.ms.toLocaleString('pt-BR')}ms por unidade. </Typography>
            </Typography>
          </div>
        );
        const Item = ({ item, haveCalc }) => (
          <Fragment>
            <Box marginTop={1} marginBottom={1}>
            {console.log(item)}
              <div>
                <Typography variant="body1" display="inline">{item.name}</Typography>
              </div>
              <div>
                <Chip variant="outlined" size="small" label={`Qdade: ${item.amount}`} />
                <Chip variant="outlined" size="small" label={`R$${item.unitPrice}/un`} />
                <Chip variant="outlined" size="small" label={`Sub Total: R$${item.amountPrice}`} />
              </div>
              {(haveCalc) ? <Calcs material={item} /> : ''}
            </Box> 
            <Divider component="li" />
          </Fragment>
        );

        return (
          <Fragment key={index}>
            <Typography variant="overline" display="inline"><strong>{floorName} </strong></Typography>
              <Typography component='span' variant='caption' color="textSecondary" title='Total de ms no andar.'> - {details[floorName].amountMs}ms </Typography>
              <Typography component='span' variant='caption' color="textSecondary" title='Total de portas no andar.'> - {details[floorName].amountPorts} portas </Typography>
              {locationConfigsNames.map(configItemName => <Item item={details[floorName].totalConfigs[configItemName]} key={configItemName} />)}
              {panelConfigsNames.map(itemName => <Item item={details[floorName][itemName]} key={itemName} />)}
              {materialCodesList.map(code => <Item item={materials[code]} key={code} haveCalc={true} />)}
          </Fragment>
        )
      })}
    </>
  );
}
