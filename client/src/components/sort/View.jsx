import { MdOutlineViewDay, MdViewDay } from "react-icons/md";
import { PiCards, PiCardsFill } from "react-icons/pi";
import { BsChevronDown } from "react-icons/bs";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToggleView, setView } from "../../redux/slices/filterSlice";
import { setProgress } from "../../redux/slices/loadingSlice";

const ViewMenu = ["Card", "Compact"];

const View = () => {
  const { toggleView, view } = useSelector((state) => state.Filter);

  const dispatch = useDispatch();
  const viewRef = useRef();

  // toggle menu for view
  const handleView = () => {
    dispatch(setToggleView(!toggleView));
  };


  // selecting view type
  const handleSelectView = async (item) => {
    dispatch(setProgress(10));
    await new Promise((res) => setTimeout(res, 1000));
    localStorage.setItem('viewType', JSON.stringify(item));
    dispatch(setView(item));
    dispatch(setProgress(100));
  };

  // handling outside click event
  const handleOutsideClick = (e) => {
    if (viewRef.current && !viewRef.current.contains(e.target)) {
      dispatch(setToggleView(false));
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
      ref={viewRef}
      onClick={handleView}
      title="Open view menu"
      className={`
        flex 
        items-center justify-center
        z-10
        px-3 py-1
        my-1 gap-2 
        rounded-3xl 
        relative
        cursor-pointer
        ${toggleView ? "bg-neutral-700" : "hover:bg-neutral-800"}
        `}
    >
      <span>
        {view === "Card" ? (
          <PiCards size={18} />
        ) : (
          <MdOutlineViewDay size={18} />
        )}
      </span>
      <span>
        <BsChevronDown size={12} />
      </span>

      
      {toggleView && (
        <div
          className="
          bg-neutral-800
          absolute
          top-[36px]
          flex flex-col items-start justify-center
          text-sm
          rounded-md
          "
        >
          <span
            title=""
            className="
            px-4 pb-2 pt-3
            w-full 
            whitespace-nowrap 
            font-semibold
            "
          >
            View
          </span>

          {/* menu items */}
          {ViewMenu.map((item, index) => (
            <button
              title=""
              onClick={() => handleSelectView(item)}
              className={`flex
            px-5 py-2 
            w-full
            ${index === ViewMenu.length - 1 ? "rounded-b-md pb-3" : ""}
            ${view === item ? "bg-neutral-700" : ""}
            `}
              key={item}
            >
              <span className="mr-3">
                {item === "Card" ? (
                  view === "Card" ? (
                    <PiCardsFill size={20} />
                  ) : (
                    <PiCards size={20} />
                  )
                ) : null}
                {item === "Compact" ? (
                  view === "Compact" ? (
                    <MdViewDay size={20} />
                  ) : (
                    <MdOutlineViewDay size={20} />
                  )
                ) : null}
              </span>
              <span>{item}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default View;
