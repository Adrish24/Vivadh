import { LuMenu } from "react-icons/lu";
import { Logo, SearchBar, NavMenu } from "../../components";


const Navbar = () => {

  return (
    <div
      className="
    bg-black text-neutral-200
    fixed w-full 
    flex justify-between
    items-center 
    px-4
    border-b 
    border-neutral-600
    z-50
    "
    >
      {/* sidebar menu */}
      <button
        className="p-2  rounded-full hover:bg-slate-700 mr-2 lg:hidden"
        title="Open navigation"
      >
        <LuMenu size={24} />
      </button>

      {/* logo */}
      <Logo />

      {/* search-bar */}
      <SearchBar />

      {/* navbar-menu */}
      <NavMenu />
    </div>
  );
};

export default Navbar;
