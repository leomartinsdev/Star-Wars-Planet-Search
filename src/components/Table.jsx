import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import planetsContext from '../context/PlanetsContext';

function Table() {
  const { planets } = useContext(planetsContext);
  console.log(planets);

  return (
    <div>
      <p>Table Component</p>
      { planets.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(planets[0])
                .map((column, index) => <th key={ index }>{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {
              planets.map((planet) => (
                <tr key={ planet.name }>
                  <td>{ planet.name }</td>
                  <td>{ planet.rotation_period }</td>
                  <td>{ planet.orbital_period }</td>
                  <td>{ planet.diameter }</td>
                  <td>{ planet.climate }</td>
                  <td>{ planet.gravity }</td>
                  <td>{ planet.terrain }</td>
                  <td>{ planet.surface_water }</td>
                  <td>{ planet.population }</td>
                  <td>{ planet.films }</td>
                  <td>{ planet.created }</td>
                  <td>{ planet.edited }</td>
                  <td>{ planet.url }</td>
                </tr>
              ))
            }
          </tbody>
        </table>)}
    </div>
  );
}

// Table.propTypes = {};

export default Table;
