import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './slices/authUser/authUserSlice';
import instagramMediaReducer from './slices/instagramMedia/instagramMediaSlice';
import currentImageReducer from './slices/currentImage/currentImageSlice';

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    media: instagramMediaReducer,
    currentImage: currentImageReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
