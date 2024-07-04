/* eslint-disable react/prop-types */

import CardMenu from "./CardMenu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleSort,
  setToggleView,
} from "../../../redux/slices/filterSlice";
// import UserInfo from "../../tooltip/UserInfo";
import { CgProfile } from "react-icons/cg";

import timeAgo from "../../../utls/timeAgo";

const CardHeader = ({
  single,
  isSingle,
  handlePropagation,
  navigateToPage,
}) => {
  // for array of posts
  const [isFav, setIsFavs] = useState(false);
  // const [delay, setDelay] = useState(true);
  // const [hoverTimeout, setHoverTimeout] = useState(null);

  const { favs } = useSelector((state) => state.Favs);
  const { currentUser } = useSelector((state) => state.Auth);

  const dispatch = useDispatch();

  const handleClick = (e) => {
    handlePropagation(e);
    navigateToPage(`/user/${single?.username}`, "");
    dispatch(setToggleView(false));
    dispatch(setToggleSort(false));
  };

  // handle hover
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

  useEffect(() => {
    if (isSingle) {
      const checkFav = single?.favs_ref?.some((f) => f === currentUser?._id);
      // console.log(checkFav);
      if (checkFav) {
        setIsFavs(true);
      } else {
        setIsFavs(false);
      }
    } else {
      // checking for favourite posts
      const findFav = favs?.some((f) => f._id === single?._id);
      // console.log(findFav);
      if (findFav) {
        setIsFavs(true);
      } else {
        setIsFavs(false);
      }
    }
  }, [favs, single]);

  return (
    <div className="flex items-center mb-1">
      <div
        onClick={handleClick}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        className="flex items-center group Z-20 cursor-pointer"
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
      <span className="p-2 text-[10px] font-thin">
        {timeAgo(single?.createdAt)}
      </span>
      <div className="ml-auto">
        {
          <CardMenu
            handlePropagation={handlePropagation}
            single={single}
            isSingle={isSingle}
            isFav={isFav}
          />
        }
      </div>
    </div>
  );
};

export default CardHeader;
