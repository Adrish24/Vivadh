/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import {
  slide,
  slideBg,
  slide_navigation,
  slide_options,
} from "../../styles/preview";
import { useCarousel } from "../../hooks";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdClose,
} from "react-icons/md";
import { GoDot, GoDotFill } from "react-icons/go";

const Fullscreen = ({ images, video, setIsFullScreen }) => {
  const [zoomIn, setZoomIn] = useState(false);

  const imagesRef = useRef([]);

  const { currentIndex, translate, disableNext, disablePrev, next, previous } =
    useCarousel(images?.length > 0 && images);

  const handleZoomInAndOut = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setZoomIn(!zoomIn);
  };

  const handleCloseFullscreen = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFullScreen(false);
  };

  return (
    <>
      {images && (
        <div
          onClick={handleZoomInAndOut}
          className={`bg-neutral-900 overflow-auto relative ${
            images.length === 1
              ? zoomIn
                ? "cursor-zoom-out"
                : "cursor-zoom-in flex w-full"
              : "inline-flex  overflow-hidden  cursor-default"
          }`}
        >
          {/* IMAGES SLIDE */}
          {images &&
            images.map((img, i) => (
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
                  ref={(el) => (imagesRef.current[i] = el)}
                  className={`max-w-full object-contain z-10 mt-2 `}
                  src={img}
                  alt="failed to load"
                />
              </div>
            ))}

          {/* NEXT & PREVIOUS BUTTONS */}
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

          {/* NAVIGATION INDICATOR */}
          {images.length > 1 && (
            <div
              className={`
        ${slide_navigation}
        bottom-3 right-[45%]
        `}
            >
              {images.map((_, i) => (
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

      {video && (
        <div className={`bg-neutral-800 cursor-default`}>
          <video src={video.url} controls className="w-full h-full"></video>
        </div>
      )}

      {/* CLOSE */}
      <div
        onClick={handleCloseFullscreen}
        className="absolute top-3 right-3 cursor-pointer hover:bg-neutral-900 p-2 rounded-full"
      >
        <MdClose size={32} />
      </div>
    </>
  );
};

export default Fullscreen;
