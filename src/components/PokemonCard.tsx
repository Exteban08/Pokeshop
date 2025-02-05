import { PokemonDetails } from '../types/pokemon';
import { FaShoppingCart } from 'react-icons/fa';
import { MdOutlineCatchingPokemon } from 'react-icons/md';
import { useFavorites } from '../context/useFavorites';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import TypeChip from './TypeChip';
import { useCartContext } from '../context/useCartContext';
import clsx from 'clsx';
import { typeColors } from '../utils/pokemon-types';
import { CgPokemon } from 'react-icons/cg';

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

  const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (favorites[pokemonDetails.name]) {
      removeFromFavorites(pokemonDetails.name);
    } else {
      addToFavorites(pokemonDetails.name);
    }
  };

  const backgroundColor = typeColors[pokemonDetails.types[0].type.name];
  return (
    <div
      className={clsx(
        backgroundColor.default,
        'relative flex h-auto w-full cursor-pointer flex-col gap-2 rounded-lg p-4 shadow-lg transition-all duration-200 hover:scale-105',
      )}
      onClick={() => {
        navigate(`/pokemon/${pokemonDetails.id}`);
      }}
    >
      <div className="flex flex-col">
        <div className="flex">
          <div className="flex gap-2">
            {pokemonDetails.types.map((type) => (
              <TypeChip key={type.type.name} type={type.type.name} />
            ))}
          </div>
          <Button
            className="absolute right-[16px]"
            onClick={handleFavoriteClick}
          >
            {favorites[pokemonDetails.name] ? (
              <MdOutlineCatchingPokemon
                size={24}
                className={clsx([backgroundColor.default], 'fill-white')}
              />
            ) : (
              <CgPokemon
                size={25}
                className={clsx([backgroundColor.default], 'fill-white')}
              />
            )}
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <img
          src={pokemonDetails.sprites.front_default}
          alt={pokemonDetails.name}
          className="h-[150px] w-[150px] object-contain"
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        <h2 className="w-full flex-grow text-center text-lg font-semibold text-white capitalize">
          {pokemonDetails.name}
        </h2>
        <p className="font-semibold text-white">${pokemonDetails.price}</p>
      </div>
      <div className="mt-4 flex h-10 w-full gap-2">
        {toggleCart && isCartOpen !== undefined && (
          <Button
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              addToCart({
                pokemonName: pokemonDetails.name,
                price: pokemonDetails.price,
                pokemonImage: pokemonDetails.sprites.front_default,
              });
              if (!isCartOpen) {
                toggleCart();
              }
            }}
            className="hover:>opacity-100 flex-1 bg-white hover:bg-black hover:*:fill-white"
          >
            <FaShoppingCart className="fill-black" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
