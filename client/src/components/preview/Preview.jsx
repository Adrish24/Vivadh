/* eslint-disable react/prop-types */
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { GoDot, GoDotFill } from "react-icons/go";
import { IoImagesOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRef } from "react";

import { useCarousel, useHover } from "../../hooks";
import {
  slide,
  slideBg,
  slide_navigation,
  slide_options,
  viewPort,
} from "../../styles/preview";

const Preview = ({ type, form, selectFiles, handleDelete }) => {
  const imagesRef = useRef([]);

  const { currentIndex, translate, disableNext, disablePrev, next, previous } =
    useCarousel(form.body);

  const { isHover, onEnter, onLeave } = useHover(false);

  return (
    <div
      onMouseEnter={() => onEnter(true)}
      onMouseLeave={() => onLeave(false)}
      className={viewPort}
    >
      {/* IMAGE SLIDE */}
      {type === "image" ? (
        form.body.map((img, i) => (
          <div
            key={img.name}
            className={`${slide} ${
              imagesRef.current?.[i]?.naturalWidth >= 500 ? "" : "items-center"
            } duration-300`}
            style={{
              transform: `translateX(-${translate}%)`,
            }}
          >
            <div
              className={slideBg}
              style={{ backgroundImage: `url(${img.url})` }}
            ></div>
            <img
              ref={(el) => (imagesRef.current[i] = el)}
              className="max-w-full object-contain z-10"
              src={img.url}
              alt="failed to load"
            />
          </div>
        ))
      ) : (
        <div className={slide}>
          <video src={form.body?.[0]?.url} controls></video>
        </div>
      )}

      {isHover && (
        <>
          <a
            onClick={selectFiles}
            className={`
              ${slide_options}
              top-3 left-3
              px-3 py-1.5 
              flex 
              items-center 
              `}
          >
            <IoImagesOutline />
            <span className="text-xs font-semibold ml-2">Add</span>
          </a>
          <a
            onClick={() => handleDelete(currentIndex)}
            className={`
              ${slide_options}
              top-3 right-3
              p-2   
              `}
          >
            <RiDeleteBin6Line />
          </a>
        </>
      )}


      {/* Next and Previous buttons */}
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

       {/* Navigation indicator */}
      {form.body.length > 1 && (
        <div
          className={`
        ${slide_navigation}
        bottom-3 right-[45%]
        `}
        >
          {form.body.map((_, i) => (
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
  );
};

export default Preview;
