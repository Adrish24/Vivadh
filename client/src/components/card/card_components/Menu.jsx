/* eslint-disable react/prop-types */
import { BiHide } from "react-icons/bi";
import {
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
  MdOutlineReportGmailerrorred,
} from "react-icons/md";
import { useSelector } from "react-redux";

const Menu = ({ item, isFav, handleMenuItemClick, loading }) => {
  const { currentUser } = useSelector((state) => state.Auth);

  return (
    <>
      {currentUser && item === "Favourite" && (
        <button
          title={item}
          disabled={loading ? true : false}
          onClick={(e) => handleMenuItemClick(e, item)}
          className="flex items-center text-start p-2 hover:bg-neutral-800 rounded-full"
        >
          <span>
            {isFav ? (
              <MdOutlineFavorite size={24} />
            ) : (
              <MdOutlineFavoriteBorder size={24} />
            )}
          </span>
        </button>
      )}
      {currentUser && item === "Hide" && (
        <button
          title={item}
          disabled={loading ? true : false}
          onClick={(e) => handleMenuItemClick(e, item)}
          className="flex items-center text-start p-2 hover:bg-neutral-800 rounded-full"
        >
          <span>
            <BiHide size={24} />
          </span>
        </button>
      )}
      {item === "Report" && (
        <button
          title={item}
          disabled={loading ? true : false}
          onClick={(e) => handleMenuItemClick(e, item)}
          className="flex items-center text-start p-2 hover:bg-neutral-800 rounded-full"
        >
          <span>
            <MdOutlineReportGmailerrorred size={24} />
          </span>
        </button>
      )}
    </>
  );
};

export default Menu;
