import { useDebouncedCallback } from "use-debounce";

const SearchBar = ({
  search,
  onSearch,
  theme,
}: {
  search: string;
  onSearch: (search: string) => void;
  theme: string;
}) => {
  const debounced = useDebouncedCallback((value: string) => {
    onSearch(value);
  }, 500);

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="Busca un Pokemon"
        defaultValue={search}
        className={`px-4 py-2 border rounded-lg ${
          theme === "dark"
            ? "text-white hover:bg-gray-600"
            : "text-black hover:bg-gray-200"
        }`}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          debounced(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
