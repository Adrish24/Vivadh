import { useEffect, useRef } from "react";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setSortBy, setToggleSort } from "../../redux/slices/filterSlice";
import { setProgress } from "../../redux/slices/loadingSlice";

const sortMenu = ["All", "New", "Top"];

const SortBy = () => {
  const { toggleSort, sortBy } = useSelector((state) => state.Filter);

  const dispatch = useDispatch();

  const sortRef = useRef();

  // toggle menu for Sort filter
  const handleSort = () => {
    dispatch(setToggleSort(!toggleSort));
  };

  // selecting sort type
  const handleSelectSortBy = async (item) => {
    dispatch(setProgress(10));
    await new Promise((res) => setTimeout(res, 1000));
    dispatch(setSortBy(item));
    dispatch(setProgress(100));
  };

  // handling outside click event
  const handleOutsideClick = (e) => {
    if (sortRef.current && !sortRef.current.contains(e.target)) {
      dispatch(setToggleSort(false));
    }
  };

  

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={sortRef}
      onClick={handleSort}
      title="Open sort menu"
      className={`
        flex 
        items-center justify-center
        z-10
        px-3 py-1
        my-1 gap-2 
        rounded-3xl
        relative 
        cursor-pointer
        ${toggleSort ? "bg-neutral-700" : "hover:bg-neutral-800"}
        `}
    >
      <span>{sortBy}</span>
      <span>
        <BsChevronDown size={12} />
      </span>
      {toggleSort && (
        <div
          className="
          absolute
          top-[36px]
          flex flex-col items-start
          text-sm
          bg-neutral-800
          rounded-md
          "
        >
          <span
            title=""
            className="
            px-2.5 pb-2 pt-3
            whitespace-nowrap font-semibold
            "
          >
            Sort by
          </span>
          {sortMenu.map((item, index) => (
            <button title=""
              onClick={() => handleSelectSortBy(item)}
              className={`
            px-2.5 py-2 w-full text-start
            ${index == sortMenu.length - 1 ? "rounded-b-md pb-3" : ""}
            ${sortBy === item ? "bg-neutral-700" : ""}
            `}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortBy;
