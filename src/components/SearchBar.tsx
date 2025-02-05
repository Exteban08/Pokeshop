import { useDebouncedCallback } from 'use-debounce';

const SearchBar = ({
  search,
  onSearch,
}: {
  search: string;
  onSearch: (search: string) => Promise<void>;
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
        className="rounded-lg border bg-gray-200 fill-black px-4 py-2 dark:bg-gray-900 dark:text-white"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          debounced(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
