import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as paymentAPI from "../../services/paymentApi";

const initialState = {
  loading: false,
  error: null,
};

// 💰 Buy with Wallet (Instant - No redirect)
export const buyWithWalletThunk = createAsyncThunk(
  "payment/buyWithWallet",
  async (
    { imeiOrSerial, serviceId, amount, isSerial },
    { rejectWithValue }
  ) => {
    try {
      const data = await paymentAPI.buyWithWallet(
        imeiOrSerial,
        serviceId,
        amount,
        isSerial
      );
      return data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 💳 Create Top-up Payment (Redirect to Kashier)
export const createTopupPaymentThunk = createAsyncThunk(
  "payment/createTopup",
  async ({ amount }, { rejectWithValue }) => {
    try {
      const data = await paymentAPI.createTopupPayment(amount);
      return data; // { transactionId, paymentUrl, merchantTransactionId }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🛒 Create Guest Checkout Payment (Redirect to Kashier)
export const createGuestCheckoutThunk = createAsyncThunk(
  "payment/createGuestCheckout",
  async (
    { imeiOrSerial, serviceId, amount, isSerial, guestEmail },
    { rejectWithValue }
  ) => {
    try {
      const data = await paymentAPI.createGuestCheckout(
        imeiOrSerial,
        serviceId,
        amount,
        isSerial,
        guestEmail
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearPaymentError: (state) => {
      state.error = null;
    },
    clearPaymentData: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---- BUY WITH WALLET ----
      .addCase(buyWithWalletThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buyWithWalletThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(buyWithWalletThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---- CREATE TOPUP ----
      .addCase(createTopupPaymentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTopupPaymentThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createTopupPaymentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---- CREATE GUEST CHECKOUT ----
      .addCase(createGuestCheckoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGuestCheckoutThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createGuestCheckoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPaymentError, clearPaymentData } = paymentSlice.actions;
export default paymentSlice.reducer;