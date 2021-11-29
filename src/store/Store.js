import React from 'react';

import reducerAuth from '../reducers/reducerAuth';

const localAuthorization = localStorage.getItem('authorization')
  , localUser = localStorage.getItem('user');

const initialState = {
  auth: {
    isLogged: (!!localAuthorization && !!localUser),
    user: {}
  },
  error: null,
  message: null
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