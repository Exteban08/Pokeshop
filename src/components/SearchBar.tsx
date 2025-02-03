import { useState } from "react";

const SearchBar = ({
  onSearch,
  theme,
}: {
  onSearch: (search: string) => void;
  theme: string;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="Busca un Pokemon"
        value={searchTerm}
        className={`px-4 py-2 border rounded-lg ${
          theme === "dark"
            ? "text-white hover:bg-gray-600"
            : "text-black hover:bg-gray-200"
        }`}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
