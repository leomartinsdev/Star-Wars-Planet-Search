import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  // estado para os planetas retornados da API, já tratados para excluir a chave residents.
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('https://swapi.dev/api/planets');
        const json = await data.json();
        console.log('fez o fetch');
        const planetsObj = json.results; // essa constante contém um array de objetos, onde cada objeto é um planeta. Preciso remover a chave residents de cada um.
        planetsObj.map((planet) => delete planet.residents);
        setPlanets(planetsObj);
        console.log(planetsObj);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    console.log('passou x');
  }, []);

  // Fetch da API e tratamento do retorno para que a chave residents seja excluída.

  // estado para guardar o nome que está sendo filtrado
  const [planetInput, setPlanetInput] = useState('');

  // estado genérico para os inputs dos Filtros
  const [selected, setSelected] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  // estado para guardar os filtros ativos
  const [activeFilters, setActiveFilters] = useState([]);

  // função para tratar os dados e filtra-los de acordo com o que o usuário selecionou
  const dataFilter = (linha) => {
    const bools = [];

    activeFilters.forEach((filter) => {
      switch (filter.comparison) {
      case 'maior que':
        bools.push(Number(linha[filter.column]) > filter.value);
        break;
      case 'menor que':
        bools.push(Number(linha[filter.column]) < filter.value);
        break;
      case 'igual a':
        bools.push(linha[filter.column] === filter.value.toUpperCase());
        break;
      default:
        return true;
      }
    });

    return bools.every((el) => el);
  };

  // tratar options do Select: isso previne que o usuário consiga usar filtros duplicados
  const tratarOptions = (opcao) => !activeFilters
    .find((filtro) => opcao === filtro.column);

  const values = { planets,
    setPlanets,
    planetInput,
    setPlanetInput,
    selected,
    setSelected,
    activeFilters,
    setActiveFilters,
    dataFilter,
    tratarOptions };
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
