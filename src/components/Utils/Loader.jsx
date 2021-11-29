import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function CircularUnderLoad({ text }) {
  const TextOf = ({ text }) => <p>{text}</p>;
  const [textLoader, setTextLoader] = React.useState(<TextOf text={text ? text : 'Aguarde...'} />);

  React.useEffect(() => {
    if (text === 'none') {
      setTextLoader('');
    }
  }, [text]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
      <CircularProgress color='secondary' />
      {textLoader}
    </div>
  );
}
