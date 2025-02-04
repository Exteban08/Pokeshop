import { createContext } from "react";

export const FavoritesContext = createContext<{
  favorites: Record<string, boolean>;
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
}>({
  favorites: {},
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});
