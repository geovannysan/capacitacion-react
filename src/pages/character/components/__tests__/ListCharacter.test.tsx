import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { ListCharacter } from '../ListCharacter';
import { Character } from '../../interfaces/rick-api.interface';

// CharacterCard usa hooks con QueryClient, lo mockeamos
vi.mock('../CharacterCard', () => ({
  CharacterCard: ({ character }: { character: Character }) =>
    React.createElement('div', { 'data-testid': 'character-card' }, character.name),
}));

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(QueryClientProvider, { client: new QueryClient() }, children);

const mockCharacters: Character[] = [
  { id: 1, name: 'Rick', status: 'Alive', species: 'Human', type: '', gender: 'Male', image: '' },
  { id: 2, name: 'Morty', status: 'Alive', species: 'Human', type: '', gender: 'Male', image: '' },
];

describe('ListCharacter', () => {
  it('renderiza una card por personaje', () => {
    render(<ListCharacter characters={mockCharacters} setOpen={vi.fn()} />, { wrapper });
    expect(screen.getAllByTestId('character-card')).toHaveLength(2);
  });

  it('muestra mensaje cuando no hay personajes', () => {
    render(<ListCharacter characters={[]} setOpen={vi.fn()} />, { wrapper });
    expect(screen.getByText('No hay datos')).toBeInTheDocument();
  });
});
