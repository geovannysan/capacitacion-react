import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { InputCharacter } from '../InputCharacter';

describe('InputCharacter', () => {
  it('renderiza el placeholder correctamente', () => {
    render(<InputCharacter searchTerm="" setSearchTerm={vi.fn()} />);
    expect(screen.getByPlaceholderText('Buscar nombre de personaje...')).toBeInTheDocument();
  });

  it('muestra el valor de searchTerm', () => {
    render(<InputCharacter searchTerm="Rick" setSearchTerm={vi.fn()} />);
    expect(screen.getByDisplayValue('Rick')).toBeInTheDocument();
  });

  it('llama setSearchTerm al escribir', async () => {
    const setSearchTerm = vi.fn();
    render(<InputCharacter searchTerm="" setSearchTerm={setSearchTerm} />);
    await userEvent.type(screen.getByPlaceholderText('Buscar nombre de personaje...'), 'Mo');
    expect(setSearchTerm).toHaveBeenCalledTimes(2);
  });
});
