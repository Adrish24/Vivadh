import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

const _Favourites = ({handleSelect, page}) => {
  return (
    <button
        onClick={() => handleSelect("Favourites")}
        className={`
        py-2 px-3 
        rounded-lg 
        font-word 
        font-extralight 
        flex items-center
        ${
          page === "Favourites"
            ? "bg-neutral-700"
            : "hover:bg-neutral-800 "
        }
        `}
        
      >
        <span className="mr-3">
          {page === "Favourites" ? <MdOutlineFavorite size={24}/> : <MdOutlineFavoriteBorder size={24} />}
        </span>
        <span className="mr-auto">Favourties</span>
      </button>
  )
}

export default _Favourites
