/* eslint-disable react/prop-types */

import { useRef, useState } from "react";
import {
  slide,
  slideBg,
  slide_navigation,
  slide_options,
  viewPort,
} from "../../../styles/preview";
import { useCarousel } from "../../../hooks";
import defaultPic from "../../../assets/picture.png";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { GoDot, GoDotFill } from "react-icons/go";
import Modal from "../../modal/Modal";
import Fullscreen from "../../preview/Fullscreen";

const CompactBody = ({ single }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const imagesRef = useRef([]);

  const { currentIndex, translate, disableNext, disablePrev, next, previous } =
    useCarousel(single?.images);

  const handleError = (e) => {
    e.target.src = defaultPic;
  };

  const handleFullscreen = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFullScreen(true);
  };

  return (
    <>
      {single?.content && <div className="w-3/4">{single?.content}</div>}

      {/* Card Image */}
      {single?.images?.length > 0 && (
        <div
          onClick={handleFullscreen}
          className={`${viewPort} overflow-hidden rounded-2xl mb-3 bg-neutral-900`}
        >
          {single.images.map((img, i) => (
            <div
              key={i}
              className={`min-w-full flex justify-center     ${
                imagesRef.current?.[i]?.naturalWidth >= 500
                  ? ""
                  : "items-center"
              } duration-300`}
              style={{
                transform: `translateX(-${translate}%)`,
              }}
            >
              <div
                className={slideBg}
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <img
                onError={handleError}
                ref={(el) => (imagesRef.current[i] = el)}
                className="max-w-full h-full object-cover z-10"
                src={img}
                alt="failed to load"
              />
            </div>
          ))}

          {isFullScreen && (
            <Modal
              Component={Fullscreen}
              componentProps={{ images: single?.images, setIsFullScreen }}
            />
          )}

          {!disablePrev && (
            <a
              onClick={previous}
              className={` 
            ${slide_options}
            left-4 top-[45%]
            p-2 
            `}
            >
              <MdOutlineKeyboardArrowLeft />
            </a>
          )}
          {!disableNext && (
            <a
              onClick={next}
              className={` 
            ${slide_options}
            right-4 top-[45%]
            p-2 
            `}
            >
              <MdOutlineKeyboardArrowRight />
            </a>
          )}

          {single.images.length > 1 && (
            <div
              className={`
        ${slide_navigation}
        bottom-3 right-[45%]
        `}
            >
              {single.images.map((_, i) => (
                <a key={i}>
                  {currentIndex === i ? (
                    <GoDotFill size={12} />
                  ) : (
                    <GoDot size={12} />
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Card video */}
      {single?.video?.[0] && (
        <div className={`${slide} rounded-2xl mb-3`} onClick={handleFullscreen}>
          <video src={single.video[0]?.url} controls className="w-full"></video>

          {isFullScreen && (
            <Modal
              Component={Fullscreen}
              componentProps={{ video: single?.video?.[0], setIsFullScreen }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CompactBody;
