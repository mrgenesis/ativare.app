import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import TurnedInNotOutlinedIcon from '@material-ui/icons/TurnedInNotOutlined';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Divider from '@material-ui/core/Divider';

export default function BudgetPartsHeader({ code, customer, createAt }) {

  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    , date = new Date(createAt)
    , formatedDate = `${date.getDate()}, ${months[date.getMonth()]} ${date.getFullYear()}`;

  return (
    <>
      <Box marginBottom={4} display='flex' flexDirection='column'>
        <Typography gutterBottom variant="h6">
          <PersonOutlineIcon /> {customer.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          <TurnedInNotOutlinedIcon fontSize='small' />{code} &emsp;
          <CalendarTodayIcon fontSize='small' /> {formatedDate}
        </Typography>
        <Divider variant='fullWidth' />
      </Box>
    </>
  );
}