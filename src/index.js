import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PlanetsProvider from './context/PlanetsProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>,
  );
