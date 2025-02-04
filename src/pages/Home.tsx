import { useEffect, useState } from "react";
import {
  getPokemonList,
  getPokemonTypes,
  getPokemonDetails,
  getPokemonListByType,
} from "../services/pokemonApi";
import { usePokemonContext } from "../context/usePokemonContext";
import { useTheme } from "../context/useTheme";
import { FaMoon, FaShoppingCart } from "react-icons/fa";
import { SiPokemon } from "react-icons/si";
import { IoSunny, IoCloseSharp } from "react-icons/io5";
import { MdOutlineCatchingPokemon } from "react-icons/md";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { PokemonDetails } from "../types/pokemon";
import { useNavigate } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import Cart from "../components/Cart";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import FilterInput from "../components/FilterInput";
import { useCartContext } from "../context/useCartContext";

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [types, setTypes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { pokemons, addPokemon, addPokemons } = usePokemonContext();
  const [pokemonNames, setPokemonNames] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const renderPokemons = pokemonNames
    .map((pokemonName) => pokemons[pokemonName])
    .filter(Boolean);

  const { isCartOpen, setIsCartOpen } = useCartContext();

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      setIsLoading(true);
      setError(null);

      const pokemonList = await getPokemonList(currentPage);
      setPokemonNames(pokemonList.map(({ name }) => name));
      const pokemonsPromises = await Promise.all(
        pokemonList
          .filter(({ name }) => (pokemons[name] ? false : true))
          .map(({ name }) => {
            return getPokemonDetails(name);
          })
      );
      const filteredPokemons: PokemonDetails[] = pokemonsPromises.filter(
        (pokemon): pokemon is PokemonDetails => pokemon !== null
      );
      addPokemons(filteredPokemons);
      setIsLoading(false);
    };

    if (!selectedType && !search) {
      fetchPokemons();
    }
  }, [
    currentPage,
    setError,
    setIsLoading,
    addPokemons,
    pokemons,
    selectedType,
    search,
  ]);

  useEffect(() => {
    if (!selectedType) {
      setCurrentPage(1);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearch("");

    const filterPokemon = async () => {
      const pokemonList = await getPokemonListByType(selectedType);
      setPokemonNames(pokemonList.map(({ pokemon }) => pokemon.name));
      const pokemonsPromises = await Promise.all(
        pokemonList.map(({ pokemon }) => {
          return getPokemonDetails(pokemon.name);
        })
      );
      const filteredPokemons: PokemonDetails[] = pokemonsPromises.filter(
        (pokemon): pokemon is PokemonDetails => pokemon !== null
      );
      addPokemons(filteredPokemons);
    };

    filterPokemon();
    setIsLoading(false);
  }, [selectedType, addPokemons]);

  useEffect(() => {
    if (!search) return;

    setIsLoading(true);
    setError(null);
    setSelectedType(null);

    const fetchPokemon = async () => {
      const pokemon = await getPokemonDetails(search);

      if (pokemon) {
        setPokemonNames([pokemon.name]);
        addPokemon(pokemon);
      }
    };

    fetchPokemon();
    setIsLoading(false);
  }, [addPokemon, search, selectedType]);

  useEffect(() => {
    const fetchTypes = async () => {
      const typesList = await getPokemonTypes();
      const filteredTypes = typesList.slice(0, -2);
      setTypes(filteredTypes);
    };
    fetchTypes();
  }, []);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      className={`w-full min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="w-full top-0 flex justify-between items-center p-4">
        <div className="text-6xl">
          <SiPokemon
            className={`${theme === "dark" ? "text-white" : "text-black"}`}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Poke-shop</h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={toggleTheme} className="w-10 h-8">
            {theme === "light" ? <FaMoon /> : <IoSunny />}
          </Button>
          <Button onClick={() => navigate("/favorites")} className="w-10 h-8">
            <MdOutlineCatchingPokemon />
          </Button>
          <Button onClick={toggleCart} className="w-10 h-8">
            <FaShoppingCart />
          </Button>
        </div>
      </div>
      <div className="w-full flex justify-end gap-2 pr-4">
        <FilterInput
          types={types}
          selectedType={selectedType}
          onSelectType={setSelectedType}
          theme={theme}
        />
        <SearchBar search={search} onSearch={setSearch} theme={theme} />
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {renderPokemons.map((pokemonDetails) => {
          return (
            <PokemonCard
              key={pokemonDetails.name}
              pokemonDetails={pokemonDetails}
              toggleCart={toggleCart}
              isCartOpen={isCartOpen}
            />
          );
        })}
      </div>
      {!selectedType && renderPokemons.length > 1 && (
        <div className="w-full flex gap-4 items-center justify-center pb-4">
          {currentPage !== 1 && (
            <Button onClick={handlePreviousPage} className="w-10 h-8">
              <GrFormPrevious />
            </Button>
          )}
          <span> Página {currentPage} </span>
          <Button onClick={handleNextPage} className="w-10 h-8">
            <GrFormNext />
          </Button>
        </div>
      )}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <Cart />
        <Button
          onClick={toggleCart}
          className="absolute top-4 right-4 p-2 rounded-full"
        >
          <IoCloseSharp />
        </Button>
      </div>
    </div>
  );
};

export default Home;
