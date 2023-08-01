import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import { store } from './app/store.js';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer closeOnClick={false} />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
