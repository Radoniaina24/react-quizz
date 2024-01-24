import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
/*import './components/Corso/scss/bootstrap.scss'
import "./components/Corso/scss/corso.scss"
import "bootstrap/dist/js/bootstrap.min" */
import "./index.scss"
import {BrowserRouter} from "react-router-dom";
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
          <BrowserRouter>
              <App/>
          </BrowserRouter>
  </React.StrictMode>
);
