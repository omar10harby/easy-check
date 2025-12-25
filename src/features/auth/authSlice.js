import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from '../../services/authApi';

const initialState = {
  user: null, 
  isAuthenticated: false,
  loading: true, 
  actionLoading: false,
  error: null,
};


export const verifyAuthThunk = createAsyncThunk(
  'auth/verifyAuth',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authAPI.verifyAuth();
      return data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authAPI.login(credentials);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const registerThunk = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authAPI.register(userData);
      return data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout();
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ============================================
// 🎨 SLICE
// ============================================
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // تحديث الرصيد يدوياً (مثلاً بعد عملية دفع ناجحة)
    updateBalance: (state, action) => {
      if (state.user) {
        state.user.balance = action.payload;
      }
    },
    // مسح الأخطاء عند إغلاق الـ Modal
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- VERIFY AUTH ---
      .addCase(verifyAuthThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyAuthThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload; // البيانات القادمة من user_info
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(verifyAuthThunk.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // --- LOGIN ---
      .addCase(loginThunk.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload; // الكائن الذي يحتوي على التوكن والبيانات
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // --- REGISTER ---
      .addCase(registerThunk.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.actionLoading = false;
        // لا نسجل الدخول تلقائياً، ننتظر تسجيل الدخول من الـ Modal
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // --- LOGOUT ---
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.actionLoading = false;
      });
  },
});

export default authSlice.reducer;
export const { updateBalance, clearError } = authSlice.actions;
