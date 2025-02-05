import { useEffect, useMemo, useState } from 'react';
import {
  getPokemonTypes,
  getPokemonDetails,
  getPokemonList,
} from '../services/pokemonApi';
import { usePokemonContext } from '../context/usePokemonContext';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import PokemonCard from '../components/PokemonCard';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import FilterInput from '../components/FilterInput';
import { useCartContext } from '../context/useCartContext';
import { useFetchPokemonsPaginated } from '../hooks/useFetchPokemonsPaginated';
import { useFetchPokemonsByType } from '../hooks/useFetchPokemonsByType';
import Header from '../components/Header';
import CartContent from '../components/CartContent';
import { useFetchPokemonList } from '../hooks/useFetchPokemonList';

const CardSkeleton = () => {
  return (
    <div className="min-h-screen w-full bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="top-0 flex w-full items-center justify-between p-4">
        <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="hidden sm:block">
          <div className="h-8 w-32 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-10 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-8 w-10 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-8 w-10 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>

      <div className="flex w-full justify-end gap-2 pr-4">
        <div className="h-10 w-20 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="h10 w-52 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div className="grid w-full grid-cols-1 justify-items-center gap-10 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 15 }, (_, index) => (
          <div
            key={index}
            className="relative flex h-80 w-full animate-pulse rounded-md bg-gray-300 shadow-lg transition-all duration-200 dark:bg-gray-700"
          />
        ))}
      </div>
      <div className="flex w-full items-center justify-center gap-4 pb-4"></div>
    </div>
  );
};

const Home = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [types, setTypes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonNames, setPokemonNames] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const { pokemons, addPokemon } = usePokemonContext();
  const { isCartOpen, setIsCartOpen } = useCartContext();

  const { fetchPokemonList, isLoading: isFetchPokemonListLoading } =
    useFetchPokemonList();
  const { fetchPokemonsPaginated, isLoading: isFetchPokemonsPaginatedLoading } =
    useFetchPokemonsPaginated();
  const { fetchPokemonsByType, isLoading: isFetchPokemonsByTypeLoading } =
    useFetchPokemonsByType();

  const renderPokemons = useMemo(
    () =>
      pokemonNames.map((pokemonName) => pokemons[pokemonName]).filter(Boolean),
    [pokemonNames, pokemons],
  );

  const isLoading =
    isFetchPokemonListLoading ||
    isFetchPokemonsPaginatedLoading ||
    isFetchPokemonsByTypeLoading;

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
      const fetchCurrentPagePokemons = async () => {
        const pokemonList = await fetchPokemonList(currentPage);
        if (pokemonList) {
          fetchPokemonsPaginated(pokemonList);
          setPokemonNames(pokemonList);
        }
      };

      fetchCurrentPagePokemons();
    }
  }, [
    fetchPokemonsPaginated,
    fetchPokemonList,
    currentPage,
    search,
    selectedType,
  ]);

  useEffect(() => {
    if (selectedType) {
      setSearch('');

      const getPokemonsByType = async () => {
        const pokemonNamesByType = await fetchPokemonsByType(selectedType);
        if (pokemonNamesByType) {
          setPokemonNames(pokemonNamesByType);
        }
      };

      getPokemonsByType();
    }
  }, [fetchPokemonsByType, selectedType]);

  useEffect(() => {
    if (search) {
      setSelectedType(null);

      const fetchPokemon = async () => {
        const pokemon = await getPokemonDetails(search);

        if (pokemon) {
          setPokemonNames([pokemon.name]);
          addPokemon(pokemon);
        }
      };

      fetchPokemon();
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

  if (isLoading && renderPokemons.length > 0) return <CardSkeleton />;

  return (
    <div className="min-h-screen w-full bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header toggleCart={toggleCart} />
      <div className="flex w-full justify-end gap-2 pr-4">
        <FilterInput
          types={types}
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />
        <SearchBar search={search} onSearch={setSearch} />
      </div>
      <div className="grid w-full grid-cols-1 justify-items-center gap-10 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
      <CartContent isCartOpen={isCartOpen} toggleCart={toggleCart} />
    </div>
  );
};

export default Home;
