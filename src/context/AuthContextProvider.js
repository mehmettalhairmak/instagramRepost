import React from 'react';
import { getMedia } from '../api/instagram';

const initialState = {
  user: null,
  post: null,
};

export const AuthContext = React.createContext({
  authContext: {
    creditUpdate: data => {},
    getPost: link => {},
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
        case 'getPost':
          return {
            ...prevState,
            post: action.payload,
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
        console.log('context --> ' + JSON.stringify(data));
      },
      getPost: async link => {
        const post = await getMedia(link.payload);
        dispatch({ type: 'getPost', payload: post });
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
