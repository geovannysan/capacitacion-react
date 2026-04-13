import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ButtonCountCharter } from '../ButtonCountCharter';
import {
  FIN_PAGE_CHARACTER,
  INICIO_PAGE_CHARACTER,
} from '../../constants/character-const.constant';

const defaultProps = {
  page: 5,
  incrementPage: vi.fn(),
  decrementPage: vi.fn(),
  isLoading: false,
};

describe('ButtonCountCharter', () => {
  it('renderiza el número de página actual', () => {
    render(<ButtonCountCharter {...defaultProps} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('llama incrementPage al hacer click en Sig.', async () => {
    const incrementPage = vi.fn();
    render(<ButtonCountCharter {...defaultProps} incrementPage={incrementPage} />);
    await userEvent.click(screen.getByText('Sig.'));
    expect(incrementPage).toHaveBeenCalledTimes(1);
  });

  it('llama decrementPage al hacer click en Anter.', async () => {
    const decrementPage = vi.fn();
    render(<ButtonCountCharter {...defaultProps} decrementPage={decrementPage} />);
    await userEvent.click(screen.getByText(/Anter/));
    expect(decrementPage).toHaveBeenCalledTimes(1);
  });

  it('deshabilita el botón Anter. en la primera página', () => {
    render(<ButtonCountCharter {...defaultProps} page={INICIO_PAGE_CHARACTER} />);
    expect(screen.getByText(/Anter/).closest('button')).toBeDisabled();
  });

  it('deshabilita el botón Sig. en la última página', () => {
    render(<ButtonCountCharter {...defaultProps} page={FIN_PAGE_CHARACTER} />);
    expect(screen.getByText('Sig.').closest('button')).toBeDisabled();
  });

  it('deshabilita ambos botones cuando isLoading es true', () => {
    render(<ButtonCountCharter {...defaultProps} isLoading={true} />);
    expect(screen.getByText(/Anter/).closest('button')).toBeDisabled();
    expect(screen.getByText('Sig.').closest('button')).toBeDisabled();
  });
});
