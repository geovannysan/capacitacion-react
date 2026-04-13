import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchApicharcter } from './useFetchApicharcter';
import { TOKEN } from '../../Auth/constants/auth-constants.constant';
import { CHARACTER_ID, CHARACTER_QUERY_ID } from '../constants/character-const.constant';
import { Character } from '../interfaces/rick-api.interface';
export const useSearchCharacters = () => {
  const queryClient = useQueryClient();
  const { characters, error, isLoading } = useFetchApicharcter();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [open, setOpen] = useState(false);
  const filteredCharacters = useMemo(() => {
    return characters?.filter((character: Character) =>
      character?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, characters]);
  function closeSesion() {
    navigate('/login');
    sessionStorage.removeItem(TOKEN);
  }
  function handleOpen() {
    setOpen(true);
    queryClient.setQueryData([CHARACTER_QUERY_ID], { id: CHARACTER_ID });
  }
  return {
    searchTerm,
    setSearchTerm,
    filteredCharacters,
    open,
    setOpen,
    closeSesion,
    error,
    isLoading,
    handleOpen,
  };
};
