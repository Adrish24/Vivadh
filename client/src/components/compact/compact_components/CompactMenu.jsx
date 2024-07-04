/* eslint-disable react/prop-types */
import { BiHide } from "react-icons/bi";
import {
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
  MdOutlineReportGmailerrorred,
} from "react-icons/md";
import { optionStyle } from "../../../styles/compact_view";
import { useSelector } from "react-redux";

const CompactMenu = ({ item, isFav, handleOptionsClick, loading }) => {
  const { currentUser } = useSelector((state) => state.Auth);

  return (
    <>
      {currentUser && item === "Favourite" && (
        <button
          disabled={loading ? true : false}
          onClick={(e) => handleOptionsClick(e, item)}
          className={optionStyle}
          key={item}
          title={item}
        >
          <span>
            {isFav ? (
              <MdOutlineFavorite size={20} />
            ) : (
              <MdOutlineFavoriteBorder size={20} />
            )}
          </span>
        </button>
      )}
      {currentUser && item === "Hide" && (
        <button
          disabled={loading ? true : false}
          onClick={(e) => handleOptionsClick(e, item)}
          className={optionStyle}
          key={item}
          title={item}
        >
          <span>
            <BiHide size={20} />
          </span>
        </button>
      )}
      {item === "Report" && (
        <button
          disabled={loading ? true : false}
          onClick={(e) => handleOptionsClick(e, item)}
          className={optionStyle}
          key={item}
          title={item}
        >
          <span>
            <MdOutlineReportGmailerrorred size={20} />
          </span>
        </button>
      )}
    </>
  );
};

export default CompactMenu;
