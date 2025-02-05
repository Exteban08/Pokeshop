import { useEffect, useState } from 'react';
import {
  getPokemonTypes,
  getPokemonDetails,
  getPokemonList,
} from '../services/pokemonApi';
import { usePokemonContext } from '../context/usePokemonContext';
import { useTheme } from '../context/useTheme';
import { FaMoon, FaShoppingCart } from 'react-icons/fa';
import { SiPokemon } from 'react-icons/si';
import { IoSunny, IoCloseSharp } from 'react-icons/io5';
import { MdOutlineCatchingPokemon } from 'react-icons/md';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import Cart from '../components/Cart';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import FilterInput from '../components/FilterInput';
import { useCartContext } from '../context/useCartContext';
import { useFetchPokemonsPaginated } from '../hooks/useFetchPokemonsPaginated';
import { useFetchPokemonsByType } from '../hooks/useFetchPokemonsByType';
import clsx from 'clsx';

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [types, setTypes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonNames, setPokemonNames] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const { pokemons, addPokemon } = usePokemonContext();
  const { isCartOpen, setIsCartOpen } = useCartContext();

  const { fetchPokemonsPaginated } = useFetchPokemonsPaginated();
  const { fetchPokemonsByType } = useFetchPokemonsByType();

  const renderPokemons = pokemonNames
    .map((pokemonName) => pokemons[pokemonName])
    .filter(Boolean);

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
    if (!selectedType && !search) {
      setIsLoading(true);

      const fetchCurrentPagePokemons = async () => {
        const pokemonListResponse = await getPokemonList(currentPage);
        const pokemonList = pokemonListResponse.map(({ name }) => name);
        fetchPokemonsPaginated(pokemonList);
        setPokemonNames(pokemonList);
      };

      fetchCurrentPagePokemons();
      setIsLoading(false);
    }
  }, [fetchPokemonsPaginated, currentPage, search, selectedType]);

  useEffect(() => {
    if (selectedType) {
      setSearch('');
      setIsLoading(true);

      const getPokemonsByType = async () => {
        const pokemonNamesByType = await fetchPokemonsByType(selectedType);
        setPokemonNames(pokemonNamesByType);
      };

      getPokemonsByType();
      setIsLoading(false);
    }
  }, [fetchPokemonsByType, selectedType]);

  useEffect(() => {
    if (search) {
      setSelectedType(null);
      setIsLoading(true);

      const fetchPokemon = async () => {
        const pokemon = await getPokemonDetails(search);

        if (pokemon) {
          setPokemonNames([pokemon.name]);
          addPokemon(pokemon);
        }
      };

      fetchPokemon();
      setIsLoading(false);
    }
  }, [addPokemon, search]);

  useEffect(() => {
    const fetchTypes = async () => {
      const typesList = await getPokemonTypes();
      const filteredTypes = typesList.slice(0, -2);
      setTypes(filteredTypes);
    };
    fetchTypes();
  }, []);

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen w-full bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="top-0 flex w-full items-center justify-between p-4">
        <div className="text-6xl">
          <SiPokemon className="text-black dark:text-white" />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-2xl font-bold">Poke-shop</h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={toggleTheme} className="h-8 w-10">
            {theme === 'light' ? <FaMoon /> : <IoSunny />}
          </Button>
          <Button onClick={() => navigate('/favorites')} className="h-8 w-10">
            <MdOutlineCatchingPokemon />
          </Button>
          <Button onClick={toggleCart} className="h-8 w-10">
            <FaShoppingCart />
          </Button>
        </div>
      </div>
      <div className="flex w-full justify-end gap-2 pr-4">
        <FilterInput
          types={types}
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />
        <SearchBar search={search} onSearch={setSearch} />
      </div>
      <div className="grid w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
        <div className="flex w-full items-center justify-center gap-4 pb-4">
          {currentPage !== 1 && (
            <Button onClick={handlePreviousPage} className="h-8 w-10">
              <GrFormPrevious />
            </Button>
          )}
          <span> Página {currentPage} </span>
          <Button onClick={handleNextPage} className="h-8 w-10">
            <GrFormNext />
          </Button>
        </div>
      )}
      <div
        className={clsx(
          'fixed top-0 right-0 h-full w-96 transform bg-white text-black shadow-lg transition-transform duration-300 ease-in-out dark:bg-gray-800 dark:text-white',
          {
            'translate-x-0': isCartOpen,
            'translate-x-full': !isCartOpen,
          },
        )}
      >
        <Cart />
        <Button
          onClick={toggleCart}
          className="absolute top-4 right-4 rounded-full p-2"
        >
          <IoCloseSharp />
        </Button>
      </div>
    </div>
  );
};

export default Home;
