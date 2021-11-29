import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SimpleAlerts(props) {
  const classes = useStyles();
  let severitys = { error: "error", warning: "warning", info: "info", success: "success" };
  const [severity, setSeverity] = React.useState('success');
  const [message, setMessage] = React.useState('padrão');
  React.useEffect(() => {
    setSeverity(props.severity);
    setMessage(props.message);
  }, [props.message, props.severity]);
  return (
    <div className={classes.root}>
      <Alert severity={severitys[severity]}>
        {message}
        {props?.dataLink ? <Link to={props?.dataLink?.to}>{props?.dataLink?.text}</Link> : ''}</Alert>
    </div>
  );
}