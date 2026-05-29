import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import interviewService from "./interviewApi.js";

// CREATE INTERVIEW
export const createInterview = createAsyncThunk(
  "interview/create",
  async (data, thunkAPI) => {
    try {
      const res = await interviewService.createInterview(data);
      console.log(res);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);
// SUBMIT ANSWER
export const submitAnswer = createAsyncThunk(
  "interview/submitAnswer",
  async ({ interviewId, data }, thunkAPI) => {
    try {
      const res = await interviewService.submitAnswer(data, interviewId);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);
// GET HISTORY
export const getHistory = createAsyncThunk(
  "interview/history",
  async (_, thunkAPI) => {
    try {
      const res = await interviewService.history();
      console.log(res);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);
// GET SINGLE INTERVIEW
export const getSingleInterview = createAsyncThunk(
  "interview/single",
  async (interviewId, thunkAPI) => {
    try {
      const res = await interviewService.single(interviewId);
      console.log(res);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);
//delete
export const deleteInterview = createAsyncThunk(
  "interview/delete",
  async (interviewId, thunkAPI) => {
    try {
      console.log(interviewId)
      const res = await interviewService.deleteInterview(interviewId);
      console.log(res);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const interviewSlice = createSlice({
  name: "interview",
  initialState: {
    currentInterview: null,
    history: [],
    evaluation: null,
    loading: false,
    error: null,
    success: false,
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
    //create Interview
    builder
      .addCase(createInterview.pending, setPending)
      .addCase(createInterview.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "fulfiled";
        state.success = true;
        console.log(action.payload.interview);
        state.currentInterview = action.payload.interview;
      });

    // submit answer
    builder
      .addCase(submitAnswer.pending, setPending)
      .addCase(submitAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.currentInterview = action.payload.interview;
        state.evaluation = action.payload.evaluation;
        state.status = "fulfiled";
        state.success = true;
      })
      .addCase(submitAnswer.rejected, setRejected);
    // HISTORY
    builder
      .addCase(getHistory.pending, setPending)

      .addCase(getHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload.interviews;
        state.status = "fulfiled";
        state.success = true;
      })

      .addCase(getHistory.rejected, setRejected);
    // SINGLE INTERVIEW
    builder
      .addCase(getSingleInterview.pending, setPending)

      .addCase(getSingleInterview.fulfilled, (state, action) => {
        state.loading = false;
        state.currentInterview = action.payload.interview;
        state.status = "fulfiled";
        state.success = true;
      })

      .addCase(getSingleInterview.rejected, setRejected);
  },
});
export default interviewSlice.reducer;
