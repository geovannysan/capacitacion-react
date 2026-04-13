import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useFetchCharacters } from '../useFetchCharacters';

// Mock del servicio
vi.mock('../../services', () => ({
  rickAndMortyService: {
    getCharacters: vi.fn(),
  },
}));

// Mock del adapter
vi.mock('../../adapters/character-adacter.adapter', () => ({
  characterAdapter: ({ characters }: { characters: unknown[] }) => characters,
}));

import { rickAndMortyService } from '../../services';

const mockResponse = {
  results: [
    { id: 1, name: 'Rick', status: 'Alive', species: 'Human', type: '', gender: 'Male', image: '' },
  ],
};

describe('useFetchCharacters', () => {
  beforeEach(() => {
    vi.mocked(rickAndMortyService.getCharacters).mockResolvedValue(mockResponse as never);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('inicia con loading true y characters vacío', () => {
    const { result } = renderHook(() => useFetchCharacters());
    expect(result.current.loading).toBe(true);
    expect(result.current.characters).toEqual([]);
  });

  it('carga personajes correctamente', async () => {
    const { result } = renderHook(() => useFetchCharacters());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.characters).toHaveLength(1);
    expect(result.current.characters[0].name).toBe('Rick');
  });

  it('page inicia en 1', () => {
    const { result } = renderHook(() => useFetchCharacters());
    expect(result.current.page).toBe(1);
  });

  it('setPage actualiza la página', async () => {
    const { result } = renderHook(() => useFetchCharacters());
    await waitFor(() => expect(result.current.loading).toBe(false));
    act(() => result.current.setPage(2));
    expect(result.current.page).toBe(2);
  });

  it('maneja error de ApiError', async () => {
    const { ApiError } = await import('../../../../core/api-error');
    vi.mocked(rickAndMortyService.getCharacters).mockRejectedValueOnce(
      new ApiError(500, 'Error de red'),
    );
    const { result } = renderHook(() => useFetchCharacters());
    await waitFor(() => expect(result.current.error).toBe('Error de red'));
  });
});
