import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NAaF5cWWRCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWX5cdXRUQ2BfVUNyVks=');

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

