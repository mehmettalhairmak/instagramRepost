import React from 'react';

const initialState = {
  user: null,
};

export const AuthContext = React.createContext({
  authContext: {
    creditUpdate: data => {},
  },
  authState: {
    ...initialState,
  },
});

const AuthContextProvider = props => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'sync':
          return {
            ...prevState,
            user: action.payload,
          };

        default:
          break;
      }
    },
    { ...initialState },
  );

  const authContext = React.useMemo(
    () => ({
      creditUpdate: async data => {
        dispatch({ type: 'sync', payload: data.payload });
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={{ authContext, authState: state }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
