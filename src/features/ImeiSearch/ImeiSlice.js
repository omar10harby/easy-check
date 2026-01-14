import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getServices, getImeiResult } from "../../services/imeiApi";

const initialState = {
  services: [],
  selectedService: null,
  loading: false,
  error: null,
};

/**
 * Fetch all available services
 */
export const fetchServicesThunk = createAsyncThunk(
  "imei/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const services = await getServices();
      
      // ✅ FIX: Return the response directly because it IS the array now
      // Check if it's already an array, or if it's wrapped (just in case)
      return Array.isArray(services) ? services : services.results;
      
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch services");
    }
  }
);

export const getImeiResultThunk = createAsyncThunk(
  "imei/getResult",
  async (resultId, { rejectWithValue }) => {
    try {
      const result = await getImeiResult(resultId);
      return result;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch result");
    }
  }
);

const imeiSlice = createSlice({
  name: "imei",
  initialState,
  reducers: {
 
    setSelectedService: (state, action) => {
      state.selectedService = action.payload;
      state.error = null;
    },

    clearError: (state) => {
      state.error = null;
    },
    resetImeiState: (state) => {
      state.selectedService = null;
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
        state.error = null;
      })
      .addCase(getImeiResultThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { setSelectedService, clearError, resetImeiState } =
  imeiSlice.actions;

export default imeiSlice.reducer;
