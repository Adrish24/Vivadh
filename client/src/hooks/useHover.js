import { useState } from "react";

const useHover = (initialState) => {
  const [isHover, setIsHover] = useState(initialState);

  const onEnter = (bool) => {
    setIsHover(bool);
  };

  const onLeave = (bool) => {
    setIsHover(bool);
  };

  return {
    isHover,
    setIsHover,
    onEnter,
    onLeave
  }
};

export default useHover;
