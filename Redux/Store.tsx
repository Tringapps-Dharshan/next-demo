import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { createUserSlice } from './Slices/createUserSlice';

const makeStore = () =>
  configureStore({
    reducer: {
        [createUserSlice.name]: createUserSlice.reducer
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);