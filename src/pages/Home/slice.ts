import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export interface CounterState {
  showLogin: boolean;
  showSignup: boolean;
  loadingLogin: boolean;
  loadingSignup: boolean;
  showShareVideo: boolean,
  loadingShareVideo: boolean,
  user?: string;
};
}

const initialState: CounterState = {
  showLogin: false,
  loadingLogin: false,
  showSignup: false,
  loadingSignup: false,
  showShareVideo: false,
  loadingShareVideo: false,
};

export const authenticate = createAsyncThunk(
  "home/authenticate",
  async (params?: any) => {
    const response = await apiClient.post(`/user/authenticate`, params);
    return response;
  }
);

export const register = createAsyncThunk(
  "home/register",
  async (params: any) => {
    const response = await apiClient.post(`/user/register`, params);
    return response;
  }
);

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    showLogin: (state) => {
      state.showLogin = !state.showLogin;
    },
    showSignup: (state) => {
      state.showSignup = !state.showSignup;
    },
    showShareVideo: (state) => {
      state.showSignup = !state.showSignup;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticate.pending, (state, action) => {
      state.loadingLogin = true;
    });
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.loadingLogin = false;
      state.showLogin = false;
      state.user = action.payload.data.username;
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      state.loadingLogin = false;
    });
    builder.addCase(register.pending, (state, action) => {
      state.loadingSignup = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loadingSignup = false;
      state.showSignup = false;
      state.user = action.payload.data.username;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loadingSignup = false;
    });
  },
});

export const { showLogin, showSignup } = homeSlice.actions;

export default homeSlice.reducer;
