/* eslint-disable react/prop-types */
import usePageNavigation from "../../hooks/usePageNavigation";
import { CompactFooter, CompactHeader } from "./compact_components";

import { CiImageOn } from "react-icons/ci";
import { ImImages } from "react-icons/im";

import { compact_container, compact_img_box } from "../../styles/compact_view";
import { useDispatch } from "react-redux";
import { setSinglePost } from "../../redux/data/singlePostSlice";
import { useState } from "react";
import Modal from "../modal/Modal";
import Fullscreen from "../preview/Fullscreen";

const Compact = ({ single, array, setArray }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const dispatch = useDispatch();
  const { handlePropagation, navigateToPage } = usePageNavigation();

  const fetchComments = () => {
    const data = array.find((p) => p?._id === single?._id);
    dispatch(setSinglePost(data));
    navigateToPage(`/comments/${single?._id}`, "");
  };

  const handleFullscreen = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFullScreen(true);
  };

  const handleDuration = (e) => {
    const duration = e.target.duration;
    setMinutes(Math.floor(duration / 60));
    setSeconds(Math.floor(duration % 60));
  };

  return (
    <div onClick={fetchComments} className="cursor-pointer w-full md:w-3/4">
      <div className={compact_container}>
        {/* image & video */}
        <div onClick={handleFullscreen} className={compact_img_box}>
          {single?.images?.length > 0 ? (
            <>
              <img
                className="w-full object-cotain"
                src={single?.images?.[0]}
                alt=""
              />
              {isFullScreen && (
                <Modal
                  Component={Fullscreen}
                  componentProps={{ images: single?.images, setIsFullScreen }}
                />
              )}

              {/* Show how many Images are there */}
              {single?.images?.length > 1 && (
                <span className="absolute bottom-1 left-1 text-xs flex items-center gap-1.5 bg-neutral-900 p-1 px-1.5 rounded-xl">
                  <ImImages />
                  <span>{single?.images?.length}</span>
                </span>
              )}
            </>
          ) : single?.video?.[0] ? (
            <>
              <video
                src={single.video[0]?.url}
                className="w-24 object-cover"
                onLoadedMetadata={handleDuration}
              ></video>
              {isFullScreen && (
                <Modal
                  Component={Fullscreen}
                  componentProps={{
                    video: single?.video?.[0],
                    setIsFullScreen,
                  }}
                />
              )}

              <span
                className="
              absolute 
              bottom-1 left-1 
              text-xs 
              flex items-center 
              gap-1.5 
              bg-neutral-900 
              py-1 px-1.5 
              rounded-xl"
              >
                <span>
                  {minutes < 10 ? `${minutes}0` : minutes} :{" "}
                  {seconds < 10 ? `0${seconds}` : seconds}
                </span>
              </span>
            </>
          ) : (
            <CiImageOn className="m-auto" size={32} />
          )}
        </div>

        <div className="grow flex flex-col px-3">
          {/* header */}
          <CompactHeader
            single={single}
            array={array}
            setArray={setArray}
            handlePropagation={handlePropagation}
            navigateToPage={navigateToPage}
          />

          {/* footer */}
          <CompactFooter
            single={single}
            array={array}
            setArray={setArray}
            handlePropagation={handlePropagation}
          />
        </div>
      </div>
      <div className="bg-neutral-600 h-[1px]" />
    </div>
  );
};

export default Compact;
