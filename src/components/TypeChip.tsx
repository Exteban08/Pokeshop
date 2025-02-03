import { typeColors } from "../utils/pokemon-types";

interface TypeChipProps {
  type: string;
}

const TypeChip = ({ type }: TypeChipProps) => {
  const color = typeColors[type] || "bg-gray-400";

  return (
    <span
      className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${color}`}
    >
      {type}
    </span>
  );
};

export default TypeChip;
