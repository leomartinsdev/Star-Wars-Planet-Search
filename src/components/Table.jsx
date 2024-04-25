import React, { useContext } from 'react';
import planetsContext from '../context/PlanetsContext';
import '../styles/Table.css';

function Table() {
  const { planets, planetInput, setPlanetInput,
    selected, setSelected, activeFilters, setActiveFilters,
    dataFilter, tratarOptions } = useContext(planetsContext);
  console.log('planetas', planets);

  const selectOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  return (
    <div>
      <div id='div-1'>
        <input
          type="text"
          name="planetInput"
          id="planetInput"
          placeholder="Filtrar por nome"
          data-testid="name-filter"
          value={ planetInput }
          onChange={ (e) => {
            setPlanetInput(e.currentTarget.value);
          } }
        />
      </div>
      <div id='div-2'>
        <select
          name="columnFilter"
          id="columnFilter"
          data-testid="column-filter"
          value={ selected.column }
          onChange={ (e) => {
            setSelected({ ...selected, column: e.target.value });
          } }
        >
          {selectOptions.filter(tratarOptions).map((column) => (
            <option value={ column } key={ column }>
              {column}
            </option>
          ))}
        </select>

        <select
          name="comparisonFilter"
          id="comparisonFilter"
          data-testid="comparison-filter"
          value={ selected.comparison }
          onChange={ (e) => {
            setSelected({ ...selected, comparison: e.target.value });
          } }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          type="number"
          name="valueFilter"
          id="valueFilter"
          data-testid="value-filter"
          value={ selected.value }
          onChange={ (e) => {
            setSelected({ ...selected, value: e.target.value });
          } }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => {
            setActiveFilters([...activeFilters, selected]);
            setSelected({
              column: 'population',
              comparison: 'maior que',
              value: 0,
            });
          } }
        >
          FILTRAR
        </button>

        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => {
            setActiveFilters([]);
            setSelected({
              column: 'population',
              comparison: 'maior que',
              value: 0,
            });
          } }

        >
          REMOVER FILTROS
        </button>
      </div>
      {
        activeFilters.map((filter, index) => (
          <div key={ index } data-testid="filter">
            <span>
              {filter.column}
              {' '}
              {filter.comparison}
              {' '}
              {filter.value}
            </span>
            <button
              onClick={ () => {
                const clonedArray = [...activeFilters];
                clonedArray.splice(index, 1);
                setActiveFilters(clonedArray);
              } }
            >
              X
            </button>
          </div>
        ))
      }
      { planets.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(planets[0])
                .map((column, index) => <th key={ index }>{column}</th>)}
            </tr>
          </thead>
          <tbody>
            { planets.filter((planet) => planet.name
              .toLowerCase().includes(planetInput.toLowerCase()))
              .filter(dataFilter)
              .map((planeta) => (
                <tr key={ planeta.name }>
                  <td>{ planeta.name }</td>
                  <td>{ planeta.rotation_period }</td>
                  <td>{ planeta.orbital_period }</td>
                  <td>{ planeta.diameter }</td>
                  <td>{ planeta.climate }</td>
                  <td>{ planeta.gravity }</td>
                  <td>{ planeta.terrain }</td>
                  <td>{ planeta.surface_water }</td>
                  <td>{ planeta.population }</td>
                  <td>{ planeta.films }</td>
                  <td>{ planeta.created }</td>
                  <td>{ planeta.edited }</td>
                  <td>{ planeta.url }</td>
                </tr>
              ))}
          </tbody>
        </table>)}
    </div>
  );
}

export default Table;
