import { useEffect, useState } from "react";
import {
  getPokemonList,
  getPokemonTypes,
  getPokemonDetails,
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
  const { addPokemons } = usePokemonContext()
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([])
  console.log("🚀 ~ Home ~ pokemons:", pokemons)

  const { isCartOpen, setIsCartOpen } = useCartContext();

  useEffect(() => {
    const fetchPokemons = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const pokemonsList = await getPokemonList(currentPage);
        const pokemonsPromises = await Promise.all(pokemonsList.map(({ name }) => {
          return getPokemonDetails(name);
        }))
        console.log("🚀 ~ pokemonsPromises ~ pokemonsPromises:", pokemonsPromises)
        const filteredPokemons: PokemonDetails[] = pokemonsPromises.filter(
          (pokemon): pokemon is PokemonDetails => pokemon !== null
        );
        console.log("🚀 ~ fetchPokemons ~ filteredPokemons:", filteredPokemons)
        addPokemons(filteredPokemons)
        setPokemons(filteredPokemons)
      } catch (err) {
        setError("Error al cargar los Pokemon");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemons();
  }, [currentPage, setError, setIsLoading, addPokemons])

  /* useEffect(() => {
    if (!selectedType) {
      const fetchPokemon = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const list = await getPokemonList(currentPage);
          setPokemonList(list);
        } catch (err) {
          setError("Error al cargar los Pokemon");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPokemon();
    } else {
      const filterPokemon = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
          const endIndex = startIndex + ITEMS_PER_PAGE;
          const response = await axios.get(`${API_URL}/type/${selectedType}`);
          const pokemonList = response.data.pokemon.map(
            (entry: { pokemon: PokemonDetails }) => entry.pokemon
          );
          setPokemonList(pokemonList.slice(startIndex, endIndex));
        } catch (err) {
          setError("Error al cargar los Pokemon filtrados");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      filterPokemon();
    }
  }, [
    currentPage,
    selectedType,
    setPokemonList,
    setIsLoading,
    setError,
    setCurrentPage,
  ]); */


  /* useEffect(() => {
    const fetchDetails = async () => {
      const pokemonDetailsData = await getPokemonDetails(pokemon.name);
      if (pokemonDetailsData) {
        addPokemon(pokemonDetailsData);
      }
    };

    if (pokemons[pokemon.name]) {
      return;
    }

    fetchDetails();
  }, [pokemon.name, addPokemon, pokemons]); */

  const handleSearch = async (search: string) => {
    /* if (search === "") {
      const offset = (currentPage - 1) * ITEMS_PER_PAGE;
      const list = await getPokemonList(ITEMS_PER_PAGE, offset);
      setPokemonList(list);
    } else {
      const pokemon = await getPokemonDetails(search);
      if (pokemon) {
        setPokemonList([pokemon]);
      } else {
        console.error("Pokemon not found");
      }
    } */
  };

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
        <SearchBar onSearch={handleSearch} theme={theme} />
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {pokemons.map((pokemonDetails) => {
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
      {pokemons.length > 1 && (
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
