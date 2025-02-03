import { useState, useEffect, ReactNode, useCallback } from "react";
import { FavoritesContext } from "./FavoritesContext";

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [isFavorite, setIsFavorites] = useState<{ [key: string]: boolean }>(
    () => {
      try {
        const storedFavorites = localStorage.getItem("favorites");
        return storedFavorites ? JSON.parse(storedFavorites) : {};
      } catch (error) {
        console.error("Error reading from localStorage", error);
        return {};
      }
    }
  );

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(isFavorite));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [isFavorite]);

  const addToFavorites = useCallback((id: string) => {
    setIsFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: true,
    }));
  }, []);

  const removeFromFavorites = useCallback((id: string) => {
    setIsFavorites((prevFavorites) => {
      const newFavorites = { ...prevFavorites };
      delete newFavorites[id];
      return newFavorites;
    });
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
