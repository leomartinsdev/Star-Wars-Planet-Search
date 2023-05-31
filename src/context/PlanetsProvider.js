import { useState } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const fetchData = async () => {
    try {
      const data = await fetch('https://swapi.dev/api/planets');
      const json = await data.json();
      console.log('fez o fetch');
      const planetsObj = json.results; // essa constante contém um array de objetos, onde cada objeto é um planeta. Preciso remover a chave residents de cada um.
      planetsObj.map((planet) => delete planet.residents);
      setPlanets(planetsObj);
    } catch (error) {
      console.log(error);
    }
  };

  const values = { planets, setPlanets, fetchData };
  return (
    <planetsContext.Provider value={ values }>
      { children }
    </planetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
