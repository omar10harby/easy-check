import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSearchHistory, getWalletHistory } from '../../services/userApi';
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
      // ✅ استخدم نفس الـ helper هنا أيضاً بدل error.message
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState = {
  searchHistory: null,
  walletHistory: null,
  loading: false,
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
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchHistoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.searchHistory = action.payload;
      })
      .addCase(fetchSearchHistoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Wallet History
      .addCase(fetchWalletHistoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWalletHistoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.walletHistory = action.payload;
      })
      .addCase(fetchWalletHistoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearUserData, clearError } = historySlice.actions;
export default historySlice.reducer;