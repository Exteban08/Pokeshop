import { createContext } from "react";

export const FavoritesContext = createContext<{
  isFavorite: { [key: string]: boolean };
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
}>({
  isFavorite: {},
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});
