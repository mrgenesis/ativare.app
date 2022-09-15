import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import displayIndividualItem from '../../constants/displayIndividualItem';
import EditMaterial from './EditMaterial';
import MessageStatus from '../Utils/MessageStatus';

import { Context } from '../../store/Store';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function IndividualItem({ response, setResponse }) {
  const [state] = React.useContext(Context);
  const classes = useStyles();
  const [displayEdit, setDisplayEdit] = React.useState('display');
  const edit = () => setDisplayEdit('edit');
  const display = () => setDisplayEdit('display');
  const labels = displayIndividualItem.material;
  
  return (
    <Card className={classes.root}>
      <CardContent>
        {(state.error)
          ? <MessageStatus status={false} severity='error' message={state.message} />
          : Object.keys(labels).map((key, idx) => {
            if (displayEdit === 'display') {
              return (
                <React.Fragment key={idx}>
                  <Typography className={classes.title} variant='body2' color="textSecondary" gutterBottom>
                    {labels[key]}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {response[key]}
                  </Typography>
                  <br />
                </React.Fragment>
              );
            }
            else {
              return (
                <React.Fragment key={idx}>
                  {(displayEdit === 'edit' && idx === 0)
                    ? <EditMaterial item={response} setItem={setResponse} />
                    : <></>
                  }
                </React.Fragment>
              );
            }
          })}
      </CardContent>
      <CardActions>
        {/**TODO: aqui vai o botão */}
        {displayEdit === 'display'
          ? <Button endIcon={<EditIcon />} onClick={edit}>Editar</Button>
          : <Button startIcon={<ArrowBack />} onClick={display}>Voltar</Button>
        }
      </CardActions>
    </Card>
  );
}
