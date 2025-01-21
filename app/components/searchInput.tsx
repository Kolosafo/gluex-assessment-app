import { SearchIcon, X } from "lucide-react";
import React from "react";

function SearchInput({
  searchQuery,
  setSearchQuery,
  placeholder,
  handleSubmitSearch,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder: string;
  handleSubmitSearch: () => void;
}) {
  return (
    <label
      htmlFor="search"
      className="flex h-fit w-full  items-center rounded-lg border border-gray-200 bg-white md:px-6 px-2 py-4 transition duration-300 placeholder:text-sm placeholder:font-thin focus-within:border-blue-400"
    >
      <SearchIcon className="pointer-events-none text-gray-900 md:h-4 h-6 md:w-4 w-6" />
      <input
        id="meter_number"
        type="text"
        value={searchQuery}
        placeholder={placeholder}
        onChange={(e) => {
          const value = e.target.value;
          setSearchQuery(value);
        }}
        className="h-fit text-gray-600 w-full border-none bg-transparent px-4 outline-none transition duration-300 placeholder:text-sm placeholder:text-gray-600"
      />
      {searchQuery && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            title="clear input"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-4 w-4 text-gray-900" />
          </button>
        </div>
      )}
    </label>
  );
}

export default SearchInput;
