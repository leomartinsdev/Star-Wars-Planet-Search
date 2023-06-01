import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import planetsContext from '../context/PlanetsContext';

function Table() {
  const { planets, planetInput, setPlanetInput } = useContext(planetsContext);
  console.log('planetas', planets);

  return (
    <div>
      <div>
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

// Table.propTypes = {};

export default Table;
