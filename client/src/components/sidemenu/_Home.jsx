import { IoHomeOutline, IoHomeSharp } from "react-icons/io5"


const _Home = ({handleSelect, page}) => {
  return (
    <button
        onClick={() => handleSelect("Home")}
        className={`
        py-2 px-3 
        rounded-lg 
        font-word 
        font-extralight 
        flex items-center
        ${
          page === "Home"
            ? "bg-neutral-700"
            : "hover:bg-neutral-800 "
        }
        `}
        
      >
        <span className="mr-3">
          {page === "Home" ? <IoHomeSharp size={24}/> : <IoHomeOutline size={24} />}
        </span>
        <span className="mr-auto">Home</span>
      </button>
  )
}

export default _Home
