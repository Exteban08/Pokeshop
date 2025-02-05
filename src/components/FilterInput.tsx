import { useState } from 'react';
import { typeColors } from '../utils/pokemon-types';
import { IoFilter } from 'react-icons/io5';
import Button from './Button';
import clsx from 'clsx';

interface TypeFilterProps {
  types: string[];
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
}

const FilterInput = ({
  types,
  selectedType,
  onSelectType,
}: TypeFilterProps) => {
  const [openOptions, setOpenOptions] = useState(false);

  const toggleFilterOptions = () => {
    setOpenOptions(!openOptions);
  };

  const handleTypeSelect = (type: string) => {
    const newType = selectedType === type ? null : type;
    onSelectType(newType);
    setOpenOptions(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={toggleFilterOptions}
        className={clsx(
          'flex items-center gap-2 rounded-lg p-2 hover:backdrop-opacity-90',
          selectedType && [typeColors[selectedType]],
        )}
      >
        <IoFilter className="text-xl" />
        <span>{selectedType ? selectedType : 'Filtrar'}</span>
      </Button>

      {openOptions && (
        <div className="absolute top-12 right-0 z-10 w-48 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
          <div className="grid grid-cols-2 gap-2">
            {types.map((type) => (
              <Button
                key={type}
                onClick={() => handleTypeSelect(type)}
                className={clsx('rounded-full p-2 text-sm text-white', {
                  [typeColors[type]]: true,
                  'ring-2 ring-black': selectedType === type,
                  'ring-white': selectedType !== type,
                })}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterInput;
