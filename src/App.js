import React, { useContext, useEffect } from 'react';
import './App.css';
import planetsContext from './context/PlanetsContext';
import Table from './components/Table';

function App() {
  const { fetchData } = useContext(planetsContext);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Hello App!</h1>
      <Table />
    </>
  );
}

export default App;
