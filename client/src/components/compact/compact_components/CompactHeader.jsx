/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";

import {
  setToggleSort,
  setToggleView,
} from "../../../redux/slices/filterSlice";

// import { UserInfo } from "../../../components";
// import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import timeAgo from "../../../utls/timeAgo";

const CompactHeader = ({ single, handlePropagation, navigateToPage }) => {
  // const [delay, setDelay] = useState(true);
  // const [hoverTimeout, setHoverTimeout] = useState(null);

  const dispatch = useDispatch();

  const handleClick = (e) => {
    handlePropagation(e);
    navigateToPage(`/user/${single?.username}`, "");
    dispatch(setToggleView(false));
    dispatch(setToggleSort(false));
  };

  // const handleMouseEnter = () => {
  //   const timeout = setTimeout(() => {
  //     setDelay(false);
  //   }, 500); // 1000ms = 1 second
  //   setHoverTimeout(timeout);
  // };

  // const handleMouseLeave = () => {
  //   if (hoverTimeout) {
  //     clearTimeout(hoverTimeout);
  //     setTimeout(() => {
  //       setDelay(true);
  //     }, 300);
  //     setHoverTimeout(null);
  //   }
  // };

  // useEffect(() => {
  //   console.log(delay);
  // }, [delay]);

  return (
    <div className="flex flex-col">
      {/* upper */}
      <div className="flex items-center">
        <div
          onClick={handleClick}
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          className="flex items-center group relative Z-20"
        >
          {single?.avatar ? (
            <img
              className="
          p-1 
          rounded-full 
          bg-white 
          object-contain w-5
          "
              src={single?.avatar}
              alt=""
            />
          ) : (
            <CgProfile size={20} />
          )}
          <span className="py-1 px-2 text-sm hover:text-orange-500">
            {single?.username}
          </span>
          {/* user info */}
          {/* <UserInfo single={single} delay={delay} /> */}
        </div>
        <div className="w-1 h-1 rounded-full bg-neutral-400" />
        <span className="px-2 py-1 text-[10px] font-thin">
          {timeAgo(single?.createdAt)}
        </span>
      </div>

      {/* lower */}
      <div className="mb-2">
        <span>{single?.title}</span>
        <span
          className="
        px-2 rounded-full 
        text-black 
        font-semibold 
        ml-2 uppercase text-sm
        "
          style={{
            background: `${single?.topic.color}`,
          }}
        >
          {single?.topic?.name}
        </span>
        <span
          className="
        px-2 rounded-full 
        text-black 
        font-semibold 
        ml-2 uppercase text-sm
        "
          style={{
            background: `${single?.flair.color}`,
          }}
        >
          {single?.flair?.name}
        </span>
      </div>
    </div>
  );
};

export default CompactHeader;
