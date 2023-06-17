import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOperations';

const handlePending = state => {
  state.contacts.isLoading = true;
};

const handleRejected = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    // contacts: [],
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },

  reducers: {
    filtered: (state, { payload }) => {
      state.filter = payload.toLowerCase();
    },
  },

  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.error = null;
      state.contacts.items = payload;
    },
    [fetchContacts.rejected]: handleRejected,
    [addContact.pending]: handlePending,
    [addContact.fulfilled](state, { payload }) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items.push(payload);
    },
    [addContact.rejected]: handleRejected,
    [deleteContact.pending]: handlePending,
    [deleteContact.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.error = null;
      state.contacts.items = state.contacts.items.filter(({ id }) => id !== payload);
    },
    [deleteContact.rejected]: handleRejected,
  },
});

// const persistConfigContacts = {
//   key: 'contacts',
//   storage,
//   blacklist: ['filter'],
// };

// export const persistedContactsReducer = persistReducer(
//   persistConfigContacts,
//   contactsSlice.reducer
// );

export const contactsReducer = contactsSlice.reducer;

export const { filtered } = contactsSlice.actions;
export const contactsSelector = state => state.contacts.contacts.items;
export const filterSelector = state => state.contacts.filter;
