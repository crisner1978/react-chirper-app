import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInitialData } from "../utils/api";

const initialState = {
  status: "idle",
  error: null,
  data: {
    users: {},
    tweets: {},
  },
};

const sharedSlice = createSlice({
  name: "shared",
  initialState,
  reducers: {
    getData: (state, { payload }) => {
      state.data = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAppData.fulfilled, (state, action) => {
      state.status = "succeeded";
      // Add any fetched data to the state
      state.data = action.payload;
    });
  },
});

export default sharedSlice.reducer;

export const selectData = (state) => state.shared;

export const fetchAppData = createAsyncThunk(
  "shared/fetchAppData",
  async () => await getInitialData()
);
