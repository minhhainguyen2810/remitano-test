import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export interface CounterState {
  showLogin: boolean;
  showSignup: boolean;
  loadingLogin: boolean;
  loadingSignup: boolean;
  showShareVideo: boolean;
  loadingShareVideo: boolean;
  sharedVideos?: any[];
  user?: string;
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

export const shareVideo = createAsyncThunk(
  "home/shareVideo",
  async (params: any) => {
    const response = await apiClient.post(`/youtubeShare`, params);
    return response;
  }
);

export const getSharedVideos = createAsyncThunk(
  "home/getSharedVideos",
  async () => {
    const response = await apiClient.get(`/youtubeShare`);
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
      state.showShareVideo = !state.showShareVideo;
    },
  },
  extraReducers: (builder) => {
    // authenticate
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
    // signup
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
    // shareVideo
    builder.addCase(shareVideo.pending, (state, action) => {
      state.loadingShareVideo = true;
    });
    builder.addCase(shareVideo.fulfilled, (state, action) => {
      state.loadingShareVideo = false;
      state.showShareVideo = false;
    });
    builder.addCase(shareVideo.rejected, (state, action) => {
      state.loadingShareVideo = false;
    });
    // getSharedVideos
    builder.addCase(getSharedVideos.pending, (state, action) => {
      state.loadingShareVideo = true;
    });
    builder.addCase(getSharedVideos.fulfilled, (state, action) => {
      state.loadingShareVideo = false;
      state.sharedVideos = action.payload.data;
    });
    builder.addCase(getSharedVideos.rejected, (state, action) => {
      state.loadingShareVideo = false;
    });
  },
});

export const { showLogin, showSignup, showShareVideo } = homeSlice.actions;

export default homeSlice.reducer;
