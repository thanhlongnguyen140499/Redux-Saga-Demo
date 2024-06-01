import {createSlice} from '@reduxjs/toolkit';
import {USER_TYPE} from '../../types/user';

export interface UserState {
  users: USER_TYPE[];
}

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    fetchUsersFromFirestore: () => {},
  },
});

export const {fetchUsersFromFirestore} = userSlice.actions;

export default userSlice.reducer;
