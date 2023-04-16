import './index.css';

import DailyReport from 'pages/DailyReport';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DailyReport />
  </React.StrictMode>
);
