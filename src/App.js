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
      <h1>Star Wars Planets</h1>
      <Table />
    </>
  );
}

export default App;
