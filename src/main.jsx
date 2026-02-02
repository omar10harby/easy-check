import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App.jsx';
import ErrorFallback from './components/common/ErrorFallback.jsx';
import './index.css';
import store from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);