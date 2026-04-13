import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';

import { ErrorBoundary } from './components';
import { FallbackError } from './components/FallbackError';
import './styles/index.css';
import { Toast } from './components/Toaster';
import RouterApp from './router/RouterApp';

const queryClient = new QueryClient();
function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <ErrorBoundary
          FallbackComponent={({ error, resetErrorBoundary }) => (
            <FallbackError error={error} resetErrorBoundary={resetErrorBoundary} />
          )}
          onError={(error: Error, info: React.ErrorInfo) => {
            console.error('Error global', error, info);
          }}
        >
          <RouterApp />
        </ErrorBoundary>
        <Toast />
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;
