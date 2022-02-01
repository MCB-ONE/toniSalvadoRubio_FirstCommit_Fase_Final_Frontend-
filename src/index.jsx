// Imports de React
import React from 'react';
import ReactDOM from 'react-dom';
// Query client imports
import { QueryClient, QueryClientProvider } from 'react-query';
// Redux imports
import { Provider } from 'react-redux';

// Store and main component import
import store from './store/index';
import App from './components/App';

// Style sheets imports
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/css/index.scss';

// Query-Client configuration
// Create a client
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
