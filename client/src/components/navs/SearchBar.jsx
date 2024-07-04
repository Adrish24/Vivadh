import { LuSearch } from "react-icons/lu";

const SearchBar = () => {
  return (
    <div className="flex-1 py-2.5 flex justify-center">
      <div
        className="
    rounded-full mx-auto
    w-full
    lg:w-[600px]
    flex 
    items-center 
    bg-neutral-900 
    hover:bg-zinc-800
    px-6 
    overflow-hidden
    "
      >
        <span className="mr-2">
          <LuSearch size={20} />
        </span>

        <input
          className="
      flex-grow py-2
      border-none
      outline-none
      bg-transparent 
      placeholder:text-slate-300
      "
          type="text"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
