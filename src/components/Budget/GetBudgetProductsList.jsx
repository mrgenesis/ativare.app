import React, { Fragment } from 'react';
import { Typography, Box, Button, Chip, Avatar, Divider } from '@material-ui/core';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';

import Hidden from '../Utils/Hidden';
import AddItem from './AddItem';

export default function NovoOrcamento({ submit }) {
  const floors = [];
  const [addedProductsList, setAddedProductsList] = React.useState([]);
  const [hiddenMessageErrorSave, setHiddenMessageErrorSave] = React.useState(true);


  addedProductsList.map(added => {
    if (floors.indexOf(added.floor) === -1) {
      floors.push(added.floor);
    }
    return '';
  })

  return (
    <>
      <AddItem addedProductsList={addedProductsList} add={setAddedProductsList} />

      <br />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (addedProductsList.length < 1) {
            setHiddenMessageErrorSave(false);
            return;
          }
          submit({ productsList: addedProductsList });
        }}>
        <Box id='Box' mb={2} container={1} display='flex' flexDirection='column' justifyContent='center' alignItems="center">

          <Button fullWidth endIcon={<SaveOutlinedIcon />} value='fim' type='submit'>Criar Orçamento</Button>
        </Box>

        {(floors.length > 0)
          ? floors.map((floorName, index) => (
            <Fragment key={index}>
              <Divider variant="middle" />
              <p>{floorName}</p>
              <Box
                width='100%'
                mb={2}
                id={`sacao-pavimento-${floors[index]}`}
                container={1}
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems="center">

                <Box key={index} container={1}>
                  {addedProductsList?.map((addedProduct, idx) => {
                    if (addedProduct.floor === floors[index]) {
                      return <Chip key={idx}
                        variant="outlined"
                        size="small"
                        avatar={<Avatar>{addedProduct.amount}</Avatar>}
                        label={addedProduct?.name + ' - ' + addedProduct?.homeLocationName} />
                    }
                  })}
                </Box>
              </Box>
            </Fragment>
          ))
          : <>
            <Typography variant='subtitle2'>Nenhum produto adicionado</Typography>
            <Hidden status={hiddenMessageErrorSave}>
              <Typography color='error' variant='subtitle2'>Necessário adicionar pelo meno um produto</Typography>
            </Hidden>
          </>
        }
      </form>
    </>
  );
}
