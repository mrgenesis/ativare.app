import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Chip from '@material-ui/core/Chip';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

// TODO: Necessário melhorar o código desse compoente
export default function CustomizedDialogs({ materialsList, addMaterial, addedMaterials, handleDelete }) {
  const { control, errors } = useForm();
  const [open, setOpen] = React.useState(false);
  const [material, setMaterial] = React.useState('');
  const [charge, setCharge] = React.useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function handleMaterial(e) {
    const materialCode = parseInt(e.currentTarget.dataset.value, 10);
    const findedMaterial = materialsList.find(material => material.code === materialCode);
    setMaterial(findedMaterial);
  }
  function add() {
    addMaterial({
      code: material.code,
      _id: material._id,
      name: material.name,
      charge: charge
    });
  }

  return (
    <div>
      <Button variant="text" color="secondary" onClick={handleClickOpen}>
        <PostAddOutlinedIcon />
      </Button>
      <Dialog onClose={handleClose} fullWidth={true} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <div>
            {(addedMaterials.length > 0)
              ? addedMaterials.map((addedMaterial, idx) => (
                <Chip key={idx}
                  variant="outlined"
                  size="small"
                  id={idx}
                  value={idx}
                  onDelete={() => handleDelete(idx)}
                  label={addedMaterial?.name} />
              ))
              : <Typography variant='subtitle1'>Nenhum item adicionado</Typography>}
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth error={!!errors.material}>
            <InputLabel id='materialLabel'>Escolha um material</InputLabel>
            <Controller control={control}
              defaultValue=''
              as={
                <Select
                  fullWidth defaultValue="" type='hidden' labelId='materialLabel'>
                  {materialsList.map((value, index) => (
                    <MenuItem
                      key={index}
                      value={value.code}
                      onClick={handleMaterial}>
                      {value.name} - Limite: {value.limit}
                    </MenuItem>
                  ))}</Select>
              }
              rules={{ required: true }}
              name='material' />
          </FormControl>
          <TextField fullWidth
            name='charge'
            label='Qual é a carga em relação ao limite do material?'
            type='number' margin='normal' value={charge}
            onChange={(event) => setCharge(Math.abs(event.target.value))}
            error={!!errors.charge}
            helperText={!!errors.charge && 'Defina uma Carga. '}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={add} color="primary">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
