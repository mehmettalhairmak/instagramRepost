import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPlaces } from '../../../api/place';
import { RootState } from '../../store';
import { Place, Places } from './models';

export interface PlaceType {
  status: 'idle' | 'loading' | 'failed';
  place: Places | null;
  filteredPlaces: Place[] | null;
}

const initialState: PlaceType = {
  status: 'idle',
  place: null,
  filteredPlaces: null,
};

export const getPlaceAsync = createAsyncThunk(
  'place/get',
  async (coordinates: any) => {
    const response = await getPlaces(
      coordinates.longitude,
      coordinates.latitude,
    );
    return response;
  },
);

export const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPlaceAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(getPlaceAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.place = action.payload;
        if (state.place !== null) {
          const array: any = [];
          state.place.features.map((data, index) => {
            if (data.properties.name !== '') {
              array.push(data);
            }
          });
          state.filteredPlaces = array;
        }
      })
      .addCase(getPlaceAsync.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const selectPlace = (state: RootState) => state.place;

export default placeSlice.reducer;
