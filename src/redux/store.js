import { configureStore } from '@reduxjs/toolkit';
import auth from '../features/auth/authSlice';
import payment from '../features/payment/PaymentSlice';
import imei from '../features/ImeiSearch/ImeiSlice';
export const store = configureStore({
  reducer: {
    auth,
    payment,
    imei,
  },
  devTools: import.meta.env.DEV, 
});

export default store;