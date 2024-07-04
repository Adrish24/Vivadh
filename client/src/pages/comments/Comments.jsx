import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../components";
import { setSinglePost } from "../../redux/data/singlePostSlice";
import fetcher from "../../lib/fetcher";

import { setToggleSelectButton } from "../../redux/slices/toggleSelectButton";
import { setComments } from "../../redux/data/commentsSlice";

import Comment from "../../components/comments/Comment";
import CommentInput from "../../components/comments/CommentInput";

const Comments = () => {
  const { singlePost } = useSelector((state) => state.Single);
  const { comments } = useSelector((state) => state.Comments);
  const { currentUser } = useSelector((state) => state.Auth);

  const dispatch = useDispatch();

  const fetchPost = async (id) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    try {
      const res = await fetcher(
        `http://localhost:5000/post/${id}/?currentUserId=${user?._id}`
      );
      if (res.success) {
        // console.log(res.data);
        dispatch(setSinglePost(res.data));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchComments = async (id) => {
    try {
      const res = await fetcher(`http://localhost:5000/comments/${id}`);
      if (res.success) {
        // console.log(res.data);
        dispatch(setComments(res.data));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Retrive comments on page refresh
  useEffect(() => {
    const path = window.location.pathname;
    const pathSegment = path.split("/");
    const postId = pathSegment[2];
    fetchPost(postId);
    fetchComments(postId);
    dispatch(setToggleSelectButton(""));
  }, [currentUser]);

  // useEffect(() => console.log(singlePost, comments), [singlePost, comments]);

  return (
    <div className="w-[700px] mx-auto">
      {singlePost && <Card single={singlePost} isSingle={true} />}
      <CommentInput user={currentUser} postId={singlePost?._id} />
      {comments &&
        comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      <div className="h-24 w-full"></div>
    </div>

  );
};

export default Comments;
