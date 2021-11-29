import instance from '../services/api';

export function useGetApiData({ type = '', endPoint, dispatch = function () { } }) {

  return function ({ params = {}, getResponse = function () { }, handleStatus = function () { } }) {

    handleStatus('running');
    instance[type](endPoint, { ...params })
      .then(res => {
        if (res.status >= 200) {
          getResponse(res.data);
          dispatch({ type: 'SUCCESS', payload: { message: 'Operação realizada com sucesso' } });
        }
      })
      .catch(catchError => {
        if (catchError.response?.status === 401) {
          dispatch({ type: 'STATUS_CODE_401', payload: { error: 'Login expirou. Necessário digitar senha novamente.' } });
        } else if (catchError.response?.status === 403) {
          dispatch({ type: 'STATUS_CODE_403', payload: { error: true, message: 'Acesso negado.' } });
        } else {
          dispatch({ type: 'UNKNOWLEDGE', payload: { error: true, message: 'contate o suporte técnico.' } });
        }
      })
      .finally(() => {
        handleStatus('done');
      })
  }

}