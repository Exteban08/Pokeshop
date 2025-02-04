import { useEffect, useState, memo } from "react";
import { searchPokemon } from "../services/pokemonApi";
import { Pokemon, PokemonDetails } from "../types/pokemon";
import { usePokemonContext } from "../context/usePokemonContext";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineCatchingPokemon } from "react-icons/md";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { calculateFinalPrice } from "../utils/pricing";
import { useFavorites } from "../context/useFavorites";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/useTheme";
import Button from "./Button";
import TypeChip from "./TypeChip";
import { useCartContext } from "../context/useCartContext";

interface PokemonCardProps {
  pokemon: Pokemon;
  toggleCart?: () => void;
  isCartOpen?: boolean;
}

const PokemonCard = memo(
  ({ pokemon, toggleCart, isCartOpen }: PokemonCardProps) => {
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
    const { pokemons, addPokemon } = usePokemonContext();
    const { addToCart } = useCartContext();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [pokemonDetails, setPokemonDetails] = useState<
      PokemonDetails | undefined
    >(() => {
      return pokemons[pokemon.name];
    });

    useEffect(() => {
      const fetchDetails = async () => {
        const details = await searchPokemon(pokemon.name);
        if (details) {
          const price = parseFloat(
            calculateFinalPrice(details.stats, details.types).toFixed(2)
          );
          addPokemon({ ...details, price });
          setPokemonDetails({ ...details, price });
        } else {
          console.error("Incomplete Pokemon details:", details);
        }
      };

      if (pokemons[pokemon.name]) {
        return;
      }

      fetchDetails();
    }, [pokemon.name, addPokemon, pokemons]);

    if (!pokemonDetails) return <div>Cargando...</div>;

    const handleFavoriteClick = () => {
      if (isFavorite[pokemonDetails.id]) {
        removeFromFavorites(pokemonDetails.id.toString());
      } else {
        addToFavorites(pokemonDetails.id.toString());
      }
    };

    return (
      <div className="w-52 h-60 flex flex-col justify-center items-center border p-4 m-4 rounded-lg">
        <div className="flex items-center justify-between w-full">
          <span className="w-10 border">{pokemonDetails.id}</span>
          <h2 className="w-full flex-grow text-center">
            {pokemonDetails.name}
          </h2>
          <Button
            className={`${
              theme === "dark"
                ? "bg-gray-900 hover:bg-gray-900"
                : " bg-white hover:bg-white"
            } rounded-full`}
            onClick={handleFavoriteClick}
          >
            <MdOutlineCatchingPokemon
              className={`text-xl ${
                isFavorite[pokemonDetails.id]
                  ? "text-red-500"
                  : theme === "dark"
                  ? "text-white hover:text-red-500"
                  : "text-black hover:text-red-500"
              }`}
            />
          </Button>
        </div>
        <img
          src={pokemonDetails.sprites.front_default}
          alt={pokemonDetails.name}
          className="w-24 h-24 object-contain"
        />
        <div className="flex gap-2 mt-2">
          {pokemonDetails.types.map((type) => (
            <TypeChip key={type.type.name} type={type.type.name} />
          ))}
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {`Precio: $${pokemonDetails.price}`}
        </p>
        <div className="w-full flex justify-between">
          <Button
            className="w-10 h-8 flex justify-center items-center"
            onClick={() => navigate(`/pokemon/${pokemonDetails.id}`)}
          >
            <HiOutlineInformationCircle className="w-5 h-5" />
          </Button>
          {toggleCart && isCartOpen !== undefined && (
            <Button
              onClick={() => {
                addToCart({ pokemonName: pokemonDetails.name, price: pokemonDetails.price });
                if (!isCartOpen) {
                  toggleCart();
                }
              }}
              className="w-10 h-8"
            >
              <FaShoppingCart />
            </Button>
          )}
        </div>
      </div>
    );
  }
);

export default PokemonCard;
