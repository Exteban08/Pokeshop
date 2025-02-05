import clsx from 'clsx';
import { typeColors } from '../utils/pokemon-types';

interface TypeChipProps {
  type: string;
  className?: string;
}

const TypeChip = ({ type, className }: TypeChipProps) => {
  const backgroundColor = typeColors[type].opacity || 'bg-gray-400';

  return (
    <span
      className={clsx(
        'rounded-full px-3 py-1 text-sm font-semibold text-white',
        backgroundColor,
        className,
      )}
    >
      {type}
    </span>
  );
};

export default TypeChip;
