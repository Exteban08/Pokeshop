import { PokemonDetails } from '../types/pokemon';
import { FaShoppingCart } from 'react-icons/fa';
import { MdOutlineCatchingPokemon } from 'react-icons/md';
import { HiOutlineInformationCircle } from 'react-icons/hi2';
import { useFavorites } from '../context/useFavorites';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import TypeChip from './TypeChip';
import { useCartContext } from '../context/useCartContext';
import clsx from 'clsx';

interface PokemonCardProps {
  pokemonDetails: PokemonDetails;
  toggleCart?: () => void;
  isCartOpen?: boolean;
}

const PokemonCard = ({
  pokemonDetails,
  toggleCart,
  isCartOpen,
}: PokemonCardProps) => {
  const { addToFavorites, removeFromFavorites, favorites } = useFavorites();
  const { addToCart } = useCartContext();
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    if (favorites[pokemonDetails.name]) {
      removeFromFavorites(pokemonDetails.name);
    } else {
      addToFavorites(pokemonDetails.name);
    }
  };

  if (!pokemonDetails) return <div>Cargando...</div>;

  return (
    <div className="m-4 flex h-60 w-52 flex-col items-center justify-center rounded-lg border p-4">
      <div className="flex w-full items-center justify-between">
        <h2 className="w-full flex-grow text-center">{pokemonDetails.name}</h2>
        <Button
          className="rounded-full bg-white hover:bg-white dark:bg-gray-900 dark:hover:bg-gray-900"
          onClick={handleFavoriteClick}
        >
          <MdOutlineCatchingPokemon
            className={clsx({
              'fill-black text-2xl hover:fill-red-500 dark:bg-gray-900': true,
              'dark:fill-white': !favorites[pokemonDetails.name],
              'fill-red-500': favorites[pokemonDetails.name],
            })}
          />
        </Button>
      </div>
      <img
        src={pokemonDetails.sprites.front_default}
        alt={pokemonDetails.name}
        className="h-24 w-24 object-contain"
      />
      <div className="mt-2 flex gap-2">
        {pokemonDetails.types.map((type) => (
          <TypeChip key={type.type.name} type={type.type.name} />
        ))}
      </div>
      <p className="text-gray-600 dark:text-gray-400">
        {`Precio: $${pokemonDetails.price}`}
      </p>
      <div className="flex w-full justify-between">
        <Button
          className="flex h-8 w-10 items-center justify-center"
          onClick={() => navigate(`/pokemon/${pokemonDetails.id}`)}
        >
          <HiOutlineInformationCircle className="h-5 w-5" />
        </Button>
        {toggleCart && isCartOpen !== undefined && (
          <Button
            onClick={() => {
              addToCart({
                pokemonName: pokemonDetails.name,
                price: pokemonDetails.price,
              });
              if (!isCartOpen) {
                toggleCart();
              }
            }}
            className="h-8 w-10"
          >
            <FaShoppingCart />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
