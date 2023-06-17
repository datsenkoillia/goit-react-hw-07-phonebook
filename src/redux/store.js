import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';

const reducer = {
  contacts: contactsReducer,
};

export const store = configureStore({
  reducer,
});


