/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useState } from "react";

const initialState = {
  currentIndex: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Next": {
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
      };
    }
    case "Prev": {
      return {
        ...state,
        currentIndex: state.currentIndex - 1,
      };
    }
    case "SetIndex": {
      return {
        ...state,
        currentIndex: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const useCarousel = (array) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [disableNext, setDisableNext] = useState(false);
  const [disablePrev, setDisablePrev] = useState(false);

  const [translate, setTranslate] = useState(0);

  const next = (e) => {
    e.stopPropagation();
    if (state.currentIndex < array.length - 1) {
      dispatch({ type: "Next" });
    }
  };

  const previous = (e) => {
    e.stopPropagation();
    if (state.currentIndex > 0) {
      dispatch({ type: "Prev" });
    }
  };

  const setIndex = (length) => {
    if(state.currentIndex === length) {
      dispatch({type: "SetIndex", payload: length - 1})
    }
  };

  const handlePreview = () => {
    setTranslate(state.currentIndex * 100);
  };

  const handleEndOfCarousel = () => {
    if (state.currentIndex === array.length - 1) {
      setDisableNext(true);
    } else {
      setDisableNext(false);
    }

    if (state.currentIndex === 0) {
      setDisablePrev(true);
    } else {
      setDisablePrev(false);
    }

    if (array.length === 1) {
      setDisableNext(true);
      setDisablePrev(true);
    }
  };


  useEffect(() => {
    // console.log(state.currentIndex, array.length);
    setIndex(array.length)
    handlePreview();
    handleEndOfCarousel();
  }, [state.currentIndex, array]);

  return {
    currentIndex: state.currentIndex,
    translate,
    disableNext,
    disablePrev,
    next,
    previous,
  };
};

export default useCarousel;
