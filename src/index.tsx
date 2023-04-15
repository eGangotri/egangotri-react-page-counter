import './index.css';

import PageCounter from 'pages/PageCounter';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PageCounter />
  </React.StrictMode>
);
