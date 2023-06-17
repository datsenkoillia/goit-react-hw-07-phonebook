import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOperations';

const handlePending = state => {
  state.contacts.isLoading = true;
};

const handleRejected = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = action.payload;
};

const handleFulfilledContacts = (state, { payload }) => {
  state.contacts.isLoading = false;
  state.contacts.error = null;
  state.contacts.items = payload;
};

const handleFulfilledAddContact = (state, { payload }) => {
  state.contacts.isLoading = false;
  state.contacts.error = null;
  state.contacts.items.push(payload);
};

const handleFulfilledDeleteContact = (state, { payload }) => {
  state.contacts.isLoading = false;
  state.contacts.error = null;
  state.contacts.items = state.contacts.items.filter(
    ({ id }) => id !== payload
  );
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

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, handleFulfilledContacts)
      .addCase(addContact.fulfilled, handleFulfilledAddContact)
      .addCase(deleteContact.fulfilled, handleFulfilledDeleteContact)
      .addMatcher(action => {
        action.type.endsWith('/pending');
      }, handlePending)
      .addMatcher(action => {
        action.type.endsWith('/rejected');
      }, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;

export const { filtered } = contactsSlice.actions;
export const contactsSelector = state => state.contacts.contacts.items;
export const filterSelector = state => state.contacts.filter;

//  extraReducers: {
//     [fetchContacts.pending]: handlePending,
//     [fetchContacts.fulfilled](state, { payload }) {
//       state.isLoading = false;
//       state.error = null;
//       state.contacts.items = payload;
//     },
//     [fetchContacts.rejected]: handleRejected,
//     [addContact.pending]: handlePending,
//     [addContact.fulfilled](state, { payload }) {
//       state.contacts.isLoading = false;
//       state.contacts.error = null;
//       state.contacts.items.push(payload);
//     },
//     [addContact.rejected]: handleRejected,
//     [deleteContact.pending]: handlePending,
//     [deleteContact.fulfilled](state, { payload }) {
//       state.isLoading = false;
//       state.error = null;
//       state.contacts.items = state.contacts.items.filter(({ id }) => id !== payload);
//     },
//     [deleteContact.rejected]: handleRejected,
//   },
