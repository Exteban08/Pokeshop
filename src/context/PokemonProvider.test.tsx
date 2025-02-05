import { describe, expect, test } from 'vitest';
import { usePokemonContext } from './usePokemonContext';
import { render, screen, waitFor } from '@testing-library/react';
import { PokemonProvider } from './PokemonProvider';
import { createPokemonDetails } from '../utils/testing';
import userEvent from '@testing-library/user-event';

const TestingChildComponent = () => {
  const { pokemons, addPokemon, addPokemons } = usePokemonContext();

  return (
    <div>
      {Object.values(pokemons).map((pokemon) => (
        <div key={pokemon.name}>
          <p data-testid="pokemon-name">Name: {pokemon.name}</p>
          <p>Id: {pokemon.id}</p>
          <div>
            <p>Types:</p>
            {pokemon.types.map(({ type }) => (
              <div key={type.name}>{type.name}</div>
            ))}
          </div>
        </div>
      ))}
      <button
        data-testid="add-pokemon-button"
        onClick={() => {
          addPokemon(createPokemonDetails());
        }}
      >
        Add pokemon
      </button>
      <button
        data-testid="add-pokemons-button"
        onClick={() => {
          addPokemons([createPokemonDetails(), createPokemonDetails()]);
        }}
      >
        Add pokemons
      </button>
    </div>
  );
};

describe('PokemonProvider', () => {
  test('provides pokemons and add methods to child elements', async () => {
    render(
      <PokemonProvider>
        <TestingChildComponent />
      </PokemonProvider>,
    );

    expect(screen.queryByTestId('pokemon-name')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('add-pokemon-button'));
    await waitFor(() =>
      expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1),
    );

    userEvent.click(screen.getByTestId('add-pokemons-button'));
    await waitFor(() =>
      expect(screen.getAllByTestId('pokemon-name')).toHaveLength(3),
    );
  });
});
