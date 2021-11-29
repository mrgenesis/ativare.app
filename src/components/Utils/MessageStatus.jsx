import React from 'react';

import Hidden from './Hidden';
import Message from './Message';
import Loader from './Loader';

export default function MessageStatus({ status, loading, severity, message, textLoader, dataLink }) {
  return (
    <Hidden status={status}>
      <p />
      {
        loading
          ? <Loader text={textLoader} />
          : <Message severity={severity} message={message} dataLink={dataLink} />
      }
    </Hidden>
  );
}