import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import { ConfigProvider } from "antd";

//Css
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "@flaticon/flaticon-uicons/css/all/all.css";

//Utils
import { antStyleSettings } from './utils/antStyleSettings';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <ConfigProvider theme={{
      components: antStyleSettings
    }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
);

