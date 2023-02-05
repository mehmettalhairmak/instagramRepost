import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { RootState } from '../../store';
import { AuthUserModel } from './models';

const initialState: AuthUserModel = {
  access_token: '',
  user_id: '',
  availableLoginTimeLimit: '',
};

export const authUserSlice = createSlice({
  name: 'authUser',
  initialState: initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthUserModel>) => {
      state = action.payload;
      return action.payload;
    },
  },
});

export const { setAuthUser } = authUserSlice.actions;
export const selectAuthUser = (state: RootState) => state.authUser;

export default authUserSlice.reducer;
