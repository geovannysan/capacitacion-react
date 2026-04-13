import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useSearchCharacters } from '../useSearchCharacters';

const mockCharacters = [
  { id: 1, name: 'Rick', status: 'Alive', species: 'Human', type: '', gender: 'Male', image: '' },
  { id: 2, name: 'Morty', status: 'Alive', species: 'Human', type: '', gender: 'Male', image: '' },
];

vi.mock('../useFetchApicharcter', () => ({
  useFetchApicharcter: () => ({
    characters: mockCharacters,
    error: null,
    isLoading: false,
  }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return React.createElement(
    QueryClientProvider,
    { client: queryClient },
    React.createElement(MemoryRouter, null, children),
  );
};

describe('useSearchCharacters', () => {
  afterEach(() => vi.clearAllMocks());

  it('retorna todos los personajes sin filtro', async () => {
    const { result } = renderHook(() => useSearchCharacters(), { wrapper });
    await waitFor(() => expect(result.current.filteredCharacters).toHaveLength(2));
  });

  it('filtra personajes por nombre', async () => {
    const { result } = renderHook(() => useSearchCharacters(), { wrapper });
    act(() => result.current.setSearchTerm('rick'));
    await waitFor(() => expect(result.current.filteredCharacters).toHaveLength(1));
    expect(result.current.filteredCharacters![0].name).toBe('Rick');
  });

  it('retorna vacío si no hay coincidencias', async () => {
    const { result } = renderHook(() => useSearchCharacters(), { wrapper });
    act(() => result.current.setSearchTerm('xyz'));
    await waitFor(() => expect(result.current.filteredCharacters).toHaveLength(0));
  });

  it('open inicia en false', () => {
    const { result } = renderHook(() => useSearchCharacters(), { wrapper });
    expect(result.current.open).toBe(false);
  });

  it('handleOpen pone open en true', async () => {
    const { result } = renderHook(() => useSearchCharacters(), { wrapper });
    act(() => result.current.handleOpen());
    expect(result.current.open).toBe(true);
  });

  it('closeSesion navega a /login y limpia sessionStorage', () => {
    sessionStorage.setItem('token_user', 'abc');
    const { result } = renderHook(() => useSearchCharacters(), { wrapper });
    act(() => result.current.closeSesion());
    expect(mockNavigate).toHaveBeenCalledWith('/login');
    expect(sessionStorage.getItem('token_user')).toBeNull();
  });
});
