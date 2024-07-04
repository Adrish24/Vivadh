/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { useCarousel } from "../../../hooks";
import {
  slide,
  slideBg,
  slide_navigation,
  slide_options,
  viewPort,
} from "../../../styles/preview";

import defaultPic from "../../../assets/picture.png";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { GoDot, GoDotFill } from "react-icons/go";
import Modal from "../../modal/Modal";
import Fullscreen from "../../preview/Fullscreen";

const CardBody = ({ single }) => {
  const imagesRef = useRef([]);
  const [isFullScreen, setIsFullScreen] = useState(false);

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
    <div className="mb-2 flex flex-col">
      {/* Card content */}
      <span className="text-xl mb-2">{single?.title}</span>
      {single?.content && <p className="mb-2">{single.content}</p>}

      {/* Card Image */}
      {single?.images?.length > 0 && (
        <div
          onClick={handleFullscreen}
          className={`${viewPort} overflow-hidden rounded-2xl mb-3 bg-neutral-900 cursor-pointer`}
        >
          {single.images.map((img, i) => (
            <div
              key={i}
              className={`${slide} ${
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
                className="max-w-full object-contain z-10"
                src={img}
                alt="failed to load"
              />
            </div>
          ))}

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

          {isFullScreen && (
            <Modal
              Component={Fullscreen}
              componentProps={{ images: single?.images, setIsFullScreen }}
            />
          )}
        </div>
      )}

      {/* Card video */}
      {single?.video?.[0] && (
        <div className={`${slide} rounded-2xl mb-3 cursor-pointer`} onClick={handleFullscreen}>

          <video src={single.video[0]?.url} controls className="w-full"></video>

          {isFullScreen && (
            <Modal
              Component={Fullscreen}
              componentProps={{ video:single?.video?.[0], setIsFullScreen }}
            />
          )}
        </div>
      )}

      {/* Card topic */}
      <div className="flex mb-2 uppercase text-black font-semibold text-xs">
        <span
          className="px-2 rounded-full"
          style={{
            background: `${single?.topic.color}`,
          }}
        >
          {single?.topic.name}
        </span>
      </div>

      {/* Card flair */}
      <div className="flex mb-2 uppercase text-black font-semibold text-xs">
        <span
          className="px-2 rounded-full"
          style={{
            background: `${single?.flair.color}`,
          }}
        >
          {single?.flair.name}
        </span>
      </div>
    </div>
  );
};

export default CardBody;
