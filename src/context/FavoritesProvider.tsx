import { useState, useEffect, ReactNode, useCallback } from "react";
import { FavoritesContext } from "./FavoritesContext";
import { localStorageKey } from "../utils/storage";

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>(() => {
    const storedFavorites = localStorage.getItem(localStorageKey.favorites);
    return storedFavorites ? JSON.parse(storedFavorites) : {};
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey.favorites, JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = useCallback(
    (pokemonName: string) => {
      if (favorites[pokemonName]) {
        return;
      }

      setFavorites((prevFavorites) => ({
        ...prevFavorites,
        [pokemonName]: true,
      }));
    },
    [favorites]
  );

  const removeFromFavorites = useCallback((pokemonName: string) => {
    setFavorites((prevFavorites) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [pokemonName]: _, ...newFavorites } = prevFavorites;
      return newFavorites;
    });
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ addToFavorites, removeFromFavorites, favorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
