import React from 'react';

import reducerAuth from '../reducers/reducerAuth';

const secureParse = (obj) => {
  try { return JSON.parse(obj); }
  catch(e) { return null; }
}

const localAuthorization = localStorage.getItem('authorization')
  , localUser = localStorage.getItem('user')
  , authData = secureParse(localStorage.getItem('authData'));

const initialState = {
  auth: {
    isLogged: (!!localAuthorization && !!localUser),
    user: {}
  },
  error: null,
  message: null,
  authData
};
const Context = React.createContext(initialState);

const Store = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducerAuth, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  );
}

export { Context };
export default Store;