import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchPokemon } from "../services/pokemonApi";
import { useTheme } from "../context/useTheme";
import type { PokemonDetails } from "../types/pokemon";
import BackButton from "../components/BackButton";
import TypeChip from "../components/TypeChip";
import { calculateFinalPrice } from "../utils/pricing";
import { FaWeightHanging, FaRulerVertical } from "react-icons/fa";
import { GiBroadsword, GiShield, GiSpeedometer } from "react-icons/gi";

const PokemonDetails = () => {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  console.log("🚀 ~ PokemonDetails ~ pokemon:", pokemon);

  useEffect(() => {
    const fetchDetails = async () => {
      if (id) {
        const details = await searchPokemon(id);
        if (details) {
          const price = parseFloat(calculateFinalPrice(details.stats, details.types).toFixed(2));
          setPokemon({ ...details, price });
        } else {
          console.error("Incomplete Pokemon details:", details);
        }
      }
    };

    fetchDetails();
  }, [id]);

  if (!pokemon) return <div>Cargando...</div>;

  const getStatIcon = (statName: string) => {
    switch (statName) {
      case "hp":
        return <FaWeightHanging className="inline mr-2" />;
      case "attack":
        return <GiBroadsword className="inline mr-2" />;
      case "defense":
        return <GiShield className="inline mr-2" />;
      case "speed":
        return <GiSpeedometer className="inline mr-2" />;
      default:
        return <FaRulerVertical className="inline mr-2" />;
    }
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="w-full flex justify-start p-4">
        <BackButton />
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold capitalize mb-2">{pokemon.name}</h1>
          <div className="flex justify-center gap-2">
            {pokemon.types.map((type) => (
              <TypeChip key={type.type.name} type={type.type.name} />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div
            className={`rounded-xl p-6 shadow-xl ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-full h-64 object-contain"
            />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div
                className={`p-3 rounded-lg text-center ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <p className="text-sm text-gray-500">Peso</p>
                <p className="font-bold">{pokemon.weight / 10} kg</p>
              </div>
              <div
                className={`p-3 rounded-lg text-center ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <p className="text-sm text-gray-500">Altura</p>
                <p className="font-bold">{pokemon.height / 10} m</p>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl p-6 ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">Estadísticas</h2>
            <div className="space-y-3">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="flex items-center">
                  {getStatIcon(stat.stat.name)}
                  <span className="capitalize w-32">{stat.stat.name}</span>
                  <div className="flex-1 bg-gray-300 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-blue-500 h-3 rounded-full"
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    ></div>
                  </div>
                  <span className="w-12 text-right ml-2">{stat.base_stat}</span>
                </div>
              ))}
            </div>

            <div
              className={`mt-8 p-4 rounded-lg text-center ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              <p className="text-sm text-gray-500">Precio calculado</p>
              <p className="text-3xl font-bold text-blue-500">
                ${pokemon.price}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`mt-8 rounded-xl p-6 ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Habilidades</h2>
          <div className="flex justify-center gap-4">
            {pokemon.abilities.map((ability) => (
              <div
                key={ability.ability.name}
                className={`w-44 p-3 rounded-lg text-center capitalize ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}
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
