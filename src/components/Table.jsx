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
    <div className="table-wrapper">
      <div className="filters-glass-panel">
        <div className="search-group">
          <input
            type="text"
            name="planetInput"
            id="planetInput"
            className="styled-input neon-focus"
            placeholder="SEARCH PLANET..."
            data-testid="name-filter"
            value={ planetInput }
            onChange={ (e) => {
              setPlanetInput(e.currentTarget.value);
            } }
          />
        </div>
        <div className="numeric-filters-group">
          <select
            name="columnFilter"
            id="columnFilter"
            className="styled-select neon-focus"
            data-testid="column-filter"
            value={ selected.column }
            onChange={ (e) => {
              setSelected({ ...selected, column: e.target.value });
            } }
          >
            {selectOptions.filter(tratarOptions).map((column) => (
              <option value={ column } key={ column }>
                {column.toUpperCase()}
              </option>
            ))}
          </select>

          <select
            name="comparisonFilter"
            id="comparisonFilter"
            className="styled-select neon-focus"
            data-testid="comparison-filter"
            value={ selected.comparison }
            onChange={ (e) => {
              setSelected({ ...selected, comparison: e.target.value });
            } }
          >
            <option value="maior que">GREATER THAN</option>
            <option value="menor que">LESS THAN</option>
            <option value="igual a">EQUAL TO</option>
          </select>

          <input
            type="number"
            name="valueFilter"
            id="valueFilter"
            className="styled-input num-input neon-focus"
            data-testid="value-filter"
            value={ selected.value }
            onChange={ (e) => {
              setSelected({ ...selected, value: e.target.value });
            } }
          />

          <button
            type="button"
            className="styled-button neon-button"
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
            APPLY FILTER
          </button>

          <button
            type="button"
            className="styled-button neon-button-danger"
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
            CLEAR ALL
          </button>
        </div>
      </div>

      <div className="active-filters-area">
        {
          activeFilters.map((filter, index) => (
            <div key={ index } className="filter-tag" data-testid="filter">
              <span>
                {filter.column}
                {' '}
                {filter.comparison}
                {' '}
                {filter.value}
              </span>
              <button
                className="tag-remove-btn"
                onClick={ () => {
                  const clonedArray = [...activeFilters];
                  clonedArray.splice(index, 1);
                  setActiveFilters(clonedArray);
                } }
              >
                ×
              </button>
            </div>
          ))
        }
      </div>

      {planets.length > 0 && (
        <div className="table-container">
          <table className="planets-table">
            <thead>
              <tr>
                {Object.keys(planets[0])
                  .map((column, index) => <th key={ index }>{column.toUpperCase()}</th>)}
              </tr>
            </thead>
            <tbody>
              {planets.filter((planet) => planet.name
                .toLowerCase().includes(planetInput.toLowerCase()))
                .filter(dataFilter)
                .map((planeta) => (
                  <tr key={ planeta.name }>
                    <td>{planeta.name}</td>
                    <td>{planeta.rotation_period}</td>
                    <td>{planeta.orbital_period}</td>
                    <td>{planeta.diameter}</td>
                    <td>{planeta.climate}</td>
                    <td>{planeta.gravity}</td>
                    <td>{planeta.terrain}</td>
                    <td>{planeta.surface_water}</td>
                    <td>{planeta.population}</td>
                    <td>{planeta.films}</td>
                    <td>{planeta.created}</td>
                    <td>{planeta.edited}</td>
                    <td>{planeta.url}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>)}
    </div>
  );
}

export default Table;
