import React from 'react';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

// Componente exibe a lista dos item do orçamento
export default function BudgetItems({ total }) {
  return (
    <Box marginTop={2} display='flex' flexDirection='row' justifyContent='space-between'>
      <div>
        <Typography gutterBottom variant="body1" display="inline">Total</Typography>
      </div>
      <div>
        <Chip variant="outlined" label={`R$ ${total}`} />
      </div>
    </Box>
  );
}
