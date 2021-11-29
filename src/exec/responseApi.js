export function responseApiGetData(type) {
  switch (type) {
    case 'STATUS_CODE_401':
      return function (dispatchFun) {
        dispatchFun({ type: 'STATUS_CODE_401', payload: { error: 'Login expirou. Necessário digitar senha novamente.' } });
        console.log('STATUS_CODE_401');
      }
    case 'UNKNOWLEDGE':
      return function (dispatchFun) {
        dispatchFun({ type: 'UNKNOWLEDGE', payload: { error: 'Error: contate o suporte técnico.' } });
        console.log('UNKNOWLEDGE');
      }
    default:
      return;
  }
}