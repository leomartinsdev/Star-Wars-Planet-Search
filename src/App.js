import React from 'react';
import './App.css';
import Table from './components/Table';
/* Force Reload */

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">STAR WARS</h1>
        <h2 className="app-subtitle">PLANET SEARCH SYSTEM</h2>
      </header>
      <Table />
    </div>
  );
}

export default App;
