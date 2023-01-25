import React from 'react';
import { getMedia } from '../api/instagram';

const initialState = {
  user: null,
  post: null,
  postCurrentImage: null,
};

export const AuthContext = React.createContext({
  authContext: {
    creditUpdate: (data: Object) => {},
    getPost: async (data: Object) => {},
    changePostCurrentImage: (data: Object) => {},
  },
  authState: {
    ...initialState,
  },
});

const AuthContextProvider = (props: { children: React.ReactElement }) => {
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
        case 'changePostCurrentImage':
          return {
            ...prevState,
            postCurrentImage: action.payload,
          };
        default:
          break;
      }
    },
    { ...initialState },
  );

  const authContext = React.useMemo(
    () => ({
      creditUpdate: data => {
        dispatch({ type: 'sync', payload: data.payload });
      },
      getPost: async data => {
        const post = await getMedia(data.payload);
        dispatch({ type: 'getPost', payload: post });
      },
      changePostCurrentImage: data => {
        dispatch({ type: 'changePostCurrentImage', payload: data.payload });
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
