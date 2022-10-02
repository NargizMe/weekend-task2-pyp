import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/antd.css';
import {configureStore} from "@reduxjs/toolkit";
import driversState from './redux';
import {Provider} from "react-redux";
import { BrowserRouter } from "react-router-dom";

const store = configureStore({
    reducer: {
        drivers: driversState,
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store = {store}>
              <App />
          </Provider>
      </BrowserRouter>
  </React.StrictMode>
)
