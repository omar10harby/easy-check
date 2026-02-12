import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSearchHistory, getWalletHistory } from '../../services/historyApi';
import { getErrorMessage } from '../../utils/errorHelpers';

// Async Thunks
export const fetchSearchHistoryThunk = createAsyncThunk(
  'user/fetchSearchHistory',
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const data = await getSearchHistory(page);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchWalletHistoryThunk = createAsyncThunk(
  'user/fetchWalletHistory',
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const data = await getWalletHistory(page);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState = {
  searchHistory: null,
  walletHistory: null,
  searchLoading: false,
  walletLoading: false,
  error: null
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.searchHistory = null;
      state.walletHistory = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Search History
      .addCase(fetchSearchHistoryThunk.pending, (state) => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchHistoryThunk.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchHistory = action.payload;
      })
      .addCase(fetchSearchHistoryThunk.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.payload;
      })

      // Fetch Wallet History
      .addCase(fetchWalletHistoryThunk.pending, (state) => {
        state.walletLoading = true;
        state.error = null;
      })
      .addCase(fetchWalletHistoryThunk.fulfilled, (state, action) => {
        state.walletLoading = false;
        state.walletHistory = action.payload;
      })
      .addCase(fetchWalletHistoryThunk.rejected, (state, action) => {
        state.walletLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearUserData, clearError } = historySlice.actions;
export default historySlice.reducer;