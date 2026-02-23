import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { verifyAuthThunk } from './features/auth/authSlice';
import AppRouter from './router/AppRouter';
import GlobalLoader from './components/common/GlobalLoader';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(verifyAuthThunk());
  }, [dispatch]);

  if (loading) {
    return (
      <GlobalLoader message="Loading..." />
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 1500,
          style: {
            background: '#fff',
            color: '#454545',
            fontWeight: '600',
            fontSize: '14px',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
          success: {
            iconTheme: {
              primary: '#454545',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <AppRouter />
    </>
  );
}

export default App;