import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesProvider";
import { PokemonProvider } from "./context/PokemonProvider";
import { ThemeProvider } from "./context/ThemeContext";
import FavoritePokemonList from "./pages/FavoritePokemonList";
import PokemonDetails from "./pages/PokemonDetails";
import Home from "./pages/Home";
import "./App.css";
import { CartProvider } from "./context/CartProvider";

const App = () => {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <PokemonProvider>
          <CartProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<FavoritePokemonList />} />
                <Route path="/pokemon/:id" element={<PokemonDetails />} />
              </Routes>
            </Router>
          </CartProvider>
        </PokemonProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

export default App;
