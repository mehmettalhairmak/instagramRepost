import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMedia } from '../../../api/instagram';
import { RootState } from '../../store';
import { InstagramPostModelAPI } from './models';

export interface instagramMediaType {
  status: 'idle' | 'loading' | 'failed';
  media: InstagramPostModelAPI | null;
}

const initialState: instagramMediaType = {
  status: 'idle',
  media: null,
};

export const getMediaAsync = createAsyncThunk(
  'instagram/getMedia',
  async (shortCode: string) => {
    const response = await getMedia(shortCode);
    return response;
  },
);

export const instagramMediaSlice = createSlice({
  name: 'instagramMedia',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMediaAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(getMediaAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.media = action.payload;
      })
      .addCase(getMediaAsync.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const selectMedia = (state: RootState) => state.media;

export default instagramMediaSlice.reducer;
