import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import userEvent from '@testing-library/user-event';
import mockData from './mockData';

describe('App tests', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    );
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  test('Testa se o usuário consegue digitar o nome de um planeta', () => {
    const planetInput = screen.getByRole('textbox');
    expect(planetInput).toBeInTheDocument();
  });

  test('Testa se existem os filtros', () => {
    const columnFilter = screen.getByTestId('column-filter')
    expect(columnFilter).toBeInTheDocument();

    const comparisonFilter = screen.getByTestId('comparison-filter')
    expect(comparisonFilter).toBeInTheDocument();

    const valueFilter = screen.getByTestId('value-filter')
    expect(valueFilter).toBeInTheDocument();
  });

  test('Testa se é possível filtrar por nome', async () => {  // POR QUE NÃO FUNCIONA?
    const planetInput = screen.getByRole('textbox');
    expect(planetInput).toBeInTheDocument();
    await screen.findByText(/Tatooine/i);
    userEvent.type(planetInput, 'Ho');

    // await waitFor(() => {
    //   screen.getByText('Hoth');
    // });

    const hothPlanet = await screen.findByText(/Hoth/i)
    expect(hothPlanet).toBeInTheDocument();
  });

  test('Testa o funcionamento dos filtros numéricos', async () => {
    await screen.findByText(/Tatooine/i);
    const columnFilter = screen.getByTestId('column-filter')
    const comparisonFilter = screen.getByTestId('comparison-filter')
    const valueFilter = screen.getByTestId('value-filter')
    const filterBtn = screen.getByRole('button', {  name: /filtrar/i })

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '10000');
    userEvent.click(filterBtn);


    const row = screen.getAllByRole('row');
    expect(row.length).toBe(8);

    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.type(valueFilter, '400');
    userEvent.click(filterBtn);

    const rowsAfterFilter = screen.getAllByRole('row');
    expect(rowsAfterFilter.length).toBe(5);
  });

  test('Testa se, no começo, todos planetas aparecem', async () => {
    await screen.findByText(/Tatooine/i);

    const row = screen.getAllByRole('row');
    expect(row.length).toBe(11);
  });

});
