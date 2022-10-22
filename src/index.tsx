import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import PageCounter from 'pages/PageCounter';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PageCounter />
  </React.StrictMode>
);
