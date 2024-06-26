import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface AuthState {
  email: string;
  iduser: string;
  token: string;
  isUpdated: boolean;
  name: string;
  photo: string;
  familyName: string;
  givenName: string;
}

const initialState: AuthState = {
  email: '',
  iduser: '',
  token: '',
  isUpdated: false,
  name: '',
  photo: '',
  familyName: '',
  givenName: '',
};

export const authSlide = createSlice({
  name: 'auth',
  initialState: {
    dataAuth: initialState,
  },
  reducers: {
    addAuth: (state, action: PayloadAction<AuthState>) => {
      state.dataAuth = action.payload;
    },
    removeAuth: state => {
      state.dataAuth = initialState;
    },
  },
});

export const {addAuth, removeAuth} = authSlide.actions;

export default authSlide.reducer;
