import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface AuthState {
  email: string;
  id: string;
  token: string;
}

const initialState: AuthState = {
  email: '',
  id: '',
  token: '',
};

export const authSlide = createSlice({
  name: 'auth',
  initialState: {
    dataAuth: initialState,
  },
  reducers: {
    addAuth: (state, action: PayloadAction<AuthState>) => {

      console.log("vào đây sdahsdsahdsahdsahdu")
      state.dataAuth = action.payload;
    },
    removeAuth:(state)=>{
        state.dataAuth = initialState
    }
  },
});

export const {addAuth , removeAuth} = authSlide.actions;

export default authSlide.reducer;

