import { describe, expect, it } from 'vitest';

import { characterAdapter } from '../character-adacter.adapter';
import { Character } from '../../interfaces/rick-api.interface';

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez Long Name',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
  {
    id: 2,
    name: 'Morty',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  },
];

describe('characterAdapter', () => {
  it('trunca el nombre a 12 caracteres', () => {
    const result = characterAdapter({ characters: mockCharacters });
    expect(result[0].name).toBe('Rick Sanchez');
    expect(result[0].name.length).toBeLessThanOrEqual(12);
  });

  it('no modifica nombres con menos de 12 caracteres', () => {
    const result = characterAdapter({ characters: mockCharacters });
    expect(result[1].name).toBe('Morty');
  });

  it('mantiene los demás campos intactos', () => {
    const result = characterAdapter({ characters: mockCharacters });
    expect(result[0].id).toBe(1);
    expect(result[0].status).toBe('Alive');
    expect(result[0].image).toBe(mockCharacters[0].image);
  });

  it('retorna un array con la misma cantidad de elementos', () => {
    const result = characterAdapter({ characters: mockCharacters });
    expect(result).toHaveLength(2);
  });

  it('retorna array vacío si se pasa array vacío', () => {
    const result = characterAdapter({ characters: [] });
    expect(result).toEqual([]);
  });
});
