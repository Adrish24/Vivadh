import { CgProfile } from "react-icons/cg";

import timeAgo from "../../utls/timeAgo";



/* eslint-disable react/prop-types */
const Comment = ({ comment }) => {
 

  return (
    <div className="px-3 mb-5">
      <div className="flex justify-start items-center mb-2">
        {comment?.avatar ? (
          <img
            className="
          p-1 
          rounded-full 
          bg-white 
          object-contain w-5
          "
            src={comment?.avatar}
            alt=""
          />
        ) : (
          <CgProfile size={28} />
        )}
        <span className="py-1 px-2 text-sm">{comment?.author}</span>
        <div className="w-1 h-1 mr-1 rounded-full bg-neutral-400" />
        <span>{timeAgo(comment?.createdAt)}</span>
      </div>
      <div className="pl-9">{comment?.content}</div>
    </div>
  );
};

export default Comment;
