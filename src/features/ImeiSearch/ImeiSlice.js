import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getServices, getImeiResult } from "../../services/imeiApi";
import { getErrorMessage } from "../../utils/errorHelpers"; // ✅ مضاف

const initialState = {
  services: [],
  selectedService: null,
  currentResult: null,
  loading: false,
  error: null,
};

export const fetchServicesThunk = createAsyncThunk(
  "imei/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const services = await getServices();

      return Array.isArray(services) ? services : services.results;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error)); // ✅ محدّث
    }
  },
);

export const getImeiResultThunk = createAsyncThunk(
  "imei/getResult",
  async (resultId, { rejectWithValue }) => {
    try {
      const result = await getImeiResult(resultId);
      return result;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error)); // ✅ محدّث
    }
  },
);

const imeiSlice = createSlice({
  name: "imei",
  initialState,
  reducers: {
    setSelectedService: (state, action) => {
      state.selectedService = action.payload;
      state.error = null;
    },
    setCurrentResult: (state, action) => {
      state.currentResult = action.payload;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetImeiState: (state) => {
      state.selectedService = null;
      state.currentResult = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServicesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
        state.error = null;
      })
      .addCase(fetchServicesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getImeiResultThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getImeiResultThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResult = action.payload;
        state.error = null;
      })
      .addCase(getImeiResultThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedService, setCurrentResult, clearError, resetImeiState } =
  imeiSlice.actions;

export default imeiSlice.reducer;