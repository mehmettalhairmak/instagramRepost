import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { InstagramPostModelCache } from './models';

const initialState: InstagramPostModelCache = { isVideo: false, src: '' };

export const currentImageSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setCurrentImage: (
      state,
      action: PayloadAction<InstagramPostModelCache>,
    ) => {
      console.log(action.payload);
      return action.payload;
    },
  },
});

export const { setCurrentImage } = currentImageSlice.actions;
export const selectCurrentImage = (state: RootState) => state.currentImage;

export default currentImageSlice.reducer;
