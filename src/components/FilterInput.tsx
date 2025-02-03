import { useState } from "react";
import { typeColors } from "../utils/pokemon-types";
import { IoFilter } from "react-icons/io5";
import Button from "./Button";

interface TypeFilterProps {
  types: string[];
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
  theme: string;
}

const FilterInput = ({
  types,
  selectedType,
  onSelectType,
  theme,
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
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700"
      >
        <IoFilter className="text-xl" />
        <span>{selectedType ? selectedType : "Filtrar"}</span>
      </Button>

      {openOptions && (
        <div
          className={`absolute top-12 right-0 z-10 w-48 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-lg p-4`}
        >
          <div className="grid grid-cols-2 gap-2">
            {types.map((type) => (
              <Button
                key={type}
                onClick={() => handleTypeSelect(type)}
                className={`p-2 rounded-full text-sm text-white ${
                  typeColors[type] || "bg-gray-400"
                } ${
                  selectedType === type
                    ? "opacity-100 ring-2 ring-white"
                    : "opacity-80 hover:opacity-100"
                }`}
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
