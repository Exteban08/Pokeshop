import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonDetails } from '../services/pokemonApi';
import type { PokemonDetails } from '../types/pokemon';
import BackButton from '../components/BackButton';
import TypeChip from '../components/TypeChip';
import { calculateFinalPrice } from '../utils/pricing';
import { FaWeightHanging, FaRulerVertical } from 'react-icons/fa';
import { GiBroadsword, GiShield, GiSpeedometer } from 'react-icons/gi';

const PokemonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (id) {
        const details = await getPokemonDetails(id);
        if (details) {
          const price = parseFloat(
            calculateFinalPrice(details.stats, details.types).toFixed(2),
          );
          setPokemon({ ...details, price });
        } else {
          console.error('Incomplete Pokemon details:', details);
        }
      }
    };

    fetchDetails();
  }, [id]);

  if (!pokemon) return <div>Cargando...</div>;

  const getStatIcon = (statName: string) => {
    switch (statName) {
      case 'hp':
        return <FaWeightHanging className="mr-2 inline" />;
      case 'attack':
        return <GiBroadsword className="mr-2 inline" />;
      case 'defense':
        return <GiShield className="mr-2 inline" />;
      case 'speed':
        return <GiSpeedometer className="mr-2 inline" />;
      default:
        return <FaRulerVertical className="mr-2 inline" />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="flex w-full justify-start p-4">
        <BackButton />
      </div>
      <div className="mx-auto max-w-4xl p-4">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold capitalize">{pokemon.name}</h1>
          <div className="flex justify-center gap-2">
            {pokemon.types.map((type) => (
              <TypeChip key={type.type.name} type={type.type.name} />
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl bg-gray-100 p-6 shadow-xl dark:bg-gray-800">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="h-64 w-full object-contain"
            />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-200 p-3 text-center dark:bg-gray-700">
                <p className="text-sm text-gray-500">Peso</p>
                <p className="font-bold">{pokemon.weight / 10} kg</p>
              </div>
              <div className="rounded-lg bg-gray-200 p-3 text-center dark:bg-gray-700">
                <p className="text-sm text-gray-500">Altura</p>
                <p className="font-bold">{pokemon.height / 10} m</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-gray-100 p-6 shadow-xl dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold">Estadísticas</h2>
            <div className="space-y-3">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="flex items-center">
                  {getStatIcon(stat.stat.name)}
                  <span className="w-32 capitalize">{stat.stat.name}</span>
                  <div className="h-3 flex-1 rounded-full bg-gray-300 dark:bg-gray-700">
                    <div
                      className="h-3 rounded-full bg-blue-500"
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 w-12 text-right">{stat.base_stat}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-lg bg-gray-200 p-4 text-center dark:bg-gray-700">
              <p className="text-sm text-gray-500">Precio calculado</p>
              <p className="text-3xl font-bold text-blue-500">
                ${pokemon.price}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-gray-100 p-6 shadow-xl dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold">Habilidades</h2>
          <div className="flex justify-center gap-4">
            {pokemon.abilities.map((ability) => (
              <div
                key={ability.ability.name}
                className="w-44 rounded-lg bg-gray-200 p-3 text-center capitalize dark:bg-gray-700"
              >
                {ability.ability.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
