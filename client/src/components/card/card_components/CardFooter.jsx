/* eslint-disable react/prop-types */

import { LiaCommentsSolid } from "react-icons/lia";
import { CiShare2 } from "react-icons/ci";
import { Vote } from "../../../components";
import { card_comment, card_share } from "../../../styles/card_view";

const CardFooter = ({
  single,
  isSingle,
  array,
  setArray,
  handlePropagation,
}) => {
  return (
    <div className="flex pb-1">
      {/* Card vote */}
      <Vote
        single={single}
        isSingle={isSingle}
        array={array}
        setArray={setArray}
        handlePropagation={handlePropagation}
      />

      {/* Card comments count */}
      <button className={card_comment}>
        <span className="text-xs mr-1.5">{single?.comments_count}</span>
        <span>
          <LiaCommentsSolid size={20} />
        </span>
      </button>

      <button onClick={handlePropagation} className={card_share}>
        <span className="mr-1.5">
          <CiShare2 size={20} />
        </span>
        <span className="text-xs">share</span>
      </button>
    </div>
  );
};

export default CardFooter;
