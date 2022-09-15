const reducerAuth = (state, action) => {
  switch (action.type) {
    case 'LOGON':
      const { authorization, user } = action?.payload;
      localStorage.setItem('authorization', authorization);
      localStorage.setItem('user', JSON.stringify(user));

      return {
        ...state,
        auth: {
          isLogged: true,
          user
        },
        error: null
      };
    case 'SINGIN':
      localStorage.setItem('authData', JSON.stringify(action.payload));
      return {
        ...state,
        authData: action.payload
      };
    case 'LOGOUT':
      localStorage.removeItem('authorization');
      localStorage.removeItem('user');

      return {
        ...state,
        auth: {
          isLogged: false
        },
        error: null
      };
    case 'STATUS_CODE_401':
      localStorage.removeItem('authorization');
      localStorage.removeItem('user');

      return {
        ...state,
        auth: {
          isLogged: false
        },
        error: true,
        message: action.payload.message
      };
    case 'STATUS_CODE_403':
      return {
        ...state,
        error: true,
        message: action.payload.message
      }
    case 'AppError':
      return {
        ...state,
        error: action.payload.error,
        message: action.payload.message
      }
    case 'ERROR_REQUEST':
      return {
        ...state,
        error: true,
        message: action.payload.message
      }
    case 'UNKNOWLEDGE':
      return {
        ...state,
        error: action.payload.error,
        message: action.payload.message
      }
    case 'SUCCESS':
      return {
        ...state,
        error: null,
        message: action.payload.message
      }
    default:
      return state;
  }
}

export default reducerAuth;
