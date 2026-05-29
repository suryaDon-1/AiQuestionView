import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authservices from "./authApi.js";

// register thunk
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await authservices.register(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

// login thunk
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await authservices.login(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed",
      );
    }
  },
);
//logout
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const res = await authservices.logout();
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Logout Failed",
    );
  }
});
//profile
export const profile = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const res = await authservices.profile();
    console.log(res);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "profile fetch Failed",
    );
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    // for pending state
    const setPending = (state) => {
      state.loading = true;
      state.status = "pending";
      state.error = null;
    };
    // rejecred res usable function  just write the same thing again and aginn we write this in fn and use where we need
    const setRejected = (state, action) => {
      state.loading = false;
      state.status = "rejected";
      state.error = action.payload;
    };

    // register
    builder
      .addCase(registerUser.pending, setPending)
      .addCase(registerUser.fulfilled, (state, ) => {
        state.loading = false;
        state.status = "fulfiled";
      })
      .addCase(registerUser.rejected, setRejected);
    //login
    builder
      .addCase(loginUser.pending, setPending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false;
        state.status = "fulfiled";
      })
      .addCase(loginUser.rejected, setRejected);
    //logout
    builder
      .addCase(logout.pending, setPending)
      .addCase(logout.fulfilled, (state, ) => {
        state.user = null;
        state.loading = false;
        state.status = "fullfield";
        state.error = false;
      })
      .addCase(logout.rejected, setRejected);
      //profile
    builder
      .addCase(profile.pending, setPending)
      .addCase(profile.fulfilled, (state,action ) => {
        state.loading = false;
        state.status = "fullfield";
        state.error = false;
        state.user= action.payload;
      })
      .addCase(profile.rejected, setRejected);
  },
});
export default authSlice.reducer
