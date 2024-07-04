/* eslint-disable react/prop-types */

import { CardHeader, CardBody, CardFooter } from "./card_components";
import usePageNavigation from "../../hooks/usePageNavigation";

const Card = ({ single, array, setArray, isSingle }) => {
  const { handlePropagation, navigateToPage } = usePageNavigation();

  const handleClick = () => {
    if (isSingle) return;
    navigateToPage(`/comments/${single?._id}`, "");
  };

  return (
    <div
      onClick={handleClick}
      className={`${isSingle ? "my-5" : "cursor-pointer"}`}
    >
      <div
        className={`
      ${isSingle ? "" : "hover:bg-neutral-900"}
      rounded-2xl
      px-3 my-1
      `}
      >
        {/* Card header */}
        <CardHeader
          single={single}
          isSingle={isSingle}
          array={array}
          setArray={setArray}
          handlePropagation={handlePropagation}
          navigateToPage={navigateToPage}
        />

        {/* Card body */}
        <CardBody single={single} />

        {/* Card footer */}
        <CardFooter
          single={single}
          isSingle={isSingle}
          array={array}
          setArray={setArray}
          handlePropagation={handlePropagation}
        />
      </div>
     {!isSingle && <div className="bg-neutral-600 h-[1px]" />}
    </div>
  );
};

export default Card;
