// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    // Initial dummy data (optional)
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      address: '123 Main St, Anytown, USA',
      // Removed dateOfBirth and role
    },
    // Add more users as needed
  ],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    addUser(state, action) {
      state.users.push(action.payload);
    },
    updateUser(state, action) {
      const index = state.users.findIndex(user => user.id === Number(action.payload.id));
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    removeUser(state, action) {
      state.users = state.users.filter(user => user.id !== Number(action.payload));
    },
  },
});

export const { setUsers, addUser, updateUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
